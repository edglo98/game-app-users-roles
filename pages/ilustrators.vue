<template>
  <div>
    <div v-if="loading" class="ilustration-container">
      <div v-for="ilustration in ilustrations" :key="ilustration.id" class="ilustration-image-content">
        <img class="ilustration-image" :src="require(`~/assets/images/ilustrations/${ilustration.image_url}.jpg`)">
      </div>
    </div>
    <div v-else>
      <ErrorC />
    </div>
  </div>
</template>

<script>
import ErrorC from '~/components/error'
export default {
  components: {
    ErrorC
  },
  data () {
    return {
      loading: true,
      ilustrations: [
        {
          id: 'abc123',
          image_url: 'ilustracion1'
        },
        {
          id: 'abc124',
          image_url: 'ilustracion2'
        },
        {
          id: 'abc125',
          image_url: 'ilustracion3'
        },
        {
          id: 'abc126',
          image_url: 'ilustracion4'
        },
        {
          id: 'abc127',
          image_url: 'ilustracion5'
        },
        {
          id: 'abc128',
          image_url: 'ilustracion6'
        },
        {
          id: 'abc129',
          image_url: 'ilustracion7'
        },
        {
          id: 'abc221',
          image_url: 'ilustracion8'
        },
        {
          id: 'abc222',
          image_url: 'ilustracion9'
        },
        {
          id: 'abc223',
          image_url: 'ilustracion10'
        },
        {
          id: 'abc224',
          image_url: 'ilustracion11'
        },
        {
          id: 'abc225',
          image_url: 'ilustracion12'
        },
        {
          id: 'abc226',
          image_url: 'ilustracion13'
        },
        {
          id: 'abc227',
          image_url: 'ilustracion14'
        },
        {
          id: 'abc228',
          image_url: 'ilustracion15'
        },
        {
          id: 'abc229',
          image_url: 'ilustracion16'
        },
        {
          id: 'abc321',
          image_url: 'ilustracion17'
        },
        {
          id: 'abc322',
          image_url: 'ilustracion18'
        }
      ]
    }
  },
  async created () {
    try {
      const response = await this.$auth.$storage.getUniversal('userDatas')
      const { modulos } = response
      if (modulos.ilustraciones === false) {
        this.loading = false
      }
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style>
.ilustration-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  grid-auto-rows: 190px;
  grid-auto-flow: dense;
  grid-gap: 6px;
  padding: 16px;
  /* grid-template-rows: auto; */
}
.ilustration-image-content {
  cursor: pointer;
  overflow: hidden;
  transition: transform .2s ease;
  border-radius: 8px;
}
.ilustration-image-content:hover {
  transform: scale(1.1);
}
.ilustration-image-content:nth-child(4n) {
  grid-column: span 1;
  grid-row: span 3
}
.ilustration-image-content:nth-child(6n) {
  grid-column-end: span 2;
  grid-row-end: span 1;
}
.ilustration-image-content:nth-child(7n) {
  grid-column-end: span 2;
  grid-row-end: span 2;
}
.ilustration-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media screen and (max-width: 600px) {
  .ilustration-container {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 160px;
  }
}

</style>
