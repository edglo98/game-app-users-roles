<template>
  <div class="container">
    home  {{obo}}
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
      obo : ''
    }
  },
  async created(){
    await this.getElements();
  },
  methods : {
    async getElements(){
      try {
        this.obo = await this.$axios.get('/api/MA', {
        headers : {
          token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE1NzU3NDQ2LCJleHAiOjE2MTc4MzEwNDZ9.wZfPILNwcHSuqKOVKEE1DddWRuMr_GpeOYZPgLTdXTM'
        }
       });
       console.log(data)
      //  this.obo = data;
      } catch (error) {
        this.obo = error.response.data
      }
    }
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
