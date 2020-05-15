<template>
    <div>
      <table>
        <thead>
        <th>编号</th>
        <th>图书</th>
        <th>作者</th>
        </thead>
       <tbody>
        <tr v-for="item in books">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.author}}</td>
        </tr>
       </tbody>
      </table>

    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "Book",
      data(){
          return {
            message:'hello,xf',
            books:[]
          }
      },
      created() {
      var _this=this;
       axios.get("http://localhost:8081/book/list").then(function (resp) {
         console.log(resp.data);
      _this.books=resp.data;
       });

      }
    }
</script>

<style scoped>

</style>
