<template>
  <div  class="card p-2 shadow-sm my-1">
    <form @submit.prevent="postNewTask">
    <div class="mb-3 form-floating">
      <input
        v-model="newTaskName"
        type="text"
        class="form-control"
        placeholder="Budi"
        id="newOrgName"
        name="newOrgName"
      />
      <label for="newOrgName" class="col-form-label"
        >Org Name</label
      >
    </div>
    <div class="mb-3 form-floating">
      <input
        v-model="assignee"
        type="text"
        class="form-control"
        placeholder="Budi"
        id="newOrgName"
        name="newOrgName"
      />
      <label for="newOrgName" class="col-form-label"
        >assignee</label
      >
    </div>
    <div class=" navbar p-0 mb-0 justify-content-between border-top border-secondary">
      <div class="mb-3 p-3">
        <input
          type="submit"
          id="submitNewOrg"
          class="btn btn-primary"
          value="Create"
        />
        <div class="btn btn-secondary"
          @click.prevent="cancelAdd">
          Cancel
        </div>
      </div>
    </div>
  </form>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: ["currOrg", "category", "base_url","dataUser"]
}
</script>