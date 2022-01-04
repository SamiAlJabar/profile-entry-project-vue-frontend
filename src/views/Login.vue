<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 col-sm-9 com-xs-10 mx-auto text-left mt-5">
        <div class="w-100 text-center">
          <img alt="Vue logo" width="100" src="../assets/logo.png">
        </div>
        <form class="row g-3 mt-3" @submit.prevent="loginUser">
          <div v-if="status == 'failure'" class="alert alert-danger" role="alert">
            Please enter correct username and password!
          </div>
          <div class="col-md-12">
            <label for="validationDefault01" class="form-label"><b class="labels">Username</b></label>
            <input type="text" placeholder="enter username ..." class="form-control" id="validationDefault01" v-model="form.username" required>
          </div>
          <div class="col-md-12">
            <label for="validationDefault02" class="form-label"><b class="labels">Password</b></label>
            <input type="password" placeholder="enter password ..." class="form-control" id="validationDefault02" v-model="form.password" required>
          </div>
          <div class="col-12 text-end">
            <button class="btn btn-primary w-50 mt-3" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/handler/authentication'

export default {
  name: 'Login',
  components: {
    //
  },
  data() {
    return {
      status: null,
      form: {
        username: null,
        password: null,
      },
    }
  },
  methods: {
    async loginUser() {
      await Auth.userLogin(this.form.username, this.form.password)
      .then((response) => {
        console.log("response.status: ", response.status);
        Auth.registerUserLogin(this.form.username, this.form.password);
        this.$router.push('dashboard');
      })
      .catch(() => {
        this.status = 'failure';
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../custom.scss';
.labels {
  color: $primary !important;
}
</style>

