<template>
<!-- REGISTER -->
            <div class="d-flex justify-content-center p-5">
                <form class="bg-warning w-40 p-4" @submit.prevent = 'register()'>
                    <h2 style="text-align: center;">Register</h2><br>
                    <label class="form-label">First Name</label>
                        <input v-model = 'firstName' type="text" class="form-control" placeholder="Daniel">
                    <label class="form-label">Last Name</label>
                        <input v-model = 'lastName' type="text" class="form-control" placeholder="Johns">
                    <label class="form-label">Email address</label>
                        <input v-model = 'email' type="email" class="form-control"  placeholder="name@example.com">
                    <label class="form-label">Password</label>
                        <input v-model = 'password' type="password" class="form-control" placeholder="password">
                    <br>          
                    <div class="d-flex justify-content-around">
                    <button type="submit" class="btn btn-outline my-2 my-sm-0 btn-primary w-50">Register</button>
                    <button type="reset" class="btn btn-outline my-2 my-sm-0 btn-primary w-50">Reset</button>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="" @click.prevent = 'showLogin()'>Alredy have account! Log in</a>
                </form>
            </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"Register",
    data(){
        return {
            localhost:'https://my-kanban-h8.herokuapp.com',
            email : '',
            password : '',
            firstName : '',
            lastName : ''
        }
    },
    methods:{
        register(){
            axios.post(this.localhost+'/register',{
                email:this.email,
                password:this.password,
                firstName:this.firstName,
                lastName:this.lastName
            })
            .then(({data})=>{
                console.log(data.email);
                console.log(this.password);
                axios.post(this.localhost+'/login',{email:data.email,password:this.password})
                .then(({data})=>{
                    localStorage.setItem('accesstoken',data.accesstoken)
                    this.$emit('changeCurrentPage','kanban')
                    this.clear()
                })
                .catch(err=>{
                    this.clear()
                    console.log(err);
                })
            })
            .catch(err=>{
                this.clear()
                console.log(err);
            })
        },
        showLogin(){
            this.$emit('changeCurrentPage','login')
        },
        clear(){
            this.email = ''
            this.password = ''
            this.firstName = ''
            this.lastName = ''
        }
    }

}
</script>

<style>

</style>