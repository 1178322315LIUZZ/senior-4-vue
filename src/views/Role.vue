<template>
	<div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="名程">
				<el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-date-picker v-model="times" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期"
			 end-placeholder="结束日期">
			</el-date-picker>
			<el-button type="success" @click="init">查询</el-button>
		</el-form>
		<el-col>
			<el-button type="success" @click="dialog(null)">添加</el-button>
			<el-button type="danger" @click="deletes">批量删除</el-button>
		</el-col>
		<el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="name" label="名称" width="180">
			</el-table-column>
			<el-table-column label="头像">
				<template v-slot="scope">
					<el-avatar shape="square" :size="70" :src="scope.row.img"></el-avatar>
				</template>
			</el-table-column>
			<el-table-column prop="nameZh" label="中文名称" width="180">
			</el-table-column>
			<el-table-column prop="created" label="创建时间">
			</el-table-column>
			<el-table-column label="操作" width="300px">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="dialog(scope.row)">编辑</el-button>
					<el-button size="mini" type="infor" @click="menu(scope.row.id)">资源授权</el-button>
					<el-button size="mini" type="success" @click="">详情</el-button>
					<el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
		 :page-sizes="sizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
		</el-pagination>

		<el-dialog :title="title" :visible.sync="opendialog" width="80%">
			<el-form :inline="true" :model="addrows" class="demo-form-inline" ref="addrows">
				<el-form-item label="名称" prop="name">
					<el-input v-model="addrows.name" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" prop="created">
					<el-date-picker v-model="addrows.created" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item><br />
				<el-form-item label="中文名称" prop="nameZh">
					<el-input v-model="addrows.nameZh" placeholder="请输入中文名称"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop="img">
					<el-upload class="avatar-uploader" action="http://127.0.0.1/user/upload" :show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item><br />
				<el-form-item>
					<el-button type="primary" @click="add">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="资源授权管理" :visible.sync="openmenu" width="80%">
			<el-tree :data="menudata" ref="menurtree" show-checkbox node-key="id" :default-checked-keys="defaumenu" :props="defaultProps">
			</el-tree><br />
			<el-button type="primary" @click="addmenu">确认</el-button>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addrows: {

				},
				formInline: {

				},
				menudata:[],
				defaumenu:[],
				defaultProps:{
					label:'name',
					children:'list'
				},
				rid:'',
				times: '',
				imageUrl: '',
				opendialog: false,
				openmenu:false,
				title: '',
				tableData: [],
				pageNum: 1,
				pageSize: 3,
				total: 0,
				sizes: [3, 5, 7],
				multipleSelection: []
			}
		},
		created: function() {
			this.init();
		},
		methods: {
			add() {
				this.axios.post("http://127.0.0.1/role/update", this.addrows).then((response) => {
					if (response.data) {
						this.$message({
							message: '恭喜你，操作成功',
							type: 'success'
						});
						this.opendialog = false;
						this.imageUrl='';
						this.init();
					} else {
						this.$message.error('操作失败');
					}
				})
			},
			dialog(row) {
				if (row) {
					this.title = "编辑角色"
					this.imageUrl = row.img
					this.addrows=row
				} else {
					this.title = "添加角色"
					this.addrows = {}
				}
				this.opendialog = true
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.addrows.img = res
			},
			init() {
				this.axios.get("http://127.0.0.1/role/lists", {
					params: {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						name: this.formInline.name,
						stime: this.times[0],
						etime: this.times[1]
					}
				}).then((response) => {
					this.tableData = response.data.list;
					this.pageNum = response.data.pageNum;
					this.pageSize = response.data.pageSize;
					this.total = response.data.total;
				})
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.init();
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.init();
			},
			del(id) {
				this.$confirm('确认删除此数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.post("http://127.0.0.1/role/dels", null, {
						params: {
							rid: id
						}
					}).then((response) => {
						if (response.data) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.init();
						} else {
							this.$message.error('删除失败');
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			deletes() {
				if (this.multipleSelection != null && this.multipleSelection.length > 0) {
					this.del(this.multipleSelection.map(uid => uid.id).join(","))
				} else {
					this.$message.error('请先选择要删除的数据');
				}
			},
			menu(id) {
				this.rid=id
				this.axios.get("http://127.0.0.1/menuRole/find",{
					params:{
						rid:id
					}
				}).then((response) => {
					this.defaumenu=response.data.map(row=>row.mid);
				})
				this.axios.get("http://127.0.0.1/menu/list").then((response) => {
					this.menudata = response.data;
				})
				this.openmenu=true
			},
			addmenu(){
				this.axios.post("http://127.0.0.1/menuRole/update", null,{
					params:{
						rid:this.rid,
						mid:this.$refs['menurtree'].getCheckedNodes().map((rid)=>rid.id).join(",")
					}
				}).then((response) => {
					if (response.data) {
						this.$message({
							message: '恭喜你，授权成功',
							type: 'success'
						});
						this.openmenu = false;
						this.init();
					} else {
						this.$message.error('授权失败');
					}
				})
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
