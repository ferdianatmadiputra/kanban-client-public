<template>
  <nav
    id="navbar"
    class="navbar shadow-sm navbar-dark bg-dark justify-content-between px-3 fixed-top"
  >
    <div class="nav-item">
      <!--on click back to home-->
      <a class="navbar-brand m-0" id="nav-title"
        @click.prevent="navClick('home')"
        >
        <i class="fas fa-columns"></i>
        Kanban
      </a>
    </div>
    <div class="d-flex flex-row-reverse">
      <div id="btn-logout" 
        v-if="page === 'home' || page === 'kanban'"
        @click.prevent="navClick('logout')"
        class="nav-item nav-link">Logout</div>
      <!-- <img class="mt-1" src="https://ui-avatars.com/api/?background=random&name=atma+joko&rounded=true"
        width="32px" height="32px"> -->
      <div id="btn-login" 
        v-if="page === 'login' || page === 'register'"
        @click.prevent="navClick('login')"
        class="nav-item nav-link">Login</div>
      <div id="btn-register" 
        v-if="page === 'login' || page === 'register'"
        @click.prevent="navClick('register')"
        class="nav-item nav-link">Register</div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  },
  props: ["page"],
  components: {

  },
  methods: {
    navClick(val) {
      if (val === 'home') {
        if (!localStorage.getItem("access_token")){
          val = 'login'
        }
      } else if (val === 'logout') {
        localStorage.clear();
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log("User signed out by google.");
        });
        val = 'login'
      }
      this.$emit('navClick', val)
    }
  }
}
</script>
<style scoped>
.nav-item:hover{
  cursor:pointer;
}
</style>