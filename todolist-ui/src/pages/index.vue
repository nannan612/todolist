<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span id="headername">ToDoList</span>
        <el-button type="primary" @click="deleteall">删除已完成</el-button>
      </div>
      <div>
        <el-input v-model="input" placeholder="Please input " @keyup.enter="submitthing" />
      </div>
    </template>
    <div v-for="(o, index) in list" :key="index" class="text item">
      <span>
        {{ o.thingname }}
        <el-checkbox v-model="o.checked" size="large" @change="updatedb(index)" />
      </span>
      <el-button type="success" round @click="deleteone(index)">删除</el-button>
    </div>
    <div class="button">共{{ length }}件，已完成{{ num }}件</div>
  </el-card>
</template>
  

<script setup>
import { ref, reactive } from 'vue'
import { save, show, update, deletething } from '../api/manager'
import { onMounted, onBeforeMount } from 'vue';
import { toast } from '../composables/util'
let input = ref('');
let list = ref([]);
let delist = ref([]);
let num = ref();
let length = ref();
let thing = reactive({
  username: "zhangsan",
  thingname: null,
  checked: false
})
onBeforeMount(() => {
  lista();
});
const lista = () => {
  //发送请求 
  show()
    .then((res) => {
      list.value = res.data;
      length = list.value.length;
      delist = list.value.filter((item) => {
        if (item.checked) {
          return true;
        }

      });
      num = delist.length;
    });

};
const updatedb = (id) => {
  let parm = list.value[id];
  update(parm).then((res) => {
    console.log(res);

  }).finally(() => {
    lista();  
  })
}

//回车添加事件
const submitthing = () => {
  console.log(input);
  thing.thingname = input;
  save(thing).then((res) => {
    if (res.status == 200) {
      toast('添加成功');
      input.value="";
      lista();
    }
  })
}

//删除事件
const deleteone = (index) => {
  let id = list.value[index].id
  deletething(id).then((res) => {
    console.log(res);
    console.log(id);
    if (res.status == 200) {
      toast("删除成功");
      lista();
    }
  })
}
//添加删除已完成
const deleteall = () => {
  lista();
  delist.forEach(el => {
    deletething(el.id).then(res => {
      console.log(res);
      toast("删除成功");
      lista();
    })
  });

}
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 75%;
  height: 100%;
}

#headername {
  color: red;
}
</style>
  