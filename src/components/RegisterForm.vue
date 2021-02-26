<template>
      <div class="p-3 mx-auto shadow bg-gradient" style="max-width: 400px; text-align:center" id="registerContainer">
      <form id="register-form" 
        autocomplete="off"
        @submit.prevent="postRegister" action="#" method="post">
        <h3>Register</h3>
        <br />
        <div class="mb-3 form-floating">
          <input
            v-model="fnRegister"
            type="text"
            class="form-control"
            placeholder="Budi"
            id="fnRegister"
            name="fnRegister"
          />
          <label for="fnRegister" class="col-form-label"
            >First Name</label
          >
        </div>
        <div class="mb-3 form-floating">
          <input
            v-model="lnRegister"
            type="text"
            class="form-control"
            placeholder="quepasa"
            id="lnRegister"
            name="lnRegister"
          />
          <label for="lnRegister" class="col-form-label"
            >Last Name</label
          >
        </div>
        <div class="mb-3 form-floating">
          <input
            v-model="emailRegister"
            type="text"
            class="form-control"
            placeholder="Budi"
            id="emailRegister"
            name="emailRegister"
          />
          <label for="emailRegister" class="col-form-label"
            >Email</label
          >
        </div>

        <div class="mb-3 form-floating">
          <input
            v-model="passwordRegister"
            type="password"
            class="form-control"
            placeholder="Sabar"
            id="passwordRegister"
            name="passwordRegister"
          />
          <label for="passwordRegister" class="col-form-label"
            >Password</label
          >
        </div>

        <div class="mb-3 p-3">
          <input
          v-if="!isLoading"
            type="submit"
            id="submitRegister"
            class="btn btn-primary btn-lg"
            value="Register"
          />
          <div v-if="isLoading" class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

      </form>
    </div>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  name: "RegisterForm",
  data () {
    return {
      fnRegister: "",
      lnRegister: "",
      emailRegister: "",
      passwordRegister: "",
      isLoading: false
    }
  },
  props: ["base_url", "page"],
  components: {},
  methods: {
    postRegister () {
      this.isLoading = true
      axios.post(`${this.base_url}/user/register`, {
        firstName: this.fnRegister,
        lastName: this.lnRegister,
        email: this.emailRegister,
        password: this.passwordRegister
      })
      .then(({data}) => {
        this.isLoading = false
        this.$emit('registerSuccess', 'login');
        this.resetForm();
        swal("success", "your account created, please continue login", "success")
      })
      .catch( err => {
        this.isLoading = false
        this.resetForm();
        console.log(err.response.data)
        swal("error", err.response.data.message, "error")
      })
    },
    resetForm () {
      this.emailRegister = "";
      this.passwordRegister = "";
      this.fnRegister = "";
      this.lnRegister = "";
    }
  }

}
</script>
<style scoped>

</style>