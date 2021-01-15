<template>
    <div class="flex-column w-25"> 
        <div :class="changeColor">
            <h4 class="text-center">{{title}}</h4>
            <TaskCard  v-for = 'task in cartFilter' :key = 'task.id' :taskCard='task' @findAll = 'findAll'></TaskCard>
        </div>
        
    </div>
</template>

<script>
import TaskCard from './TaskCard'

export default {
    name: "CategoryCard",
    props: ['title','tasks'],
    components: {
        TaskCard
    },
    data(){
        return {
            color : ['bg-warning m-2 p-2','bg-primary m-2 p-2','bg-info m-2 p-2','bg-success m-2 p-2']
        }
    },
    methods: {
        findAll(){
            this.$emit('findAll')
        }
    },
    computed:{
        cartFilter: function (){
            return this.tasks.filter(task => task.status == this.title)
        },
        changeColor(){
            let newColor = ''
            if (this.title == 'BACK-LOG') {
                newColor = this.color[0]
            }else if (this.title == 'TODO') {
                newColor = this.color[1]
            }else if (this.title == 'ON-PROGRES') {
                newColor = this.color[2]
            }else if (this.title == 'DONE') {
                newColor = this.color[3]
            }
            return newColor
        }
    }
}
</script>

<style>

</style>