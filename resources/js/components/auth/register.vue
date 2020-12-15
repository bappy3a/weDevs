<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Login</div>

                <div class="card-body">
                    <form @submit.prevent="singup" @keydown="form.onKeydown($event)">
                        <div class="form-group">
                          <label>Name</label>
                          <input v-model="form.name" type="text" name="name"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                          <has-error :form="form" field="name"></has-error>
                        </div>
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

                        <div class="form-group">
                          <label>Confirm password</label>
                          <input v-model="form.password_confirmation" type="password"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('password_confirmation') }">
                          <has-error :form="form" field="password_confirmation"></has-error>
                        </div>

                        <router-link to="/" class="btn btn-primary">Back To login</router-link>
                        <button :disabled="form.busy" type="submit" class="btn btn-success float-right">Sing Up</button>
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
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }),
      }
    },
    methods:{
      singup(){
        this.form.post('/api/auth/singup')
        .then(res => {
          User.responseAfterLogin(res)
          this.$snotify.success('Signed up successfully','Login');
          this.$router.push({ name:'home' })
        })
        .catch(

        )
      }
    }
  };
</script>
