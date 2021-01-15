<template>
<div class="container-fluid">
  <LoginForm 
    v-if="currentPage == 'login'" 
    @changeCurrentPage='changeCurrentPage'
    @login='login'>
  </LoginForm>

  <Register 
    v-if="currentPage == 'register'" 
    @changeCurrentPage='changeCurrentPage'>
  </Register>

  <Kanban 
    v-if="currentPage == 'kanban'" 
    :tasks='tasks'
    :categories = 'categories'
    @logout='logout'
    @findAll='findAll' >
</Kanban>
</div>
</template>

<script>
import axios from 'axios'
import LoginForm from './component/LoginForm'
import Register from './component/Register'
import Kanban from './component/Kanban'

export default {
    name:"App",
    data(){
        return {
            localhost:'http://localhost:3000',
            currentPage:"login",
            tasks:[],
            categories: ['BACK-LOG','TODO','ON-PROGRES','DONE'] 
        }
    },
    components:{
        LoginForm,Register,Kanban
    },
    methods:{
        findAll(){
            let accesstoken = localStorage.accesstoken
            axios.get(this.localhost+'/kanban',{headers:{accesstoken}})
            .then(({data})=>{
                this.tasks = data
            })
            .catch(err=>{
                console.log(err);
            })
        },
        changeCurrentPage(pageName){
            this.currentPage = pageName
        },
        logout(pageName){
            localStorage.clear()
            this.currentPage = pageName
        },
        check(pageName){
            if (localStorage.accesstoken == undefined) {
                this.currentPage = 'login'
            } else {
                this.findAll()
                this.currentPage = 'kanban'
            }
        },
        login(user){
            axios.post(this.localhost+'/login',{email:user.email,password:user.password})
            .then(({data})=>{
                localStorage.setItem('accesstoken',data.accesstoken)
                this.currentPage = 'kanban'
                user.email = ''
                user.password = ''
                this.check()
            })
            .catch(err=>{
                user.password = ''
            })
        }
    },
    created() {
        this.check()
    }
}
</script>

<style>

</style>


