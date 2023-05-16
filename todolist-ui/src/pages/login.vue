<template>
  <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>welcom</div>
                <div>anan's todolist</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">welcom</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon><user /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon><lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>                
                    <el-button round color="#626aef" class="button" type="primary" @click="onSubmit" :loading="loading">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>


<script setup>
import { ref,reactive,onMounted,onBeforeUnmount } from 'vue'
import { nameRule, passRule } from '../utils/vaildate.js'
import { toast } from '../composables/util'
import { useRouter } from 'vue-router'
import { login } from '../api/manager'
const router = useRouter()

const form = reactive({
  username:"",
  password:""
})

const rules = {
    username: [{ validator: nameRule, trigger: "blur" }],
    password: [{ validator: passRule, trigger: "blur" }],
}
const formRef = ref(null)
const loading = ref(false)
function onSubmit() {
    formRef.value.validate((valid) => {
        if(valid){  
            console.log(formRef);          
            login(form) .then(response=>{
            if(response.data){
                loading.value = true
            toast("登录成功")
            router.push('/')
            }
            else{
                toast("用户名或密码错误","error")
            }
        }).catch(error=> {
            console.log(error);
        }).finally(()=>{
            loading.value = false;
        });

        }else{
            toast("登录失败","error")
        }
    })
}
// 监听回车事件
function onKeyUp(e){
    if(e.key == "Enter") onSubmit()
}

// 添加键盘监听
onMounted(()=>{
    document.addEventListener("keyup",onKeyUp)
})
// 移除键盘监听
onBeforeUnmount(()=>{
    document.removeEventListener("keyup",onKeyUp)
})

</script>

<style scoped>
.login-container{
    background-color: #409EFF;
    min-height: 100vh;

}
.login-container .left,.login-container .right{
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-container .right{
    background-color: rgb(253, 253, 253);
    flex-direction: column;
}
.left>div>div:first-child{
    font-weight: 700;
    font-size: 3rem; /* 48px */
  line-height: 1;
  color: rgb(253, 253, 253);
  margin-bottom: 1rem; 
}
.left>div>div:last-child{
    color: rgb(229, 231, 235);
    font-size: 0.875rem; /* 14px */
    line-height: 1.25rem; /* 20px */
}
.right .title{
    font-weight: 700;
    font-size: 1.875rem; /* 30px */
  line-height: 2.25rem; /* 36px */
  color: rgb(31, 41, 55);
}
.right>div{
    display: flex;
    justify-content: center;  
    align-items: center;
    margin-top: 1.25rem; /* 20px */
    margin-bottom: 1.25rem; /* 20px */
    color: rgb(209, 213, 219);
    margin-right: 0.5rem ;
    margin-left:0.5rem ;
} 
.right .line{
    height: 1px;
    width: 4rem; /* 64px */
    background-color: rgb(229, 231, 235);
}
.button{
    width: 250px;
}
</style>