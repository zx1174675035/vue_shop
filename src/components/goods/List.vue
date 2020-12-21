<!--
 * @Description: 商品列表
 * @Author: xiaobai
 * @Date: 2020-12-16 18:37:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-21 22:55:09
 * @Reference:
-->

<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter=20>
        <el-col :span=8>
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span=4>
          <el-button
            type="primary"
            @click="goAddpage"
          >添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table
        :data=goodslist
        border
        stripe
      >
        <el-table-column
          type="index"
          label="#"
        >
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="goods_name"
        >
        </el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="95px"
        >
        </el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight"
          width="70px"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="add_time"
          width="150px"
        >
          <template v-slot="scope">
            {{scope.row.add_time | dateFormart}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130"
        >
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.goods_id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[ 5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <!-- 修改商品对话框 -->
    <el-dialog
      title="修改商品"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editCateDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item
          label="商品名称"
          prop="goods_name"
        >
          <el-input v-model="editForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格"
          prop="goods_price"
        >
          <el-input
            type="number"
            v-model="editForm.goods_price"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品重量"
          prop="goods_weight"
        >
          <el-input
            type="number"
            v-model="editForm.goods_weight"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editInfo"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表
      goodslist: [],
      // 总数据条数
      total: 0,
      // 修改商品对话框显示与隐藏
      editDialogVisible: false,
      // 查询到的商品信息对象
      editForm: {},
      // 修改表单验证规则对象
      editFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList () {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败!')
      }
      // this.$message.success('获取商品列表成功!')
      this.goodslist = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    // 显示修改商品信息对话框
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('goods/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品信息失败！')
      }
      this.editForm = res.data
      console.log(this.editForm)
      this.editDialogVisible = true
    },
    // 监听修改商品对话框的关闭事件
    editCateDialogClosed () {
      this.$refs.editCateFormRef.resetFields()
    },
    // 修改商品信息
    editInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('修改商品信息!')
        }
        const { data: res } = await this.$http.put('goods/' + this.editForm.goods_id, this.editForm)
        console.log(res)
        if (res.meta.status !== 200) {
          this.editDialogVisible = false
          return this.$message.error('更新商品失败！')
        }
        this.getGoodsList()
        this.editDialogVisible = false
        this.$message.success('更新商品成功！')
      })
    },
    // 删除商品
    async removeById (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const { data: res } = await this.$http.delete('goods/' + id)
      if (res.meta.status !== 200) {
        this.$message.error('删除失败！')
      }
      this.$message.success('删除成功！')
      this.getGoodsList()
    },
    // 点击按钮添加商品
    goAddpage () {
      this.$router.push('goods/add')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
