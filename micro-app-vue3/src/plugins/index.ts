const files = import.meta.globEager('../plugins/*.ts')
// eslint-disable-next-line import/prefer-default-export
export const usePlugins = (app: any) => {
  const filesPath = Object.keys(files)
  filesPath.forEach((path) => {
    if (!path.endsWith('index.ts')) {
      const module = files[path]
      module.default(app)
    }
  })
}
