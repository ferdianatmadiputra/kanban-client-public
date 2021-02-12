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
          <div class="g-signin2 mt-3 mb-3" data-onsuccess="onSignIn"></div>
        </div>
      </form>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert';
import GSignInButton from 'vue-google-signin-button';
Vue.use(GSignInButton);

export default {
  name: "LoginForm",
  data () {
    return {
      name: "",
      password: ""
    }
  },
  methods: {
    postLogin(){
      axios({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: {
          name: this.name,
          password: this.password
        }
      })
      .then(({data}) => {
        localStorage.setItem("access_token", data.access_token)
        this.$emit('loggedIn');
        this.resetForm();
        swal("success", "successfully logged in", "success")
      })
      .catch(err => {
        console.log(err);
        swal("error", err.response, "error")
      })
    }
  }
}
</script>