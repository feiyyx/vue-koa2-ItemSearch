<template>
	<div id="app">
		<div class="header">
			<div class="ele-container">
				<div class="ele-container" v-if="this.userManage.role === '3'">
					<div class="login ele-item" @click="loginTroggle">登 陆</div>
					<div class="signIn ele-item" @click="signinTroggle">注 册</div>
					<span class="account">游 客</span>
				</div>
				<div class="ele-container" v-else>
					<div class="loginout ele-item" @click="loginOut">注 销</div>
					<div class="signIn ele-item" v-if="this.userManage.role === '1'" @click="toAddItem">添加装备</div>
					<span class="account" v-if="this.userManage.role === '2'">身份：普通用户</span>
					<span class="account" v-else-if="this.userManage.role === '1'">身份：管理员</span>
					<span class="account">{{ this.userManage.username }}</span>
				</div>
			</div>
		</div>
		<div class="main-container">
			<wishingPond></wishingPond>
			<router-view />
		</div>
		<loginSignupForm></loginSignupForm>
		<cloak></cloak>
	</div>
</template>

<script>
import wishingPond from './components/pond';
import cloak from './components/cloak'
import loginSignupForm from './components/loginSignupForm'
import { mapState } from 'vuex'

export default {
	name: 'app',
	components: {
		wishingPond,
		cloak,
		loginSignupForm 
	},
	data() {
		return {
			warning: '',
		}
	},
	methods: {
		maskTroggle() {
			this.$store.commit('MASK_FLAG');
		},
		chooseItem(url) {
			this.$store.commit('ADD2_CHOSENLIST', url);
		},
		loginTroggle() {
			this.$store.commit('MASK_FLAG');
			this.$store.commit('LOGIN_FLAG');	
		},
		signinTroggle(){
			this.$store.commit('MASK_FLAG');
			this.$store.commit('SIGN_IN');	
		},
		loginCheck() {
			let tempResp = {}
			this.$router.push('/index');
			this.ajaxRequest = this.$post('/loginCheck', tempResp).then(res => {
				console.log(res)
					if( res.code !== 0) {
						this.$store.commit('GET_LOCALSTORAGE');
						return
					} else {
						this.$store.commit('LOGIN_CHECK',res);
					}
				}).catch( err => {
				})
		},
		loginOut() {
			let ajaxRuqest = this.$post('/loginout', {'action':'loginout'}).then(res => {
				if(res.code === 1 && res.status === 'loginout') {
					this.$store.commit('LOGIN_OUT');
                    this.$router.push('/index');
				}
			}).catch();
			location.reload();
		},
		toAddItem() {
			this.$router.push("/additem")
		},

		// 	组件内router钩子
		loginLocalCheck(to, from, next) {
			let authList = ['AddItem']
			if(authList.includes('Index')) return;
			if( this.userManage.role === '1' && authList.includes(to.name)) {
				this.$router.push('/additem')
			} else {
				alert("权限不足！")
				this.$router.push('/index')
				
			}
			console.log('change')
		}
	},
	computed: mapState({
		pondList: state=>state.pondList,
		userManage: state=>state.userManage
	}),
	created() {
		this.loginCheck()
	},
	watch: {
		"$route": "loginLocalCheck" //注意这里的watch里的route，一定要为 $route !!
	},
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: #e6dfdf;
	height: auto;
	width: 100%;
}

.main-container {
	display: flex;
	margin: auto;
	width: 80%;
	
}

.header {
	width: 100%;
	height: 100px;
	background-color: #836d6d;
}

.ele-container {
	display: flex;
	flex-direction: row-reverse;
	text-align: center;
	height: 100%;
}

.ele-item {
	margin-top: 20px;
	margin-right: 20px;
	height: 50px;
	width: 100px;
	background-color: #fff;
	border-radius: 10px;
	line-height: 50px;
	cursor: pointer;
	color: #fff;
}

.login {
	background-color: rgb(74, 74, 185)
}

.loginout {
	background-color: rgb(185, 74, 74)
}


.login:hover {
	background-color: rgb(111, 111, 226)
}

.signIn{
	background-color: rgb(66, 165, 96)
}

.signIn:hover{
	background-color: rgb(89, 199, 122)
}


</style>
