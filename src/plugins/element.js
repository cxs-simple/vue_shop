import Vue from 'vue'
import { Form, FormItem, Input, Button, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItem } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// Message全局弹框组件挂载到Vue全局中
Vue.prototype.$message = Message
