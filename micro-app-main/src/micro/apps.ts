import shared from "@/shared";
import router from '@/router'
import actions from "@/shared/actions";

const apps = [
  {
    name: "ReactMicroApp",
    entry: "//localhost:10100",
    container: "#frame",
    activeRule: "/react",
    // 通过 props 将 shared 传递给子应用
    props: { shared, mainRouter: router, getGlobalState: actions.getGlobalState },
  },
  {
    name: "VueMicroApp",
    entry: "//localhost:10200",
    container: "#frame",
    activeRule: "/vue",
    // 通过 props 将 shared 传递给子应用, 将主应用的router传递给子应用，方便在子应用中跳回子应用
    props: {
      shared,
      mainRouter: router,
      getGlobalState: actions.getGlobalState
    },
  },
  // Angular 应用暂时未接入
  {
    name: "AngularMicroApp",
    entry: "//localhost:10300",
    container: "#frame",
    activeRule: "/angular"
  }
];

export default apps;
