<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索框与添加按钮区域 -->
      <div style="margin-top: 15px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 用户列表区域 -->
      <el-table :data="userList" tripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">{{ scope.id }}</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
        :page-sizes="[1, 3, 5, 7]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取用户列表数据参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示的件数
        pagesize: 3
      },

      // 用户列表数据
      userList: [],
      // 用户总数
      total: 0
    }
  },

  created () {
    // 获取用户列表数据
    this.getUserList()
  },

  methods: {
    // 获取用户列表数据
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) this.$message.error('获取用户列表失败！')
      this.userList = res.data.users
      this.total = res.data.total
    },

    // 每页显示件数的切换
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },

    // 页码值改变
    handleCurrentChange (newNum) {
      this.queryInfo.pagenum = newNum
      this.getUserList()
    }
  }
}
</script>

<style lang="less">

</style>
