<template>
  <!-- LOGIN -->
            <div class="d-flex justify-content-center p-5">
                <form class="bg-warning w-40 p-4">
                    <h2 style="text-align: center;">Log in</h2><br>
                    <label class="form-label">Email address</label>
                        <input v-model = 'user.email' type="email" class="form-control" placeholder="name@example.com">
                    <br>
                    <label class="form-label">Password</label>
                        <input v-model = 'user.password' type="password" class="form-control" placeholder="password">
                    <br>
                    <div class="d-flex justify-content-around">
                        <button @click = 'login()' type="button" class="btn btn-outline my-2 my-sm-0 btn-primary w-50">Log in</button>
                        <button type="reset" class="btn btn-outline my-2 my-sm-0 btn-primary w-50">Reset</button>
                    </div>
                    <div class="dropdown-divider"></div>
                         <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                    <div class="dropdown-divider"></div>
                    <a href="" @click.prevent = 'showRegister()'>New around here? Register</a>
                </form>
            </div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';

export default {
    name:"LoginForm",
    data(){
        return {
            localhost:'https://my-kanban-h8.herokuapp.com',
            user:{
                email:'',
                password:'',
                firstName:'',
                lastName:''
            },
            params: {
                client_id: '377768704545-0777o7cao203rv36kofp95jc5fqtrlgi.apps.googleusercontent.com'
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }  
    },
    components: {
        GoogleLogin
    },
    methods:{
        showRegister(){
            this.$emit('changeCurrentPage','register')
        },
        login(){
            this.$emit('login',this.user)
        },
        onSuccess(googleUser) {
            let name = googleUser.getBasicProfile().getName().split(" ")
            this.user.email = googleUser.getBasicProfile().getEmail()
            this.user.firstName = name[0]
            this.user.lastName = name[1]
            this.user.password = 'Google'
            this.$emit('oauth',this.user)
        },
        onFailure(err) {
            console.log(err);
        }
    }
}
</script>
<style>
  
</style>

