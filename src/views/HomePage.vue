<template>
  <div>
    <Navbar
      :page="page"
      @navClick="changePage"
    ></Navbar>
    <div class="container my-3" id="welcome-screen">
      <h2 class="display-4">
        Welcome,<br>
        {{dataUser.firstName}}&nbsp;{{dataUser.lastName}} 
      </h2>
      <hr class="my-4">
      <p class="lead fw-bold">Your Organization:</p>

      <div class="row">
        <div class="col-12 col-lg-6 col-xl-3">
          <div 
            @click.prevent="showOrgForm"
            class="card card-border-primary p-3 my-2 shadow bg-gradient text-light">
            <p class="fw-bold fs-3 p-2">
              Create New Organization
            </p>
            <h1>
              + <i class="fas fa-sitemap"></i>
            </h1>
          </div>
        </div>

          <!--form new org-->
        <FormNewOrg
          v-show="showForm === true"
          :dataUser="dataUser"
          :base_url = "base_url"
          @newOrgCreated = "newOrgCreated"
          @cancelAdd = "hideForm">
        </FormNewOrg>

        <!--card per org-->
        <OrganizationCard 
          v-for='(organization) in organizations'
          :key="organization.id"
          :organization="organization"
          @click.stop.native="getKanban(organization.id)"
        ></OrganizationCard>
      </div>
    </div>
  <div>
</template>
<script>
import OrganizationCard from "../components/OrganizationCard"
import Navbar from "../components/Navbar"
import FormNewOrg from "../components/FormNewOrg"
export default {
  name: "HomePage",
  data () {
    return {
      showForm: false
    }
  },
  props: ["organizations", "dataUser", "page", "base_url"],
  components: {
    OrganizationCard,
    Navbar,
    FormNewOrg
  },
  methods: {
    changePage(dir) {
      this.$emit('changePage', dir); // bisa logout
    },
    showOrgForm () {
      this.showForm = true;
    },
    hideForm () {
      this.showForm = false;
    },
    newOrgCreated() {
      this.hideForm();
      this.$emit("newOrgCreated");
    },
    getKanban(orgId) {
      console.log(orgId,"DARI HOMEPAGE")
      this.$emit("getKanban", orgId);
    }

  }
  
}
</script>