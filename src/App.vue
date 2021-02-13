<template>
  <div>
  <LoginPage
    v-if="page == 'login'"
    @changePage="changePage"
    @dataUser="insertDataUser"
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
    :dataUser="dataUser"
    @changePage="changePage"
    @newOrgCreated="fetchOrganization"
    @getKanban="getKanbanPage"
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
      orgMembers: [],
      tasks: [],
      dataUser : {}
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
        url: this.base_url+"/org",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data})=> {
        data.reverse();
        this.orgMembers = data.Users;
        this.organizations = data;
      })
      .catch((err) => {
        console.log(err.response.data)
        swal("error", err.response.data.message, "error")
      })
    },

    changePage(dir) {
      console.log(dir);
      if (dir === 'home') {
        this.fetchOrganization();
      } else if (dir ==='kanban'){
        this.organizationId;
        this.tasks;
      }
      this.page = dir;
    },
    insertDataUser(obj){
      this.dataUser = obj;
    },
    getKanbanPage (orgId) {
      axios({
        method: "GET",
        url: this.base_url+`/org/${orgId}/task`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) =>{
        this.tasks=data;
        changePage('kanban')
      })
    }


  },
  created () {
    localStorage.clear();
    this.page="login";

  }
};
</script>

<style scoped>
</style>