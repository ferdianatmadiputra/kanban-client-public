<template>
  <div>
  <LoginPage
    v-if="page == 'login'"
    @changePage="changePage"
    :base_url="base_url"
    :page="page"
  ></LoginPage>
  <RegisterPage
    v-else-if="page == 'register'"
    @changePage="changePage"
    :base_url="base_url"
    :page="page"
  ></RegisterPage>
  <HomePage
    v-else-if="page === 'home'"
    :organizations="organizations"
    :base_url="base_url"
    @changePage="changePage"
    :page="page"
  ></HomePage>
  <KanbanPage
    v-else-if="page === 'kanban'"
    :base_url="base_url"
    :page="page"
    @changePage="changePage"
  ></KanbanPage>
  </div>
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
      page: "", // home, login , register, kanban
      organizationId: "",
      organizations: [],
      tasks: [],
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
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data})=> {
        this.organizations = data;
      })
      .catch((err) => {
        console.log(err.response.data)
        swal("error", err.response.data.message, "error")
      })
    },

    changePage(dir) {
      console.log(dir);
      this.page = dir;
    }
  },
  created () {
    if (!localStorage.getItem("access_token")){
      this.page="login";
    } else {
      this.page="home";
      fetchOrganization();
    }
  }
};
</script>

<style scoped>
</style>