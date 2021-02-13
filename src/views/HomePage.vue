<template>
   <div class="container my-3" id="welcome-screen">
      <h2 class="display-4">
        Welcome,<br>
        Joko Quepasa  
      </h2>
      <hr class="my-4">
      <p class="lead fw-bold">Your Organization:</p>

      <div class="row">
        <div class="col-12 col-lg-6 col-xl-3">
          <div class="card card-border-primary p-3 my-2 shadow bg-gradient text-light ">
            <p class="fw-bold fs-3 p-2">
              Create New Organization
            </p>
            <h1>
              + <i class="fas fa-sitemap"></i>
            </h1>
          </div>
        </div>
        <!--card per org-->
        <OrganizationCard 
          v-for='(organization, index) in organizations'
          :key="index"
        ></OrganizationCard>
      </div>
    </div>
</template>
<script>
import OrganizationCard from "./organizationCard"
export default {
  props: ["organizations", ],
  components: {
    OrganizationCard
  }
  
}
</script>