export const state = () => ({
  userData : {
    datos : {
      idAdrministrador : null,
      nombre : '',
      correo : '',
      password : ''
    },
    modulos : {
      inicio : false,
      fotos : false,
      ilustraciones : false,
      juegosMesa : false,
      videojuegos : false
    },
    token : ''
  }
});

export const getters = {

}

export const mutations = {
  changeStatusUser ( status, token ) {
    status.userData.token = token;
  }
}
