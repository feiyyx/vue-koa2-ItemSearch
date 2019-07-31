<template>
    <div>
        <div class="login-container" v-if="this.$store.state.loginFlag">
			<div class="login-form">
				<div class="LS-title">账号登陆</div>
                <form class="login-area">
					<div class="input-container">
						<input placeholder="账号" v-model="ID">
					</div>
                    <div class="input-container">
						<input placeholder="密码" v-model="password" type="password">
					</div>
					<button class="login-button" @click.prevent="loginRequest">登陆</button>
                </form>
				<div class="warning" ref="warning"></div>
			</div> 
        </div>
        <div class="signin-container" v-if="this.$store.state.signinFlag">
			<div class="LS-title">账号注册</div>
                <form class="signin-area">
					<div class="input-container">
						<input placeholder="账号" v-model="ID">
					</div>
                    <div class="input-container">
						<input placeholder="密码" v-model="password" type="password">
					</div>
                    <div class="input-container">
						<input placeholder="再确认一次密码" v-model="passwordCheck" type="password">
					</div>
					<button class="login-button" @click.prevent="signinRequest">注册</button>
                </form>
				<div class="warning" ref="warning"></div>
		</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'loginSignupForm',
    props:[],
    data() {
        return {
            ID:'',
            password:'',
            passwordCheck:'',
            warning: '',
			ajaxRequest: null
        }
    },
    methods: {
        loginRequest() {
			let result = {};
			let tempResp = {};
			if(this.ID === '') {
				this.$refs.warning.innerHTML = '账号不能为空！'
			} else if (this.password === '') {
				this.$refs.warning.innerHTML = '密码不能为空！'
			} else {
				tempResp = {
					'username':this.ID,
					'password':this.password
				}
				this.ajaxRequest = this.$post('/login', tempResp).then(res => {
					console.log(res);
					if( res.code !== 0) {
						this.$refs.warning.innerHTML = '账号/密码错误';
						//location.reload();
					} else {
						this.$store.commit('USER_MANAGE',res);
						location.reload();
					}
				}).catch( err => {
					console.log(err)
					this.$refs.warning.innerHTML = '未知错误！'
				})
			}
			console.log(123)
		},
		signinRequest() {
			if (this.ID === '') {
				this.$refs.warning.innerHTML = '请输入用户名！';
				return;
			} else if (this.password === '' ||  this.passwordCheck === ''){
				this.$refs.warning.innerHTML = '请输入密码！';
				return;
			} else if (this.password === this.passwordCheck){
				this.$refs.warning.innerHTML = '两次输入密码不一致！';
				return;
			}
			let tempResq = {
				'username': this.ID,
				'password': this.password,
				'passwordCheck': this.passwordCheck,
			}
			this.ajaxRequest = this.$post('/signup', tempResq).then(res => {
					console.log(res);
					if( res.code !== 0 && res.error === 'password ERROR!') {
						console.log('ERROR');
						this.$refs.warning.innerHTML = '两次输入密码不一致！';
					} else if ( res.code !== 0 && res.error === 'username EXIST'){
						console.log('ERROR');
						this.$refs.warning.innerHTML = '账号已存在！';
					} else if ( res.code !== 0 && res.error === 'ERROR!'){
						console.log('ERROR');
						this.$refs.warning.innerHTML = '未知错误';
					} else {
						this.$store.commit('USER_MANAGE',res);
						location.reload();
					}
				}).catch( err => {
					console.log(err)
					console.log('ERROR');
				})
				console.log(this.userManage)
		},
    },
}
</script>

<style>
.login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 320px;
    background-color: #e6dfdf;
    z-index: 1000;
	border-radius: 10px;
	transform: translateX(-50%) translateY(-60%)
}

.signin-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 380px;
    background-color: #e6dfdf;
    z-index: 1000;
	border-radius: 10px;
	transform: translateX(-50%) translateY(-60%)
}


.LS-title {
    position: relative;
    width: 100%;
    height: 80px;
    background-color: #836d6d;
	z-index: 1000;
	line-height: 80px;
    border-top-left-radius: 10px; 
	border-top-right-radius: 10px; 
	color: #fff;
	font-size: 20px;
}

.input-container{
	display: block;
	margin-top: 20px;
	
}

.input-container input {
	height: 40px;
	width: 250px;
	border-radius: 5px; 
	font-size: 16px;
	padding-left: 10px;
	border: 1px solid #b4c2cb;
    border-radius: 2px;
}

.login-button {
	position: absolute;
	left: 125px;
	bottom:20px;
	height: 40px;
	width: 150px;
	font-size: 18px;
	background-color: #836d6d;
	border-radius: 5px;
	color: #fff;
	cursor: pointer;
}

.login-button:hover {
	background-color: #ad9191;
}

.warning {
	color: red;
}

.account {
	margin-right: 20px;
	height: 100%;
	line-height: 100px;
	font-size: 20px;
	color: #fff;
	
}


.loginout:hover {
	background-color: rgb(219, 107, 107)
}
</style>
