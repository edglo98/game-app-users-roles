
<template>
  <v-row justify="center">
    <DialogLoa
      :dialog="DialogLoad"
    />
    <DialogPer
      ref="dialodperr"
      :msg="responseA.msg"
      :title="responseA.title"
      :dialog="dialogRes"
    />
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          ¿Agregar usuario?
          {{pruebas}}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="addUser()"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import DialogLoa from '~/components/DialogLoader'
import DialogPer from '~/components/DialogPersistent'

export default {
  components : {
    DialogLoa,
    DialogPer
  },
  data() {
    return {
      dialog: false,
      DialogLoad : false,
      dialogRes: false,
      responseA: {
        title: '',
        msg: ''
      },
      pruebas : ''
    }
  },
  props : ['datas'],
  watch : {
    dialog(oldV, newV)
    {
      if(oldV === true){
        this.dialogRes = false;
      }
    }
  },
  methods : {
    showDialog(){
      this.$refs.dialodperr.downDialog();
      this.dialog = true;
    },
    async addUser(){
      this.$refs.dialodperr.downDialog();
      this.DialogLoad = true;
      try {
        const datosUser = {
          nombre : this.datas.nombre,
          correo : this.datas.correo,
          password : this.datas.password
        }
        const { data } = await this.$axios.post('/api/admin', datosUser, {
            headers : {
              token : this.datas.token
            },
        })
        await this.addModules( data.id );
        this.DialogLoad = false;
        this.dialog = false;
        location.reload();
      } catch (error) {
        // this.pruebas = error.response
        const { data } = error.response
        const { ok, msg } = data
        this.DialogLoad = false

        this.errorResponses(ok, msg)
      }

    },
    errorResponses (ok, msg) {
      this.dialog = false;
      if (ok === false) {
        if (msg.password != null) {
          const { password } = msg
          this.responseA.title = 'Errores'
          this.responseA.msg = password.msg
          this.dialogRes = true
          return
        }
        this.responseA.title = 'Alerta!'
        this.responseA.msg = msg
        this.dialogRes = true
      }
    },
    async addModules( id ){
      const mod9 = {
          idm : 9,
          ida : Number(id),
          estado : this.datas.modulesChe.inicio === true ? 1 : 0
      }
      const mod10 = {
          idm : 10,
          ida : Number(id),
          estado : this.datas.modulesChe.fotos === true ? 1 : 0
      }
      const mod11 = {
          idm : 11,
          ida : Number(id),
          estado : this.datas.modulesChe.ilustraciones === true ? 1 : 0
      }
      const mod12 = {
          idm : 12,
          ida : Number(id),
          estado : this.datas.modulesChe.mesa === true ? 1 : 0
      }
      const mod13 = {
          idm : 13,
          ida : Number(id),
          estado : this.datas.modulesChe.videojuegos === true ? 1 : 0
      }

      const header2 = { headers : { token : this.datas.token }};
      try {
        await this.$axios.post('/api/MA', mod9, header2);
        await this.$axios.post('/api/MA', mod10, header2);
        await this.$axios.post('/api/MA', mod11, header2);
        await this.$axios.post('/api/MA', mod12, header2);
        await this.$axios.post('/api/MA', mod13, header2);
      } catch (error) {
      }
    }
  }
}
</script>

<style>

</style>
