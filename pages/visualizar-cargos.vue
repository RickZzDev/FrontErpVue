<template>
    <div  class="container-fluid pl-0 pr-0" id="body">
        <Menu class="mb-2" />
       <div class="loaderBox mx-auto" :class="visibilityLoader">
            <Loader/>    
        </div>
        <div class="container  overflowH" :class="visibilityContainer">
            <div class="row " >
                <div class="col-lg-4 pt-2 pb-2" :id="i" v-for="i in tamanhoArray" :key="i">
                    <div class="card mb-2 mt-2 mr-auto text-light  shadowCustom" style="background:rgba(0,0,0,0.6)"  :id="i">
                        <div class="card-body">
                            <div class="card-title ">
                                Cargo: {{arrayCargos[i - 1]['label']}}
                            </div>
                            <div class=" card-text ">
                                CBO: {{arrayCargos[i - 1]['cbo']}}
                            </div>       
                            <div class="row">
                                <div class="col-3 ml-auto mr-3 pl-0 pr-0">
                                    <button type="button" class="btn fs-custom col-12 p-0 btn-outline-success" >
                                        <router-link  :to="{ path: '/cadastrar-cargo', query: { id: arrayCargos[i-1]['id'] }}">Ver Mais</router-link> 
                                    </button>
                                </div>
                                <div class="col-3  pl-0 pr-0">
                                    <button type="button" class="btn fs-custom col-9 p-0 btn-outline-warning">
                                        <router-link  :to="{ path: '/cadastrar-cargo', query: { id: arrayCargos[i-1]['id'], editar:true }}">Editar</router-link> 
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
            visibilityLoader:'',
            visibilityContainer:'d-none',
            arrayCargos:[],
            tamanhoArray:null
        }
    },
    beforeCreate(){
        const axios = require('axios')

        const headers = {
            'Token': localStorage.getItem('token')
        }
       
        axios
        .get(`${process.env.apiURL}cargos`,{headers})
        .then(response => {
            this.arrayCargos = response.data
            this.tamanhoArray = this.arrayCargos.length
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

    #body{
        background-color: rgb(82, 165, 255);
        min-height: 100vh !important;
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
     min-height: 100vh;        
    }

    .fs-custom{
        font-size: 13px;
    }

    .shadowCustom{
        -webkit-box-shadow: 0px 0px 16px -4px rgba(0,0,0,1);
        -moz-box-shadow: 0px 0px 16px -4px rgba(0,0,0,1);
        box-shadow: 0px 0px 16px -4px rgba(0,0,0,1);
    }
</style>