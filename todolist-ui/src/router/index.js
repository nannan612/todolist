import { 
    createRouter,
    createWebHashHistory
} from 'vue-router'


const routes= [
    {
        path:"/",
        component:()=>import('../pages/index.vue'),
    },
    {
        path:"/login",
        component:()=>import('../pages/login.vue'),
    }
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})

export default router