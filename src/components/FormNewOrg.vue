<template>
  <div class="col-12 col-lg-6 col-xl-3">
    <div class="card card-border-primary p-3 my-2 shadow bg-gradient text-light bg-dark">
        <form @submit.prevent="postNewOrg">
          <div class="mb-3 form-floating">
            <input
              v-model="newOrgName"
              type="text"
              class="form-control"
              placeholder="Budi"
              id="newOrgName"
              name="newOrgName"
            />
            <label for="newOrgName" class="col-form-label"
              >Org Name</label
            >
          </div>
          <div class="mb-3 p-3">
            <input
              type="submit"
              id="submitNewOrg"
              class="btn btn-primary btn-lg"
              value="Create"
            />
            <div class="btn btn-secondary"
              @click.prevent="cancelAdd">
              Cancel
            </div>
          </div>
        </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      newOrgName: ""
    }
  },
  name: "FormNewOrg",
  props: ["dataUser", "base_url"],
  methods: {
    postNewOrg () {
      axios({
        url:`${this.base_url}/org`,
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          name: this.newOrgName
        }
      })
      .then(({data}) => {
        console.log(data)
        this.$emit('newOrgCreated');
        this.resetForm();
      })
      .catch( err => {
        console.log(err.response.data);
        this.resetForm();
        swal("error", err.response.data.message, "error")
      })
    },
    resetForm () {
      this.newOrgName ="";
    },
    cancelAdd () {
      this.resetForm();
      this.$emit('cancelAdd');
    }
  }
}
</script>