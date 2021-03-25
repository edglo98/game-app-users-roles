
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
          ¿Eliminar usuario?
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
      this.DialogLoad = true;
      try {
        await this.$axios.delete('/api/MA/'+this.datas.id, {
            headers : {
              token : this.datas.token
            },
        });
        await this.$axios.delete('/api/admin/'+this.datas.id, {
            headers : {
              token : this.datas.token
            },
        });

        this.DialogLoad = false;
        this.dialog = false;
        // location.reload();
        this.$parent.$parent.getAdmin();
        this.$parent.$parent.reset();
        this.$parent.$parent.activarBotones();
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
  }
}
</script>

<style>

</style>
