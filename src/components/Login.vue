<!--
 * @Description:
 * @Author: xiaobai
 * @Date: 2020-12-04 20:25:14
 * @LastEditTime: 2020-12-05 19:42:15
 * @LastEditors: Please set LastEditors
 * @Reference:
-->
<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img
          src="../assets/logo.png"
          alt=""
        >
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFromRef"
        :model="loginFrom"
        :rules="loginFromRules"
        label-width="0px"
        class="login_form"
      >
        <!--用户名-->
        <el-form-item prop="username">
          <el-input
            v-model="loginFrom.username"
            prefix-icon="el-icon-user-solid"
          >
          </el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input
            v-model="loginFrom.password"
            prefix-icon="el-icon-lock"
            type="password"
          >
          </el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="login"
          >登录</el-button>
          <el-button
            @click="restLoginFrom"
            type="info"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginFrom: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则对象
      loginFromRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // // 验证密码是否合法
        password: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    restLoginFrom () {
      // console.log(this)
      this.$refs.loginFromRef.resetFields()
    },
    // 点击登录按钮，进行验证
    login () {
      this.$refs.loginFromRef.validate(async valid => {
        if (!valid) { return }
        // const result = await this.$http.post('login', this.loginFrom)
        // console.log(result)
        const { data: res } = await this.$http.post('login', this.loginFrom)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功!')
        // 1、登录成功之后的 token，保存在客户端的 sessionStorage 中
        //    1.1、项目中除了登录之外的 api 接口，其他的接头必须在登录之后访问
        //    1.2、token 只应在当前网站打开期间有效， 所以将 token 保存在 sessionStorage 中
        console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        // 2、通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}
</style>
