<template>
    <div  class="container-fluid pl-0 pr-0" id="body">
        <Menu class="mb-2" />
       <div class="loaderBox mx-auto" :class="visibilityLoader">
            <Loader/>    
        </div>
        <div class="container  overflowH" :class="visibilityContainer">
            <div class="row " >
                <div class="col-lg-4 pt-2 pb-2" :id="i" v-for="i in tamanhoArray" :key="i">
                    <div class="card mb-2 mt-2 mr-auto text-light  shadowCustom transitionCustom" style="background:rgba(0,0,0,0.6)"  :id="i">
                        <div class="card-body">
                            <h5 class="card-title">{{arrayEmpresas[i - 1]['apelido']}}</h5>
                            <div class=" card-text ">
                                Telefone: {{arrayEmpresas[i - 1]['telefone_ddd']}}
                            </div>
                            <div class="card-text ">
                                Email: {{arrayEmpresas[i - 1]['email']}}
                            </div>
                            <div class="row">
                                <div class="col-3 ml-auto mr-3 pl-0 pr-0">
                                    <button type="button" class="btn fs-custom col-12 p-0 btn-outline-success" >
                                        <router-link  :to="{ path: '/cadastrar-empresa', query: { id: arrayEmpresas[i-1]['id'] }}">Ver Mais</router-link> 
                                    </button>
                                </div>
                                <div class="col-3  pl-0 pr-0">
                                    <button type="button" class="btn fs-custom col-9 p-0 btn-outline-warning">
                                        <router-link  :to="{ path: '/cadastrar-empresa', query: { id: arrayEmpresas[i-1]['id'], editar:true }}">Editar</router-link> 
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
    methods:{
    
        baseQuery(endpoint,method,id,idElemento){
            const axios = require('axios')

            const headers = {
                'Token': localStorage.getItem('token')
            }
            if(method == 'get'){
                axios.get(`${process.env.apiURL + endpoint}`,{headers})
                    .then(response => {
                        this.arrayEmpresas = response.data
                        this.tamanhoArray = this.arrayEmpresas.length
                        this.visibilityContainer = ''
                        this.visibilityLoader = 'd-none'
                    }).catch(erro => {
                        console.log(erro)
                    })
            }
        },

        excluirEmpresa(id,idElemento){
            this.baseQuery('empresas','delete',id,idElemento)
        }
        
       
    },
    data:()=>
    {
        return{
            visibilityLoader:'',
            visibilityContainer:'d-none',
            arrayEmpresas:[],
            tamanhoArray:null
        }
    },
    beforeCreate(){
        const axios = require('axios')

        const headers = {
            'Token': localStorage.getItem('token')
        }
       
        axios
        .get(`${process.env.apiURL}empresas`,{headers})
        .then(response => {
            this.arrayEmpresas = response.data
            this.tamanhoArray = this.arrayEmpresas.length
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
        
    }

    .overflowH{
        overflow: hidden;
    }

    .maxHeight{
        max-height: 350px;
        max-width: 500px;
    }

    .transitionCustom{
        max-height: 150px;
        transition: 0.5s;
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