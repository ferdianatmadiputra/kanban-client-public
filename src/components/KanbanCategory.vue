<template>
  <div class="col-12 col-lg-6 col-xl-3">
    <div class="card border-secondary my-2 shadow">

      <div class="card-header">
        <h5 class="text-secondary">{{category}}</h5>
      </div>
      
      <div class="card-body m-0 p-1">
        <draggable style="min-height:100px;"
          :list="listTasks"
          :category="category"
          group="tasksPerCategory"
          @change="updateCategory(listTasks, $event)"
        >
          <TaskCard 
            v-for="task in tasksPerCategory"
            :key= "task.id"
            :task = "task"
            :category = "category"
            :currOrg = "currOrg"
            :base_url = "base_url"
            @updateKanban="updateKanban"
          ></TaskCard>

        </draggable>

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
import draggable from 'vuedraggable'
import TaskCard from './TaskCard'
import FormNewTask from './FormNewTask'
import swal from 'sweetalert'
import axios from 'axios'
export default {
  name: 'KanbanCategory',
  data () {
    return {
      formShow: false,
      listTasks: []
    }
  },
  props : ["category", "currOrg", "dataUser","base_url"],
  components: {
    TaskCard,
    FormNewTask,
    draggable
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
      this.updateKanban();
    },
    updateKanban() {
      this.$emit('updateKanban')
    },
    updateCategory(data, event) {
      if(event.added) {
        const { element } = event.added;
        axios({
          method: "PATCH",
          url: this.base_url+`/org/${this.currOrg.id}/task/${element.id}`,
          headers: { access_token: localStorage.getItem("access_token") },
          data: {
            category: this.category
          }
        })
        .then(res => {
          this.updateKanban()
        }).catch(err => {
          swal("error", err.response.data.message, "error")

        })
      }
    }
  },
  computed: {
  // getter
    tasksPerCategory: function () {
      this.listTasks= this.currOrg.Tasks.filter((task) => task.category === this.category);
      return this.listTasks;
    },
  }

}
</script>