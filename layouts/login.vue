<template>
  <v-app>
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  async created(){
    const datos = await this.$auth.$storage.getUniversal('userDatas');
    if(datos !== undefined){
      return this.$router.push('/');
    }
  }
}
</script>

<style >

</style>
