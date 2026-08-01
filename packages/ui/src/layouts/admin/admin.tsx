"use client";

import {
  CoreAdminUI,
  type CoreAdminUIProps,
  CoreAdminContext,
  type CoreAdminContextProps,
  type CoreAdminProps,
  localStorageStore,
} from "ra-core";
import { i18nProvider as defaultI18nProvider } from "@wsos/ui/lib/i18nProvider";
import { Layout } from "@wsos/ui/components/layout";
import { LoginPage } from "@wsos/ui/components/login-page";
import { NotFound } from "@wsos/ui/components/not-found";
import { Ready } from "@wsos/ui/components/ready";
import { ThemeProvider } from "@wsos/ui/components/theme-provider";
import { AuthCallback } from "@wsos/ui/components/authentication";
import { useEffect } from "react";

const defaultStore = localStorageStore();

const AdminContext = (props: CoreAdminContextProps) => (
  <CoreAdminContext {...props} />
);

const AdminUI = (props: CoreAdminUIProps) => {
  const { disableTelemetry = false, ...rest } = props;

  useEffect(() => {
    if (
      disableTelemetry ||
      process.env.NODE_ENV !== "production" ||
      typeof window === "undefined" ||
      typeof window.location === "undefined" ||
      typeof Image === "undefined"
    ) {
      return;
    }
    const img = new Image();
    img.src = `https://shadcn-admin-kit-telemetry.marmelab.com/shadcn-admin-kit-telemetry?domain=${window.location.hostname}`;
  }, [disableTelemetry]);

  return (
    <ThemeProvider>
      <CoreAdminUI
        layout={Layout}
        loginPage={LoginPage}
        ready={Ready}
        authCallbackPage={AuthCallback}
        disableTelemetry
        {...rest}
      />
    </ThemeProvider>
  );
};

export const Admin = (props: CoreAdminProps) => {
  const {
    accessDenied,
    authCallbackPage = AuthCallback,
    authenticationError,
    authProvider,
    basename,
    catchAll = NotFound,
    children,
    dashboard,
    dataProvider,
    disableTelemetry,
    error,
    i18nProvider = defaultI18nProvider,
    layout = Layout,
    loading,
    loginPage = LoginPage,
    queryClient,
    ready = Ready,
    requireAuth,
    store = defaultStore,
    title = "Shadcn Admin",
  } = props;
  return (
    <AdminContext
      authProvider={authProvider}
      basename={basename}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      queryClient={queryClient}
      store={store}
    >
      <AdminUI
        accessDenied={accessDenied}
        authCallbackPage={authCallbackPage}
        authenticationError={authenticationError}
        catchAll={catchAll}
        dashboard={dashboard}
        disableTelemetry={disableTelemetry}
        error={error}
        layout={layout}
        loading={loading}
        loginPage={loginPage}
        ready={ready}
        requireAuth={requireAuth}
        title={title}
      >
        {children}
      </AdminUI>
    </AdminContext>
  );
};
