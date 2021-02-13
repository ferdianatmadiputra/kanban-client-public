<template>
  <div class="p-2 mb-0 col-auto">
    <img :src="member.profPic"
    width="32px" height="32px">
  </div>
</template>
<script>
export default {
  name: "MemberKanban",
  props: ["member"]
}
</script>