<template>
  <div class="card p-2 shadow-sm my-1">
    <p class="mb-2">sebuah task tapi kalo panjang gitu gimana hayo abc def ghj uik</p>
    <div class=" navbar p-0 mb-0 justify-content-between border-top border-secondary">
      <span>
        <img src="https://ui-avatars.com/api/?background=random&name=atma+diboko&rounded=true"
        width="20px" height="20px">
      </span>
      <span class="text-secondary">
        <i class="far fa-edit mx-1"
          @click.prevent="deleteTask"
        ></i>
        <i class="far fa-trash-alt mx-1"></i>
      </span>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "TaskCard",
  data () {
    return {
      task: ""
    }
  },
  props: ["category"]
}
</script>