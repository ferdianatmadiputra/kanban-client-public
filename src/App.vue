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
    :currOrg="currOrg"
    :page="page"
    @delOrg="delOrg"
    @addMember="addMember"
    @changePage="changePage"
    @newTaskCreated="getKanbanPage"
    :orgMembers="orgMembers"
    :tasks="tasks"
  ></KanbanPage>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
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
      dataUser : {},
      currOrg: {},
      organizations: [],
      orgMembers: [],
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
        url: this.base_url+"/org",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data})=> {
        data.reverse();
        this.organizations = data;
        console.log(this.organizations, 'from fetch apakah fetch lebih duulu daripada currorg')
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
        console.log(this.tasks);
      }
      this.page = dir;
    },

    insertDataUser(obj){
      this.dataUser = obj;
    },

    getKanbanPage (orgId) {
      if (!orgId){
        orgId = this.currOrg.id
      }
      axios({
        method: "GET",
        url: this.base_url+`/org/${orgId}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data})=> {
        this.currOrg = data;
        this.orgMembers = data.Users;
        this.tasks = data.Tasks;
        this.changePage('kanban')
      })
      .catch((err) => {
        console.log(err.response.data)
        swal("error", err.response.data.message, "error")
      })

      // console.log(orgId, '<<< id org, request masuk ke app')
      // this.fetchOrganization();
      // this.currOrg = this.organizations.find(org => org.id == orgId);
      // console.log(this.currOrg,'ini currorg')
      // this.changePage('kanban');
    },

    // getTasks () {
    //   let orgId = this.currOrg.id;
    //   axios({
    //     method: "GET",
    //     url: this.base_url+`/org/${orgId}/task`,
    //     headers: {
    //       access_token: localStorage.getItem("access_token")
    //     }
    //   })
    //   .then(({data}) =>{
    //     console.log(data)
    //     this.tasks=data;
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data)
    //     swal("error", err.response.data.message, "error")
    //   })
    // },

    delOrg() {
      axios({
        method: "DELETE",
        url: this.base_url+`/org/${this.currOrg.id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then((res) => {
        this.changePage("home")
        swal("success", res.message)
      })
      .catch((err) => {
        swal("error", err.response.data.message,"error")
      })
    },

    addMember(newMemberEmail) {
      console.log(newMemberEmail,'tes')
      this.getKanbanPage(this.currOrg.id)
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