<template>
  <!-- KANBAN -->
        <div>
            <Navbar 
                @logout='logout'
                @findAll='findAll'>
            </Navbar>

            <div class="d-flex">
                <CategoryCard 
                    v-for="(category,i) in categories" 
                    :key = 'i'
                    :title = 'category'
                    :tasks = 'tasks'
                    @findAll = 'findAll'>
                </CategoryCard>
            </div>
        </div>
            
</template>

<script>
import Navbar from './Navbar'
import CategoryCard from './CategoryCard'

export default {
    name: "Kanban",
    components:{
        Navbar,CategoryCard
    },
    props:['tasks','categories'],
    methods: {
        logout(pageName){
            this.$emit('logout',pageName)
        },
        findAll(){
            this.$emit('findAll')
        }
    },
    computed: {
        backLogs: function (){
            return this.tasks.filter(task => task.status == 'BACK-LOG')
        },
        todos: function (){
            return this.tasks.filter(task => task.status == 'TODO')
        },
        onProgress: function (){
            return this.tasks.filter(task => task.status == 'ON-PROGRES')
        },
        dones: function (){
            return this.tasks.filter(task => task.status == 'DONE')
        }
    }
}
</script>

<style>

</style>