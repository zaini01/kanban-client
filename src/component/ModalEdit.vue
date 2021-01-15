<template>
    <!-- Modal Edit-->
    <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
            <button @click = 'put' type="click" class="btn btn-primary" data-dismiss="modal">Submit</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "ModalEdit",
    props: ['task'],
    data(){
        return {
            localhost:'http://localhost:3000'
        }
    },
    methods: {
        put(){
            axios.put(this.localhost+`/kanban/${this.task.id}`,this.task,{headers : {accesstoken:localStorage.accesstoken}})
            .then(({data})=>{
                this.$emit('findAll')
            })
            .catch(err=>{
                console.log(err);
            })
        },
    }
}
</script>

<style>

</style>