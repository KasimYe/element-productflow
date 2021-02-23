<template>
  <div class="openidlist">
    <el-tooltip
      class="item"
      effect="dark"
      content="从微信公众平台接口获取OPENID列表"
      placement="bottom-start"
    >
      <el-button type="primary" @click="fetch" :loading="loading"
        >获取公众号OPENID列表</el-button
      >
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="dark"
      content="根据下面列表里的OPENID获取微信用户详细信息并写入数据库"
      placement="bottom-end"
    >
      <el-button type="primary" @click="updateUserList"
        >更新数据库用户信息</el-button
      >
    </el-tooltip>
    <el-table :data="openids" v-loading="loading">
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="openid"
        label="OPENID"
        width="540"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      openids: [],
    };
  },
  methods: {
    async fetch() {
      this.loading = true;
      const res = await this.$http.get(`openidlist`);
      this.openids = res.data;
      this.loading = false;
      this.$message({
        message: "加载完毕.",
        type: "success",
      });
    },
    async updateUserList() {
      await this.openids.forEach((v) => {
        this.$http.get(`userinfo/${v.openid}`);
      });
      this.$message({
        message: "数据更新完毕",
        type: "success",
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>