<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card v-if="dialog">
        <v-card-title class="headline">
          {{title}}
        </v-card-title>
        <v-card-text>{{msg}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props : {
      msg : String,
      title : String,
      dialog : Boolean
    },
    created(){
      this.dialog = false;
    }
  }
</script>

<style>

</style>
