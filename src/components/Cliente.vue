<template>
    <div>
        <div class="form form-signup">
            <h3>Registro Cliente</h3>
            <form v-on:submit.prevent="createCliente">
                <input v-model="clienteData.id" placeholder="Usuario"/>
                <input v-model="clienteData.tipoDocumento" placeholder="Contraseña"/>
                <input v-model="clienteData.numeroDocumento" placeholder="Tipo de documento"/>
                <input v-model="clienteData.nombre" placeholder="Número de documento"/>
                <input v-model="clienteData.sexo" placeholder="Número de documento"/>
                <input v-model="clienteData.edad" placeholder="Especialidad"/>
                <p v-if="show_error" class="error">Error al crear</p> 
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
    name: "Cliente", 
    data: function() {
        return {
            show_error: false,
            is_loading: false,
            clienteData:{
                id: "",
                tipoDocumento: "",
                numeroDocumento: "",
                nombre: "",
                sexo: "",
                edad: ""
            }
        }
    }, 
    methods: {
        createCliente: async function(){
            this.is_loading = true;

            this.clienteData.numeroDocumento = +this.clienteData.numeroDocumento;
            await this.$apollo.mutate({
                mutation: gql`
                    mutation Mutation($clienteData: ClienteInput!) {
                        createCliente(clienteData: $clienteData) {
                        id
                        tipoDocumento
                        numeroDocumento
                        nombre
                        sexo
                        edad
                    }
                }
                `,
                variables: {
                    clienteData: this.clienteData
                }
            })
            .then((result)=>{
                console.log("Peticion(Signup profesional) exitosa")
                this.is_loading = false;
                this.show_error = false;
                
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