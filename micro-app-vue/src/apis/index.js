import axios from "axios";
import menu from "micro-app-common/src/mock/menu";

const instance = axios.create({
  baseURL: "http://dev-api.jt-gmall.com",
});

instance.interceptors.response.use((reply) => reply.data);

/**
 * 快速登录
 */
export const ApiGetUserInfo = (token) => {
  return instance.post(
    "/member",
    {
      query:
        "{ getUserInfo { nickname avatarUrl gender country province city } }",
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
};

export const getMenusApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fmenu = menu.filter(item => item.application === 'vue').map(item => { return { ...item, path: item.aliasPath }})
      resolve(fmenu)
    }, 300)
  })
}