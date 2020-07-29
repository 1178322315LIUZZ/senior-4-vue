<template>

	<el-form ref="form" :model="form" label-width="80px" class="login-container">
		<h3 class="login-title">系统登录</h3>
		<el-form-item label="登录名称">
			<el-input v-model="form.username"></el-input>
		</el-form-item>

		<el-form-item label="登录密码">
			<el-input v-model="form.password" show-password></el-input>
		</el-form-item>
		<el-button type="primary" @click="onSubmit">登录</el-button>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			onSubmit() {
				this.axios.post("http://127.0.0.1/user/finds",this.form).then((response) => {
					if(response.data){
						this.$store.dispatch('loginAction',response.data);
						//this.$store.commit('login',response.data);
						this.$router.push({path:'/home'});
					}else{
						alert('账号或密码错误')
					}
				})
			}
		}
	}
</script>

<style>
	.login-container {
		border-radius: 15px;
		background-clip: padding-box;
		margin: 100px auto;
		width: 400px;
		padding: 35px 35px 15px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6;
	}

	.login-title {
		margin: 0px auto 40px auto;
		text-align: center;
		color: #505458;
	}
</style>
