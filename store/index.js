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


export const mutations = {
  changeStatusUser ( status, datosUser ) {
    const { datos, modulos, token } = datosUser;

    status.userData.datos.idAdrministrador = datos.idAdrministrador;
    status.userData.datos.nombre = datos.nombre;
    status.userData.datos.correo = datos.correo;
    status.userData.datos.password = datos.password;

    status.userData.modulos.inicio = modulos.inicio;
    status.userData.modulos.fotos = modulos.fotos;
    status.userData.modulos.ilustraciones = modulos.ilustraciones;
    status.userData.modulos.juegosMesa = modulos.juegosMesa;
    status.userData.modulos.videojuegos = modulos.videojuegos;

    status.userData.token = token;
  }
}
