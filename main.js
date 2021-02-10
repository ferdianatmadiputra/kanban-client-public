const app = new Vue ({
    el: "#app",
    data: {
        url: 'http://localhost:3000',
        title: "belajar vue js",
        page: "home",
        //list page = 'registrasi', 'login', "organization", "kanban"
        tasks: ["1","2","3"],
        organizations,
        inputTask: "",
        dataLogin: {
            password,
            email
        },
        filtered: ""

    },
    //function yang dijalankan ketika ada perubahan state
    method: {
        addTask () {
            this.tasks.push(this.inputTask);
            this.inputTask = "";
        },
        checkAuth(){
           if ( localStorage.getItem("access_token")) {
               this.page = "organizations";
               this.getOrg();
           } else {
               this.page = "login"
           }
           //process hapus access_token di logout -> page
           //process bikin access_ token di login -> page
           //button -> submit.prevent -> x reload -> ganti page -> v-if & v-show
           //kalo di refresh lifecycle vue ke reset
        },
        getOrg () {
            axios({
                method: 'get',
                url: this.url + '/org',

            })
            .then((res)=> {
                console.log(res);
                this.organizations = res;
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        login() {
            if (true) {
                // console.log(this.dataLogin);
                localStorage.setItem('access_token');
                this.page = 'organizations';
                this.clearLogin();
                this.getOrg();
            } else {
                console.log('email/password salah')
            }
            //kirim POST /login ke server data loginnya
            //lalu
            this.page = 'organization'
        },
        clearLogin(){
            this.dataLogin = {
                email='',
                password=''
            }
        }

    },
    //lifecycle: function yang dijalankan sebelum halamannya ditampilkan
    beforeCreate: function(){
        this.checkAuth();
        console.log('ini beforeCreate');
    },
    created: function(){
        console.log('ini created');

    },
    beforeMount: function(){
        console.log('ini beforeMount');

    },
    mounted: function(){
        console.log('ini mounted');

    },
    // properti getter --> function untuk simplify akses suatu data
    computed: {
        prop: function () {
            return this.properti.yang.aksesnya.jauh
        }
    },
    watch: {
        inputTask: function (valuebaru, valuelama) {
            //buat filter cuy
            console.log({valuebaru, valuelama})
        },
        query: function (newval, oldval) {
            filtered = this.task.filter(item => item.todo.indexOf(newval) !== 1 )
        }
    }

})