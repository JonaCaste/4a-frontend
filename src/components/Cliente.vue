<template>
    <div>
        <div class="form form-signup">
            <h3>Registro Cliente</h3>
            <form v-on:submit.prevent="createCliente">
                <input v-model="clienteData.tipoDocumento" placeholder="Tipo documento"/>
                <input v-model="clienteData.numeroDocumento" placeholder="Número de documento"/>
                <input v-model="clienteData.nombre" placeholder="Nombre"/>
                <input v-model="clienteData.sexo" placeholder="Sexo"/>
                <input v-model="clienteData.edad" placeholder="Edad"/>
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
            this.clienteData.edad = +this.clienteData.edad;
            await this.$apollo.mutate({
                mutation: gql`
                    mutation CreateCliente($clienteData: ClienteInput!) {
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
                console.log("Peticion(Signup cliente) exitosa")
                this.is_loading = false;
                this.show_error = false;
                
            })
            .catch((error)=>{
                this.show_error = true;
                console.log("Peticion(Signup cliente) errada")
                console.log(error)
                this.is_loading = false;
            })
        }
    }, 
    created: function () {}
};
</script>


<style>
</style>