<template>
    <div class="p-3 mx-auto rounded bg-gradient" style="max-width: 400px; text-align:center" id="loginContainer">
      <form id="login-form" @submit.prevent="postLogin" action="#" method="post">
        <h3 class="">Login</h3>
        <br />
        <div class="mb-3 form-floating">
          <input
            v-model="loginEmail"
            type="text"
            class="form-control"
            placeholder="Budi"
            id="emailLogin"
            name="emailLogin"
          />
          <label for="emailLogin" class="col-form-label">Email</label>
        </div>

        <div class="mb-3 form-floating">
          <input
            type="password"
            v-model="loginPassword"
            class="form-control"
            placeholder="Sabar"
            id="passwordLogin"
            name="passwordLogin"
          />
          <label for="passwordLogin" class="col-form-label"
            >Password</label
          >
        </div>

        <div class="mb-3 p-3">
          <input
            type="submit"
            id="submitLogin"
            class="btn btn-primary btn-lg "
            value="Login"
          />
        </div>
        <span class="">
          OR
        </span>
        <div class="mb-3 p-3 d-flex justify-content-center">
          <GoogleSignIn
            @dataUser="dataUser"
            @login-google-success="loginGoogleSuccess"
            :base_url="base_url"></GoogleSignIn>
        </div>
      </form>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import GoogleSignIn from './GoogleSignIn.vue';

export default {
  name: "LoginForm",
  data () {
    return {
      loginEmail: "",
      loginPassword: "",

    }
  },
  props: ["base_url", "page"],
  components: {
    GoogleSignIn
  },
  methods: {
    postLogin(){
      axios
      .post(`${this.base_url}/user/login`, {
          email: this.loginEmail,
          password: this.loginPassword
      })
      .then(({data}) => {
        localStorage.setItem("access_token", data.access_token);
        this.dataUser(data.dataUser);
        this.$emit('loggedIn', "home");
        this.resetForm();
        // swal("success", "successfully logged in", "success")
      })
      .catch(err => {
        this.resetForm();
        swal("error", err.response.data.message, "error")
      })
    },
    dataUser (obj) {
      this.$emit('dataUser', obj)
    },
    loginGoogleSuccess () {
      this.$emit('loggedIn', "home");
      this.resetForm()
    },
    resetForm () {
      this.loginEmail ="";
      this.loginPassword = ""
    }
  }
}
</script>

<style scoped>

</style>