<template>
			<div>
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="用户名">
						<el-input v-model="formInline.username" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="手机号">
						<el-input v-model="formInline.phone" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item label="登陆昵称">
						<el-input v-model="formInline.name" placeholder="请输入登陆昵称"></el-input>
					</el-form-item>
					<el-button type="success" @click="init()">查询</el-button>
				</el-form>
				<el-col>
					<el-button type="success" @click="adds()">添加</el-button>
				</el-col>
		
				<!-- <el-table :data="tableData" style="width: 100%">
					<el-table-column type="selection"></el-table-column>
					<el-table-column prop="id" label="编号"></el-table-column>
					<el-table-column prop="name" label="登录职称"></el-table-column>
					<el-table-column prop="phone" label="电话"></el-table-column>
					<el-table-column prop="username" label="用户名"></el-table-column>
					<el-table-column prop="address" label="地址"></el-table-column>
					<!-- <el-table-column prop="username" label="用户名"></el-table-column>
					<el-table-column prop="password" label="密码"></el-table-column> -->
					<!-- <el-table-column label="用户头像">
						<template v-slot="scope">
							<el-avatar shape="square" :size="50" :src="scope.row.userface"></el-avatar>
						</template>
					</el-table-column>
					<el-table-column label="性别">
						<template v-slot="scope">
							<template v-if="scope.row.sex==0">女</template>
							<template v-if="scope.row.sex==1">男</template>
						</template>
					</el-table-column>
					<el-table-column prop="rnames" label="担任职务"></el-table-column>
					<el-table-column prop="sheng" label="省"></el-table-column>
					<el-table-column prop="shi" label="市"></el-table-column>
					<el-table-column prop="xian" label="县"></el-table-column>
					<el-table-column label="操作" width="300px">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="find(scope.row.id)">编辑</el-button>
							<el-button size="mini" type="infor" @click="addgrops(scope.row)">授权角色</el-button>
							<el-button size="mini" type="success" @click="xiang(scope.row.id)">详情</el-button>
							<el-button size="mini" type="danger" @click="del()">删除</el-button>
						</template>
					</el-table-column>
				</el-table> --> 
					<!-- 		<el-row v-for="as in tableData">
							<el-col span="6" >
								{{as.username}}
							</el-col>
							
						</el-row> -->
				
				
				<el-row>
				  <el-col :span="4" v-for="(o, index) in tableData" :key="o" :offset="index > 0 ? 2 : 0">
				    <el-card :body-style="{ padding: '0px' }">
				      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
				      <div style="padding: 14px;">
				        <span>好吃的汉堡</span>
				        <div class="bottom clearfix">
				          <time class="time">{{ currentDate }}</time>
				          <el-button type="text" class="button">操作按钮</el-button>
				        </div>
				      </div>
				    </el-card>
				  </el-col>
				</el-row>
				
				
				
				
				
				
				
				
				
				
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
				 :page-sizes="pagesizes" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
				</el-pagination>
		
				<!-- 添加的实现 -->
				<el-dialog title="添加用户" :visible.sync="addrow" width="80%">
					<el-form :inline="true" :model="addrows" :rules="rules" class="demo-form-inline" ref="addrows">
						<el-form-item label="用户名" prop="username">
							<el-input v-model="addrows.username" placeholder="请输入用户名"></el-input>
						</el-form-item>
						<el-form-item label="登陆昵称" prop="name">
							<el-input v-model="addrows.name" placeholder="请输入登陆昵称"></el-input>
						</el-form-item><br />
						<el-form-item label="电话" prop="phone">
							<el-input v-model="addrows.phone" placeholder="请输入电话"></el-input>
						</el-form-item>
						<el-form-item label="固定电话" prop="telephone">
							<el-input v-model="addrows.telephone" placeholder="请输入固定电话"></el-input>
						</el-form-item><br />
						<el-form-item label="地址" prop="address">
							<el-input v-model="addrows.address" placeholder="请输入地址"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="addrows.password" placeholder="请输入密码"></el-input>
						</el-form-item><br />
						<el-form-item label="籍贯">
							<el-cascader :options="options" :props="props" @change="handleChange" v-model="pcs"></el-cascader>
						</el-form-item><br />
						<el-form-item label="性别" prop="sex">
							<el-radio v-model="addrows.sex" label="1">男</el-radio>
							<el-radio v-model="addrows.sex" label="0">女</el-radio>
						</el-form-item>
						<el-form-item label="头像" prop="userface">
							<el-upload class="avatar-uploader" action="http://127.0.0.1/user/upload" :show-file-list="false" :on-success="handleAvatarSuccess">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item><br />
						<el-form-item>
							<el-button type="primary" @click="add">添加</el-button>
						</el-form-item>
					</el-form>
				</el-dialog>
		
				<!-- 授权信息 -->
				<el-dialog title="授权用户信息" :visible.sync="addgrop" width="80%">
					<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
						<el-checkbox v-for="roles in roles" :label="roles.id">{{roles.nameZh}}</el-checkbox>
					</el-checkbox-group>
						<el-button type="primary" @click="roleupdate">授权</el-button>
				</el-dialog>
		
		
		
		
		
		
		
		
		
		
		
		
		
				<!-- 修改实现 -->
				<el-dialog title="编辑用户" :visible.sync="updates" width="80%">
					<el-form :inline="true" :model="finds" class="demo-form-inline" ref="finds">
						<el-form-item label="用户名" prop="username">
							<el-input v-model="finds.username" placeholder="请输入用户名"></el-input>
						</el-form-item>
						<el-form-item label="登陆昵称" prop="name">
							<el-input v-model="finds.name" placeholder="请输入登陆昵称"></el-input>
						</el-form-item><br />
						<el-form-item label="电话" prop="phone">
							<el-input v-model="finds.phone" placeholder="请输入电话"></el-input>
						</el-form-item>
						<el-form-item label="固定电话" prop="telephone">
							<el-input v-model="finds.telephone" placeholder="请输入固定电话"></el-input>
						</el-form-item><br />
						<el-form-item label="地址" prop="address">
							<el-input v-model="finds.address" placeholder="请输入地址"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="finds.password" placeholder="请输入密码"></el-input>
						</el-form-item><br />
						<el-form-item label="籍贯">
							<el-cascader :options="options" :props="props" @change="handleChange" v-model="pcs"></el-cascader>
						</el-form-item><br />
						<el-form-item label="性别" prop="sex">
							<el-radio v-model="finds.sex" :label="1">男</el-radio>
							<el-radio v-model="finds.sex" :label="0">女</el-radio>
						</el-form-item>
						<el-form-item label="头像" prop="userface">
							<el-upload class="avatar-uploader" action="http://127.0.0.1/user/upload" :show-file-list="false" :on-success="handleAvatarSuccess">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item><br />
						<el-form-item>
							<el-button type="primary" @click="update">修改</el-button>
						</el-form-item>
					</el-form>
				</el-dialog>
		
				<!-- 详情 -->
				<el-dialog title="编辑用户" :visible.sync="xiangq" width="80%">
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
		
		
		
		
		
			</div>
		</template>
		
		<script>
			export default {
				data() {
					var checkPhone = (rule, value, callback) => {
						//定义手机校验的正则表达式
						var reg = /^1[3456789]\d{9}$/;
						//正则校验
						if (!reg.test(value)) {
							return callback('手机号码不符合规范');
						} else {
							callback();
						}
					};
					return {
						uid: '',
						checkedCities: [],
						addgrop: false,
						roles: [],
						pcs: [],
						options: [],
						props: {
							expandTrigger: 'hover',
							value: 'id',
							label: 'name',
							children: 'list'
						},
						tableData: [],
						pageNum: 1,
						size: 8,
						total: 0,
						pagesizes: [3, 5, 7],
						imageUrl: '',
						addrow: false,
						updates: false,
						xiangq: false,
						formInline: {
							name: '',
							phone: '',
							username: ''
						},
						addrows: {
							username: ''
						},
						finds: [],
						xiangs: [],
						rules: {
							name: [{
									required: true,
									message: '请输入登录名称',
									trigger: 'blur'
								},
								{
									min: 3,
									max: 5,
									message: '长度在 3 到 5 个字符',
									trigger: 'blur'
								}
							],
							username: [{
									required: true,
									message: '请输入用户名称',
									trigger: 'blur'
								},
								{
									min: 3,
									max: 5,
									message: '长度在 3 到 5 个字符',
									trigger: 'blur'
								}
							],
							phone: [{
									required: true,
									message: '请输入电话号码',
									trigger: 'blur'
								},
								{
									validator: checkPhone,
									trigger: 'blur'
								}
							]
						}
					}
				},
				created: function() {
					this.init();
					this.area();
				},
				methods: {
					area() {
						this.axios.get("http://127.0.0.1/area/list").then((response) => {
							this.options = response.data;
						})
					},
					init() {
						this.axios.get("http://127.0.0.1/user/list", {
							params: {
								pageNum: this.pageNum,
								size: this.size,
								name: this.formInline.name,
								phone: this.formInline.phone,
								username: this.formInline.username
							}
						}).then((response) => {
							this.tableData = response.data.list;
							this.pageNum = response.data.pageNum;
							this.size = response.data.size;
							this.total = response.data.total;
						})
					},
					handleCurrentChange(val) {
						this.pageNum = val;
						this.size = this.tableData.size;
						this.init();
					},
					handleSizeChange(val) {
						this.size = val;
						this.pageNum = this.tableData.pageNum;
						this.init();
					},
					adds() {
						this.addrow = true
					},
					handleChange(value) {
						if (this.addrows) {
							this.addrows.province = value[0]
							this.addrows.city = value[1]
							this.addrows.district = value[2]
						}
						if (this.finds) {
							this.finds.province = value[0]
							this.finds.city = value[1]
							this.finds.district = value[2]
						}
					},
					add() {
						this.$refs['addrows'].validate((valid) => {
							if (valid) {
								this.axios.post("http://127.0.0.1/user/add", this.addrows).then((response) => {
									if (response.data) {
										this.$message({
											message: '恭喜你，添加成功',
											type: 'success'
										});
										this.addrow = false;
										this.$refs['addrows'].resetFields();
										this.init();
									} else {
										this.$message.error('添加失败');
									}
								})
		
							} else {
								alert("添加失败")
								return false;
							}
						});
					},
					handleAvatarSuccess(res, file) {
						this.imageUrl = URL.createObjectURL(file.raw);
						if (this.addrows) {
							this.addrows.userface = res
						}
						if (this.finds) {
							this.finds.userface = res
						}
					},
					addgrops(row) {
						this.checkedCities = []
						this.uid = row.id
						if (row.rids) {
							//根据，拆分数值
							let rids = row.rids.split(",");
							//map遍历数据
							rids.map(rid => {
								//判断是否是是数字
								if (!isNaN(rid)) {
									//存入到数据回显中
									this.checkedCities.push(parseInt(rid));
								}
							});
						}
						this.addgrop = true;
						this.axios.get("http://127.0.0.1/role/list").then((response) => {
							this.roles = response.data;
						})
					},
					handleCheckedCitiesChange(value) {
						this.checkedCities=value
						let ss=this.checkedCities.map((rid) => rid).join(",") 
						console.log(ss)
						console.log(typeof(ss))
					},
					roleupdate(){
						this.axios.post("http://127.0.0.1/userRole/update",null,{
							params:{
								uid:this.uid,
								rids:this.checkedCities.map((rid) => rid).join(",") 
							}
						}).then((response) => {
							if (response.data) {
								this.$message({
									message: '恭喜你，授权用户信息成功',
									type: 'success'
								});
								this.addgrop=false
								this.init();
							} else {
								this.$message.error('授权用户信息失败');
							}
						})
					},
					find(id) {
						this.axios.get("http://127.0.0.1/user/find", {
							params: {
								id: id
							}
						}).then((response) => {
							this.finds = response.data;
							this.imageUrl = response.data.userface;
							this.pcs = [];
							this.pcs.push(response.data.province)
							this.pcs.push(response.data.city)
							this.pcs.push(response.data.district)
							this.updates = true;
						})
					},
					update() {
						this.axios.post("http://127.0.0.1/user/update", this.finds).then((response) => {
							if (response.data) {
								this.$message({
									message: '恭喜你，修改成功',
									type: 'success'
								});
								this.updates = false;
								this.init();
							} else {
								this.$message.error('修改失败');
							}
						})
					},
					xiang(id) {
						this.axios.get("http://127.0.0.1/user/find", {
							params: {
								id: id
							}
						}).then((response) => {
							this.xiangs = response.data;
							this.imageUrl = response.data.userface;
							this.xiangq = true;
						})
					},
					fan() {
						this.xiangq = false
					}
				}
			}
		</script>
		
		<style>
			.avatar-uploader .el-upload {
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
			}
		
			.avatar-uploader .el-upload:hover {
				border-color: #409EFF;
			}
		
			.avatar-uploader-icon {
				font-size: 28px;
				color: #8c939d;
				width: 80px;
				height: 80px;
				line-height: 80px;
				text-align: center;
			}
		
			.avatar {
				width: 80px;
				height: 80px;
				display: block;
			}
		</style>
		