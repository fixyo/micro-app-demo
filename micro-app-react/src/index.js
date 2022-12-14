import React, {createContext} from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import App from "./App.jsx";
// import actions from "@/shared/actions";
import SharedModule from "./shared/index.js";

export const AppContext = createContext()


if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

function render(props = {}) {
  if (props) {
    console.log(props, 'props=================')
    // 注入 actions 实例
    // actions.setActions(props);
    SharedModule.overloadShared(props)
  }

  const initState = props.getGlobalState && typeof props.getGlobalState === 'function' ? props.getGlobalState() : {};
  // console.log(initState)
  ReactDOM.render(
    <AppContext.Provider value={initState}>
      <App />
    </AppContext.Provider>,
    document.getElementById("root")
  );
}

export async function bootstrap() {
  console.log("react app bootstraped");
}

export async function mount(props) {
  console.log("reactApp mount", props);
  render(props);
}

export async function unmount() {
  console.log("react unmount");
  ReactDOM.unmountComponentAtNode(document.getElementById("root"));
}
