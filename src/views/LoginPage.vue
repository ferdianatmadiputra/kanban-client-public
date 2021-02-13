<template>
  <div>
    <Navbar
      :page="page"
      @navClick="changePage"
    ></Navbar>
    <LoginForm
      @loggedIn="changePage"
      :base_url="base_url"
      :page="page"
    ></LoginForm>
  </div>
</template>
<script>
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

export default {
  name: "LoginPage",
  data() {
    return {};
  },
  props: ["base_url", "page"],
  components: {
    LoginForm,
    Navbar
  },
  methods: {
    changePage(dir) {
      this.$emit('changePage', dir); // bisa register, home, login
    }
  }
};
</script>
<style scoped>

</style>