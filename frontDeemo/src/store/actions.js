export default {
    checkList( { commit, state } ) { //判断是否获取了pondList的待选数据
        commit('CHECK_LIST'); //检查并修改pondFlag
        if(!state.pondFlag) { //若为空
            commit('RUQEST_AJAX'); //则发出查询
            state.pondFlag = true; //pondList已不为空
        }
    },
    //其实下面这俩可以合在一起，使用flag获取del/add信息即可，同理服务端也一样，但是我懒= =
    getList({ commit, state }, item ) {// 添加数据
        let x = commit('ADD2_CHOSENLIST', item)
        if(state.userManage.role === "3" || x) { // 游客获取数据本地处理
            commit('LOCALSTORAGE')
            return;
        }
        commit('STOREITEM', [item, state.userManage.username])
    },
    delList({ commit, state}, item ) {// 删除数据
        commit('DELETE_ITEM', item)
        if(state.userManage.role === "3") {// 游客删除数据本地处理
            commit('LOCALSTORAGE')
            return;
        }
        commit('DELETE_ITEM_SER', [item, state.userManage.username])
    }
    
}