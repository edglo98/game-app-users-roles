<template>
  <div>
    <div v-if="loading" class="photografies-container">
      <div v-for="photo in photos" :key="photo.id" class="photografies-image-content">
        <img class="photografies-image" :src="require(`~/assets/images/pets/${photo.image_url}.jpg`)">
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
      photos: [
        {
          id: 'abc123',
          image_url: 'huron1'
        },
        {
          id: 'abc124',
          image_url: 'conejo1'
        },
        {
          id: 'abc125',
          image_url: 'gato1'
        },
        {
          id: 'abc126',
          image_url: 'ninfa1'
        },
        {
          id: 'abc127',
          image_url: 'hamster1'
        },
        {
          id: 'abc128',
          image_url: 'ninfa2'
        },
        {
          id: 'abc129',
          image_url: 'conejo2'
        },
        {
          id: 'abc221',
          image_url: 'perro1'
        },
        {
          id: 'abc222',
          image_url: 'huron2'
        },
        {
          id: 'abc223',
          image_url: 'hamster2'
        },
        {
          id: 'abc224',
          image_url: 'gato2'
        },
        {
          id: 'abc225',
          image_url: 'ninfa3'
        },
        {
          id: 'abc226',
          image_url: 'hamster3'
        },
        {
          id: 'abc227',
          image_url: 'conejo3'
        },
        {
          id: 'abc228',
          image_url: 'huron3'
        },
        {
          id: 'abc229',
          image_url: 'gato3'
        },
        {
          id: 'abc321',
          image_url: 'perro2'
        },
        {
          id: 'abc322',
          image_url: 'perro3'
        }
      ]
    }
  },
  async created () {
    const response = await this.$auth.$storage.getUniversal('userDatas')
    const { modulos } = response
    if (modulos.fotos === false) {
      this.loading = false
    }
  }
}
</script>

<style>
.photografies-container {
  column-count: 4;
  gap: 0;
  line-height: 0;
  padding: 18px;
}
.photografies-image-content {
  width: 100%;
  height: auto;
  cursor: pointer;
  border-radius: 0px;
  transition: transform .2s ease, border-radius .2s ease;
}
.photografies-image {
  width: 100%;
  height: auto;
}
.photografies-image-content:hover {
  border-radius: 5px;
  overflow: hidden;
  transform: scale(1.1);
}

@media screen and (max-width: 600px) {
  .photografies-container {
    column-count: 2;
  }
}
</style>
