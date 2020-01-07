<template>
  <div class="messagecreate">
    <el-form @submit.native.prevent="onSubmit" ref="form" :model="form" label-width="80px">
      <el-form-item label="发送对象">
        <el-transfer v-model="checkedUsers" :data="users" :titles="['等待队列', '发送队列']"></el-transfer>
      </el-form-item>
      <el-form-item label="消息模板">
        <el-select v-model="form.template_id" placeholder="请选择消息模板" @change="selectTemp">
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
        <el-color-picker v-model="form.data.first.color" :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item label="keyword1">
        <el-input v-model="form.data.keyword1.value" placeholder="keyword1 value"></el-input>
        <el-color-picker v-model="form.data.keyword1.color" :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item label="keyword2">
        <el-input v-model="form.data.keyword2.value" placeholder="keyword2 value"></el-input>
        <el-color-picker v-model="form.data.keyword2.color" :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item label="keyword3">
        <el-input v-model="form.data.keyword3.value" placeholder="keyword3 value"></el-input>
        <el-color-picker v-model="form.data.keyword3.color" :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item label="remark">        
        <el-input v-model="form.data.remark.value" placeholder="remark value"></el-input>
        <el-color-picker v-model="form.data.remark.color" :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPreview">预览</el-button>
        <el-button type="primary" native-type="submit">创建</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="消息预览" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">      
      <el-input type="textarea" v-model="previewContent" :autosize="true"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">创建发送</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      previewContent: "",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585"
      ],
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
      for (let i = 0; i < res.data.length; i++) {
        const el = res.data[i];
        this.users.push({
          key: el.openid,
          label: el.nickname,
          disabled: false
        });
      }
      const res2 = await this.$http.get("templist");
      this.temps = res2.data;
    },
    selectTemp(value) {
      const tmp = this.temps.find(v => v.template_id === value);
      this.tempContent = tmp.content;
    },
    onPreview() {
      this.previewContent = this.tempContent
        .replace("{{first.DATA}}", this.form.data.first.value)
        .replace("{{keyword1.DATA}}", this.form.data.keyword1.value)
        .replace("{{keyword2.DATA}}", this.form.data.keyword2.value)
        .replace("{{keyword3.DATA}}", this.form.data.keyword3.value)
        .replace("{{remark.DATA}}", this.form.data.remark.value);
      this.dialogVisible = true;
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