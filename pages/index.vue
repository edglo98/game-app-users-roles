<template>
  <div class="container">
    home  {{$auth.$storage.getUniversal('userDatas')}}
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Home | Games App',
      meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Meta description'
      }
    ]
    }
  },
  data(){
    return {

    }
  },
  methods : {

  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: calc(100vh - 141px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
