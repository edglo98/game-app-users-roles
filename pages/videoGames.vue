<template>
  <div>
    <div v-if="loading" class="videogame-container">
      <div v-for="videogame in videogames" :key="videogame.id" class="videogame-card-content">
        <img class="videogame-image" :src="require(`~/assets/images/videoGames/${videogame.image_url}.jpg`)">
        <div class="videogame-card-description">
          <h2>{{ videogame.title }}</h2>
          <p>{{ videogame.description }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <Errorc />
    </div>
  </div>
</template>

<script>
import Errorc from '~/components/error';
export default {
  components : {
    Errorc
  },
  data () {
    return {
      loading : true,
      videogames: [
        {
          id: 'abc123',
          image_url: 'tlou2',
          title: 'The last of us 2',
          description: 'The Last of Us Part II es un juego de acción y aventuras de 2020 desarrollado por Naughty Dog y publicado por Sony Interactive Entertainment para PlayStation 4.​'
        },
        {
          id: 'abc124',
          image_url: 'cyberpunk',
          title: 'Cyberpunk 2077',
          description: 'Cyberpunk 2077 es un videojuego desarrollado y publicado por CD Projekt, que se lanzó para Microsoft Windows, PlayStation 4, y Xbox One el 10 de diciembre de 2020, y posteriormente en PlayStation 5, Xbox Series X|S y Google Stadia.'
        },
        {
          id: 'abc125',
          image_url: 'deathstranding',
          title: 'Death stranding',
          description: 'Death Stranding es un videojuego de acción y exploración en mundo abierto desarrollado por Kojima Productions y publicado por Sony Interactive Entertainment para PlayStation 4 y por 505 Games para Microsoft Windows.​'
        },
        {
          id: 'abc127',
          image_url: 'fortnite',
          title: 'Fortnite',
          description: 'Fortnite es un videojuego del año 2017 desarrollado por la empresa Epic Games, lanzado como diferentes paquetes de software que presentan diferentes modos de juego, pero que comparten el mismo motor de juego y mecánicas. Fue anunciado en los Spike Video Game Awards en 2011.'
        },
        {
          id: 'abc129',
          image_url: 'gta5',
          title: 'Grand theft auto V',
          description: 'Grand Theft Auto V es un videojuego de acción-aventura de mundo abierto desarrollado por el estudio Rockstar North y distribuido por Rockstar Games. Fue lanzado el 17 de septiembre de 2013 para las consolas PlayStation 3 y Xbox 360.​'
        },
        {
          id: 'abc128',
          image_url: 'lol',
          title: 'League of legends',
          description: 'League of Legends es un videojuego del género multijugador de arena de batalla en línea y deporte electrónico el cual fue desarrollado por Riot Games para Microsoft Windows y OS X y para consolas digitales.'
        },
        {
          id: 'abc130',
          image_url: 'minecraft',
          title: 'Minecraft',
          description: 'Minecraft es un videojuego de construcción, de tipo «mundo abierto» o sandbox creado originalmente por el sueco Markus Persson (conocido comúnmente como "Notch"),​ y posteriormente desarrollado por su empresa, Mojang Studios. Fue lanzado públicamente el 17 de mayo de 2009, después de diversos cambios fue lanzada su versión completa el 18 de noviembre de 2011.'
        }
      ]
    }
  },
  async created(){
    const { modulos } = await this.$auth.$storage.getUniversal('userDatas');
    if(modulos.videojuegos === false){
      this.loading = false;
    }
  }
}
</script>

<style>
.videogame-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  grid-gap: 8px;
  padding: 16px;
}
.videogame-card-content {
  background-color: white;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 13px 3px #CCCCCC70;
  transition: transform .2s ease;
}
.videogame-card-content:hover {
  transform: scale(1.05);
}
.videogame-image {
  width: 100%;
  height: 100%;
  max-height: 168.75px;
  object-fit: cover;
}
.videogame-card-description {
  padding: 8px;
  color: rgb(22, 22, 22);
}

</style>
