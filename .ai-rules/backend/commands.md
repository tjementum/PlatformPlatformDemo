# CQRS Commands

When implementing a CQRS Command, follow these rules very carefully.

## Structure

Commands should be created in the `/[scs-name]/Core/Features/[Feature]/Commands` directory.

## Implementation

1. Create one file per command containing Command, Validator, and Handler:
   - Name the file after the command without suffix: e.g. `CreateUser.cs`.
2. Command Record:
   - Create a public sealed record marked with `[PublicAPI]` that implements `ICommand` and `IRequest<Result>` or `IRequest<Result<T>>`.
   - Name with `Command` suffix: `CreateUserCommand`.
   - Define properties in the primary constructor.
   - Use property initializers for simple input normalization: `public string Email { get; } = Email.Trim().ToLower();`.
   - For route parameters, use `[JsonIgnore] // Removes from API contract` on properties (including the comment).
3. Validator:
   - Create public sealed class with `Validator` suffix: e.g. `CreateUserValidator`.
   - Each property should have one shared error message (e.g. "Email must be in a valid format and no longer than 100 characters.").
   - Validation should only validate command properties (format, length, etc.); domain validation like uniqueness checks belongs in the handler.
4. Handler:
   - Create public sealed class with `Handler` suffix: e.g. `CreateUserHandler`.
   - Implement `IRequestHandler<CommandType, Result>` or `IRequestHandler<CommandType, Result<T>>`.
   - Commands typically return `Result` (void); only return `Result<T>` when a newly created ID or similar is needed.
   - Use guard statements with early returns that return `Result.BadRequest()`, `Result.NotFound()`, or similar instead of throwing exceptions.
   - Always create telemetry events for successful command results, and optionally for failed commands; always consult [Telemetry Events](/.ai-rules/backend/telemetry-events.md) when implementing telemetry events.
   - Always use repositories to persist changes, and never use `SaveChangesAsync()` directly.
5. Command Composition:
   - Use MediatR to chain commands: e.g. `await mediator.Send(new CreateUserCommand(...))`.
   - Extract shared logic to separate classes and store them in `/[scs-name]/Core/Features/[Feature]/Shared` (e.g. `await avatarUpdater.UpdateAvatar(user, ...)`).
6. After changing the API make sure to run `dotnet build` in the [application](/application) directory to generate the Open API JSON contract. Then run `npm run build` from the [application](/application) directory to trigger `openapi-typescript` to generate the API contract used by the frontend.

Commands run through MediatR pipeline behaviors in this order: Validation → Command → PublishDomainEvents → UnitOfWork → PublishTelemetryEvents. Nested commands and domain events are handled within the UnitOfWork transaction.

## Example 1 - Create user

This example shows how input is normalized and validated, ensuring the email property is reused in the validation message. Also it shows that domain validation like `IsEmailFreeAsync()` is done in the handler. And that no exception is thrown, but instead a `Result` is returned. Finally, it shows how shared logic is extracted to separate classes, and how telemetry events are created.

Notice that the constructor of the handler does not fit within the 120 characters and wraps to the next line, but all other calls do.

```csharp
public sealed record CreateUserCommand(TenantId TenantId, string Email, UserRole UserRole, bool EmailConfirmed)
    : ICommand, IRequest<Result<UserId>>
{
    public string Email { get; } = Email.Trim().ToLower();
}

public sealed class CreateUserValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserValidator(IUserRepository userRepository, ITenantRepository tenantRepository)
    {
        const string errorMessage = "Email must be in a valid format and no longer than 100 characters.";
        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage(errorMessage)
            .MaximumLength(100)
            .WithMessage(errorMessage);
    }
}

public sealed class CreateUserHandler(
    IUserRepository userRepository,
    AvatarUpdater avatarUpdater,
    GravatarClient gravatarClient,
    ITelemetryEventsCollector events
) : IRequestHandler<CreateUserCommand, Result<UserId>>
{
    public async Task<Result<UserId>> Handle(CreateUserCommand command, CancellationToken cancellationToken)
    {
        if (await userRepository.IsEmailFreeAsync(command.Email, cancellationToken) == false)
        {
            return Result<UserId>.BadRequest($"The email '{command.Email}' is already in use by another user on this tenant.");
        }

        var user = User.Create(command.TenantId, command.Email, command.UserRole, command.EmailConfirmed);

        await userRepository.AddAsync(user, cancellationToken);
        var gravatar = await gravatarClient.GetGravatar(user.Id, user.Email, cancellationToken);
        if (gravatar is not null)
        {
            await avatarUpdater.UpdateAvatar(user, true, gravatar.ContentType, gravatar.Stream, cancellationToken);
            events.CollectEvent(new GravatarUpdated(gravatar.Stream.Length));
        }

        events.CollectEvent(new UserCreated(user.Id, user.Avatar.IsGravatar));

        return user.Id;
    }
}
```

## Example 2 - Create tenant and owner user

This example shows how one command can invoke another command. Notice that event tracking in the main command is done before the nested command is invoked, ensuring that the events are collected in chronological order.

Notice that the constructor fits within the 120 characters, but the nested `mediator.Send()` does not, and wraps to the next line.

```csharp
public sealed record CreateTenantCommand(string OwnerEmail, bool EmailConfirmed, string? Locale)
    : ICommand, IRequest<Result>
{
    public string OwnerEmail { get; } = OwnerEmail.Trim().ToLower();
}

public sealed class CreateTenantHandler(ITenantRepository tenantRepository, IMediator mediator, ITelemetryEventsCollector events)
    : IRequestHandler<CreateTenantCommand, Result>
{
    public async Task<Result> Handle(CreateTenantCommand command, CancellationToken cancellationToken)
    {
        var tenant = Tenant.Create(command.OwnerEmail);
        await tenantRepository.AddAsync(tenant, cancellationToken);

        events.CollectEvent(new TenantCreated(tenant.Id, tenant.State));

        await mediator.Send(
            new CreateUserCommand(tenant.Id, command.OwnerEmail, UserRole.Owner, command.EmailConfirmed, command.Locale),
            cancellationToken
        );

        return Result.Success();
    }
}
```