<template>
  <div id="app">
    <div class="nav">
      <div class="nav-titulo">
        <img src="" alt="">
        <h2>Health app</h2>
      </div>
      <div class="nav-buttons">
        <button v-on:click="loadLogIn" v-if="!is_auth">Ingresar</button>
        <button v-on:click="loadSignUp" v-if="!is_auth">Registro</button>
        <button v-on:click="loadCliente" v-if="is_auth">Crear cliente</button>
        <button v-on:click="logout" v-if="is_auth">Cerrar sesión</button>
      </div>
      <button v-on:click="navResponsive" class="button-nav-responsive">---</button>
    </div>
    <div class="nav-buttons-responsive" v-bind:class="{'nav-buttons-responsive_active': navResponsive_isActive}">
        <button v-on:click="loadLogIn" v-if="!is_auth">Ingresar</button>
        <button v-on:click="loadSignUp" v-if="!is_auth">Registro</button>
        <button v-on:click="loadCliente" v-if="is_auth">Crear cliente</button>
        <button v-on:click="logout" v-if="is_auth">Cerrar sesión</button>
    </div>
    <router-view v-on:completedLogin="completedLogin"></router-view>
  </div>
</template>


<script>
export default {
    name: "App",                // Nombre del componente

    data: function() {          // Todas las variables de este componentes
      return {
        is_auth: false,
        navResponsive_isActive: false
      }
    }, 

    methods: {                  //todas las funciones que utiliza este componente

      verifyAuth(){
        this.is_auth = localStorage.getItem("is_auth") || false;
        if(this.is_auth){
          this.loadCitas();
        }else{
          this.loadLogIn();
        }
      },  

      loadLogIn(){
        this.$router.push({name: "LogIn"});     //pone logIn al final de la ruta
      },

      loadSignUp(){
        this.$router.push({name: "SignUp"});
      },

      loadCitas(){
        this.$router.push({name: "Citas"});
      },

      loadCliente(){
        this.$router.push({name: "Cliente"});
      },

      completedLogin(data){
        this.is_auth = true;
        localStorage.setItem("is_auth", true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        this.verifyAuth()
      },

      logout(){
        this.is_auth = false;
        localStorage.clear();
        this.verifyAuth()
      },

      navResponsive(){
        if(this.navResponsive_isActive == false) this.navResponsive_isActive = true;
        else this.navResponsive_isActive = false;
      }

    },
    created: function () {            //eventos, lo que pasa cuando el componente se inicia
      this.verifyAuth();              
    }
};
</script>


<style>

  body{
    margin: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    
    color: #000;
  }

  .nav{
    width: 90%;
    height: 15vh;

    display: flex;

    justify-content: space-between;
    align-items: center;

    background-color: #96e2e2;

    padding-left: 5%;
    padding-right: 5%;

    z-index: 3000;
  }

  .nav-titulo{
    display: flex;
    align-items: center;
  }

  .nav-buttons{
    display: none;
  }

  .nav-buttons button{

    border: none;
    background-color: transparent;

    font-weight: bold;
    font-size: 15px;

    color: #000;
  }

  /* Nav responsive */

  .nav-buttons-responsive{
    position: absolute;

    top: -100%;

    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 20px 0;

    background-color: #96e2e2;

    transition: all 0.8s;

    z-index: 2000;

  }

  .nav-buttons-responsive button{
    width: 50%;
    margin: 0 auto 10px auto;

    border: none;
    background-color: transparent;

    font-weight: bold;
    font-size: 15px;

    color: #000;
  }

  .button-nav-responsive{
    border: none;
    background-color: transparent;

    font-weight: bold;
    font-size: 15px;

    color: #000;
  }
  
  .nav-buttons-responsive_active{
    top: 15vh;
  }

  @media (min-width: 500px) {
    .nav-buttons{
      display: block;
    }

    .button-nav-responsive{
      display: none;
    }

    .nav-buttons-responsive{
      display: none;
    }
  }

  /*  */

</style>
