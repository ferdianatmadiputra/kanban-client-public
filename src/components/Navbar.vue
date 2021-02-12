<template>
  <nav
    id="navbar"
    class="navbar shadow-sm navbar-dark bg-dark justify-content-between px-3 fixed-top"
  >
    <div class="nav-item">
      <!--on click back to home-->
      <a class="navbar-brand m-0" id="nav-title">
        <i class="fas fa-columns"></i>
        Kanban
      </a>
    </div>
    <div class="d-flex flex-row-reverse">
      <!-- <div id="btn-logout" class="nav-item nav-link">Logout</div> -->
      <!-- <img class="mt-1" src="https://ui-avatars.com/api/?background=random&name=atma+joko&rounded=true"
        width="32px" height="32px"> -->
      <div id="btn-login" class="nav-item nav-link">Login</div>
      <div id="btn-register" class="nav-item nav-link">Register</div>
    </div>
  </nav>
</template>
<script>
export default {
  
}
</script>