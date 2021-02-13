<template>
<div>
  <div 
  class="card p-2 shadow-sm my-1"
  v-show="showEditForm === false">
    <p class="mb-2">{{task.title}}</p>
    <div class=" navbar p-0 mb-0 justify-content-between border-top border-secondary">
      <span>
        <img :src="task.User.profPic"
        width="20px" height="20px">
      </span>
      <span class="d-flex justify-content-end text-secondary">
        <div class="p-1" @click.prevent="getEditTask">
          <!-- Edit -->
          <i class="far fa-edit mx-1"
          ></i>
        </div>
        <div class="p-1" @click.prevent="deleteTask">
          <!-- Delete -->
          <i class="far fa-trash-alt mx-1"
          ></i>
        </div>
      </span>
    </div>
  </div>
  <!--form edit start-->
  <div 
  class="card p-2 shadow-sm my-1"
  v-show="showEditForm === true">
    <form @submit.prevent="postEditTask">
    <div class="mb-2 form-floating text-dark">
      <input
        v-model="editTitle"
        type="text"
        class="form-control"
        placeholder="Budi"
        :id="'taskTitle'+task.id"
        name="newTaskTitle"
      />
      <label :for="'taskTitle'+task.id" class="col-form-label"
        >Task Title</label
      >
    </div>
    <div class="mb-2 form-floating text-dark">
      <input
        v-model="editAssignee"
        type="text"
        class="form-control"
        placeholder="Budi"
        :id="'assignee'+task.id"
        name="assignee"
      />
      <label :for="'taskTitle'+task.id" class="col-form-label"
        >Email Assignee</label
      >
    </div>
    <div>
      <select v-model="selected" class="form-control">
        <option value="Backlog">Backlog</option>
        <option value="Todo">Todo</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>
    </div>
    <div class=" navbar p-0 mb-0 justify-content-center border-top border-secondary">
      <div class="mb-1 p-2">
        <input
          type="submit"
          :id="'submitEditTask'+task.id"
          class="btn btn-primary"
          value="Update"
        />
        <div class="btn btn-secondary"
          @click.prevent="cancelEdit">
          Cancel
        </div>
      </div>
    </div>
  </form>
  <!--form edit end-->
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: "TaskCard",
  data () {
    return {
      showEditForm: false,
      editTitle: this.task.title,
      editAssignee: this.task.User.email,
      selected: this.category
    }
  },
  props: ["category", "task", "base_url","currOrg"],
  methods: {
    getEditTask () {
      this.showEditForm = true;
    },
    cancelEdit () {
      this.showEditForm = false;
      this.resetForm();
    },
    resetForm() {
      this.editTitle= this.task.title;
      this.editAssignee= this.task.User.email,
      this.selected= this.category
    },
    postEditTask (){
      axios({
       method: "PUT",
        url: this.base_url+`/org/${this.currOrg.id}/task/${this.task.id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: this.editTitle,
          category: this.selected,
          email: this.editAssignee
        }
      })
      .then(({data})=> {
        console.log(data);
        this.$emit('updateKanban');
        this.resetForm();
        this.showEditForm=false;
      })
      .catch( err => {
        console.log(err.response,"dari task card")
        this.resetForm();
        swal("error", err.response.data.message, "error")
      })
    },
    deleteTask () {
      axios({
        method: "DELETE",
        url: this.base_url+`/org/${this.currOrg.id}/task/${this.task.id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data})=> {
        this.$emit('updateKanban');
      })
      .catch( err => {
        this.resetForm();
        swal("error", err.response.data.message, "error")
      })
    }
  }
}
</script>