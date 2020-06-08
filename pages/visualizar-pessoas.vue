<template>
    <div  class="container-fluid pl-0 pr-0" id="body">
        <Menu class="mb-2" />
        <div class="loaderBox mx-auto" :class="visibilityLoader">
            <Loader/>    
        </div>
        <div class="container overflowH" :class="visibilityContainer">
            <div class="row">
                <div class="col-lg-4" v-for="i in tamanhoArray" :key="i" :id="i">
                    <div class="card mb-2  mt-2 d-flex shadowCustom text-light" style="background:rgba(0,0,0,0.6)"  :id="i">
                        <div class="card-body">
                            <h5 class="card-title maxHeight">{{arrayPessoas[i - 1]['nome']}}</h5>
                            <div class=" card-text ">
                                CEP: {{arrayPessoas[i - 1]['endereco']['cep']}}
                            </div>
                            <div class="card-text ">
                                Gênero: {{arrayPessoas[i - 1]['sexo']['name']}}
                            </div>
                            <div class="row pl-3 pr-3">
                                <div class="col-3 pl-0 pr-0 ml-auto mr-2">
                                    <button type="button" class="btn fs-custom col-12 p-0 btn-outline-success">
                                        <router-link :to="{ path: '/cadastrar-pessoa', query: { id: arrayPessoas[i-1]['id'] }}">Ver Mais</router-link> 
                                    </button>
                                </div>
                                <div class="col-3 pl-0 pr-0">
                                    <button type="button" class="btn fs-custom col-12 p-0 btn-outline-warning ">
                                        <router-link :to="{ path: '/cadastrar-pessoa', query: { id: arrayPessoas[i-1]['id'], editar:true }}">Editar</router-link> 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    </div>
    
</template>

<script>

import Menu from '../components/Menu'
import Loader from '../components/LoaderAnim'

export default {
    components:{
        Menu,
        Loader
    },
    data:()=>
    {
        return{
            teste:"a",
            visibilityLoader:'',
            visibilityContainer:'d-none',
            arrayPessoas:[],
            tamanhoArray:null
        }
    },
    methods:{
            baseQuery(endpoint,method,id,idElemento){
            const axios = require('axios')

            const headers = {
                'Token': localStorage.getItem('token')
            }
          
 
        },

    
    },
    beforeCreate(){
        const axios = require('axios')

        const headers = {
            'Token': localStorage.getItem('token')
        }
       
        axios
        .get(`${process.env.apiURL}pessoas`,{headers})
        .then(response => {
            this.arrayPessoas = response.data
            this.tamanhoArray = this.arrayPessoas.length
            this.visibilityContainer = ''
            this.visibilityLoader = 'd-none'
        }).catch(erro => {
            console.log(erro)
        })
    }
}
</script>

<style scoped>

    a{
        text-decoration: none;
        color: inherit;
    }
    .overflowH{
        overflow: hidden;
    }


    .loaderBox{
        width: 25px;
        height: 35px;
        font-size: 10vh;
        margin-top: 5%;
        color: rgb(34, 0, 187);
    }

    #body{
     background-color: rgb(82, 165, 255);
     min-height: 100vh;        
    }

    .fs-custom{
        font-size: 13px;
    }

    .maxHeight{
        min-height: 48px;
        max-width: 500px;
    }

    .shadowCustom{
        -webkit-box-shadow: 0px 0px 16px -4px rgba(0,0,0,1);
        -moz-box-shadow: 0px 0px 16px -4px rgba(0,0,0,1);
        box-shadow: 0px 0px 16px -4px rgba(0,0,0,1);
    }

   
</style>