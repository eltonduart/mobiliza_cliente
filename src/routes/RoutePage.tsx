import React, { ReactNode, useReducer } from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import MainLayout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";

export interface RoutePageProps extends RouteComponentProps {
  component?: React.FC;
  element?: ReactNode;
  isPrivate?: boolean;
}

const RoutePage: React.FC<RoutePageProps> = ({
  component: Component,
  element,
  isPrivate,
}: RoutePageProps) => {
  const { user } = useAuth();

  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);

  if (isPrivate && !user) {
    return <Redirect to="/login" noThrow />;
  }

  if (isPrivate && user) {
    return (
      <MainLayout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
        {Component && <Component />}
        {element}
      </MainLayout>
    );
  }

  return (
    <>
      {Component && <Component />}
      {element}
    </>
  );
};

export default RoutePage;
