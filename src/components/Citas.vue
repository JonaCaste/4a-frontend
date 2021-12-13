<template>
    <div class="">
        
        <!-- Creating Citas -->
        <div class="nuevoUsuari">
            <h4>Crea Cita Medica</h4>
            <input v-model="citaData.idCita" class=""  placeholder="Id cita">
            <input v-model="citaData.pacienteId" class=""   placeholder="Id paciente">
            <input v-model="citaData.profesionalId" class=""   placeholder="Id profesional">
            <input v-model="citaData.fecha" class=""   placeholder="Fecha">
            <input v-model="citaData.especialidad" class=""   placeholder="Especialidad">

            <button v-on:click="createCita" class="">Envíar</button>
        </div>
        <!-- Citas -->
        <table class="">
            <thead>
                <tr>
                    <th>Id Cita</th>
                    <th>Id Paciente</th>
                    <th>Id Profesional</th>
                    <th>Fecha</th>
                    <th>Especialidad</th>
            
                </tr>
            </thead>
            <tbody>
                <tr v-for="cita in citaByProfesional" :key="cita.idCita">
                    <td>{{cita.idCita}}</td>
                    <td>{{cita.pacienteId}}</td>
                    <td>{{cita.profesionalId}}</td>
                    <td>{{cita.fecha}}</td>
                    <td>{{cita.especialidad}}</td>
                    
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
         
            //datos para crear una cita
            citaData: {
                idCita: "",
                pacienteId: "",
                profesionalId: "",
                fecha: "",
                especialidad: ""
            },

            //estructura de la cita
            cita: {
                especialidad: "",
                fecha: "",
                profesionalId: "",
                pacienteId: "",
                idCita: "",
            },
            citaByProfesional: [],
            
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

.nuevoUsuari{
    display: flex;
    flex-direction: column;
}

   
</style>