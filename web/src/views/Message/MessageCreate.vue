<template>
  <div class="messagecreate">
    <el-form @submit.native.prevent="onSubmit" ref="form" :model="form" label-width="80px">
      <el-form-item label="发送对象">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedUsers" @change="handleCheckedUsersChange">
          <el-checkbox
            v-for="user in users"
            :label="user.openid"
            :key="user.openid"
          >{{user.nickname}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="消息模板">
        <el-select
          v-model="form.template_id"
          placeholder="请选择消息模板"
          @change="handleCheckedTempChange"
        >
          <el-option
            :key="temp.template_id"
            :label="temp.title"
            :value="temp.template_id"
            v-for="temp in temps"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板示例">
        <el-input type="textarea" v-model="tempContent" :disabled="true" :autosize="true"></el-input>
      </el-form-item>
      <el-form-item label="first">
        <el-input v-model="form.data.first.value" placeholder="first value"></el-input>
        <el-input v-model="form.data.first.color" placeholder="first color"></el-input>
      </el-form-item>
      <el-form-item label="keyword1">
        <el-input v-model="form.data.keyword1.value" placeholder="keyword1 value"></el-input>
        <el-input v-model="form.data.keyword1.color" placeholder="keyword1 color"></el-input>
      </el-form-item>
      <el-form-item label="keyword2">
        <el-input v-model="form.data.keyword2.value" placeholder="keyword2 value"></el-input>
        <el-input v-model="form.data.keyword2.color" placeholder="keyword2 color"></el-input>
      </el-form-item>
      <el-form-item label="keyword3">
        <el-input v-model="form.data.keyword3.value" placeholder="keyword3 value"></el-input>
        <el-input v-model="form.data.keyword3.color" placeholder="keyword3 color"></el-input>
      </el-form-item>
      <el-form-item label="remark">
        <el-input v-model="form.data.remark.value" placeholder="remark value"></el-input>
        <el-input v-model="form.data.remark.color" placeholder="remark color"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      checkedUsers: [],
      isIndeterminate: false,
      checkAll: false,
      temps: [],
      tempContent: "",
      form: {
        touser: "",
        template_id: "",
        url: "",
        miniprogram: {
          appid: "",
          pagepath: ""
        },
        data: {
          first: {
            value: "",
            color: "#409EFF"
          },
          keyword1: {
            value: "",
            color: "#67C23A"
          },
          keyword2: {
            value: "",
            color: "#67C23A"
          },
          keyword3: {
            value: "",
            color: "#67C23A"
          },
          remark: {
            value: "",
            color: "#909399"
          }
        }
      }
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`users`);
      const res2 = await this.$http.get("templist");
      this.users = res.data;
      this.temps = res2.data;
    },
    handleCheckAllChange(val) {
      this.checkedUsers = val ? this.users : [];
      this.isIndeterminate = false;
    },
    handleCheckedUsersChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.users.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.users.length;
    },
    handleCheckedTempChange(value) {
      const tmp = this.temps.find(v => v.template_id === value);
      this.tempContent = tmp.content;
    },
    onSubmit() {
      this.checkedUsers.forEach(v => {
        setTimeout(() => {
          this.form.touser = v;
          this.$http.post("tempmsg", this.form).then(res => {
            this.$message({
              message: res.data,
              type: "success"
            });
          });
        }, 500);
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>