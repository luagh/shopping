import { createStore } from 'vuex'
import { login, getinfo } from "~/api/manager"
import { setToken, removeTok } from '~/composables/auth'
const store = createStore({
    state() {
        return {
            //用户信息
            user: {},
            //侧边宽度
            asideWidth: '250px',
            //保存数据
            menus: [],
            ruleNames: [],

        }
    },

    mutations: {
        //记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },
        handleAsideWidth(state) {
            state.asideWidth = state.asideWidth == '250px' ? '64px' : '250px'
        },
        SET_MENUS(state, menus) {
            state.menus = menus
        },
        SET_RULENSMES(state, ruleNames) {
            state.ruleNames = ruleNames
        }

    },
    actions: {
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err))

            })

        },

        //获取当前登录用户信息
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo().then(res => {
                    commit("SET_USERINFO", res)
                    commit('SET_MENUS', res.menus)
                    commit('SET_RULENSMES', res.ruleNames)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        //退出登录
        logout({ commit }) {

            //移除cookie.里的token
            removeTok()
            //清除当前用户状态vuex
            commit('SET_USERINFO', {})
        }


    }
})

export default store
