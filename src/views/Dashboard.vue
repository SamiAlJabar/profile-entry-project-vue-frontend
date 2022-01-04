<template>
  <div>
    <Header />
    <div class="container pt-5">
      <h4>{{total}} profiles found.</h4>
      <input type="text" v-model="search" placeholder="Search using full name ..." class="form-control">
      <div class="row g-3 mt-3">
        <div v-if="status == 'success'" class="alert alert-success" role="alert">
          Profile has been delete!
        </div>
        <div v-for="(profile, index) in profiles" :key="index" class="col-md-3">
          <div class="card">
            <img src="../assets/sk.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{profile.firstName}} {{profile.lastName}}</h5>
              <p class="card-text">{{ $filters.shortText(profileDescription(profile), 35) }}</p>
              <div class="row">
                <div class="col-md-6">
                  <button @click="editProfile(profile.profileId)" class="btn btn-primary">Edit</button>
                </div>
                <div class="col-md-6 text-end">
                  <button @click="deleteProfile(profile.profileId)" class="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import ProfileService from '@/api-services/ProfileService'

export default {
  name: 'Dashboard',
  components: {
    Header,
  },
  data() {
    return {
      total: 0,
      profiles: [],
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      welcomeMessage: null,
      status: null,
      search: null,
    }
  },
  async created() {
    try {
      await ProfileService.getProfileByCreatorId(123).then(async (res) => {
        console.log(res.data);
        this.total = res.data.length;
        this.profiles = res.data;
      });
    } catch(e) {
      console.log("Error -- ", e.response.data.message);
    }
  },
  watch: {
    search: async function(val) {
      try {
        if(val.length == 0) {
          await ProfileService.getProfileByCreatorId(123).then(async (res) => {
            this.total = res.data.length;
            this.profiles = res.data;
          });
        } else {
          await ProfileService.getProfileByProfileName(123, val).then(async (res) => {
            this.total = res.data.length;
            this.profiles = res.data;
          });
        }        
      } catch(e) {
        console.log("Error -- ", e.response.data.message);
      }
    }
  },
  methods: {
    async deleteProfile(pId) {
      try {
        await ProfileService.deleteProfileById(pId).then(async (res) => {
          if(res.status == 204) {
            this.status = 'success';
          }
          this.profiles.forEach((element, index) => {
            if(element.profileId == pId) {
              this.profiles.splice(index, 1);
            }
          });
          this.total = this.profiles.length;
        });
      } catch(e) {
        console.log("Error -- ", e.response.data.message);
      }
    },
    editProfile(profileId) {
      this.$router.push({ path: 'add-profile', query: { id: profileId }});
    },
    profileDescription: function(profile) {
      return "Born in " + profile.dob.split('T')[0] + " in " + profile.streetAddress + ", " + profile.city + ", " + profile.country;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>