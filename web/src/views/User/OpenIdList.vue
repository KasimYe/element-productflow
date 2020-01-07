<template>
  <div class="openidlist">
    <el-button type="primary" @click="updateUserList">更新数据库用户信息</el-button>
    <el-table :data="openids">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="openid" label="OPENID" width="540"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openids: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`openidlist`);
      this.openids = res.data;
    },
    async updateUserList() {
      await this.openids.forEach(v => {
        this.$http.get(`userinfo/${v.openid}`)
      });
      this.$message({
          message: '数据更新完毕',
          type: 'success'
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>