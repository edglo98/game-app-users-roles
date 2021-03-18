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
                <v-flex xs3></v-flex>
                <v-flex xs6>
                  <p class="display-1 text--primary text-center">Game app</p>
                </v-flex>
                <v-flex xs3></v-flex>
              </v-row>
              <v-flex xs12>
                <v-form
                  ref="form"
                  lazy-validation
                >
                  <v-row class="mb-5">
                    <v-flex xs1></v-flex>
                    <v-flex xs10>
                      <v-text-field
                        :error-messages="correoErrors"
                        v-model="correo"
                        label="Correo"
                        required
                        type="email"
                        @input="$v.correo.$touch()"
                        @blur="$v.correo.$touch()"
                      ></v-text-field>
                      <v-text-field
                        :error-messages="passwordErrors"
                        v-model="password"
                        label="Password"
                        required
                        type="password"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs1></v-flex>
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

            >Login</v-btn>
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
    {{pruebas}}
    {{userData}}
  </v-container>
</template>

<script>
  import DialogPer from '~/components/DialogPersistent';
  import DialogLoa from '~/components/DialogLoader';
  import { mapState, mapMutations } from 'vuex';

  import { validationMixin } from 'vuelidate'
  import { required, email, alphaNum } from 'vuelidate/lib/validators'

export default {
  components : {
    DialogPer, DialogLoa
  },
  mixins: [validationMixin],
  validations: {
    correo: { required, email },
    password: {required, alphaNum}
  },
  layout : 'login',
  data(){
    return {
      correo : '',
      password : '',
      responseA : {
        dialog : false,
        title : '',
        msg : ''
      },
      DialogLoad : false,
      errores : [],
      pruebas : ''
    }
  },
  computed : {
    correoErrors () {
      const errors = []
      this.errores = errors;
      if (!this.$v.correo.$dirty) return errors
      !this.$v.correo.email && errors.push('Must be valid e-mail')
      !this.$v.correo.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      this.errores = errors;
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    ...mapState(['userData'])
  },
  methods : {
    ...mapMutations(['changeStatusUser']),
    async logIn(){
      if(this.errores.length === 0){
        this.DialogLoad = true;
        try {
          const { data } = await this.$axios.post('/api/login', {
            email: this.correo,
            password: this.password
          });

          // this.responseA.msg = data;
          this.pruebas = data.token;
          try {
            this.changeStatusUser(data);
          } catch (err) {
            this.pruebas = err;
          }

          this.DialogLoad = false;
        } catch (error) {

          const { data } = error.response;
          const { ok, msg } = data;
          this.DialogLoad = false;

          if(ok === false){
            if(msg.password != null){
              const { password } = msg;
              this.responseA.title = 'Errores';
              this.responseA.msg = password.msg;
              this.responseA.dialog = true;
              return;
            }
            this.responseA.title = 'Alerta!';
            this.responseA.msg = msg;
            this.responseA.dialog = true;
          }
        }
      }
    },
  },
  watch : {
    password : function() {
      this.responseA.dialog = false;
    },
    correo : function() {
      this.responseA.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>
