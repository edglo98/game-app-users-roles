<template>
  <v-flex xs6>
    <v-row>
      <v-flex xs5 class="mt-3 ml-3">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="150"
          max-width="250"
          src="https://static.wikia.nocookie.net/new-fantendo/images/2/24/Soy_Admin.jpg/revision/latest/scale-to-width-down/340?cb=20200728204122&path-prefix=es"
        ></v-img>
      </v-flex>
      <v-flex class="mt-3 ml-2">
        <v-card
          elevation="5"
          outlined
        >
          <v-row>
            <v-flex xs1></v-flex>
            <v-flex class="mt-5 mb-5">
              <v-text-field
                label="Nombre"
                required
              >
              </v-text-field>
              <v-text-field
                label="Correo"
                required
              >
              </v-text-field>
              <v-text-field
                label="Contraseña"
                required
              >
              </v-text-field>
            </v-flex>
            <v-flex xs1></v-flex>
          </v-row>
        </v-card>
      </v-flex>
    </v-row>
    <v-row>
      <v-checkbox
        label="Hola"
      ></v-checkbox>
    </v-row>
  </v-flex>
</template>

<script>
export default {
  data(){
    return{
      datos
    }
  },
  async created(){
      const { token } = await this.$auth.$storage.getUniversal('adminDatas');
      try {
        this.datos = await this.$axios.get('/api/modulos',{
          headers : {
            token
          }
        });
      } catch (error) {
        this.datos = error;
      }
    }
}
</script>

<style>

</style>
