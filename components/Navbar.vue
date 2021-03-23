<template>
  <nav class="navbar">
    <div class="navbar-size">
      <div class="navbar-container">
        <div class="navbar-container__logo">
          <nuxt-link to="/">
            <div>
              <img src="~/assets/images/logo.png" alt="logo cea">
            </div>
            <div>
              <h1>Game App</h1>
              <small>juegos y más</small>
            </div>
          </nuxt-link>
          <div class="navbar-hamburguer-menu">
            <HamburguerMenu />
          </div>
        </div>
        <div id="aside-bar" class="aside-bar aside-bar__opened">
          <ul>
            <li class="navbar-item" v-if="fotos">
              <NuxtLink to="/photos" title="titulo" class="navbar-item" active-class="navbar-item__active">
                <span>Fotografías</span>
              </NuxtLink>
            </li>
            <li v-if="ilustraciones">
              <NuxtLink to="/ilustrators" title="titulo" class="navbar-item" active-class="navbar-item__active">
                <span>Ilustraciones</span>
              </NuxtLink>
            </li>
            <li class="navbar-item" v-if="juegosMesa">
              <NuxtLink to="/tableGames" title="titulo" class="navbar-item" active-class="navbar-item__active">
                <span>Juegos de mesa</span>
              </NuxtLink>
            </li>
            <li class="navbar-item" v-if="videojuegos">
              <NuxtLink to="/videoGames" title="titulo" class="navbar-item" active-class="navbar-item__active">
                <span>Video juegos</span>
              </NuxtLink>
            </li>
            <li class="navbar-item">
              <input type="button" title="titulo" class="navbar-item" active-class="navbar-item__active" v-on:click="Logout" value="Salir">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return {
      inicio : false,
      fotos : false,
      ilustraciones : false,
      juegosMesa : false,
      videojuegos : false
    }
  },
  methods : {
    async Logout(){
      this.$auth.$storage.setUniversal('userDatas', undefined);
      this.$auth.$storage.setUniversal('adminDatas', undefined);
      this.$router.push('/login');
    }
  },
  async created(){
    const { modulos } = await this.$auth.$storage.getUniversal('userDatas');
    this.inicio = modulos.inicio;
    this.fotos = modulos.fotos;
    this.ilustraciones = modulos.ilustraciones
    this.juegosMesa = modulos.juegosMesa
    this.videojuegos = modulos.videojuegos;
  }

}
</script>

<style scoped>
/* navbar estilos globales */

.navbar {
  /* border: 1px solid blueviolet; */
  background-color: white;
  position: sticky;
  top: 0;
  width: 100%;
  height: 90px;
  box-shadow: 0px 0px 20px #00000030;
  transition: background-color 0.3s ease;
  z-index: 1;
}

.navbar h1,
.navbar small {
  margin: 0;
}

.navbar a {
  text-decoration: none;
  color: var(--black);
  transition: color 0.3s ease;
}

/* delimitar el espacio del contenido de el navbar */
.navbar-size {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: 100%;
}

/* layout del contenido del navbar */
.navbar-container {
  /* border: 1px solid green; */
  display: flex;
  align-items: center;
  height: 100%;
}

/* logo del navbar y contenido siempre visible */
.navbar-container__logo {
  /* border: 1px solid blue; */
  height: 100%;
  width: 100%;
  display: flex;
}

.navbar-container__logo a {
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  width: max-content;
  height: 100%;
}

.navbar-container__logo img {
  width: 3em;
  margin: 0.5em;
}

/* todo el contenido de navegacion */
.aside-bar {
  flex: 1;
  height: 100%;
  background-color: var(--white);
  transition: background-color 0.3s ease;
}

.aside-bar ul {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}

.aside-bar li {
  /* border: 1px solid green; */
  list-style: none;
  min-width: 131px;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.aside-bar a {
  font-weight: bold;
  display: block;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.navbar-item::before {
  content: "";
  display: block;
  background-color: green;
  position: absolute;
  height: 4px;
  border-radius: 2px;
  width: 100%;
  bottom: 0;
  left: -100%;
  transition: left 0.2s ease;
}

.navbar-item:hover ~ .navbar-item::before {
  left: -100%;
}

.navbar-item:hover::before,
.navbar-item__active::before {
  left: -0%;
}

/* estilos para la seccion del boton de menu y contacto */
.navbar-hamburguer-menu {
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  display: none;
}

/* estilos de el boton de contacto */
.contact-button {
  background-color: skyblue;
  line-height: 100%;
  margin: 0;
  font-size: 0.9em;
  box-shadow: 0px 0px 5px 3px #67a7c050;
}

.contact-button:hover {
  background-color: rgb(103, 167, 192);
}

.navbar-item a:hover {
  color: green;
}

.navbar-item__active {
  color: green;
}

@media (max-width: 900px) {
  .navbar {
    height: 70px;
  }

  .navbar-container {
    flex-direction: column;
  }

  .navbar-container__logo {
    box-shadow: 0px 0px 20px #00000030;
    z-index: 1;
  }

  .aside-bar {
    width: 100%;
    position: absolute;
    top: 100%;
    height: max-content;
    left: -100%;
    transition: left 0.3s ease;
    background-color: white;
    box-shadow: 0px 5px 10px #CCCCCC40;
  }

  .aside-bar__opened {
    left: 0;
  }

  .navbar-item {
    padding: 10px 0px;
    transition: color 0.2s ease;
  }

  .aside-bar ul {
    flex-direction: column;
    align-items: unset;
  }

  .navbar-hamburguer-menu {
    display: flex;
  }
}
</style>
