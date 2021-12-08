<template>
    <div>
        <div class="form">
            <h3>Registro</h3>
            <form v-on:submit.prevent="processSignUp">
                <input v-model="signupData.username" placeholder="Usuario"/>
                <input v-model="signupData.password1" placeholder="Contraseña"/>
                <input v-model="signupData.password2" placeholder="Confirmar Contraseña"/>
                <input v-model="signupData.balance" placeholder="Balance"/>
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
            signupData:{
                /*username: "",
                password1: "",
                password2: "",
                balance: ""*/
            }
        }
    }, 
    methods: {
        processSignUp: async function(){
            this.is_loading = true;
            this.signupData.balance = +this.signupData.balance;
            // await this.$apollo.mutate({
            //     mutation: gql`
            //     mutation SignUp($signupData: SignupInput!) {
            //         signUp(signupData: $signupData) {
            //             key
            //         }
            //     }`,
            //     variables: {
            //         signupData: this.signupData
            //     }
            // })
            // .then((result)=>{
            //     console.log("FUNCIONÓOOO")
            //     this.is_loading = false;
            //     this.show_error = false;
            //     let data = {
            //         username: this.signupData.username,
            //         token: result.data.signUp.key
            //     }
            //     this.$emit("completedLogin", data);
            // })
            // .catch((error)=>{
            //     this.show_error = true;
            //     console.log("DIO ERROR :c")
            //     console.log(error)
            //     this.is_loading = false;
            // })
        }
    }, 
    created: function () {}
};
</script>


<style>
</style>