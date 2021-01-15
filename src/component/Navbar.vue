<template>
    <div>
        <!-- Navigation -->
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="" @click.prevent = 'logout()'>Log Out</a>
                    </li>
                    <li class="nav-item">
                        <!-- Button trigger modal -->
                        <button @click = 'clear()' type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalAdd">
                        Add New
                        </button>
                    </li>
                    </ul>
                </nav>
                <!-- Modal Add-->
                <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <!-- CONTENT -->
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <!-- BODY -->
                            <div class="modal-body">
                            <label>Title</label>
                            <input v-model = 'task.title' class="w-100"/>
                            <hr>
                            <label>Description</label>
                            <textarea v-model = 'task.description' class="w-100"></textarea>
                            <hr>
                            <label>Point</label>
                            <input v-model = 'task.point' class="w-100"/>
                            <hr>
                            <label>Assign to</label>
                            <input v-model = 'task.assignTo' class="w-100"/>
                            </div>
                        <!-- Footer -->
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click = 'add()' type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                        </div>
                    </div>
                    </div>
                </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"Navbar",
    data(){
        return {
            localhost:'http://localhost:3000',
            task:{
                id:'',
                title:'',
                description:'',
                point:'',
                assignTo:'',
                UserID:''
            }
        }
    },
    methods: {
        logout(){
            this.$emit('logout','login')
        },
        clear(){
            this.task.title =''
            this.task.description =''
            this.task.point =''
            this.task.assignTo =''
            this.task.UserID =''
        },
        add(){
            let data = {
                title:this.task.title,
                description:this.task.description,
                point:this.task.point,
                assignTo:this.task.assignTo
            }

            axios.post(this.localhost+'/kanban',data,{headers : {accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.$emit('findAll')
                this.clear()
            })
            .catch(err=>{
                this.clear()
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>