import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    showCloak: false, //是否显示遮罩层
    pondList : [],// 存储能够许愿的装备
    pondFlag: false, // 是否需要向服务器请求pondList
    chosenList : [],  //被选中进行许愿的装备
    loginFlag : false, //是否显示登陆界面
    signinFlag : false, //是否显示注册界面
    pondShowFlag: false, //是否显示选择池
    userManage: {
        username: '',
        role: '3'
    } // 1->管理员 2->普通用户 3->游客
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})