<template>
  <div class="col-12 col-lg-6 col-xl-3">
    <div class="card card-border-primary p-3 my-2 shadow bg-gradient text-light bg-dark">
      <p class="fw-bold fs-3 p-2">
        {{organization.name}}
      </p>
      <hr class="my-4">
      <MemberOrgHome 
        v-for="(member) in organization.Users"
        :key="member.id"
        :member="member"
      ></MemberOrgHome>
    </div>
  </div>
</template>
<script>
import MemberOrgHome from "./MemberOrgHome"
export default {
  name: "OrganizationCard",
  data () {
    return {
      members: []
    }
  },
  props: ['organization'],
  components: {
    MemberOrgHome
  },
  created () {
    this.members = this.organization.Users;
  }
}
</script>