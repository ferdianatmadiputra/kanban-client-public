<template>
  <div class="row m-2">
    <img class="col-2 p-0 m-0" :src="member.profPic" width="32px" height="32px">
    &nbsp;&nbsp;{{member.firstName}}&nbsp;{{member.lastName}}
  </div>
</template>
<script>
export default {
  name: "MemberOrgHome",
  props: ["member"]
}
</script>