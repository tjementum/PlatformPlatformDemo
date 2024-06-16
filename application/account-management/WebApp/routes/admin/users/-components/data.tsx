import avatarUrl from "../../images/avatar.png";

export interface User {
  name: string;
  title: string;
  email: string;
  added: Date;
  lastSeen: Date;
  role: string;
  profilePicture?: string;
}

export const rows: User[] = [
  {
    name: "John Doe",
    title: "Software Engineer",
    email: "john@example.com",
    added: new Date("2023-09-10"),
    lastSeen: new Date("2024-01-10"),
    role: "Admin",
    profilePicture: avatarUrl
  },
  {
    name: "Jane Doe",
    title: "Product Designer",
    email: "jane@example.com",
    added: new Date("2023-09-10"),
    lastSeen: new Date("2024-01-10"),
    role: "User",
    profilePicture: avatarUrl
  },
  {
    name: "Elena Rivera",
    title: "Cloud Solutions Architect",
    email: "elena@example.com",
    added: new Date("2023-09-15"),
    lastSeen: new Date("2023-10-01"),
    role: "Admin",
    profilePicture: avatarUrl
  },
  {
    name: "Mohamed Al-Farsi",
    title: "Senior Data Scientist",
    email: "mohamed@example.com",
    added: new Date("2023-10-10"),
    lastSeen: new Date("2024-01-10"),
    role: "User"
  },
  {
    name: "Anika Patel",
    title: "User Experience Lead",
    email: "anika@example.com",
    added: new Date("2023-12-01"),
    lastSeen: new Date("2024-02-15"),
    role: "Admin",
    profilePicture: avatarUrl
  },
  {
    name: "Lucas Smith",
    title: "Network Security Engineer",
    email: "lucas@example.com",
    added: new Date("2023-11-20"),
    lastSeen: new Date("2024-03-30"),
    role: "User"
  },
  {
    name: "Sophia Turner",
    title: "Integration Specialist",
    email: "sophia@example.com",
    added: new Date("2023-09-18"),
    lastSeen: new Date("2024-01-18"),
    role: "Admin",
    profilePicture: avatarUrl
  },
  {
    name: "Andre Silva",
    title: "Agile Coach",
    email: "andre@example.com",
    added: new Date("2024-03-22"),
    lastSeen: new Date("2024-05-22"),
    role: "User"
  },
  {
    name: "Ling Chen",
    title: "DevOps Consultant",
    email: "ling@example.com",
    added: new Date("2023-10-05"),
    lastSeen: new Date("2024-03-05"),
    role: "Admin",
    profilePicture: avatarUrl
  },
  {
    name: "Carlos Garcia",
    title: "Database Administrator",
    email: "carlos@example.com",
    added: new Date("2023-11-01"),
    lastSeen: new Date("2024-02-01"),
    role: "User"
  },
  {
    name: "Olivia Johnson",
    title: "System Analyst",
    email: "olivia@example.com",
    added: new Date("2024-01-20"),
    lastSeen: new Date("2024-04-25"),
    role: "Admin",
    profilePicture: avatarUrl
  },
  {
    name: "Haruto Tanaka",
    title: "Application Developer",
    email: "haruto@example.com",
    added: new Date("2023-10-25"),
    lastSeen: new Date("2024-01-25"),
    role: "User"
  },
  {
    name: "Ibrahim Nasser",
    title: "Technical Support Lead",
    email: "ibrahim@example.com",
    added: new Date("2024-04-15"),
    lastSeen: new Date("2024-06-05"),
    role: "Admin",
    profilePicture: avatarUrl
  },
  {
    name: "Samantha Paul",
    title: "Project Manager",
    email: "samantha@example.com",
    added: new Date("2023-09-22"),
    lastSeen: new Date("2024-01-10"),
    role: "User"
  },
  {
    name: "Natalia Romanova",
    title: "Chief Technology Officer",
    email: "natalia@example.com",
    added: new Date("2024-01-05"),
    lastSeen: new Date("2024-05-10"),
    role: "Admin",
    profilePicture: avatarUrl
  },
  {
    name: "Alice Doe",
    title: "Product Manager",
    email: "alice@example.com",
    added: new Date("2023-09-10"),
    lastSeen: new Date("2024-01-10"),
    role: "Admin",
    profilePicture: avatarUrl
  },
  {
    name: "Bob Doe",
    title: "Principle Engineer",
    email: "bob@example.com",
    added: new Date("2024-01-25"),
    lastSeen: new Date("2024-05-25"),
    role: "User"
  },
  {
    name: "James Doe",
    title: "Customer Success Manager",
    email: "james@example.com",
    added: new Date("2023-10-05"),
    lastSeen: new Date("2024-03-05"),
    role: "User",
    profilePicture: avatarUrl
  },
  {
    name: "Mary Doe",
    title: "DevOps Engineer",
    email: "mary@example.com",
    added: new Date("2024-02-12"),
    lastSeen: new Date("2024-06-02"),
    role: "User",
    profilePicture: avatarUrl
  }
];
