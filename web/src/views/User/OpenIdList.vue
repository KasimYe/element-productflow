<template>
  <el-table :data="tableData">
    <el-table-column prop="date" label="日期" width="140"></el-table-column>
    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  },
  methods: {
    fetch() {
      const _this = this;
      _this.$http
        .get(
          `token?grant_type=${_this.$wxcof.granttype}&appid=${_this.$wxcof.appid}&secret=${_this.$wxcof.secret}`
        )
        .then(res => {
          const access_token = res.data.access_token;
          _this
            .get(`user/get?access_token=${access_token}&next_openid=`)
            .then(res => {
              _this.item=res.data;
            });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>