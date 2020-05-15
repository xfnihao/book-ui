<template>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="图书名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="时间" required>
          <el-col :span="11">
            <el-form-item prop="submission">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.submission" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  var api="http://localhost:8081/";
  import  axios from 'axios'
  export default {
    data() {
      return {
        ruleForm: {
          title: '',
          author: '',
          submission:''
        },
        rules: {
          title: [
            { required: true, message: '请输入图书名称', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入作者名称', trigger: 'blur' }
          ],
          submission: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        var _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(api+'book/save',{
              title:_this.ruleForm.title,
              author:_this.ruleForm.author,
              submission:_this.ruleForm.submission
            }).then(function (resp) {
              if (resp.data=="success"){
                _this.$message.success("添加成功");
                 _this.ruleForm.title='',
                  _this.ruleForm.author=''

              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
