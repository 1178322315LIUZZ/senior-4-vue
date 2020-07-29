<template>
	<div id="app">
		<!-- <div id="nav">
     <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>| -->
		<!-- <router-link to="/user">用户管理表</router-link>|
      <router-link to="/role">角色表</router-link>| 
    </div> -->
		<router-view />
	</div>
</template>
<script>
	// 入口组件
	export default {
		name: 'App',
		created() {
			// 在页面加载时读取sessionStorage里的状态信息
			if (sessionStorage.getItem('store')) {
				this.$store.replaceState(
					Object.assign({},
						this.$store.state,
						JSON.parse(sessionStorage.getItem('store'))
					)
				)
			}
			// 在页面刷新时将vuex里的信息保存到sessionStorage里
			// beforeunload事件在页面刷新时先触发
			window.addEventListener('beforeunload', () => {
				sessionStorage.setItem('store', JSON.stringify(this.$store.state))
			})
		},
		mounted() {
			console.log('当前用户：', this.$store.state.user)
		}
	}
</script>
<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}
</style>
