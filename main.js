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
            },
        task:{
                id:'',
                title:'',
                description:'',
                point:'',
                assignTo:'',
                UserID:''
            },
        kanbans:[],
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
        add(){
            let data = {
                title:this.task.title,
                description:this.task.description,
                point:this.task.point,
                assignTo:this.task.assignTo
            }

            axios.post(localhost+'/kanban',data,{headers : {accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.check()
            })
            .catch(err=>{
                this.check()
                console.log(err);
            })
        },
        put(){

            axios.put(localhost+`/kanban/${this.task.id}`,this.task,{headers : {accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.check()
            })
            .catch(err=>{
                this.check()
                console.log(err);
            })
        },
        patch(status,id){
            let data = {
                status:status
            }
            axios.patch(localhost+`/kanban/${id}`,data,{headers : {accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.check()
            })
            .catch(err=>{
                this.check()
                console.log(err);
            })
        },
        destroy(id){
            axios.delete(localhost+`/kanban/${id}`,{headers : {accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
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
                this.kanbans = data
            })
            .catch(err=>{
                console.log(err);
            })
        },
        findOne(id){
            axios.get(localhost+`/kanban/${id}`,{headers:{accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.task.id = data.id
                this.task.title = data.title
                this.task.description = data.description
                this.task.point = data.point
                this.task.status = data.status
                this.task.assignTo = data.assignTo
            })
            .catch(err=>{
                console.log(err);
            })
        },
        check(){
            this.clearUser()
            this.clearKanban()
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
        },
        clearKanban(){
            this.task.id = '',
            this.task.title = '',
            this.task.description = '',
            this.task.point = '',
            this.task.assignTo = '',
            this.task.UserID = ''
        },
        clearUser(){
            this.user.email = '',
            this.user.password = '',
            this.user.firstName = '',
            this.user.lastName = ''
        }
    },
    computed: {
        backLogs: function (){
            return this.kanbans.filter(kanban => kanban.status == 'BACK-LOG')
        },
        todos: function (){
            return this.kanbans.filter(kanban => kanban.status == 'TODO')
        },
        onProgress: function (){
            return this.kanbans.filter(kanban => kanban.status == 'ON-PROGRES')
        },
        dones: function (){
            return this.kanbans.filter(kanban => kanban.status == 'DONE')
        }
    },
    created() {
        this.check()
    }
  })

  function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    
    console.log(profile.EW);
    console.log(profile.IU)
    console.log(profile.uu);;
 
}