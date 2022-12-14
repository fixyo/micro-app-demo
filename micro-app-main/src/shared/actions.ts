// 当前版本 qiankun 对 insertBefore 处理有问题，这里先使用修改后的本地包
import { initGlobalState, MicroAppStateActions } from "qiankun";
import Vue from 'vue'

const initialState = Vue.observable({
  menu: null,
  user: {name: 'eccc'},
  auth: {},
  appName: ''
}) as any;

type NewMicroAppStateActions = MicroAppStateActions & {getGlobalState: (key?: string) => any}

const actions = initGlobalState(initialState) as NewMicroAppStateActions;

actions.onGlobalStateChange((newState, prev) => {
  console.log('state----change', newState)
  for (const key in newState) {
    initialState[key] = newState[key]


  }
})

actions.getGlobalState = (key?:string) => {
  return key ? initialState[key] : initialState
}

export default actions;