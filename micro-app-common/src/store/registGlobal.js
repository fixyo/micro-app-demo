
/**
 * @param store vuex实例
 * @param props qiankun下发的props 
 */
const commonStore = (store, props = {}) => {
  if (!store || !store.hasModule) return 

  const initState = props.getGlobalState && props.getGlobalState() || {
    menu: null,
    user: {},
    auth: {},
    appName: 'main'
  }

  const generateComponents = datas => {
    datas.map(row => {
      row.hidden = false
      if (row.path === '') {
        console.log('path为空')
      } else {
        ansyRouterComponetMap.layout = Layout
        ansyRouterComponetMap.container = Container
        row.component = ansyRouterComponetMap[row.component]
  
        if (row.children && row.children.length > 0) {
          generateComponents(row.children)
        } else {
          delete row.alwaysShow
          delete row.children
        }
        if (row.redirect === '') {
          delete row.redirect
        }
      }
    })
    return datas
  }

  if (!store.hasModule('common')) {
    const commonModule = {
      namespaced: true,
      state: initState,
      actions: {
        setGlobalState ({ commit }, payload = {}) {
          commit('setGlobalState', payload)
          commit('emitGlobalState', payload)
        },
        initGlobalState ({ commit }, payload = {}) {
          commit('setGlobalState', payload) 
        },
          // user login
        login({ commit }, userInfo) {
          const { publicKey, randomId, username, password } = userInfo
          const encryptor = new JsEncrypt()
          encryptor.setPublicKey(publicKey)
          const usernameEncryptor = encryptor.encrypt(username)
          const passwordEncryptor = encryptor.encrypt(password)
          const sign = md5(username + ':' + password)

          return new Promise((resolve, reject) => {
            let loginParams = {}
            if (userInfo.integrated) {
              loginParams = { publickey: randomId, username: usernameEncryptor, password: passwordEncryptor, sign: sign, integrated: 'integrated' }
            } else {
              loginParams = { publickey: randomId, username: usernameEncryptor, password: passwordEncryptor, sign: sign }
            }
            // const loginParams = { publickey: randomId, username: usernameEncryptor, password: passwordEncryptor, sign: sign }
            const headers = { 'Authorization': 'Basic aXNzdGVjaDppc3N0ZWNoc2VjcmV0', 'deviceId': 'ba968a1f2c60168a1' }
            const params = qs.stringify(loginParams)
            login(params, headers).then(response => {
              const accessTokens = response['access_token']
              const refreshToken = response['refresh_token']
              // const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQAB`
              // encryptor.setPublicKey(publicKey)
              // const accessTokens = aesEncry.encrypt(accessToken)
              // let accessTokens = ''
              // if (ssoglobal.sso) {
              //   accessTokens = accessToken
              // } else {
              //   accessTokens = aesEncry.encrypt(accessToken)
              // }
              commit('SET_ACCESS_TOKEN', accessTokens)
              commit('SET_REFRESH_TOKEN', refreshToken)
              setToken(true, 'login')
              localStorage.setItem(accessTokens, 'accessToken')
              setToken(refreshToken, 'refreshToken')
              setToken(accessTokens, 'accessToken')
              setToken(true, 'codefool')
              localStorage.setItem(refreshToken, 'refreshToken')
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        },

        refreshToken({ commit }) {
          commit('SET_ACCESS_TOKEN', '')
          removeToken('accessToken')
          const headers = { 'Authorization': 'Basic aXNzdGVjaDppc3N0ZWNoc2VjcmV0' }
          const loginParams = { scope: 'all', refresh_token: state.refreshToken, grant_type: 'refresh_token' }
          const params = qs.stringify(loginParams)
          return new Promise((resolve, reject) => {
            refreshToken(params, headers).then(response => {
              const accessToken = response['access_token']
              const refreshToken = response['refresh_token']
              // const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQAB`
              // const encryptor = new JsEncrypt()
              // encryptor.setPublicKey(publicKey)
              // accessToken = encryptor.encrypt(accessToken)
              // accessToken = aesEncry.encrypt(accessToken)
              // if (ssoglobal.sso) {
              //   // accessToken = accessToken
              // } else {
              //   accessToken = aesEncry.encrypt(accessToken)
              // }
              commit('SET_ACCESS_TOKEN', accessToken)
              commit('SET_REFRESH_TOKEN', refreshToken)
              setToken(accessToken, 'accessToken')
              setToken(refreshToken, 'refreshToken')
              commit('SET_codefool', true)
              setToken(true, 'codefool')
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        },

        // get user info
        getUserInfo({ commit, state }) {
          return new Promise((resolve, reject) => {
            
              // 用户信息超时后重新跳转到登录页，这时会获取用户信息
              // 如果没获取到数据则不处理
             
                // 登录成功后清掉 url 中的 location.search
                // 未成功前不处理，sso 中使用了 location.search 传参
                // if (location.search) {
                //   history.replaceState(null, null, location.origin + location.hash)
                // }
            const data = {
              nickname: 'eccc',
              username: 'eccc',
              userId: '9527',
              orgName: 'ssc',
              orgId: '0751',
              dataPermission: '*'
            }
            // setToken(data.dataPermission, 'dataPermission')
            // setToken(data.userId, 'userId')
            // setToken(data.orgId, 'orgId')
          
            const { nickname, username, userId, orgName, orgId, dataPermission } = data
            commit('SET_NICKNAME', nickname)
            commit('SET_USERNAME', username)
            commit('SET_USERID', userId)
            commit('SET_ORGNAME', orgName)
            commit('SET_orgId', orgId)
            commit('SET_dataPermission', dataPermission)
            // commit('SET_AVATAR', avatar)
            resolve(data)
          })
        },

        generateRoutes({ commit }, getMenusApi) {
          return new Promise(resolve => {
            // 后台获取router
            getMenusApi().then(response => {
              const { data } = response
              const accessedRoutes = data
              const menu = generateComponents(accessedRoutes)
              commit('SET_ROUTES', menu)
              resolve(menu)
            })
          })
        },
      },
      mutations: {
        setGlobalState (state, payload) {
          state = {...state, ...payload}
        },
        // 调用父应用的setGlobalState方法，
        emitGlobalState (state, payload) {
          console.log('emitGlobalState参数：', payload)
          if (props.setGlobalState) {
            props.setGlobalState(payload)
          }
        },
        setAuth (state, payload) {
          state.auth = payload || {}
          
        },
        setApp (state, payload) {
          state.appName = payload
        },
        setMenus (state, payload) {
          state.menu = payload
        }
      },
      getters: {
        token: (state) => state.auth.token 
      }
    }
    store.registerModule('common', commonModule);
  } else {
    store.dispatch('common/initGlobalState', initState)
  }
}

export { commonStore }