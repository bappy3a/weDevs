<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-6">
                                Add New Product
                            </div>
                            <div class="col-6">
                                <router-link to="/logout" class="btn btn-sm btn-danger">Logout</router-link>
                                <router-link to="/home" class="btn btn-sm btn-primary float-right">Product List</router-link>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
<form @submit.prevent="update" @keydown="form.onKeydown($event)">
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Title</label>
    <div class="col-sm-10">
      <input v-model="form.title" type="text" class="form-control" :class="{ 'is-invalid': form.errors.has('title') }" placeholder="Product Title">
      <has-error :form="form" field="title"></has-error>
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Price</label>
    <div class="col-sm-10">
      <input v-model="form.price" type="number" class="form-control" :class="{ 'is-invalid': form.errors.has('price') }" placeholder="Product price">
      <has-error :form="form" field="price"></has-error>
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Image</label>
    <div class="col-sm-8">
      <input type="file" class="form-control" @change="onFileSelected" :class="{ 'is-invalid': form.errors.has('updateimage') }">
      <has-error :form="form" field="updateimage"></has-error>
    </div>
    <div class="col-sm-2">
      <img :src="form.updateimage" alt="" class="img-thumbnail">
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Description</label>
    <div class="col-sm-10">
      <textarea v-model="form.description" rows="4" cols="50" class="form-control" :class="{ 'is-invalid': form.errors.has('description') }" placeholder="Product Description">
        
      </textarea>
      <has-error :form="form" field="description"></has-error>
      
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-12">
      <button type="submit" class="btn btn-primary float-right"> Submit</button>
    </div>
  </div>

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
      if (!User.loggedIn()) {
        this.$router.push({ name:'login' })
      }
      let id = this.$route.params.id
      axios.get('/api/product/'+id)
      .then(({data}) => (this.form.fill(data)))
      .catch()
      
    },
    data(){
      return{
        form :new Form({
            id: '',
            title: '',
            image: '',
            updateimage: '',
            price: '',
            description: '',
        }),
      }
    },
    methods:{

      onFileSelected(event){
        let file=event.target.files[0];
        if (file.size > 1048770) {
          this.$snotify.error('Upload Image less den 1 mb.','Error')
        }else{
          let reader = new FileReader();
          reader.onload = event =>{
            this.form.updateimage = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      update(){
        this.form.patch('/api/product/'+ this.form.id)
        .then(response => {
          this.$router.push({ name:'home' })
          if (this.form.successful) {
            this.$snotify.success('Data Successfully Update','success')
          }else{
            this.$snotify.error('Sumthing went Worong try again later.','Error')
          }
        })
        .catch(e => {
          console.log(e);
        })
      },
    }
  };
</script>
