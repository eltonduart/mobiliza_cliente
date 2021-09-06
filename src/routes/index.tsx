import React from "react";
import { Router as ReachRouter } from "@reach/router";
import SignIn from "../pages/SignIn";
import RoutePage from "./RoutePage";
import Home from "../pages/Home";
import Pessoa from "../pages/Pessoa";
import Distrito from "../pages/Distrito";
import Ocorrencia from "../pages/Ocorrencia";
import MunicipioTotal from "../pages/Relatorio/MunicipioTotal";
import ColaboradorTotal from "../pages/Relatorio/ColaboradorTotal";

// default component
const DefaultComponent: React.FC<{}> = (): React.ReactElement => (
  <div>{`No Component Defined.`}</div>
);

const Router: React.FC = () => {
  return (
    <>
      <ReachRouter>
        <RoutePage path="/" component={Home || DefaultComponent} isPrivate />
        <RoutePage
          path="/pessoa"
          component={Pessoa || DefaultComponent}
          isPrivate
        />
        <RoutePage
          path="/ocorrencia"
          component={Ocorrencia || DefaultComponent}
          isPrivate
        />
        <RoutePage
          path="/distrito"
          component={Distrito || DefaultComponent}
          isPrivate
        />
        <RoutePage
          path="/relmunicipios"
          component={MunicipioTotal || DefaultComponent}
          isPrivate
        />
        <RoutePage
          path="/relcolaboradores"
          component={ColaboradorTotal || DefaultComponent}
          isPrivate
        />
        <RoutePage path="/login" component={SignIn} />
      </ReachRouter>
    </>
  );
};

export default Router;
