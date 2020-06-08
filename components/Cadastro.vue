<template>
    <div id="layout" class="container" >
        <div class="row justify-content-center">
            <div class="box-branco  pt-5 pl-4 pr-4 pb-3 mt-5 bg-light">
                <LogoUpp  />
                <form action="localhost:3000" method="post">
                    <div class="row mb-4">
                        <div class="col">
                            <input type="text"  class="form-control bg-light login" v-model="dados.username" placeholder="Como quer ser chamado?">
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col">
                            <input type="email"  class="form-control bg-light password" placeholder="Digite seu email">
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col">
                            <input type="email"  class="form-control bg-light password" v-model="dados.email" placeholder="Confirme seu email">
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col">
                            <input type="password"  class="form-control bg-light password" placeholder="Digite sua senha">
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col">
                            <input type="password"  class="form-control bg-light password" v-model="dados.password" placeholder="Confirme sua senha">
                        </div>
                    </div>
                    <div class="row">
                        <BtnSave texto = "Entrar" @click.native="enviarDados($event)"/>
                    </div>
                    <div class="row  mt-5">
                        <div class="col-6 fs-15"><a href="">Esqueceu a senha?</a></div>
                        <div class="col-6 fs-15"><a href="">Ainda não tem conta?</a></div>
                    </div>                  
                </form>  
            </div>
       </div>
    </div>
</template>
<script>

import LogoUpp from './LogoUpp'
import BtnSave from './BtnSave'
import Router from 'vue-router';


export default {
    components:{
        LogoUpp,
        BtnSave
    },
    data(){
        return{
            dados:{
                username:'',
                email:'',
                password:''
            },
            created:""
        }   
    },
    methods:{
        enviarDados(event){

            const axios = require('axios')
            event.preventDefault()
            axios.post('https://testfolha.pxsear.ch/api/cadastro/', this.dados)
            .then(function (response){
            })
            .catch(function (error) {
                console.log(error);
            });
   
            this.$router.push({path: '/login'})
            
        }
    }
}
</script>

<style scoped>
    a{
        text-decoration: none;
        color: gray;
    }

    .login::placeholder{
        color: rgb(0,48,255);
    }
    .password::placeholder{
        color: rgb(0,48,255);
    }

    .login{
        border-right-style: none;
        border-top-style: none;
        border-left-style: none;
        background-color: none;
        border-radius: 0px;
        border-color: rgb(0,48,255);
        color: rgb(0,48,255);
    }

    .password{
        border-right-style: none;
        border-top-style: none;
        border-left-style: none;
        background-color: none;
        border-radius: 0px;
        border-color: rgb(0,48,255);
        color: rgb(0,48,255);
    }

    .fs-15{
        font-size: 15px;
    }

    #layout{
        width: 100vw;
        height: 100%;
        background-color:rgb(0,48,255);
    }


    .box-branco{
        border-radius: 20px;
    }

</style>