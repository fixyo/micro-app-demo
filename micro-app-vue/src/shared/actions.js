function emptyAction() {
  // 警告：提示当前使用的是空 Action
  console.warn("Current execute action is empty!");
}

import VueRouter from "vue-router";
class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
    getGlobalState: emptyAction,
    mainRouter: VueRouter
  };
  
  /**
   * 设置 actions
   */
  setActions (actions) {
    console.log('actions==========: ', actions)
    this.actions = actions;
  }

  /**
   * 映射
   */
  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange(...args);
  }

  /**
   * 映射
   */
  setGlobalState(...args) {
    return this.actions.setGlobalState(...args);
  }

  getGlobalState (...args) {
    return this.actions.getGlobalState(...args)
  }


}

const actions = new Actions();
export default actions;