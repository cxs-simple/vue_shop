<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409EFF" unique-opened
                 :collapse="isCollapse" :collapse-transition="false" router="">
          <!-- 一级菜单区域 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObjts[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单区域 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单栏数据
      menuList: [],
      // 左侧菜单栏图标字典
      iconObjts: {
        125: 'iconfont iconusers',
        103: 'iconfont iconquanxian',
        101: 'iconfont iconshangpin',
        102: 'iconfont icondingdan',
        145: 'iconfont iconbaobiao'
      },
      // 左侧菜单栏折叠与展开
      isCollapse: false
    }
  },

  created () {
    this.getMenuList()
  },

  methods: {
    // 退出
    logout () {
      // 清空token缓存
      window.sessionStorage.clear()
      // 编程式导航跳转到登录页面
      this.$router.push('/login')
    },

    // 获取菜单栏列表
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$Message.error('')
      this.menuList = res.data
      console.log(res)
    },

    // 左侧菜单栏折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      height: 100%;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 15px;
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  line-height: 25px;
  cursor: pointer;
}
</style>
