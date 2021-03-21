<template>
  <v-container>
    <v-layout justify-center align-center style="height : 700px">
      <v-flex xs6>
        <v-card
          elevation="10"
          outlined
        >
          <v-container>
            <v-layout wrap>
              <v-row class="mt-5 mb-5">
                <v-flex xs3 />
                <v-flex xs6>
                  <p class="display-1 text--primary text-center">
                    Game app
                  </p>
                </v-flex>
                <v-flex xs3 />
              </v-row>
              <v-flex xs12>
                <v-form
                  ref="form"
                  lazy-validation
                >
                  <v-row class="mb-5">
                    <v-flex xs1 />
                    <v-flex xs10>
                      <v-text-field
                        v-model="correo"
                        :error-messages="correoErrors"
                        label="Correo"
                        required
                        type="email"
                        @input="$v.correo.$touch()"
                        @blur="$v.correo.$touch()"
                      />
                      <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        label="Password"
                        required
                        type="password"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                      />
                    </v-flex>
                    <v-flex xs1 />
                  </v-row>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions class="mb-5 justify-center">
            <v-btn
              color="primary"
              depressed
              elevation="7"
              large
              rounded
              x-large
              @click="logIn"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <DialogPer
      :msg="responseA.msg"
      :title="responseA.title"
      :dialog="responseA.dialog"
    />
    <DialogLoa
      :dialog="DialogLoad"
    />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { validationMixin } from 'vuelidate'
import { required, email, alphaNum } from 'vuelidate/lib/validators'
import DialogLoa from '~/components/DialogLoader'
import DialogPer from '~/components/DialogPersistent'

export default {
  components: {
    DialogPer, DialogLoa
  },
  mixins: [validationMixin],
  validations: {
    correo: { required, email },
    password: { required, alphaNum }
  },
  layout: 'login',
  data () {
    return {
      correo: '',
      password: '',
      responseA: {
        dialog: false,
        title: '',
        msg: ''
      },
      DialogLoad: false,
      errores: []
    }
  },
  computed: {
    correoErrors () {
      const errors = []
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.errores = errors
      if (!this.$v.correo.$dirty) { return errors }
      !this.$v.correo.email && errors.push('Must be valid e-mail')
      !this.$v.correo.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.errores = errors
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    ...mapState(['userData'])
  },
  watch: {
    password () {
      this.responseA.dialog = false
    },
    correo () {
      this.responseA.dialog = false
    }
  },
  methods: {
    ...mapMutations(['changeStatusUser']),
    async logIn () {
      if (this.errores.length === 0) {
        this.DialogLoad = true
        try {
          const { data } = await this.$axios.post('/api/login', {
            email: this.correo,
            password: this.password
          })

          const datasMA = await this.$axios.get(`/api/MA/${data.msg.idAdrministrador}`, {
            headers: {
              token: data.token
            }
          })
          const { msg } = datasMA.data

          const datosUser = {
            datos: {
              idAdrministrador: data.msg.idAdrministrador,
              nombre: data.msg.Nombre,
              correo: data.msg.Correo,
              password: data.msg.Password
            },
            modulos: {
              inicio: msg[0].estado,
              fotos: msg[1].estado,
              ilustraciones: msg[2].estado,
              juegosMesa: msg[3].estado,
              videojuegos: msg[4].estado
            },
            token: data.msg.token
          }

          this.changeStatusUser(datosUser)

          this.DialogLoad = false
          await this.$auth.$storage.setUniversal('userDatas', datosUser)
          this.$router.push('/')
        } catch (error) {
          const { data } = error.response
          const { ok, msg } = data
          this.DialogLoad = false

          this.errorResponses(ok, msg)
        }
      }
    },
    errorResponses (ok, msg) {
      if (ok === false) {
        if (msg.password != null) {
          const { password } = msg
          this.responseA.title = 'Errores'
          this.responseA.msg = password.msg
          this.responseA.dialog = true
          return
        }
        this.responseA.title = 'Alerta!'
        this.responseA.msg = msg
        this.responseA.dialog = true
      }
    }
  }
}
</script>

<style scoped>

</style>
