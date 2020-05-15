<template>
  <div>
  <el-table
    size="medium"
    lazy="true"
    :data="tableData"
    border
    style="">
    <el-table-column
      prop="id"
      align="center"
      label="编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      align="center"
      label="书名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="author"
      align="center"
      label="作者"
      width="200">
    </el-table-column>
    <el-table-column
      prop="submission"
      align="center"
      label="时间"
      width="250">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="200">
      <template slot-scope="scope">
        <el-button @click="open(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteRecord(scope.row)" type="text" size="small" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!--弹出层-->
    <el-dialog title="编辑图书" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="图书名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>
  <el-pagination
    background
    layout="prev, pager, next"
    @current-change="page"
    page-size="6"
    :total="total">
  </el-pagination>
  </div>
</template>

<script>
  var api="http://localhost:8081/";

  import  axios from 'axios'
  export default {
    data() {
      return {
        ruleForm: {
          id:'',
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
        },
        total:null,
        tableData: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      deleteRecord(row) {

        var _this=this;
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(api+'book/deleteById',{params:{id:row.id}}).then(function (resp) {
            if (resp.data=="success"){
              _this.$message.success("删除成功");
            }
          })
          window.location.reload();
        }).catch(() => {
        });
      },
      open(row) {
        var _this=this;
        //获取后台返回的数据
        axios.get(api+'book/query',{params:{
          id:row.id
          }}).then(function (resp) {
          //渲染
          _this.ruleForm=resp.data;
          _this.dialogFormVisible=true;
        })

      },
      update(){
        var _this=this;
        axios.post(api+'/book/update',{
          id:this.ruleForm.id,
          title:_this.ruleForm.title,
          author:_this.ruleForm.author,
          submission:_this.ruleForm.submission
        }).then(function (resp) {
          if (resp.data=="success"){
            _this.$message.success('修改成功');

          }
        })
        this.dialogFormVisible=false;
        window.location.reload();
      },
      page(page){
        var _this=this;
        axios.get(api+'book/list',{params:{page:page,limit:6}}).then(function (resp) {
          _this.tableData=resp.data.list;
        })
      }
    },
    created(){
      var _this=this;
      axios.get(api+'book/list',{params:{page:1,limit:6}}).then(function (resp) {
        _this.tableData=resp.data.list;
        _this.total=resp.data.total;
      })
    }

  }
</script>
