<template>
	<!--//////////////////////////////最外层容器开始///////////////////////////-->
	<el-container class="home-container">

		<!--//////////////////////////////容器的headr部分开始///////////////////////////-->
		<el-header class="home-header">
			<i class="home_title" style="margin-right: 15px">用户权限开发平台</i>
			<!--下来菜单的组件@command="handleCommand"事件-->
			<el-dropdown @command="handleCommand">
				<span class="el-dropdown-link">
					<!--取出store对象中的user的username值-->
					{{this.$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="a">个人信息</el-dropdown-item>
					<el-dropdown-item command="b">修改密码</el-dropdown-item>
					<el-dropdown-item command="c">退出系统</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>

		</el-header>
		<!--//////////////////////////////容器的headr部分结束///////////////////////////-->


		<el-container>
			<!--//////////////////////////////容器的left部分开始///////////////////////////-->
			<el-aside width="200px">
				<!--导航菜单  router 路由-->
				<el-menu>
					<!--一级菜单 this.$router.options.routes - this.$router.routes -->
					<el-submenu v-for="(menu,index) in this.$router.options.routes[0].children" :index="index+''">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>{{menu.name}}</span>
						</template>
						<!--二级菜单-->
						<!--如果el-menu 配置router路由，那么el-menu-item它的index 就是路由的地址 :index="submenu.path"-->
						<el-menu-item v-for="submenu in menu.children">
							<!--:to绑定数据的写法-->
							<router-link  :to="{path:submenu.path,query:{oper:submenu.oper}}">{{submenu.name}}</router-link>
						</el-menu-item>

					</el-submenu>
				</el-menu>
			</el-aside>
			<!--//////////////////////////////容器的left部分开始///////////////////////////-->
			<el-container>
				<!--//////////////////////////////容器的main部分开始///////////////////////////-->
				<el-main>
					<!-- 详情 -->
					<el-dialog title="详情页面" :visible.sync="xiangq" width="80%">
						<el-form :inline="true" :model="xiangs" class="demo-form-inline" ref="xiangs">
							<el-form-item label="用户名" prop="username">
								<el-input v-model="xiangs.username" readonly="readonly" placeholder="请输入用户名"></el-input>
							</el-form-item>
							<el-form-item label="登陆昵称" prop="name">
								<el-input v-model="xiangs.name" readonly="readonly" placeholder="请输入登陆昵称"></el-input>
							</el-form-item><br />
							<el-form-item label="电话" prop="phone">
								<el-input v-model="xiangs.phone" readonly="readonly" placeholder="请输入电话"></el-input>
							</el-form-item>
							<el-form-item label="固定电话" prop="telephone">
								<el-input v-model="xiangs.telephone" readonly="readonly" placeholder="请输入固定电话"></el-input>
							</el-form-item><br />
							<el-form-item label="地址" prop="address">
								<el-input v-model="xiangs.address" readonly="readonly" placeholder="请输入地址"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input v-model="xiangs.password" readonly="readonly" placeholder="请输入密码"></el-input>
							</el-form-item><br />
							<el-form-item label="性别" prop="sex">
								<span v-if="xiangs.sex==0">女</span>
								<span v-if="xiangs.sex==1">男</span>
							</el-form-item>
							<el-form-item label="头像" prop="userface">
								<el-avatar shape="square" :size="100" :src="xiangs.userface"></el-avatar>
							</el-form-item><br />
							<el-form-item>
								<el-button type="primary" @click="fan">返回</el-button>
							</el-form-item>
						</el-form>
					</el-dialog>
					<!-- 修改密码实现 -->
					<el-dialog title="修改密码信息" :visible.sync="xius" width="80%">
						<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="请输入原密码" prop="oldpass">
								<el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="checkPass">
								<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
								<el-button @click="resetForm('ruleForm')">重置</el-button>
							</el-form-item>
						</el-form>
						<!-- <el-button type="primary" @click="xium">修改</el-button> -->
					</el-dialog>
					<!-- 路由出口 -->
					<!-- 路由匹配到的组件将渲染在这里 嵌套路由打开的地方 -->
					<router-view />
				</el-main>
				<!--//////////////////////////////容器的main部分结束///////////////////////////-->
			</el-container>
		</el-container>

	</el-container>
	<!--//////////////////////////////最外层容器结束///////////////////////////-->
</template>

<script>
	export default {
		data() {
			var oldpass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.mi !== value) {
						callback(new Error('原密码不正确'));
					}
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				//roleMenus: [],
				xiangq: false,
				xiangs: [],
				xius: false,
				mi: '',
				ruleForm: {
					oldpass: '',
					checkPass: '',
					password: '',
					id: ''
				},
				rules: {
					oldpass: [{
						validator: oldpass,
						trigger: 'blur'
					}],
					password: [{
							validator: validatePass,
							trigger: 'blur'
						},
						{
							min: 3,
							max: 6,
							message: '长度在 3 到 6 个字符',
							trigger: 'blur'
						}
					],
					checkPass: [{
							validator: validatePass2,
							trigger: 'blur'
						},
						{
							min: 3,
							max: 6,
							message: '长度在 3 到 6 个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		created: function() {
			//this.initRoleMenus();
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.axios.post("http://127.0.0.1/user/update", this.ruleForm).then((response) => {
							if (response.data) {
								this.$message({
									message: '恭喜你,修改密码成功',
									type: 'success'
								});
								this.xius = false;
								this.mi = ''
							} else {
								this.$message.error('修改密码失败');
							}
						})
					} else {
						alert("修改密码失败，请检查后在进行修改操作")
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			fan() {
				this.xiangq = false
			},
			// initRoleMenus() {
			// 	this.axios.get('http://127.0.0.1/menu/find', {
			// 		params: {
			// 			username: this.$store.state.user.username
			// 		}
			// 	}).then((res) => {
			// 		this.roleMenus = res.data
			// 	})
			// },
			handleCommand(command) {
				if (command == 'a') {
					//编程式路由
					//this.$router.replace({path:'/user'});
					this.axios.get("http://127.0.0.1/user/find", {
						params: {
							id: this.$store.state.user.id
						}
					}).then((response) => {
						this.xiangs = response.data;
						this.imageUrl = response.data.userface;
						this.xiangq = true;
					})
					this.xiangq = true
				} else if (command == 'b') {
					this.mi = this.$store.state.user.password
					this.ruleForm.id = this.$store.state.user.id
					this.xius = true
				} else if (command == 'c') {
					this.$confirm('你是否要退出此系统?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						//数据还原
						this.$store.commit('login', {});
						//退出到登录界面
						this.$router.replace({
							path: '/'
						});
						this.$message({
							type: 'success',
							message: '退出成功!'
						});

					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消退出'
						});
					});
				}

			}
		}
	}
</script>

<style>
	.home-container {
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
	}

	.home-header {
		background-color: #20a0ff;
		color: #333;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: content-box;
		padding: 0px;
	}

	.home_title {
		color: #fff;
		font-size: 22px;
		display: inline;
		margin-left: 8px;
	}
</style>
