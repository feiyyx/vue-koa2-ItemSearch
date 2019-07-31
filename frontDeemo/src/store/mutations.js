import ajax, { _post } from '../tools/utils'

const MASK_FLAG = 'MASK_FLAG';//是否显示遮罩层
const CHECK_LIST = 'CHECK_LIST';//判断是否存在列表
const RUQEST_AJAX = 'RUQEST_AJAX';//若不存在则向服务器请求
const ADD2_CHOSENLIST = 'ADD2_CHOSENLIST';// 添加chosenList
const DELETE_ITEM = 'DELETE_ITEM';//实现去掉不想许愿的装备
const LOGIN_FLAG = 'LOGIN_FLAG';//是否显示login层
const SIGN_IN = 'SIGN_IN'; //是否显示SginIn层
const POND_CHOOSE = 'POND_CHOOSE'; //是否显示SginIn层
const ALL_NODISPLAY = 'ALL_NODISPLAY' //全部不显示
const USER_MANAGE = 'USER_MANAGE'; //判断用户权限
const LOGIN_CHECK = 'LOGIN_CHECK' //判断是否已经登陆
const LOGIN_OUT = 'LOGIN_OUT' // 注销
const LOCALSTORAGE = "LOCALSTORAGE"; // 本地存储
const GET_LOCALSTORAGE = "GET_LOCALSTORAGE" //  获取本地存储
const STOREITEM = 'STOREITEM'; //服务端许愿存储
const DELETE_ITEM_SER = 'DELETE_ITEM_SER' //服务端许愿删除



export default {
    [MASK_FLAG] (state) { //是否显示遮罩层
        if(state.showCloak === false) {
            state.showCloak = true;//显示
        } else {
            state.showCloak = false;//不显示
        }
    },
    [LOGIN_FLAG] (state) { //是否显示login层
        if(state.loginFlag=== false) {
            state.loginFlag = true;//显示
        } else {
            state.loginFlag = false;//不显示
        }
    },
    [SIGN_IN] (state) { //是否显示SginIn层
        if(state.signinFlag === false) {
            state.signinFlag = true;//显示
        } else {
            state.signinFlag = false;//不显示
        }
    },
    [POND_CHOOSE] (state) { //是否显示pondChoose层
        if(state.pondShowFlag=== false) {
            state.pondShowFlag = true;//显示
        } else {
            state.pondShowFlag = false;//不显示
        }
    },
    [CHECK_LIST](state) { //判断是否存在列表
        if(state.pondList.length === 0) {
            state.pondFlag = false;
        } else {
            state.pondFlag = true;
        }
    },
    [ALL_NODISPLAY](state) { //全部不显示
        state.signinFlag = false;
        state.pondShowFlag  = false;
        state.loginFlag = false;
        state.showCloak = false;

    },
    [RUQEST_AJAX](state) { //若不存在则向服务器请求
        let ajaxRuqest = _post('/string', {name:'',nickname:''}).then(res => {
            res.forEach( x => {
                state.pondList.push(x)
            });
            state.pondList.push();
        }).catch();
    },
    [ADD2_CHOSENLIST](state, item){ // 添加chosenList
        let checkFlag = true; //checkFlag，若chosenList中已存在，则变成false，若不存在则true
        console.log(item)
        if(state.chosenList.length === 0) {
            state.pondList.forEach( val => {
                if(item.url === val.url) {
                    state.chosenList.push(val);
                    state.showCloak = false;
                    state.pondShowFlag = false;
                }
            })
        } else {
            state.chosenList.forEach(val => {
                if(item.url === val.url) {
                    checkFlag = false;
                    return false;
                }
            })
            // 为true表示val在chosenList中不存在，可以进行push
            if(checkFlag) {
                state.pondList.forEach( val => {
                    if(item.url === val.url) {
                        state.chosenList.push(val);
                        state.showCloak = false;
                        state.pondShowFlag = false;
                    }
                })
            }
        }
    },    
    [STOREITEM](state, user_item) { //每次选择一个物品，就要向服务器发送一次数据存储起来
        let ajaxRuqest = _post('/store', user_item).then(res => {
            console.log(res)
            if(res.code === 1) {
                alert('已存在！')
            }
        }).catch();
    },
    [DELETE_ITEM](state, item) { //实现去掉不想许愿的功能
        for(let i = 0; i < state.chosenList.length;i++) {
            if(item.id === state.chosenList[i].id) {
                state.chosenList.splice(i, 1);
                /* TODO：未来（咕咕咕）开发动画功能 */
                break;
            }
        }
    },
    [DELETE_ITEM_SER](state, item) { //上传至服务端
        let ajaxRuqest = _post('/delete', item).then(res => {
            console.log(res)
            if(res.code === 1) {
                alert('发生错误')
            }
        }).catch();
    },
    [USER_MANAGE](state, status) { //用户权限管理
            let {username, role, code} = status;
            state.userManage.username = username;
            state.userManage.role = role;
    },
    [LOGIN_CHECK](state, statu) { //用户权限管理
        let {username, role, status, code, store} = statu;
        if(status === 'logining' && code === 0) {
            state.userManage.username = username;
            state.userManage.role = role;
            state.chosenList = [].slice.call(store);
            console.log("DONE")
        }
    },
    [LOGIN_OUT](state) {
        state.userManage = {
            username: '',
            role: '3'
        } // 1->管理员 2->普通用户 3->游客
    },
    [LOCALSTORAGE](state) { // 游客本地存储
        if(state.userManage.role !== '3' || state.userManage.username !== '') return;
        let tempJSON = JSON.stringify(state.chosenList);
        localStorage.setItem('visitor', tempJSON);
    },
    [GET_LOCALSTORAGE](state) { //  读取游客本地存储
        if(state.userManage.role !== '3' || state.userManage.username !== '') return;
        let tempList = localStorage.getItem('visitor');
        if(tempList === null) return;
        state.chosenList = JSON.parse(tempList);
    }
}