<template>
	<div class="login">
		<div class="main clearfix">
			<div class="logo"></div>
			<div class="login-wrap">
				<div class="account">
					<h1 class="caption text-center"><img :src="caption"></h1>
					<el-form label-position="top" :model="loginForm" :rules="rules" ref="loginForm">
						<h1 class="login-left-babel">账号</h1>
						<el-form-item prop="userName" class="input-item">
							<img :src="account" class="icon-account">
							<el-input type="text" ref="username" v-model.trim="loginForm.userName" width="100%" placeholder="请输入账号"
							@keyup.enter.native="submitForm('loginForm')"/>
						</el-form-item>
						<h1 class="login-left-babel">密码</h1>
						<el-form-item prop="password" class="input-item" width="100%">
							<img :src="password" class="icon-password">
							<el-input v-model.trim="loginForm.password" ref="password" type="password" autocomplete="off" placeholder="请输入登录密码"
							@keyup.enter.native="submitForm('loginForm')"/>
						</el-form-item>
						<el-form-item class="text-center">
							<el-button type="primary" @click="submitForm('loginForm')" class="btn-w">登录</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import '@/views/login/login.scss'
import caption from '@/assets/images/login/caption.png'
import account from '@/assets/images/login/account.png'
import password from '@/assets/images/login/password.png'

import {
	mapActions
} from 'vuex'

import {
	checkPassword
} from '@/utils/validator'
import keepAlive from '@/mixins/keepAlive'

export default {
	name: 'login',
	mixins: [keepAlive],
	data () {
		return {
			activeName: 'first',
			caption,
			account,
			password,
			loginForm: {
				userName: '',
				password: ''
			},
			rules: {
				userName: [{
					trigger: 'change',
					required: true,
					message: '请输入账号'
				}],
				password: [{
					trigger: 'change',
					validator: checkPassword
				}]
			}
		}
	},
	methods: {
		...mapActions(['A_LOGIN']),
		submitForm (formName) {
			if (!this.loginForm.userName || !this.loginForm.password) {
				if (this.$refs['username'].value) {
					this.loginForm.userName = this.$refs['username'].value
				}
				if (this.$refs['password'].value) {
					this.loginForm.password = this.$refs['password'].value
				}
			}
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.A_LOGIN(this.loginForm)
				}
			})
		}
	}
}

</script>

<style lang="scss" scoped>
.login {
	background-color: #154566;
	background-repeat: no-repeat;
	background-position: center;
	height: 100%;
	box-sizing: border-box;
	background: url('../../assets/images/login/bg.png') no-repeat;
	position: relative;
	.main {
		width: 1715px;
		height: 887px;
		padding: 58px;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
}

.logo {
	width: 872px;
	height: 100%;
	float: left;
	background: url('../../assets/images/login/login-left.png') no-repeat;
	background-size: 100%;
}

.login-wrap {
	width: 725px;
	height: 100%;
	background-color: white;
	float: right;
	.account {
		width: 448px;
		margin: 0 auto;
		padding-top: 120px;
	}
	.caption {
		margin-bottom: 80px;
	}
	.icon-account, .icon-password {
		position: absolute;
		left: 13px;
    	top: 13px;
		z-index: 9;
	}
}

@media screen and (min-width: 1024px) and (max-width: 1440px) {
	.login-wrap {
		max-height: 450px;
		overflow-x: auto;
	}
}

.login-tip {
	position: absolute;
	right: 0;
	top: 0;
}

.login-tip img:nth-of-type(1) {
	position: absolute;
	right: 60px;
	top: 26px;
}

.login-tip img:nth-of-type(2) {
	cursor: pointer;
}

.ewm-box {
	width: 100%;
	text-align: center;
}

.ewm-box .p1 {
	font-size: 18px;
	color: #333;
	margin-bottom: 20px;
}

.ewm-box .p2 {
	margin-top: 20px;
	font-size: 18px;
	color: #333;
}

.ewm-box .blue {
	color: #2a7bfc;
	margin-right: 5px;
}

.ewm {
	width: 220px;
	height: 220px;
	background: url("../../assets/images/user/inp-bg.png") no-repeat center;
	background-size: 100%;
	margin: 0 auto;
}

.welcome-box {
	color: white;
	text-align: center;
}

.welcome-box .p1 {
	font-size: 40px;
	font-weight: bold;
	margin-bottom: 10px;
}

.welcome-box .p2 {
	font-size: 18px;
	margin-bottom: 50px;
}

</style>

<style lang="scss" scoped>
	.login {
		.input-item {
			border: 1px solid #EEE;
			position: relative;
		}
		/deep/ .el-input__inner {
			width: 100%;
			height: 50px;
			line-height: 50px;
			padding: 0 0 0 40px;
			background: #f6f6f6 !important;
			opacity: 1;
			border-radius: 6px;
			border-bottom: 0px;
		}
	}
	.login-fl {
		width: 270px;
	}

	.login-fr {
		width: 120px;
		margin-left: 10px;
		height: 50px !important;
		font-size: 18px;
		padding: 0px;
		border-radius: 4px;
	}

	.login .btn-w {
		background: #44b3c7;
		border-color: #44b3c7;
		width: 100%;
		height: 50px;
		margin: 40px auto;
		font-size: 20px;
	}

	/deep/ .el-tabs__item {
		width: 120px;
		text-align: center;
		font-size: 18px;
	}

	/deep/ .el-tabs__active-bar {
		height: 3px;
	}

	.login-left-babel {
		font-size: 18px;
		font-weight: normal;
		line-height: 40px;
		color: #666;
	}

</style>
