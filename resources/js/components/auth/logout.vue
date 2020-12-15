<template>

</template>

<script>
    export default {
        mounted() {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          this.$snotify.success('Successfully Logout','Login');
          this.$router.push({ name: '/' })
        }
    };
</script>