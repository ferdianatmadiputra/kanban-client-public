<template>
  <div>
    <Navbar
      :page="page"
      @navClick="changePage"
    ></Navbar>
    <div class="container">
      <div class="p-1 my-3" id="kanban-title">
        <h1 style="text-align:center">
          <!-- <i class="fas fa-thumbtack"></i> -->
          &nbsp;{{currOrg.name}}
        </h1>
      </div>
      <!--member information-->
      <div class="row align-items-center justify-content-between p-2" id="members">

        <!--member list-->
        <div class="col-auto">
          <div class="row rounded-pill mx-1 border border-secondary align-items-center justify-content-start">

            <h3 class="p-2 mb-0 col-auto">
              <i class="fas fa-users"></i>
            </h3>
            
            <MemberKanban
              v-for='(member, index) in currOrg.Users'
              :key="index"
              :member="member"
            ></MemberKanban>

          </div>
        </div>

        <div class="col-auto">
          <form class="form-inline my-2 my-lg-0"
          @submit.prevent="addMember">
            <label class="sr-only" for="inlineFormInputGroup">Username</label>
            <div class="input-group mb-0">
              <input type="text" 
              v-model="memberToAdd"
              class="form-control" id="inlineFormInputGroup" placeholder="Add new member">
              <div class="input-group-prepend">
                <div class="input-group-text">+@</div>
              </div>
            </div>
          </form>
        </div> 

        <div class="col-auto">
          <div class="btn btn-outline-secondary btn-sm p-2"
          @click.prevent="delOrg">
              <i class="far fa-trash-alt"></i>
              <span>
                Del Organization
              </span>
          </div>
        </div>

      </div>

      <div class="row text-light">
        <!--start per category-->
        <KanbanCategory v-for="(category, index) in categories"
          :key="index"
          :category="category"
          :currOrg="currOrg"
          :dataUser="dataUser"
          @newTaskCreated="newTaskCreated"
        ></KanbanCategory>
        <!--end per category-->
      </div> <!--end of kanban board-->

    </div> <!-- end of kanban page-->
  </div><!--fusion dengan navbar-->
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert'
import MemberKanban from '../components/MemberKanban'
import Navbar from '../components/Navbar'
import KanbanCategory from '../components/KanbanCategory'
export default {
  data () {
    return {
      memberToAdd: "",
      categories: ['Backlog','Todo','Doing','Done']
    }
  },
  props: ["currOrg", "base_url", "page", "base_url"],
  components: {
    MemberKanban,
    Navbar,
    KanbanCategory
  },
  methods: {
    delOrg () {
      this.$emit('delOrg')
    },
    changePage(dir) {
      this.$emit('changePage', dir); // bisa home, logout
    },
    addMember() {
      let newmember = this.memberToAdd
      axios({
        method: "POST",
        url: this.base_url+`/org/${this.currOrg.id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          email: newmember
        }
      })
      .then((res) => {
        console.log(res,'ini response dari kanbanpage');
        this.$emit('addMember', newmember);
        this.memberToAdd ="";
        // swal("success","new member added", "success");
      })
      .catch((err) => {
        swal("error", err.response.data.message,"error")
      })
    },
    newTaskCreated() {
      this.$emit('newTaskCreated')
    }
  }
}
</script>