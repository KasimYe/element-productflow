<template>
  <div class="useredit">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="OPENID">
        <el-input v-model="form.openid" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" disabled></el-input>
      </el-form-item>
      <el-form-item label="省">
        <el-input v-model="form.province" disabled></el-input>
      </el-form-item>
      <el-form-item label="市">
        <el-input v-model="form.city" disabled></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar shape="square" :size="50" :src="form.headimgurl"></el-avatar>
      </el-form-item>
      <el-form-item label="备注名">
        <el-input v-model="form.remarkname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`users/${this.id}`);
      this.form = res.data;
    },
    async onSubmit() {
      await this.$http.put(`users/${this.id}`, this.form);
      this.$router.push("/user/list");
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>