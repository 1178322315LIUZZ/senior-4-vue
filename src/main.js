import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
//支持跨域访问
axios.defaults.withCredentials=true
//全局守卫
router.beforeEach((to,from,next)=>{
	//判断用户是否登录
	if(store.state.user.username && to.path=='/home'){
		//axios的请求
	    axios.get('http://127.0.0.1/menu/find',{params:{
			username:store.state.user.username
		}}).then((res)=>{
			//查询出menus=res.data;
			let menus = res.data;
			//转换成路由对象的格式
			let newRoutes =menusToRouters(menus);
			//赋值给指定的路由中routes的元素对象
			router.options.routes[0].children=newRoutes;
			//更新添加到路由对象中
			router.addRoutes(router.options.routes);
			//执行下一个
			next();
		});
	}else{
		//执行下一个
		next();
	}	
});
//定义常量  是一个函数对象
const menusToRouters=(menus)=>{
	//定义转换的数据的结果
	    let newRoutes=[];
		//遍历转换的数据
		for(let i=0;i<menus.length;i++){
			//嵌套路由
			let children=[];
			//判断集合是否存在，是否是数组
			if(menus[i].list && menus instanceof Array){
				children=menusToRouters(menus[i].list); //递归调用
			}
			
			//每遍历一个对象，创建路由route对象
			let newRoute={
				path:menus[i].path,
				name:menus[i].name,
				iconCls:menus[i].iconCls,
				children:children ,//定义嵌套路由
				oper:children.map((o)=>o.path).join(",")
			}
			//设置路由的组件
			newRoute.component= () => import( /* webpackChunkName: "about" */ './views/'+menus[i].component+'.vue')
			//把转换的路由的对象存入到转换的数组中
			newRoutes.push(newRoute);
	}
	//返回数据
	return newRoutes;
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
