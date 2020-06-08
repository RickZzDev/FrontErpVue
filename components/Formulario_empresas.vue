<template>
    <div class="card bg-transparent border-0 col-md-10 col-lg-9"> 
        <div class="loaderBox mx-auto mt-4" :class="visibilityLoader">
            <Loader/>    
        </div>   
        <div :style="recovered" class="card-header border-bottom border-white text-white bg-transparent">
            <h3>Cadastro de empresas</h3>
        </div>
        <div class="card-body bg-transparent"  :style="recovered" id="divMainCard">
            <form method="POST" @submit.prevent="enviarDados">
                <div class="form-group">
                    <div class="card bgCard shadow text-white border-0 mb-4">
                        <div class="card-header  border-0 bg-transparent">
                            <h4>Dados cadastrais</h4>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-6 col-lg-4">
                                 <label>Cod. de cadastro ou apelido</label>
                                 <input type="text" :readonly='visualizar' required id="txt_apelido" v-model="data.apelido" class="form-control" name=""  /> {{data.codApelido}}
                            </div>
                           <div class="form-group col-md-3 col-lg-4">
                                <label>Razão social</label>
                                <input type="text" :readonly='visualizar' required class="form-control" v-model="data.razao_social" id="txt_razao_social" name="razao_social" />
                           </div>
                           <div class="form-group col-md-3 col-lg-4">
                                <label>Nome fantasia</label>
                                <input type="text" :readonly='visualizar' class="form-control" v-model="data.nome_fantasia" id="txt_nome_fantasia" name="nome_fantasia" />
                           </div>
                           <div class="form-group col-md-3 col-lg-4">
                                <label>CNPJ</label>
                                <input type="text" required  maxlength="18" v-mask="'##.###.###/####-##'" :readonly='visualizar' class="form-control" v-model="data.cnpj"  />
                           </div>
                           <div class="form-group col-md-4 mr-auto">
                                <label>Data de abertura</label>
                                <input type="date" :readonly='visualizar'  class="form-control" v-model="data.data_abertura" id="data_abertura" name="data_abertura" />
                           </div>
                        </div>
                    </div>

                    <div class="card bgCard shadow text-white border-0 mb-4 pb-2">
                        <div class="card-header  border-0 bg-transparent">
                            <h4>Datas de pagamentos</h4>
                        </div>
                        <div v-for="value in quantidadeDatas" :key="value" class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-6 col-lg-4">
                                 <label>Data do pagamento</label>
                                 <input type="date" :readonly='visualizar' v-model="data.datas_pagamento[value -1].data_pagamento" class="form-control"/> {{data.codApelido}}
                            </div>
                            <div class="form-group col-md-3 col-lg-4">
                                <label>Data de referência inicial</label>
                                <input type="date" :readonly='visualizar' class="form-control" v-model="data.datas_pagamento[value -1].data_inicial_referencia"/>
                            </div>
                            <div class="form-group col-md-3 col-lg-4">
                                <label>Data de referência final </label>
                                <input type="date" :readonly='visualizar' class="form-control" v-model="data.datas_pagamento[value -1].data_final_referencia"/>
                            </div>
                        </div>
                        <div class="col-lg-4 ml-3">
                            <button type="button" @click="adicionaData()" class="btn btn-primary">Adicionar nova data</button>
                        </div>
                    </div>

                    <div class="card shadow bgCard text-white border-0  mb-4">
                        <div class="card-header border-0  mainTitle ">
                            <h4>Endereço e contato</h4>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-4">
                                 <label>CEP</label>
                                 <input type="text" v-mask="'#####-###'" :readonly='visualizar' required maxlength="9" v-model="data.endereco.cep" class="form-control mb-2" id="txt_cep" name="cep" />
                            </div>
                            <div class="form-group  col-md-4">
                                <label>Logradouro</label>
                                <input type="text" :readonly='visualizar' v-model="data.endereco.logradouro" class="form-control mb-2" id="txt_logradouro" name="rua" />
                            </div>
                            <div class="form-group col-md-4">
                                <label>Número</label>
                                <input type="number" :readonly='visualizar' v-model="data.endereco.numero" class="form-control mb-2" id="txt_numero" name="data_abertura" />
                            </div>
                           <div class="form-group col-md-4">
                                <label>Complemento</label>
                                <input type="text" :readonly='visualizar' v-model="data.endereco.complemento" class="form-control mb-2" id="txt_complemento" name="data_abertura" />
                           </div>
                           <div class="form-group col-md-4">
                                <label>Bairro</label>
                                <input type="text" :readonly='visualizar' v-model="data.endereco.bairro" class="form-control mb-2" id="txt_bairro" name="data_abertura" />
                           </div>
                           <div class="form-group col-md-4">
                                <label>Cidade</label>
                                <input type="text" :readonly='visualizar' v-model="data.endereco.cidade" class="form-control mb-2" id="txt_cidade" name="data_abertura" />
                           </div>
                           <div class="form-group col-md-4">
                                <label>UF</label>
                                <select name="" :style="desabSelect" required v-model="data.endereco.uf" class="form-control">
                                    <option :value="data.endereco.uf" v-if="statusEditar">{{data.endereco.uf.label}}</option>
                                    <option v-for="(value) in ufs" :key="value.id" :value="value"> {{value.label}}</option>
                                </select>   
                           </div>
                          <div class="form-group col-md-4">
                                <label>País</label>
                                <input type="text" :readonly='visualizar' v-model="data.endereco.pais" class="form-control mb-2" id="txt_pais" name="data_abertura" />
                           </div>
                           <div class="form-group col-md-4">
                                <label>Telefone</label>
                                <input type="text" v-mask="'(##)#####-####'" :readonly='visualizar'  maxlength="15"  v-model="data.telefone_ddd" class="form-control mb-2" id="txt_telefone" name="data_abertura" />
                           </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Email</label>
                                <input type="email" :readonly='visualizar' v-model="data.email" class="form-control mb-2" id="txt_email" name="data_abertura" />
                           </div>
                        </div>
                    </div>
                    <div class="card border-0 bgCard shadow mb-4 text-white">
                        <div class="card-header border-0  ">
                            <h4>Enquadramento  tributário</h4>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-4">
                                <label>Classificação tributária</label>
                                <select name="" :style="desabSelect" required v-model="data.classificacao_tributaria" class="form-control" id="">
                                    <option :value="data.classificacao_tributaria" v-if="statusEditar">{{data.classificacao_tributaria.codigo + '-'+ data.classificacao_tributaria.descricao}}</option>
                                    <option value="" v-else>Opções</option>
                                    <option v-for="(value,index) in arrayClassificaco " v-show="index < 4 && value.descricao != data.classificacao_tributaria.descricao" :key="value.id" :value="value">{{value.codigo + '-' + value.descricao}}</option>
                                </select>    
                            </div>
                            <div class="form-group col-md-4">
                                <!-- A natureza juridica também deverá vir de um tabela no banco -->
                                <label>Natureza jurídica</label>
                                <select name="" :style="desabSelect" required v-model="data.naturezas_juridicas" class="form-control" id="">
                                    <option :value="data.naturezas_juridicas" v-if="statusEditar">{{data.naturezas_juridicas.cod_subcategoria + '-' + data.naturezas_juridicas.nome_subcategoria}}</option>
                                    <option value="" v-else>Opções</option>
                                    <option  v-for="(value,index) in arrayNatureza " v-show="index < 4 && value.cod_subcategoria != data.naturezas_juridicas.cod_subcategoria" :key="value.id" :value="value">{{value.cod_subcategoria + '-' + value.nome_subcategoria}}</option>
                                </select>   
                            </div>
                           <div class="form-group col-md-4">
                                <label>CNAE principal</label>
                                <select name="" :style="desabSelect" required v-model="data.cnae_principal" class="form-control" id="">
                                    <option :value="data.cnae_principal" v-if="statusEditar">{{data.cnae_principal.codigo +'-'+ data.cnae_principal.descricao}}</option>
                                    <option value="" v-else>Opções</option>
                                    <option  v-for="(value) in arrayCnaes " v-show="value.codigo != data.cnae_principal.codigo" :key="value.id" :value="value">{{value.codigo+'-'+value.descricao}}</option>
                                </select> 
                                
                           </div>
      
                           <div class="form-group col-md-3">
                                <!-- Este campo também devera receber dados de uma tabela -->
                                <label>Cód. GPS</label>
                                <select name="" :style="desabSelect" required v-model="data.cod_gps" class="form-control">
                                    <option :value="data.cod_gps" v-if="statusEditar">{{data.cod_gps[0].codGps  + '-' + data.cod_gps[0].especificacao}}</option>
                                    <option value="" v-else>Opções</option>
                                    <option  v-for="(value) in arrayCodGps " v-show="value.codGps != data.cod_gps[0].codGps"  :key="value.id" :value="[value]">{{value.codGps + '-' + value.especificacao}}</option>
                                </select>  
                           </div>
                            <div class="form-group col-md-3">
                                <label>Indicativo de desoneração</label><br>
                                <div class="btn-group btn-group-toggle" :style="desabSelect" data-toggle="buttons">
                                    <label class="btn btn-primary"  :class="desoneracaoStyleSim"  >
                                        <input type="radio"   :readonly='visualizar'  @click="(desoneracaoStyleSim = 'active', desoneracaoStyleNao = '' )"  v-model="data.indicativo_desoneracao" value=true  name="options1" > Sim
                                    </label>
                                    <label class="btn btn-primary"  :class="desoneracaoStyleNao">
                                        <input type="radio" required :readonly='visualizar' @click="(desoneracaoStyleNao = 'active', desoneracaoStyleSim = '')"  v-model="data.indicativo_desoneracao" value=false name="options1" > Nao
                                    </label>
                                </div>
                            </div>
                            <div class="form-group col-md-3 mr-auto">
                                <label>Optante simples nacional</label><br>
                                <div class="btn-group btn-group-toggle" :style="desabSelect" data-toggle="buttons">
                                    <label class="btn btn-primary" :class="optanteStyleSim"  >
                                        <input type="radio" required :readonly='visualizar' @click="(optanteStyleSim = 'active', optanteStyleNao  = '' )" v-model="data.optante_simples" value=true  name="options2"> Sim
                                    </label>
                                    <label class="btn btn-primary"  :class="optanteStyleNao">
                                        <input type="radio"  :readonly='visualizar'  @click="(optanteStyleNao = 'active', optanteStyleSim = '')" v-model="data.optante_simples" value=false name="options2"> Nao
                                    </label>
                                </div> 
                           </div>
                            <div class="form-group col-md-3 ">
                                <label>Instituição de ensino</label><br>
                                <div class="btn-group btn-group-toggle" :style="desabSelect" data-toggle="buttons">
                                    <label class="btn btn-primary" :class="ensinoStyleSim"  >
                                        <input type="radio" required :readonly='visualizar' @click="(ensinoStyleSim = 'active', ensinoStyleNao  = '' )" v-model="data.is_instituicao_de_ensino" value=true  > Sim
                                    </label>
                                    <label class="btn btn-primary"  :class="ensinoStyleNao">
                                        <input type="radio"  :readonly='visualizar'  @click="(ensinoStyleNao = 'active', ensinoStyleSim = '')" v-model="data.is_instituicao_de_ensino" value=false > Nao
                                    </label>
                                </div> 
                           </div>
                            <div class="form-group col-md-5 mr-auto">
                                <label class="">Registro eletetrônico de empregrados</label><br>
                                    <div class="btn-group btn-group-toggle" :style="desabSelect" data-toggle="buttons">
                                        <label class="btn btn-primary" :class="registroStyleSim"  >
                                            <input type="radio" required :readonly='visualizar' @click="(registroStyleSim = 'active', registroStyleNao = '' )" v-model="data.registro_empregrado" value=true name="options3"> Sim
                                        </label>
                                        <label class="btn btn-primary"  :class="registroStyleNao">
                                            <input type="radio" required :readonly='visualizar' @click="(registroStyleNao = 'active', registroStyleSim = '')" v-model="data.registro_empregrado" value=false name="options3"> Nao
                                        </label>
                                    </div>
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
                idEmpresa:'',
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
                ufs:[],
                cpfStyle:'',
                cnpjStyle:'',
                registroStyleSim:'',
                registroStyleNao:'',
                desoneracaoStyleSim:'',
                desoneracaoStyleNao:'',
                optanteStyleSim:'',
                optanteStyleNao:'',
                ensinoStyleSim:'',
                ensinoStyleNao:'',
                arrayClassificaco :null,
                arrayNatureza:null,
                arrayCodGps:null,
                arrayCnaes:null,
                quantidadeDatas:1,
                data:{   
                    apelido:"",
                    razao_social: "",
                    nome_fantasia: "",
                    data_abertura:null,   
                    telefone_ddd:"",
                    cnpj:null, 
                    email:"",
                    is_instituicao_de_ensino:"",
                    endereco:{
                        cep:"", 
                        logradouro:"",
                        numero: "",
                        complemento:"",
                        bairro:"",
                        cidade:"",
                        uf:{
                            id:'',
                            label:'',
                            name:''
                        },
                        pais:"", 
                    } ,
                    classificacao_tributaria:{
                        id:'',
                        codigo:'',
                        descricao:''
                    },
                    registro_empregrado:"", 
                    indicativo_desoneracao:"", 
                    optante_simples:"", 
                    cod_gps:[{
                        id:'',
                        codGps:'',
                        especificacao:''
                    }],
                    naturezas_juridicas:{
                        id: 1,
                        nome_categoria: "",
                        cod_subcategoria: "",
                        nome_subcategoria: "",
                        representante_entidade: "",
                        qualificacao: ""
                    },
                    cnae_principal:{
                        id:'',
                        codigo:''
                    },
                    datas_pagamento:[{
                        data_pagamento:null,
                        data_inicial_referencia:null,
                        data_final_referencia:null
                    }]
                    
                },
                validationCep:{
                    invalid:'is-invalid'
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

        adicionaData(){
            this.quantidadeDatas += 1
            this.data.datas_pagamento.push({data_pagamento:null,data_inicial_referencia:null,data_final_referencia:null})
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
            .get(`${process.env.apiURL}empresas/${this.idEmpresa}`,{headers})
            .then(response => {
                this.data = response.data
                this.data.registro_empregrado ? this.registroStyleSim = 'active' : this.registroStyleNao = 'active'
                this.data.optante_simples ? this.optanteStyleSim = 'active' : this.optanteStyleNao = 'active'
                this.data.indicativo_desoneracao ? this.desoneracaoStyleSim = 'active' : this.desoneracaoStyleNao = 'active'
                this.data.is_instituicao_de_ensino ? this.ensinoStyleSim = 'active' : this.ensinoStyleNao = 'active'
                this.quantidadeDatas = this.data.datas_pagamento.length
                this.visibilityLoader = 'd-none'
                this.recovered ="visibility:visible;"
            }).catch(erro => {
                this.visibilityLoader = 'd-none'
                this.recovered ="visibility:visible;"
                console.log(erro)
            })
        },
        async enviarDados(event){
            this.dNone = 'd-none'
            this.opacity = 'opacity:0.6;'
            this.textoLogin = "Salvando"
            this.visible="visible"
            const axios = require('axios')
            event.preventDefault()
            if(this.statusEditar == true){
                try{
                    const headers = {
                    'Token':localStorage.getItem('token')
                    }
                    const retorno = await axios.put(`${process.env.apiURL}empresas/${this.idEmpresa}/`,this.data, {headers})
                    if(retorno.status == 200){
                        this.$router.push({path:'/visualizar-empresas'})
                    }
                }catch(erro){
                      this.mudarEstadoBotao('normal')
                }
            }else{
                try{
                    const headers = {
                    'Token':localStorage.getItem('token')
                    }
                    const retorno = await axios.post(`${process.env.apiURL}empresas/`,this.data, {headers})
                    
                    if(retorno.status == 201){
                        this.$router.push({path:'/visualizar-empresas'})
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
        .get(`${process.env.apiURL}classificacoes_tributarias/`,{headers})
        .then(response => {
          this.arrayClassificaco = response.data
        }).catch(erro => {
            // console.log(localStorage.getItem('token'))
        })
        //REQ 2
        axios
        .get(`${process.env.apiURL}naturezas_juridicas/`,{headers})
        .then(response => {
          this.arrayNatureza = response.data
        //   console.log(this.arrayNatureza)
        })
     
        //REQ 3
        axios
        .get(`${process.env.apiURL}codigos_gps/`,{headers})
        .then(response => {
          this.arrayCodGps = response.data
        //   console.log(this.arrayCodGps)
        }).catch(error =>{
            console.log(error)
        })

        axios
        .get(`${process.env.apiURL}cnaes/`,{headers})
        .then(response => {
          this.arrayCnaes = response.data
        }).catch(error=>{
            console.log(error)
        })
        axios
        .get(`${process.env.apiURL}ufs`,{headers})
        .then(response => {
          this.ufs = response.data
        }).catch(erro => {
            // console.log(localStorage.getItem('token'))
        })
    },
    created(){
        this.idEmpresa = this.$route.query.id
        if(this.idEmpresa != null){
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