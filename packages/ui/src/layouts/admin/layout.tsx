"use client";

import type { ErrorInfo } from "react";
import { Suspense, useState } from "react";
import { cn } from "@wsos/ui/lib/utils";
import type { CoreLayoutProps } from "ra-core";
import { ErrorBoundary } from "react-error-boundary";
import { SidebarProvider, SidebarTrigger } from "@wsos/ui/components/sidebar";
import { UserMenu } from "@wsos/ui/components/user-menu";
import { ThemeModeToggle } from "@wsos/ui/components/theme-mode-toggle";
import { Notification } from "@wsos/ui/components/notification";
import { AppSidebar } from "@wsos/ui/components/app-sidebar";
import { RefreshButton } from "@wsos/ui/components/refresh-button";
import { LocalesMenuButton } from "@wsos/ui/components/locales-menu-button";
import { Error } from "@wsos/ui/components/error";
import { Loading } from "@wsos/ui/components/loading";

export const Layout = (props: CoreLayoutProps) => {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | undefined>(undefined);
  const handleError = (_: unknown, info: ErrorInfo) => {
    setErrorInfo(info);
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
        )}
      >
        <header className="flex h-16 md:h-12 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="scale-125 sm:scale-100" />
          <div className="flex-1 flex items-center" id="breadcrumb" />
          <LocalesMenuButton />
          <ThemeModeToggle />
          <RefreshButton />
          <UserMenu />
        </header>
        <ErrorBoundary
          onError={handleError}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Error
              error={error}
              errorInfo={errorInfo}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<Loading />}>
            <div className="flex flex-1 flex-col px-4 ">{props.children}</div>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Notification />
    </SidebarProvider>
  );
};
