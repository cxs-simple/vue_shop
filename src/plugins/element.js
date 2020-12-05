import Vue from 'vue'
import { Form, FormItem, Input, Button, Message } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
// 信息提示框挂载到Vue全局中
Vue.prototype.$message = Message
