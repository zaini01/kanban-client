const localhost = 'https://my-kanban-h8.herokuapp.com'

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
        findAll(){
            axios.get(localhost+'/kanban',{headers:{accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.kanbans = data
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