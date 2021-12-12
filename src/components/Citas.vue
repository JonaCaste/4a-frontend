<template>
    <div class="">
        
        <!-- Creating Citas -->
        <div class="">
            <h4>Crea Cita Medica</h4>
            <input v-model="transaction.idCita" class=""  placeholder="Usuario Origen">
            <input v-model="transaction.pacienteId" class=""   placeholder="Usuario Destino">
            <input v-model="transaction.profesionalId" class=""   placeholder="Valor">
            <input v-model="transaction.fecha" class=""   placeholder="Valor">
            <input v-model="transaction.especialidad" class=""   placeholder="Valor">

            <button v-on:click="CreateCita" class="">Envíar</button>
        </div>
        <!-- Citas -->
        <table class="">
            <thead>
                <tr>
                    <th>Id Cita</th>
                    <th>Id Paciente</th>
                    <th>Id Profesional</th>
                    <th>Fecha</th>
                    <th>especialidad</th>
            
                </tr>
            </thead>
            <tbody>
                <tr v-for="citaData in citaByProfesional" :key="citaData.idCita">
                    <td>{{citaData.idCita}}</td>
                    <td>{{citaData.pacienteId}}</td>
                    <td>{{citaData.profesionalId}}</td>
                    <td>{{citaData.fecha}}</td>
                    <td>{{citaData.especialidad}}</td>
                    
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import gql from "graphql-tag";
export default {
    name: "Citas", 
    data: function() {
        return {
            username: localStorage.getItem("username") || "none",
         
            citaByProfesional: [],
            citaData: {
                "idCita": "",
                "pacienteId": "",
                "profesionalId": "",
                "fecha": "",
                "especialidad": ""
            }
        }
    }, 
    apollo: {
        citaByProfesional: {
            query: gql`
                query CitaByProfesional($profesionalId: String!) {
                    citaByProfesional(profesionalId: $profesionalId) {
                        especialidad
                        fecha
                        profesionalId
                        pacienteId
                        idCita
                    }
                }
            `,
            variables() {
                return {
                    profesionalId: this.username,
                };
            },
        }

    },
    methods: {
        
        createCita: async function(){
            await this.$apollo.mutate({
                mutation: gql`
                 mutation CreateCita($citaData: CitaInput!) {
                    createCita(citaData: $citaData) {
                    idCita
                    pacienteId
                    profesionalId
                    fecha
                    especialidad
                }
                }`,
                variables: {
                    citaData: this.citaData
            
                }
            })
            .then((result)=>{
                 this.$apollo.queries.citaByProfesional.refetch();
                 this.citaData.idCita = ""
                 this.citaData.pacienteId = ""
                 this.citaData.profesionalId = ""
                 this.citaData.fecha = ""
                 this.citaData.especialidad = ""
            })
            .catch((error)=>{
                console.log(error)
            })
        
        }
    }, 
    created: function () {
        this.$apollo.queries.citaByProfesional.refetch();
        
    }
};
</script>


<style scoped>
   
</style>