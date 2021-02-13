<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
</template>
<script>
import axios from 'axios';
import GSignInButton from 'vue-google-signin-button'

export default {
  name: "GoogleSignIn",
  data () {
    return {
      googleSignInParams: {
        client_id: '939805692159-c930k5n4qob1qm3altlvpf25b0ti0m4l.apps.googleusercontent.com'
      }
    }
  },
  props: ["base_url"],
  components: {

  },
  methods: {
      onSignInSuccess (googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token, "ini id token");
      axios({
        url: this.base_url+"/user/googlelogin",
        method: "POST",
        data: {
          googleToken: id_token
        }
      })
      .then(res => {
        console.log(res, 'masukk');
        localStorage.setItem("access_token", res.data.access_token);
        this.$emit('login-google-success', res.data.access_token);
        this.$emit('dataUser', res.data.dataUser);
      })
      .catch(err => {
        console.log(err)
      })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
      swal("error", err.response.data.message, "error")
    }
  }
}
</script>
<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>