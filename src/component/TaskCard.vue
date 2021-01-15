<template>
<div>
    <div class="card m-2">
        <div class="card-body">
        <h5 class="card-title">{{taskCard.title}}</h5>
        <div class="dropdown-divider border border-dark"></div>
        <p class="card-text">{{taskCard.description}}</p>
        <div class="dropdown-divider border border-dark"></div>
        <button v-if = 'taskCard.status != "BACK-LOG"' @click = 'prev(taskCard.id)' class="btn btn-primary btn-sm">Prev</button>
        
        <button @click = 'findOne(taskCard.id)' class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalEdit">Edit</button>
        <button @click = 'destroy(taskCard.id)' class="btn btn-primary btn-sm">Delete</button>
        
        <button v-if = 'taskCard.status != "DONE"' @click = 'next(taskCard.id)' class="btn btn-primary btn-sm">Next</button>
        </div>
    </div>
    <ModalEdit 
        :task = 'task'
        @findAll = 'findAll'>
    </ModalEdit>
</div>
</template>

<script>
import ModalEdit from './ModalEdit'
import axios from 'axios'
export default {
    name:'TaskCard',
    props:['taskCard'],
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
    components:{
        ModalEdit
    },
    methods:{
        destroy(id){
            axios.delete(this.localhost+`/kanban/${id}`,{headers : {accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.$emit('findAll')
            })
            .catch(err=>{
                console.log(err);
            })
        },
        next(id){
            
            let status = ''
            if (this.taskCard.status == 'BACK-LOG') {
                status = 'TODO'
            }else  if (this.taskCard.status == 'TODO') {
                status = 'ON-PROGRES'
            } else  if (this.taskCard.status == 'ON-PROGRES') {
                status = 'DONE'
            }
            axios.patch(this.localhost+`/kanban/${id}`,{status},{headers : {accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.$emit('findAll')
            })
            .catch(err=>{
                console.log(err);
            })
        },
        prev(id){
            let status = ''
            if (this.taskCard.status == 'TODO') {
                status = 'BACK-LOG'
            }else  if (this.taskCard.status == 'ON-PROGRES') {
                status = 'TODO'
            } else  if (this.taskCard.status == 'DONE') {
                status = 'ON-PROGRES'
            }

            axios.patch(this.localhost+`/kanban/${id}`,{status},{headers : {accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.$emit('findAll')
            })
            .catch(err=>{
                console.log(err);
            })
        },
        findOne(id){
            axios.get(this.localhost+`/kanban/${id}`,{headers:{accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.task = data
            })
            .catch(err=>{
                console.log(err);
            })
        },
        findAll(){
            this.$emit('findAll')
        }
    }
}
</script>

<style>

</style>