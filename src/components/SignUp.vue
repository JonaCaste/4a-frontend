<template>
    <div>
        <div class="form form-signup">
            <h3>Registro</h3>
            <form v-on:submit.prevent="processSignUp">
                <input v-model="profesionalData.username" placeholder="Usuario"/>
                <input v-model="profesionalData.password" placeholder="Contraseña"/>
                <input v-model="profesionalData.tipoDocumento" placeholder="Tipo de documento"/>
                <input v-model="profesionalData.numeroDocumento" placeholder="Número de documento"/>
                <input v-model="profesionalData.perfil" placeholder="Especialidad"/>
                <p v-if="show_error" class="error">Usuario o contraseña incorrectos</p> 
                <button v-bind:class="{'disabled': is_loading}">
                    <span v-if="!is_loading">Ingresar</span>
                    <div v-if="is_loading" class="lds-dual-ring"></div>
                </button>
            </form>
        </div>
    </div>
</template>


<script>
import gql from "graphql-tag";
export default {
    name: "SignUp", 
    data: function() {
        return {
            show_error: false,
            is_loading: false,
            profesionalData:{
                username: "",
                password: "",
                tipoDocumento: "",
                numeroDocumento: "",
                perfil: "",
            }
        }
    }, 
    methods: {
        processSignUp: async function(){
            this.is_loading = true;

            this.profesionalData.numeroDocumento = +this.profesionalData.numeroDocumento;
            await this.$apollo.mutate({
                mutation: gql`
                    mutation CreateProfesional($profesionalData: ProfesionalSignup!) {
                        createProfesional(profesionalData: $profesionalData) {
                            key
                        }
                    }
                `,
                variables: {
                    profesionalData: this.profesionalData
                }
            })
            .then((result)=>{
                console.log("Peticion(Signup profesional) exitosa")
                this.is_loading = false;
                this.show_error = false;
                let data = {
                    username: this.profesionalData.username,
                    token: result.data.createProfesional.key
                }
                this.$emit("completedLogin", data);
            })
            .catch((error)=>{
                this.show_error = true;
                console.log("Peticion(Signup profesional) errada")
                console.log(error)
                this.is_loading = false;
            })
        }
    }, 
    created: function () {}
};
</script>


<style>

    .form-signup{
        top: 58%;
    }

</style>