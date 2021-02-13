<template>
  <div>
    <Navbar
      :page="page"
      @navClick="changePage"
    ></Navbar>
    <RegisterForm
      @registerSuccess="changePage"
      :base_url="base_url"
      :page="page"
    ></RegisterForm>
  </div>
</template>
<script>
import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";

export default {
  name: 'RegisterPage',
  data () {
    return {}
  },
  props: ["base_url", "page"],
  components: {
    RegisterForm,
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