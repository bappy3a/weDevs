<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Login</div>

                <div class="card-body">
                    <form @submit.prevent="login" @keydown="form.onKeydown($event)">
                        <div class="form-group">
                          <label>Email</label>
                          <input v-model="form.email" type="email" name="email"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                          <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                          <label>Password</label>
                          <input v-model="form.password" type="password" name="password"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                          <has-error :form="form" field="password"></has-error>
                        </div>

                        <router-link to="/register" class="btn btn-primary">Go to Register</router-link>
                        <button :disabled="form.busy" type="submit" class="btn btn-success float-right">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
  export default{
    mounted(){
      if (User.loggedIn()) {
        this.$router.push({ name:'home' })
      }
      
    },
    data(){
      return{
        form :new Form({
            email: '',
            password: '',
        }),
      }
    },
    methods:{
      login(){
        this.form.post('/api/auth/login')
        .then(res => {
          User.responseAfterLogin(res)
          this.$snotify.success('Signed in successfully','Login');
          this.$router.push({ name:'home' })
        })
        .catch(
          this.$snotify.error('Invalid Email Or Password','Error')
        )
      }
    }
  };
</script>
