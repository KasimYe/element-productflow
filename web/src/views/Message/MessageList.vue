<template>
  <div class="userlist">
    <el-table :data="messages">
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100"></el-table-column>
      <el-table-column prop="remarkname" label="备注名" width="100"></el-table-column>
      <el-table-column prop="template_id" label="模板ID" width="350" align="center"></el-table-column>
      <el-table-column prop="data" label="消息数据" width="550"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="sendMessage(scope.row.id)">重新发送</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      list: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`messages`);
      this.list = res.data;
      let msglist = [];
      for (let i = 0; i < res.data.length; i++) {
        const el = res.data[i];
        const res2 = await this.$http.get(`users/openid/${el.touser}`);
        const user = res2.data;
        msglist.push({
          id: el._id,
          nickname: user.nickname,
          remarkname: user.remarkname,
          template_id: el.template_id,
          data: JSON.stringify(el.data)
        });
      }
      this.messages = msglist;
    },
    async sendMessage(value) {
      const form = this.list.find(v => v._id === value);
      delete form._id;
      delete form._v;
      const res = await this.$http.post("tempmsg", form);
      this.$message({
        message: res.data,
        type: "success"
      });
      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
};
</script>