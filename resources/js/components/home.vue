<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-6">
                                Products List
                            </div>
                            <div class="col-6">
                                <router-link to="/logout" class="btn btn-sm btn-danger">Logout</router-link>
                                <router-link to="/create" class="btn btn-sm btn-primary float-right">Add New Product</router-link>
                            </div>
                        </div>
                    </div>

                    <div class="card-bodys">
                      <table class="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th width="50%" scope="col">description</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="product in products" :key="product.id">
                            <td>{{ product.title }}</td>
                            <td><img :src="product.image" alt="" style="width: 60px;height: 60px;"></td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.description }}</td>
                            <td>
                                <router-link :to="{name: 'edit', params:{id: product.id}}" class="btn btn-sm btn-info" >Edit</router-link>
                                <button class="btn btn-sm btn-danger" @click="distry(product)">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
      this.getData();
      
    },
    data(){
      return{
        products:[],
      }
    },
    methods:{
        getData(){
            axios.get("/api/product")
            .then(response => {
              this.products = response.data;
            })
            .catch(e => {
              console.log(e);
            })
        },
        distry(product){
            this.$snotify.confirm(
            "You will not be able to recover this data!",
            "Are you sure?",
            {
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              buttons: [
                {
                  text: "Yes",
                  action: toast => {
                    this.$snotify.remove(toast.id);
                    axios
                      .delete("/api/product/" + product.id)
                      .then(response => {
                        this.getData();
                        this.$snotify.success(
                          "Product Successfully Deleted",
                          "Success"
                        );
                      })
                      .catch(e => {
                        console.log(e);
                      });
                  },
                  bold: true
                },
                {
                  text: "No",
                  action: toast => {
                    this.$snotify.remove(toast.id);
                  },
                  bold: true
                }
              ]
            }
          );
        }

    }
  };
</script>
