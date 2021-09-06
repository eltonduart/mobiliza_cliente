// icons
import HomeIcon from "@material-ui/icons/Home";
import PessoaIcon from "@material-ui/icons/AssignmentInd";
import RelatorioIcon from "@material-ui/icons/Print";

// interface
import RouteItem from "../model/RouteItem.model";

// define app routes
export const routes: Array<RouteItem> = [
  {
    key: "router-home",
    title: "Home",
    tooltip: "Home",
    path: "/",
    enabled: true,
    icon: HomeIcon,
    appendDivider: true,
  },
  {
    key: "router-code",
    title: "Pessoas",
    tooltip: "Pessoas",
    path: "/pessoa",
    enabled: true,
    icon: PessoaIcon,
    appendDivider: true,
  },
  {
    key: "cadastrosb",
    title: "Cadastros Básicos",
    tooltip: "Cadastros Básicos",
    path: "/",
    enabled: true,
    icon: RelatorioIcon,
    appendDivider: true,
    subRoutes: [
      {
        key: "distrios",
        title: "Distritos",
        tooltip: "Distritos",
        path: "/distrito",
        enabled: true,
      }
    ]
  },
  {
    key: "relatorios",
    title: "Relatórios",
    tooltip: "Relatórios",
    path: "/relatorios",
    enabled: true,
    icon: RelatorioIcon,
    appendDivider: true,
    subRoutes: [
      {
        key: "municipios",
        title: "Municípios",
        tooltip: "Municípios",
        path: "/relmunicipios",
        enabled: true,
      },
      {
        key: "colaboradores",
        title: "Colaboradores",
        tooltip: "Colaboradores",
        path: "/relcolaboradores",
        enabled: true,
      }
    ]
  },
];
