<template>
  <div>
    <Navbar />
    <div class="main-container">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {

  async created () {
    const datos = await this.$auth.$storage.getUniversal('userDatas')
    if (datos === undefined) {
      return this.$router.push('/login')
    }
  },

}
</script>

<style scoped>
.main-container {
  min-height: calc(100vh - 141px);
  width: 100%;
  max-width: 1250px;
  margin: 0px auto;
}
</style>
