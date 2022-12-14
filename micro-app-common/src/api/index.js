import menu from '../mock/menu'
export const getMenusApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(menu)
    }, 300)
  })
}