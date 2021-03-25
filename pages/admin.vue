<template>
  <v-app>
    <v-container v-if="loading">
      <v-layout justify-center align-center class="mt-5">
        <v-flex xs6 class="mr-5">
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
                    <v-form
                      lazy-validation
                      ref="form"
                    >
                      <v-text-field
                        label="Nombre"
                        required
                        v-model="nombre"
                        @input="$v.nombre.$touch()"
                        @blur="$v.nombre.$touch()"
                        :error-messages="nombreErrors"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Correo"
                        required
                        v-model="correo"
                        type="email"
                        @input="$v.correo.$touch()"
                        @blur="$v.correo.$touch()"
                        :error-messages="correoErrors"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Contraseña"
                        required
                        v-model="password"
                        type="password"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        :error-messages="passwordErrors"
                      >
                      </v-text-field>

                      <v-text-field
                        v-if="!enable"
                        label="Contraseña"
                        required
                        v-model="password2"
                        type="password"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        :error-messages="passwordErrors"
                      >
                      </v-text-field>
                    </v-form>
                  </v-flex>
                  <v-flex xs1></v-flex>
                </v-row>
              </v-card>
            </v-flex>
          </v-row>
          <v-row>
            <v-layout class="mt-2" justify-center>
              <v-checkbox
                :label="'Página de inicio'"
                v-model="modulesChe.inicio"
                disabled
              ></v-checkbox>
              <v-checkbox
                :label="'Página fotos'"
                v-model="modulesChe.fotos"
              ></v-checkbox>
              <v-checkbox
                :label="'Página de ilustraciones'"
                v-model="modulesChe.ilustraciones"
              ></v-checkbox>
              <v-checkbox
                :label="'Página de juegos de mesa'"
                v-model="modulesChe.mesa"
              ></v-checkbox>
              <v-checkbox
                :label="'Página de videojuegos'"
                v-model="modulesChe.videojuegos"
              ></v-checkbox>
            </v-layout>
          </v-row>
          <v-btn
            v-if="enable"
            class="mt-5 success"
            block
            @click="openModal"
          >
            Guardar
          </v-btn>
          <v-btn
            v-if="!enable"
            class="mt-5 success"
            block
            :disabled="!activar"
            @click="$refs.updateDialog.showDialog()"
          >
            Actualizar
          </v-btn>
          <v-btn
            v-if="!enable"
            class="mt-5 red"
            block
            @click="$refs.deleteDialog.showDialog()"
          >
            Eliminar
          </v-btn>
          <v-btn
            v-if="!enable"
            class="mt-2 error"
            block
            @click="cancel"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="mt-2 secondary"
            block
            @click="reset"
          >
            Limpiar campos
          </v-btn>
        </v-flex>
        <v-flex class="ml-5" style="height : 300px" xs6 md6>
          <v-data-table
            :headers="headers"
            :items-per-page="10"
            :items="administradores"
          >
          <template v-slot:[`item.action`]="{ item }">
            <v-icon @click="getData(item)">mdi-pencil</v-icon>
          </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <AddDialog
        ref="addDialog"
        :datas="{
          nombre,
          correo,
          password,
          modulesChe,
          token : datosAdmin.token
        }"
        />
        <UpdateDialog
        ref="updateDialog"
        :datas="{
          nombre,
          correo,
          password,
          modulesChe,
          id,
          token : datosAdmin.token
        }"
        />
        <DeleteDialog
        ref="deleteDialog"
        :datas="{
          id,
          token : datosAdmin.token
        }"
        />
    </v-container>
    <div v-else>
      <ErrorC />
    </div>
  </v-app>
</template>

<script>
import { required, email, alphaNum, } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

import ErrorC from '~/components/error';
import FormsUsers from '~/components/FormUsers';
import AddDialog from '~/components/AddDialos';
import UpdateDialog from '~/components/updateDialog';
import DeleteDialog from '~/components/deleteDialog';

