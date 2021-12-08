<template>
    <div>
        <div class="form">
            <h3>Iniciar Sesión</h3>
            <form v-on:submit.prevent="processLogIn">
                <input v-model="credentials.username" placeholder="Usuario"/>
                <input v-model="credentials.password" type="password" placeholder="Contraseña"/>
                <p v-if="show_error" class="error">Usuario o contraseña incorrectos</p> 
                <button v-bind:class="{'disabled': is_loading}">
                    <span v-if="!is_loading">Ingresar</span>
                    <div v-if="is_loading" class="lds-dual-ring"></div>
                    <!-- role:estatus -->
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
export default {
    name: "LogIn", 
    data: function() {
        return {
            show_error: false,
            is_loading: false,
            credentials: {
                username: "",
                password: ""
            }
        }
    }, 
    methods: {
        processLogIn: async function (){
            this.is_loading = true;

            //los mutate siempre tienen mutation y variables
            // await this.$apollo.mutate({
            //     mutation: gql`
            //         mutation Login($credentials: LoginInput!) {
            //             login(credentials: $credentials) {
            //                 key
            //             }*/
            //         }
            //     `,
            //     variables: {
            //         credentials: this.credentials
            //     }
            // })
            // .then((result) => {
            //     console.log("FUNCIONÓOOO")
            //     this.is_loading = false;
            //     this.show_error = false;
            //     let data = {
            //         username: this.credentials.username,
            //         token: result.data.login.key
            //     }
            //     //emitimos un mensaje al padre, para que oculte los botones
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
    .form{
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: #96e2e2;
        transform: translate(-50%, -50%);
        padding: 30px 40px;
        border-radius: 10px;
    }

    .form form{
        display: flex;
        flex-direction: column;
    }

    .form h3{
        text-align: center;
        margin-bottom: 30px;
        font-size: 20px;
    }

    .form input{
        margin-bottom: 30px;
        background-color: transparent;

        font-size: 15px;

        border: none;
        border-bottom: 1px solid #000;

        outline: none;
    }

    .form button{
        background-color: transparent;
        border-color: #000;
        border-radius: 5px;
        color: #000;
        font-size: 15px;
        padding: 5px;
    }

    .form button:hover{
        background-color: #000;
        color: #96e2e2;
    }

    .error{
        color: red;
        font-size: 15px;
    }

    .disabled{
        pointer-events: none;
        /* opacity: 0.6; */
    }

    @media (min-width: 500px) {
        .form h3{
            font-size: 25px;
        }

        .form input{
            font-size: 20px;
        }

        .form button{
            font-size: 20px;
        }
    }


    /* Loader */

        .lds-dual-ring {
            display: inline-block;
            width: 20px;
            height: 20px;
        }
        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 20px;
            height: 20px;
            margin: 0;
            border-radius: 50%;
            border: 2px solid #000;
            border-color: #000 transparent #000 transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    /*  */

</style>