<template>
  <div class="userlist">
    <el-table :data="users">
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="openid" label="OPENID" width="300"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="140" align="center"></el-table-column>
      <el-table-column prop="province" label="省" width="100" align="center"></el-table-column>
      <el-table-column prop="city" label="市" width="100" align="center"></el-table-column>
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" :src="scope.row.headimgurl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="remarkname" label="备注名" width="140" align="center"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="$router.push(`/User/Edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`users`);
      this.users = res.data;
    },
    async handleEdit(index, row) {
      this.$message({
        message: `index:${index}  row:${JSON.stringify(row)}`,
        type: "success"
      });
    },
    async deleteUser(row) {
      const res = await this.$http.delete(`users/${row._id}`);
      if (res.data.ok) {
        this.$message({
          message: "删除成功.",
          type: "success"
        });
      }
      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
};
</script>