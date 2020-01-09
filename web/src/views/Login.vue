<template>
  <div class="login">
    <el-row>
      <el-col :span="24">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in carousels" :key="item">
            <el-image :src="item" fit="contain"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card class="box-card">
          <el-form @submit.native.prevent="loginin" ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.loginid"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        loginid: "",
        password: ""
      },
      carousels: [
        require("../assets/1.jpg"),
        require("../assets/2.jpg"),
        require("../assets/3.jpg"),
        require("../assets/4.jpg")
      ]
    };
  },
  methods: {
    async loginin() {
      const res = await this.$http.post("loginin", this.form).catch(error => {
        this.$message({
          message: error.response.data.message,
          type: "error"
        });
      });

      if (res.data) {
        this.$message({
          message: "登录成功",
          type: "success"
        });
        localStorage.setItem("token", res.data.token);
        this.$router.push("/main");
      }
    }
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  text-align: center;
}
</style>