<template>
  <div  class="card p-2 shadow-sm my-1">
    <form @submit.prevent="postNewTask">
    <div class="mb-2 form-floating text-dark">
      <input
        v-model="title"
        type="text"
        class="form-control"
        placeholder="Budi"
        id="newTaskTitle"
        name="newTaskTitle"
      />
      <label for="newTaskTitle" class="col-form-label"
        >Task Title</label
      >
    </div>
    <div class="mb-2 form-floating text-dark">
      <input
        v-model="assignee"
        type="text"
        class="form-control"
        placeholder="Budi"
        id="assignee"
        name="assignee"
      />
      <label for="assignee" class="col-form-label"
        >Email Assignee</label
      >
    </div>
    <div class=" navbar p-0 mb-0 justify-content-center border-top border-secondary">
      <div class="mb-1 p-2">
        <input
          type="submit"
          id="submitNewOrg"
          class="btn btn-primary"
          value="Create"
        />
        <div class="btn btn-secondary"
          @click.prevent="cancelAdd">
          Cancel
        </div>
      </div>
    </div>
  </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FormNewTask',
  data () {
    return {
      assignee: this.dataUser.email,
      title: "",
    }
  },
  props: ["currOrg", "category", "base_url","dataUser"],
  methods: {
    postNewTask () {
      console.log(this.assignee, this.title,this.category)
     axios({
        url:`${this.base_url}/org/${this.currOrg.id}/task`,
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          email: this.assignee,
          title: this.title,
          category: this.category
        }
      })
      .then(({data}) => {
        console.log(data);
        this.$emit('newTaskCreated');
        this.resetForm();
      })
      .catch( err => {
        console.log(err.response,"ini isi err<<<<<<<")
        console.log(err.response.statusText);
        this.resetForm();
        swal("error", err.response.data.message, "error")
      })
    },
    resetForm () {
      this.title = "";
      this.assignee = this.dataUser.email;
    },
    cancelAdd () {
      this.resetForm();
      this.$emit('cancelAdd');
    }
  }
}
</script>