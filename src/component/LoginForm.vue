<template>
  <!-- LOGIN -->
            <div class="d-flex justify-content-center p-5">
                <form class="bg-warning w-40 p-4" @submit.prevent = 'login()'>
                    <h2 style="text-align: center;">Log in</h2><br>
                    <label class="form-label">Email address</label>
                        <input v-model = 'user.email' type="email" class="form-control" placeholder="name@example.com">
                    <br>
                    <label class="form-label">Password</label>
                        <input v-model = 'user.password' type="password" class="form-control" placeholder="password">
                    <br>
                    <div class="d-flex justify-content-around">
                        <button type="submit" class="btn btn-outline my-2 my-sm-0 btn-primary w-50">Log in</button>
                        <button type="reset" class="btn btn-outline my-2 my-sm-0 btn-primary w-50">Reset</button>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="" @click.prevent = 'showRegister()'>New around here? Register</a>
                </form>
            </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"LoginForm",
    data(){
        return {
            localhost:'https://my-kanban-h8.herokuapp.com',
            user:{
                email:'',
                password:''
            }
        }  
    },
    methods:{
        login(){
            this.$emit('login',this.user)
        },
        showRegister(){
            this.$emit('changeCurrentPage','register')
        }
    }
}
</script>
<style>

</style>

