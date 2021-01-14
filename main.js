const localhost = 'http://localhost:3000'

var app = new Vue({
    el: "#app",
    data: {
      currentDisplay:'login',
      user:{
          firstName:'',
          lastName:'',
          email:'',
          password:''
      }
    },
    methods:{
        showRegister(){
            this.currentDisplay = 'register'
        },
        showLogin(){
            this.currentDisplay = 'login'
        },
        login(){
            axios.post(localhost+'/login',{email:this.user.email,password:this.user.password})
            .then(({data})=>{
                localStorage.setItem('accesstoken',data.accesstoken)
                this.check()
            })
            .catch(err=>{
                this.user.password = ''
            })
        },
        register(){
            axios.post(localhost+'/register',{
                email:this.user.email,
                password:this.user.password,
                firstName:this.user.firstName,
                lastName:this.user.lastName
            })
            .then(({data})=>{
                return axios.post(localhost+'/login',{email:data.email,password:this.user.password})
            })
            .then(({data})=>{
                localStorage.setItem('accesstoken',data.accesstoken)
                this.check()
            })
            .catch(err=>{
                this.check()
                console.log(err);
            })
        },
        findAll(){
            axios.get(localhost+'/kanban',{headers:{accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                console.log(data);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        check(){
            this.user.email = ''
            this.user.password = ''
            this.user.firstName = ''
            this.user.lastName = ''

            if (localStorage.accesstoken == undefined) {
                this.currentDisplay = 'login'
            } else {
                this.findAll()
                this.currentDisplay = 'kanban'
            }
        },
        logout(){
            localStorage.clear()
            this.check()
        }
    },
    created() {
        if (localStorage.accesstoken == undefined) {
            this.currentDisplay = 'login'
        } else {
            this.currentDisplay = 'kanban'
        }
    }
  })