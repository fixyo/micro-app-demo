# 微前端架构模板

### micro-app-common

全局模块
axios 封装, 通用组件, login 组件、layout 组件 (elementui), util 函数等都可以放在该模块内
common 模块中同时提供了一个 registGlobal 方法。
关于 registGlobal 如下：

```js
/**
 * @param store 子应用的vuex实例
 * @param props qiankun下发的props
 */
const registGlobal = (store, props = {}) => {
	// 如果没有store或者非vuex实例
	if (!store || !store.hasModule) return;

	// 在乾坤中运行先从父应用中获取全局状态
	// 独立运行使用默认初始状态
	const initState = (props.getGlobalState && props.getGlobalState()) || {
		menu: null,
		user: {},
		auth: {},
		appName: 'main',
	};
	// 子应用首次加载时注册common模块，使用initState初始化
	if (!store.hasModule('common')) {
		const commonModule = {
			namespaced: true,
			state: initState,
			actions: {
				setGlobalState({ commit }, payload = {}) {
					commit('setGlobalState', payload);
					commit('emitGlobalState', payload);
				},
				initGlobalState({ commit }, payload = {}) {
					commit('setGlobalState', payload);
				},
				login({ commit, dispath }, payload) {},
			},
			mutations: {
				setGlobalState(state, payload) {
					state = { ...state, ...payload };
				},
				// 调用父应用的setGlobalState方法，
				emitGlobalState(state, payload) {
					console.log('emitGlobalState参数：', payload);
					if (props.setGlobalState) {
						props.setGlobalState(payload);
					}
				},
				setAuth(state, payload) {
					state.auth = payload || {};
				},
				setApp(state, payload) {
					state.appName = payload;
				},
			},
			getters: {
				token: state => state.auth.token,
			},
		};
		// 子应用的vuex store注册common模块
		store.registerModule('common', commonModule);
	} else {
		//
		store.dispatch('common/initGlobalState', initState);
	}
};

export { registGlobal };
```

react 项目的 webpack 配置

```js
const path = require('path');

const { name } = require('./package');

module.exports = {
	webpack: config => {
		// 该配置非常重要，无该配置切换应用主应用会崩溃
		config.entry = config.entry.filter(e => !e.includes('webpackHotDevClient'));
		config.output.library = `${name}-[name]`;
		config.output.libraryTarget = 'umd';
		config.output.jsonpFunction = `webpackJsonp_${name}`;
		config.output.globalObject = 'window';

		config.resolve.alias = {
			...config.resolve.alias,
			'@': path.resolve(__dirname, 'src'),
		};

		let rule = config.module.rules.find(rule => rule.oneOf);
		const ruleBabel = rule.oneOf[1];
		ruleBabel.options.plugins.push([
			'styled-jsx/babel',
			{ optimizeForSpeed: true },
		]);

		return config;
	},

	devServer: function (configFunction) {
		return function (proxy, allowedHost) {
			const config = configFunction(proxy, allowedHost);
			config.disableHostCheck = true;
			config.headers = {
				'Access-Control-Allow-Origin': '*',
			};
			config.historyApiFallback = true;
			config.hot = true;
			config.open = false;

			return config;
		};
	},
};
```

vue.config.js 的配置

```js
const path = require('path');
const packageName = require('./package.json').name;

module.exports = {
	devServer: {
		port: 10200,
		disableHostCheck: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
	transpileDependencies: ['micro-app-common'],
	chainWebpack: config => config.resolve.symlinks(false),
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@src': path.resolve(__dirname, 'src'),
				'@pages': path.resolve(__dirname, 'src/pages'),
			},
		},
		output: {
			library: `${packageName}-[name]`,
			libraryTarget: 'umd',
			jsonpFunction: `webpackJsonp_${packageName}`,
		},
	},
};
```
