<template>
  <h1>{{ message }}</h1>
</template>

<script>
import axios from 'axios'
import swal from 'swal'
import HomePage from "./views/HomePage"
import KanbanPage from "./views/KanbanPage"
import LoginPage from "./views/LoginPage"
import RegisterPage from "./views/RegisterPage"

export default {
  name: "App",
  data() {
    return {
      base_url: "http://localhost:3000",
      message: "Hello world",
      page: "",
      organizationId: "",
      organizations: []
    };
  },
  components: {
    HomePage,
    KanbanPage,
    LoginPage,
    RegisterPage
  },
  methods: {
    fetchOrganization () {
      axios({
        method: "GET",
        url: base_url+"/org",
        headers: localStorage.getItem("access_token")
      })
      .then(({data})=> {
        this.organizations = data;
      })
      .catch((err) => {
        console.log(err.response.data)
        swal("error", err.response.data.message, "error")
      })
    }
  },
  created () {
    if (!localStorage.getItem("access_token")){
      this.page="login";
    } else {
      this.page="home";
    }
  }
};
</script>

<style scoped>
</style>