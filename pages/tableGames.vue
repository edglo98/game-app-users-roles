<template>
  <div>
    <div v-if="loading" class="tablegame-container">
      <div v-for="tablegame in tablegames" :key="tablegame.id" class="tablegame-card-content">
        <img class="tablegame-image" :src="require(`~/assets/images/tableGames/${tablegame.image_url}.jpg`)">
        <div class="tablegame-card-description">
          <h2>{{ tablegame.title }}</h2>
          <p>{{ tablegame.description }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <Errorc />
    </div>
  </div>
</template>

<script>
import Errorc from '~/components/error'
export default {
  components: {
    Errorc
  },
  data () {
    return {
      loading: true,
      tablegames: [
        {
          id: 'abc123',
          image_url: 'ajedrez',
          title: 'Ajedrez',
          description: 'El ajedrez es un juego entre dos contrincantes en el que cada uno dispone al inicio de 16 piezas móviles que se colocan sobre un tablero, ​ dividido en 64 casillas o escaques.​'
        },
        {
          id: 'abc124',
          image_url: 'damas',
          title: 'Damas',
          description: 'Las damas es un juego de mesa para dos contrincantes. El juego consiste en mover las piezas en diagonal a través de los cuadros negros de un tablero de 64 o 100 cuadros.'
        },
        {
          id: 'abc125',
          image_url: 'domino',
          title: 'Domino',
          description: 'El dominó es un juego de mesa en el que se juegan y emplean unas fichas rectangulares, generalmente blancas por la cara y negras por el envés, usualmente hay de diferentes colores, aunque existen muchas variantes.'
        },
        {
          id: 'abc127',
          image_url: 'jenga',
          title: 'Jenga',
          description: 'Jenga es un juego de habilidad física creado por la diseñadora y autora británica de juegos de mesa Leslie Scott, y actualmente comercializado por Hasbro. Los jugadores se turnan para quitar un bloque a la vez de una torre construida con 54 bloques. Cada bloque eliminado se coloca en la parte superior de la torre, creando una estructura progresivamente más inestable.'
        },
        {
          id: 'abc129',
          image_url: 'monopoly',
          title: 'Monopoly',
          description: 'Monopoly (Monopolio en algunas versiones al español) es un juego de mesa basado en el intercambio y la compraventa de bienes raíces (normalmente, inspirados en los nombres de las calles de una determinada ciudad), hoy en día producido por la empresa estadounidense Hasbro de Rhode Island. Monopoly es uno de los juegos de mesa comerciales más vendidos del mundo. '
        },
        {
          id: 'abc128',
          image_url: 'scrable',
          title: 'Scrable',
          description: 'Scrabble es un juego de mesa en el cual cada jugador intenta ganar más puntos mediante la construcción de palabras sobre un tablero de 15x15 casillas cuadradas. Las palabras pueden formarse, siempre y cuando aparezcan en el diccionario estándar, de forma horizontal o verticalmente y se pueden cruzar. '
        }
      ]
    }
  },
  async created () {
    try {
      const response = await this.$auth.$storage.getUniversal('userDatas')
      console.log(response)
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
.tablegame-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  grid-gap: 6px;
  padding: 16px;
}
.tablegame-card-content {
  background-color: white;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 13px 3px #CCCCCC70;
  transition: transform .2s ease;
}
.tablegame-card-content:hover {
  transform: scale(1.05);
}
.tablegame-image {
  width: 100%;
  height: 100%;
  max-height: 168.75px;
  object-fit: cover;
}
.tablegame-card-description {
  padding: 8px;
  color: rgb(22, 22, 22);
}

</style>