export default {
  components : {
    ErrorC,
    FormsUsers,
    AddDialog,
    UpdateDialog,
    DeleteDialog
  },
  mixins: [validationMixin],
  validations: {
    correo: { required, email },
    password: { required, alphaNum },
    nombre: { required }
  },
  computed : {
    correoErrors () {
      const errors = []
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.errores = errors
      if (!this.$v.correo.$dirty) { return errors }
      !this.$v.correo.email && errors.push('Debe ser un correo valido')
      !this.$v.correo.required && errors.push('El correo es requerido')
      return errors
    },
    passwordErrors () {
      const errors = []
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.errores = errors
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.required && errors.push('Contraseña es requerido')
      return errors
    },
    nombreErrors () {
      const errors = []
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.errores = errors
      if (!this.$v.nombre.$dirty) { return errors }
      !this.$v.nombre.required && errors.push('El nombre es requerido')
      return errors
    },
  },
  data(){
    return {
      loading : true,
      enable : true,
      datosAdmin : '',
      activar: false,
      id: null,
      nombre : '',
      correo : '',
      password : '',
      password2 : '',
      modulesChe : {
        inicio : true,
        fotos : false,
        ilustraciones : false,
        mesa : false,
        videojuegos : false
      },
      modules : [],
      administradores : [],
      errores : [{'a': 'a'}, {'v':'v'},],
      headers : [
        { text: "Nombre", align: "center", value: "Nombre", sortable: true },
        { text: "Correo", align: "center", value: "Correo", sortable: true },
        { text: "Editar", align: "center", value: "action", sortable: false },
      ]
    }
  },
  async created(){
    const datosAd = await this.$auth.$storage.getUniversal('adminDatas');
    this.datosAdmin = datosAd;
    await this.getAdmin();

    if(datosAd === undefined){
      this.loading = false;
    }
  },
  methods : {
    async getAdmin(){
      this.administradores = [];
      try {
        const { data } = await this.$axios.get('/api/admin', {
          headers : {
            token : this.datosAdmin.token
          }
        });
        for( let i = 0; i < data.msg.length; i++){
          this.administradores.push(data.msg[i]);
        }
      } catch (error) {
        this.administradores = error.response;
      }
    },
    async getData( item ){
      console.log(item)
      this.enable = false;
      this.correo = item.Correo;
      this.nombre = item.Nombre;
      this.password = item.Password;
      this.activar = false;
      this.id = item.idAdrministrador;
      await this.getModuleUse(item.idAdrministrador)
    },
    async getModuleUse( id ){
      try {
        const { data } = await this.$axios.get(`/api/MA/${id}`,{
          headers : {
            token : this.datosAdmin.token
          }
        })
        this.modulesChe.inicio = data.msg[0].estado;
        this.modulesChe.fotos = data.msg[1].estado;
        this.modulesChe.ilustraciones = data.msg[2].estado;
        this.modulesChe.mesa = data.msg[3].estado;
        this.modulesChe.videojuegos = data.msg[4].estado;

      } catch (error) {
        this.modules = error.response
      }
    },
    reset(){
      this.$refs.form.reset();
      this.modulesChe.inicio = true;
    },
    cancel(){
      this.enable = true;
      this.$refs.form.reset();
      this.modulesChe.inicio = true;
      this.modulesChe.fotos = false;
      this.modulesChe.ilustraciones = false;
      this.modulesChe.mesa = false;
      this.modulesChe.videojuegos = false;
    },
    openModal(){
      if (this.errores.length === 0) {
        this.$refs.addDialog.showDialog()
      }
    },
    activarBotones(){
      this.enable = true;
    }
  },
  watch : {
    password2(newV, oldV){
      if(newV == this.password){
        this.activar =true;
      }else{
        this.activar = false;
      }

    }
  }
}
</script>

<style>

</style>
