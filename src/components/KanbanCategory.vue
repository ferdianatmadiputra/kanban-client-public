<template>
  <div class="col-12 col-lg-6 col-xl-3">
    <div class="card border-secondary my-2 shadow">

      <div class="card-header">
        <h5 class="text-secondary">{{category}}</h5>
      </div>
      
      <div class="card-body m-0 p-1">

        <TaskCard 
          v-for="task in tasksPerCategory"
          :key="task.id"
          :task="task"
        ></TaskCard>
        
        <FormNewTask
          v-show="formShow === true"
          :dataUser="dataUser"
          :base_url = "base_url"
          :category = "category"
          :currOrg = "currOrg"
          @newTaskCreated = "newTaskCreated"
          @cancelAdd = "hideTaskForm">
        </FormNewTask>
      </div>
      <!--button add-->
      <div>
        <div class="btn btn-secondary btn-block"
        @click.prevent="showTaskForm">
          + add new task
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import TaskCard from './TaskCard'
import FormNewTask from './FormNewTask'
export default {
  name: 'KanbanCategory',
  data () {
    return {
      formShow: false
    }
  },
  props : ["category", "currOrg", "dataUser","base_url"],
  components: {
    TaskCard,
    FormNewTask
  },
  methods: {
    showTaskForm () {
      this.formShow= true;
    },
    hideTaskForm () {
      this.formShow = false;
    },
    newTaskCreated() {
      this.hideTaskForm();
      this.$emit('newTaskCreated')
    }
  },
  computed: {
  // getter
    tasksPerCategory: function () {
      return this.currOrg.Tasks.filter((task) => task.category === this.category);
    },
  }

}
</script>