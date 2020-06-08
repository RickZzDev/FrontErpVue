<template>
    <div class="card bg-transparent border-0 col-md-10 col-lg-9"> 
        <div class="loaderBox mx-auto mt-4" :class="visibilityLoader">
            <Loader/>    
        </div>   
        <div :style="recovered" class="card-header border-bottom border-white text-white bg-transparent">
            <h3>Cadastro de apolices</h3>
        </div>
        <div class="card-body bg-transparent"  :style="recovered" id="divMainCard">
            <form method="POST" @submit.prevent="enviarDados">
                <div class="form-group">
                    <div class="card bgCard shadow text-white border-0 mb-4">
                        <div class="card-header  border-0 bg-transparent">
                            <h4>Dados Apolice</h4>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-6 col-lg-4">
                                 <label>Numero</label>
                                 <input type="text" v-model="dados.numero" :readonly='visualizar' required  class="form-control" name=""  /> 
                            </div>
                            <div class="form-group col-md-3 col-lg-4">
                                <label>Data de emissão</label>
                                <input type="date" v-model="dados.data_emissao" :readonly='visualizar' required class="form-control" name="razao_social" />
                            </div>
                            <div class="form-group col-md-3 col-lg-4">
                                <label>Data de validade</label>
                                <input type="date" v-model="dados.data_validade" :readonly='visualizar' class="form-control"  name="nome_fantasia" />
                            </div>
                            <div class="form-group col-md-3 col-lg-4 mr-auto">
                                <label>Seguradora</label>
                                <select name="" v-model="dados.seguradora" :style="desabSelect"  class="form-control">
                                    <option  v-if="statusEditar == true" :value="dados.seguradora">{{dados.seguradora}}</option>
                                    <option value="" v-else>Escolha a seguradora</option>
                                    <option v-for="(value) in arrayEmpresas"  :key="value.id" :value="value.apelido"> {{value.apelido}}</option>
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
                idApolice:'',
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
                arrayEmpresas:[],
                dados:{   
                    numero:null,
                    data_emissao:null,
                    data_validade:null,
                    seguradora:null,
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
            .get(`${process.env.apiURL}apolices/${this.idApolice}`,{headers})
            .then(response => {
                
                this.dados = response.data
                console.log(this.dados)
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
                    const retorno = await axios.put(`${process.env.apiURL}apolices/${this.idApolice}/`,this.dados, {headers})
                    if(retorno.status == 200){
                        this.$router.push({path:'/visualizar-apolices'})
                    }
                }catch(erro){
                      this.mudarEstadoBotao('normal')
                }
            }else{
                try{
                    const headers = {
                    'Token':localStorage.getItem('token')
                    }
                    const retorno = await axios.post(`${process.env.apiURL}apolices/`,this.dados, {headers})
                    
                    if(retorno.status == 201){
                        this.$router.push({path:'/visualizar-apolices'})
                    }
                }catch(erro){
                        console.log(this.data)
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
        .get(`${process.env.apiURL}empresas/apelidos`,{headers})
        .then(response => {  
     
          this.arrayEmpresas =  response.data
        })
     
    },
    created(){
        this.idApolice = this.$route.query.id
        if(this.idApolice != null){
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

    #divMainCard{
        /* background-color:   rgb(0,48,255); */
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