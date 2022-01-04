<template>
  <div>
    <Header />
    <div class="container pt-5">
      <h4>Add New Profile</h4>
      <div class="row g-3 mt-3">
        <div class="col-md-12">
          <div v-if="status == 'success'" class="alert alert-success" role="alert">
            Profile added successfully!
          </div>
          <div v-if="status == 'updated'" class="alert alert-success" role="alert">
            Profile updated successfully!
          </div>          
          <div v-if="status == 'failure'" class="alert alert-danger" role="alert">
            Something went wrong!
          </div>
          <form class="row g-3" @submit.prevent="saveProfile">
            <div class="col-md-12 col-sm-12">
              <label class="form-label"><b class="labels">Upload Photo</b></label>
              <input type="file" accept="image/*" class="form-control" required>
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="form-label"><b class="labels">First Name</b></label>
              <input type="text" placeholder="enter first name ..." class="form-control" v-model="form.firstName" required>
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="form-label"><b class="labels">Last Name</b></label>
              <input type="text" placeholder="enter last name ..." class="form-control" v-model="form.lastName" required>
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="form-label"><b class="labels">Date of Birth</b></label>
              <input type="date" class="form-control" v-model="form.dob" required>
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="form-label"><b class="labels">Apartment and Street Address</b></label>
              <input type="text" placeholder="enter apartment and street address ..." class="form-control" v-model="form.streetAddress" required>
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="form-label"><b class="labels">City</b></label>
              <input type="text" placeholder="enter city ..." class="form-control" v-model="form.city" required>
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="form-label"><b class="labels">State</b></label>
              <input type="text" placeholder="enter state ..." class="form-control" v-model="form.state" required>
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="form-label"><b class="labels">Select Country</b></label>
              <select class="form-select" v-model="form.country" aria-label=".form-select-lg example" required>
                <option v-for="(option, index) in options" :key="index" :value="option.val">{{option.text}}</option>
              </select>
            </div>
            <div class="col-12 text-end">
              <button class="btn btn-primary mt-3" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import ProfileService from '@/api-services/ProfileService'

export default {
  name: 'AddProfile',
  components: {
    Header,
  },
  data() {
    return {
      profileId: this.$route.query.id,
      status: null,
      form: {
        photo: null,
        firstName: null,
        lastName: null,
        dob: null,
        streetAddress: null,
        city: null,
        state: null,
        country: "",
      },
      options: [
        { val: "", text: 'Select country'},
        { val: 'Canada', text: 'Canada'},
        { val: 'United State', text: 'United State'},
        { val: 'China', text: 'China'},
        { val: 'Bangladesh', text: 'Bangladesh'},
        { val: 'Australia', text: 'Australia'},
        { val: 'India', text: 'India'},
      ]
    }
  },
  methods: {
    async saveProfile() {
      console.log("form: ", this.form);
      try {
        if(!this.profileId) {
          await ProfileService.createProfile(123, this.form).then(async (res) => {
            console.log(res.data);
            this.status = 'success';
            this.form = {
              photo: null,
              firstName: null,
              lastName: null,
              dob: null,
              streetAddress: null,
              city: null,
              state: null,
              country: "",
            }
          });
        } else {
          await ProfileService.updateProfile(this.profileId, this.form).then(async (res) => {
            console.log(res.data);
            this.status = 'updated';
            this.form = {
              photo: null,
              firstName: null,
              lastName: null,
              dob: null,
              streetAddress: null,
              city: null,
              state: null,
              country: "",
            }
          });
        }
      } catch(e) {
        console.log("Error -- ", e.response.data.message);
      }
      // this.$router.push('dashboard');
    }
  },
  async created() {
    try {
      if(!this.$route.query.id) {
        return;
      } else {
        await ProfileService.getProfileById(123, this.$route.query.id).then(async (res) => {
          console.log(res.data);
          this.form = res.data;
          this.form.dob = res.data.dob.split("T")[0];
        });
      }
    } catch(e) {
      console.log("Error -- ", e.response.data.message);
    }
  },
}
</script>