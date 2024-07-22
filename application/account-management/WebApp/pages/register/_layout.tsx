import type { ReactNode } from "react";
import { HeroImage } from "@/shared/ui/images/HeroImage";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/register/_layout")({
  component: RegisterLayout
});

interface RegisterLayoutProps {
  children?: ReactNode;
}

export function RegisterLayout({ children }: Readonly<RegisterLayoutProps>) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col items-center justify-center gap-6 md:w-1/2 p-6">{children || <Outlet />}</div>
        <div className="flex items-center justify-center p-6 bg-gray-50 md:w-1/2 md:px-28 md:py-12">
          <HeroImage />
        </div>
      </div>
    </main>
  );
}
