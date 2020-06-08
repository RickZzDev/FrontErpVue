<template>
    <div class="card bg-transparent border-0 col-md-10 col-lg-9"> 
        <div class="loaderBox mx-auto mt-4" :class="visibilityLoader">
            <Loader/>    
        </div>   
        <div :style="recovered" class="card-header border-bottom border-white text-white bg-transparent">
            <h3>Cadastro de cargos</h3>
        </div>
        <div class="card-body bg-transparent"  :style="recovered" id="divMainCard">
            <form method="POST" @submit.prevent="enviarDados">
                <div class="form-group">
                    <div class="card bgCard shadow text-white border-0 mb-4">
                        <div class="card-header  border-0 bg-transparent">
                            <h4>Informações sobre o cargo</h4>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-6 col-lg-4">
                                 <label>Nome do cargo</label>
                                 <input type="text" v-model="dados.label" :readonly='visualizar' required  class="form-control" name=""  /> 
                            </div>
                            <div class="form-group col-md-3 col-lg-4 mr-auto">
                                <label>Cbo</label>
                                <select name="" v-model="dados.cbo" :style="desabSelect"  class="form-control">
                                    <option  v-if="statusEditar == true" :value="dados.cbo">{{dados.cbo}}</option>
                                    <option value="" v-else>Escolha o cbo</option>
                                    <option v-for="(value) in arrayCbos"  :key="value.id" v-show="value.titulo_cbo != dados.cbo" :value="value.titulo_cbo"> {{ value.codigoCbo + ' ' +  value.titulo_cbo}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <BtnSave @click.native="desbloquearInputs" :style="opacity" v-if="visualizar" origin="empresa" edit="true" type="button" color="bg-warning" texto="Editar" :visible="visible"  />
                    <BtnSave :style="opacity" v-else color="bg-primary"  edit="false" type="submit" :texto="textoLogin" :visible="visible"  />
                </div>
            </form>                
        </div>
    </div>
</template>

<script>

import BtnSave from './BtnSave'
import Loader from './LoaderAnim'

export default {
    components:{
        BtnSave,
        Loader
    },
    name:'FormSeries',
    data:
        function(){
            return{
                editando:false,
                idCargo:'',
                statusEditar:false,
                visibilityLoader:'',
                recovered:"visibility:hidden;",
                desabSelect:null,
                visualizar:false, 
                //Estilizando spinner
                textoLogin:'Salvar',
                visible:'invisible',
                opacity:'opacity:1;',
                dNone:'d-none',
                //fim
                arrayCbos:[],
                dados:{   
                    label:null,
                    cbo:null,
                }
            }
    },
    methods:{
        desbloquearInputs(e){
            e.preventDefault()
            this.visualizar = false
            this.statusEditar = true
            this.desabSelect = ''
        },

        mudarEstadoBotao(status){
            if(status == 'salvando'){
                this.dNone = 'd-none'
                this.opacity = 'opacity:0.6;'
                this.textoLogin = "Salvando"
                this.visible="visible"
            }else{
                this.opacity = 'opacity:1'
                this.textoLogin = 'Salvar'
                this.visible="invisible"
                this.dNone = ''
            }
        },
        recuperarDados(){
            if(this.$route.query.editar){
                this.desabSelect = true
                this.statusEditar = true
                this.visualizar = false
            }else{
                this.visualizar = true
                this.statusEditar = false
            }
            const axios = require('axios')
            const headers = {
                'Token': localStorage.getItem('token')
            }

            axios
            .get(`${process.env.apiURL}cargos/${this.idCargo}`,{headers})
            .then(response => {
                
                this.dados = response.data
                this.visibilityLoader = 'd-none'
                this.recovered ="visibility:visible;"
            }).catch(erro => {
                this.visibilityLoader = 'd-none'
                this.recovered ="visibility:visible;"
                console.log(erro)
            })
        },
        async enviarDados(event){
            this.mudarEstadoBotao('salvando')
            const axios = require('axios')
            event.preventDefault()
            console.log(this.dados)
            if(this.statusEditar == true){
                try{
                    const headers = {
                    'Token':localStorage.getItem('token')
                    }
                    const retorno = await axios.put(`${process.env.apiURL}cargos/${this.idCargo}/`,this.dados, {headers})
                    if(retorno.status == 200){
                        this.$router.push({path:'/visualizar-cargos'})
                    }
                }catch(erro){
                      this.mudarEstadoBotao('normal')
                }
            }else{
                try{
                    const headers = {
                    'Token':localStorage.getItem('token')
                    }
                    const retorno = await axios.post(`${process.env.apiURL}cargos/`,this.dados, {headers})
                    
                    if(retorno.status == 201){
                        this.$router.push({path:'/visualizar-cargos'})
                    }
                }catch(erro){
                        console.log(this.dados)
                       this.mudarEstadoBotao('normal')
                }
            }
        }
    },
    watch:{
        $route: async (to,from) =>{
            window.location.reload()
        }
        
    },
    beforeCreate(){
        //Utilizando o axios para fazer requisições na API
        const axios = require('axios')
        const headers = {
            'Token': localStorage.getItem('token')
        }
        //REQ 1
        axios
        .get(`${process.env.apiURL}contratos/cbos`,{headers})
        .then(response => {  
          this.arrayCbos =  response.data
        })
     
    },
    created(){
        this.idCargo = this.$route.query.id
        if(this.idCargo != null){
            this.visualizar = true
            this.desabSelect = 'pointer-events:none;'
            this.recuperarDados()
        }else{
            this.visibilityLoader = 'd-none'
            this.recovered ="visibility:visible;"
        }
    }

}
</script>

<style scoped>

    .bgCard{
        background-color: rgba(0,48,255);  
    }



    .card-body{
        background-color: rgba(255, 255, 255, 0);
    }
    .loaderBox{
        width: 25px;
        height: 35px;
        font-size: 10vh;
        margin-top: 5%;
        color: rgb(34, 0, 187);
    }
   
</style>