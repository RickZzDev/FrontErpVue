<template>

    <div class="card border-0 bg-transparent col-md-10 col-lg-9">    
        <div class="loaderBox mx-auto mt-4" :class="visibilityLoader">
            <Loader/>    
        </div>
        <div class="card-header border-bottom border-white text-white bg-transparent" :style="recovered">
            <h3>Cadastro de pessoas</h3>
        </div>
        <div  class="card-body bg-transparent" :style="recovered" id="divMainCard">
            <form method="POST" @submit.prevent="enviarDados">
                <div class="form-group">
                    <div class="card shadow bgCard text-white border-0  mb-4">
                        <div class="card-header border-0  mainTitle ">
                            <h4>Endereço e contato</h4>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-4">
                                 <label>CEP</label>
                                  <input type="text" v-mask="'#####-###'" :readonly='visualizar' required  v-model="dados.endereco.cep"  maxlength="9"  class="form-control mb-2" id="txt_cep" name="cep" /> 
                            </div>
                            <div class="form-group  col-md-4">
                                <label>Logradouro</label>
                                <input type="text" :readonly='visualizar' required  v-model="dados.endereco.logradouro"  class="form-control mb-2" id="txt_logradouro"  />
                            </div>
                            <div class="form-group col-md-4">
                                <label>Número</label>
                                <input type="number" :readonly='visualizar' required v-model="dados.endereco.numero"  class="form-control mb-2" id="txt_numero"  />
                            </div>
                           <div class="form-group col-md-4">
                                <label>Complemento</label>
                                <input type="text" :readonly='visualizar' v-model="dados.endereco.complemento"  class="form-control mb-2" id="txt_complemento"  />
                           </div>
                           <div class="form-group col-md-4">
                                <label>Bairro</label>
                                <input type="text" :readonly='visualizar' required  v-model="dados.endereco.bairro"  class="form-control mb-2" id="txt_bairro"  />
                           </div>
                           <div class="form-group col-md-4">
                                <label>UF</label>
                                <select name="" :style="desabSelect" required v-model="dados.endereco.uf" class="form-control" @blur="buscaMunicipios">
                                    <option :value="dados.endereco.uf" v-if="statusEditar">{{dados.endereco.uf.label}}</option>
                                    <option value="" v-else>Escolha seu estado</option>
                                    <option v-for="(value) in ufs" v-show="value.label != dados.endereco.uf.label" :key="value.id" :value="value"> {{value.label}}</option>
                                </select>   
                           </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Municipio</label>
                                <select name=""  v-model="dados.endereco.cidade" required :style="status" class="form-control">
                                    <option :value="this.dados.endereco.cidade" v-if="statusEditar">{{this.dados.endereco.cidade}}</option>
                                    <option value="" v-else>Escolha seu municipio</option>
                                    <option v-for="(value) in municipios" :key="value.id" :value="value.nome"> {{value.nome}}</option>
                                </select>   
                           </div>
     
                        </div>
                    </div>
                    <div class="card shadow bgCard text-white border-0  mb-4">
                        <div class="card-header border-0  mainTitle ">
                            <h4>Dados pessoais</h4>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-4">
                                <label>Nome</label>
                                <input type="text" :readonly='visualizar' required v-model="dados.nome"  class="form-control mb-2" id="txt_complemento"  />  
                            </div>
                            <div class="form-group col-md-4">
                                <label>Sexo</label>
                                <select name="" :style="desabSelect" required v-model="dados.sexo" class="form-control">
                                    <option :value="dados.sexo" v-if="statusEditar">{{dados.sexo.label}}</option>
                                    <option value="" v-else>Escolha seu sexo</option>
                                    <option v-for="(value) in sexo" v-show="value.label != dados.sexo.label" :key="value.id" :value="value"> {{value.label}}</option>
                                </select>   
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Estado civil</label>
                                <select name="" :style="desabSelect"  required v-model="dados.estado_civil" class="form-control">
                                    <option :value="this.dados.estado_civil" v-if="statusEditar && dados.estado_civil.label != null">{{dados.estado_civil.label}}</option>
                                    <option value="" v-else>Qual seu estado civil</option>
                                    <option v-for="(value) in estados_civis"  :key="value.id" v-show="value.label != dados.estado_civil.label" :value="value"> {{value.label}}</option>
                                </select>   
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Tipo sanguíneo</label>
                                <select name="" :style="desabSelect" v-model="dados.tipo_sanguineo"  class="form-control" id="">
                                    <option :value="dados.tipo_sanguineo" v-if="statusEditar ">{{dados.tipo_sanguineo.sigla}}</option>
                                    <option value="" v-else>Qual seu tipo sanguineo</option>
                                    <option v-for="(value) in tipos_sanguineos" v-show="value.sigla != dados.tipo_sanguineo.sigla" :key="value.id" :value="value"> {{value.sigla}}</option>
                                </select>   
                            </div>
     
                        </div>
                    </div>

                    <div class="card shadow bgCard text-white border-0  mb-4">
                        <div class="card-header border-0">
                            <h4>Documentos</h4>
                        </div>
                        <div class="card-header  ml-3 mr-3 rder-bottom border-white">
                            <h5>RG - CPF - PIS</h5>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-4 mr-auto">
                                <label>Numero (Rg)</label>
                                <input type="text"  maxlength="12"  :readonly='visualizar' v-model="dados.documento[0].numero" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Data expedição (Rg)</label>
                                <input type="date" :readonly='visualizar' v-model="dados.documento[0].data_emissao" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4">
                                <label>UF (Rg)</label>
                                <select name="" :style="desabSelect" v-model="dados.documento[0].uf" class="form-control">
                                    <option :value="dados.documento[0].uf" v-if="statusEditar && dados.documento[0].uf.label != null">{{dados.documento[0].uf.label}}</option>
                                    <option value="" v-else>Escolha seu estado</option>
                                    <option v-for="(value) in ufs" v-show="value.label != dados.documento[0].label" :key="value.id" :value="value"> {{value.label}}</option>
                                </select>   
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Orgão emissor (Rg)</label>
                                <select name="" :style="desabSelect"  v-model="dados.documento[0].orgao_emissor" class="form-control">
                                    <option :value="dados.documento[0].orgao_emissor" v-if="statusEditar && dados.documento[0].orgao_emissor.label != null">{{dados.documento[0].orgao_emissor.label}}</option>
                                    <option value="">Escolha o orgao emissor</option>
                                    <option v-for="(value) in orgaos_emissores" v-show="value.label != dados.documento[0].orgao_emissor.label"  :key="value.id" :value="value"> {{value.label}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Numero do pis</label>
                                <input type="text" v-mask="'###.#####.##-#'" maxlength="14" :readonly='visualizar' required v-model="dados.documento[2].numero" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Data de cadastro do pis</label>
                                <input type="date" :readonly='visualizar'   v-model="dados.documento[2].data_emissao" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4 mr-auto ">
                                <label>CPF</label>
                                <input type="text" v-mask="'###.###.###-##'" maxlength="14" :readonly='visualizar' required v-model="dados.documento[1].numero" class="form-control mb-2"   />
                            </div>
                        </div>
                        <div class="card-header  ml-3 mr-3 rder-bottom border-white">
                            <h5>CTPS</h5>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-4">
                                <label>Numero</label>
                                <input type="text" :readonly='visualizar' required  v-model="dados.documento[3].numero" class="form-control mb-2"/>
                            </div>
                            <div class="form-group col-md-4">
                                <label>Série</label>
                                <input type="text" :readonly='visualizar' required v-model="dados.documento[3].serie" class="form-control mb-2"/>
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Data de expedição</label>
                                <input type="date" :readonly='visualizar' required v-model="dados.documento[3].data_emissao" class="form-control mb-2"/>
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>UF</label>
                                <select name=""  :style="desabSelect" required v-model="dados.documento[3].uf" class="form-control" >
                                    <option :value="dados.documento[3].uf" v-if="statusEditar">{{dados.documento[3].uf.label}}</option>
                                    <option value="" v-else>Escolha seu estado</option>
                                    <option v-for="(value,index) in ufs" v-show="index < 4 && value.label != dados.documento[3].uf.label" :key="value.id" :value="value"> {{value.label}}</option>
                                </select>   
                            </div>
                        </div>
                        <div class="card-header  ml-3 mr-3 rder-bottom border-white">
                            <h5>RIC(Registro de entidade civil)</h5>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-4 ">
                                <label>Numero Ric</label>
                                <input type="text" :readonly='visualizar' v-model="dados.documento[4].numero" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4 ">
                                <label>Data de expedição</label>
                                <input type="date" :readonly='visualizar' v-model="dados.documento[4].data_emissao" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>UF</label>
                                <select name="" :style="desabSelect" v-model="dados.documento[4].uf" class="form-control">
                                    <option :value="dados.documento[4].uf" v-if="statusEditar && dados.documento[4].uf.label != null">{{dados.documento[4].uf.label}}</option>
                                    <option value="" v-else>Escolha seu estado</option>
                                    <option v-for="(value,index) in ufs" v-show="index < 4 && value.label != dados.documento[4].uf.label" :key="value.id" :value="value"> {{value.label}}</option>
                                </select>   
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Orgão emissor</label>
                                <select name="" :style="desabSelect" v-model="dados.documento[4].orgao_emissor" class="form-control">
                                    <option :value="dados.documento[4].orgao_emissor" v-if="statusEditar&& dados.documento[4].orgao_emissor.label != null">{{dados.documento[4].orgao_emissor.label}}</option>
                                    <option value="">Escolha o orgao emissor</option>
                                    <option v-for="(value) in orgaos_emissores" v-show="value.label != dados.documento[4].orgao_emissor.label" :key="value.id" :value="value"> {{value.label}}</option>
                                </select>
                            </div> 
                        </div>
                    </div>
                    <div class="card shadow bgCard text-white border-0  mb-4">
                        <div class="card-header border-0  mainTitle ">
                            <h4>Documentos complementares</h4>
                        </div>
                        <div class="card-header  ml-3 mr-3 rder-bottom border-white">
                            <h5>Dados estrangeiros - CTPS</h5>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-4">
                                <label>CTPS</label>
                                <input type="text" :readonly='visualizar' v-model="dados.documento[5].numero" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4">
                                <label>Data expedição</label>
                                <input type="date" :readonly='visualizar' v-model="dados.documento[5].data_emissao" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Data de vencimento</label>
                                <input type="date" :readonly='visualizar' v-model="dados.documento[5].data_vencimento" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Orgão emissor</label>
                                <select name="" :style="desabSelect" v-model="dados.documento[5].orgao_emissor" class="form-control">
                                    <option :value="dados.documento[5].orgao_emissor" v-if="statusEditar && dados.documento[5].orgao_emissor.label != null">{{dados.documento[5].orgao_emissor.label}}</option>
                                    <option value="">Escolha o orgao emissor</option>
                                    <option v-for="(value) in orgaos_emissores" v-show="value.label != dados.documento[5].orgao_emissor.label"  :key="value.id" :value="value"> {{value.label}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-header  ml-3 mr-3 rder-bottom border-white">
                            <h5>Dados estrangeiros - RNE</h5>
                        </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-4">
                                <label>RNE</label>
                                <input type="text" :readonly='visualizar' v-model="dados.documento[6].numero" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4">
                                <label>Data expedição</label>
                                <input type="date" :readonly='visualizar' v-model="dados.documento[6].data_emissao" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Data de vencimento</label>
                                <input type="date" :readonly='visualizar' v-model="dados.documento[6].data_vencimento" class="form-control mb-2"   />
                            </div>
                            <div class="form-group col-md-4 mr-auto">
                                <label>Orgão emissor</label>
                                <select name="" :style="desabSelect"  v-model="dados.documento[6].orgao_emissor" class="form-control">
                                    <option :value="dados.documento[6].orgao_emissor" v-if="statusEditar && dados.documento[6].orgao_emissor.label != null">{{dados.documento[6].orgao_emissor.label}}</option>
                                    <option value="">Escolha o orgao emissor</option>
                                    <option v-for="(value) in orgaos_emissores" v-show="value.label != dados.documento[6].orgao_emissor.label"  :key="value.id" :value="value"> {{value.label}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                     <BtnSave @click.native="desbloquearInputs" :style="opacity" v-if="visualizar" origin="empresa" edit="true" type="button" color="bg-warning" texto="Editar" :visible="visible"  />
                    <BtnSave :style="opacity" v-else color="bg-primary"  edit="false" type="submit" :texto="textoLogin" :visible="visible"  />

                    <!-- <BtnSave :style="opacity" v-if="statusEditar" type="button" color="bg-warning" texto="Editar" :visible="visible"  />
                    <BtnSave :style="opacity" v-else color="bg-primary" type="submit" :texto="textoLogin" :visible="visible"  /> -->
                </div>

                
            </form>                
        </div>
    </div>
</template>

<script>
import BtnSave from './BtnSave'
import { extend } from 'vee-validate';
import Loader from '../components/LoaderAnim'

export default {
    components:{
        BtnSave,
        Loader
    },
    data:
        function(){
            return{
                editando:false,
                arrayUfs:[],
                arrayOrgaos:[],
             
                

                statusEditar:false,
                visibilityLoader:'',
                recovered:"visibility:hidden;",
                desabSelect:null,
                visualizar:false,
                idUser:null,
                textoLogin:'Salvar',
                visible:'invisible',
                opacity:'opacity:1;',
                dNone:'d-none',
                ufs:[],
                municipios:[],
                status:'pointer-events:none',
                sexo:[],
                tipos_sanguineos:[],
                estados_civis:[],
                orgaos_emissores:[],
                dados:{
                    nome:'',
                    endereco:{
                        cep:'',
                        logradouro:'',
                        numero:'',
                        complemento:'',
                        bairro:'',
                        cidade:'',
                        uf:{
                            id: null,
                            label: "",
                            name: ""
                        },
                    },
                    sexo: {
                        id: 0,
                        label: "",
                        name: ""
                    },
                    estado_civil:{
                        id: 0,
                        label: "",
                        name: ""
                    },
                    tipo_sanguineo:'',
                    documento:[
                    {
                        numero:null,
                        data_emissao:null,
                        data_vencimento:null,
                        orgao_emissor:{
                            id: null,
                            label: null,
                            name: null
                        },
                        tipo_doc:1,
                        uf:{
                            id: null,
                            label: null,
                            name: ""
                        },
                    },{
                        numero:null,
                        data_emissao:null,
                        data_vencimento:null,
                        orgao_emissor:null,
                        uf:null,
                        tipo_doc:2
                    }
                    ,{
                        numero:null,
                        data_emissao:null,
                        orgao_emissor:null,
                        uf:null,
                        tipo_doc:3
                    },
                    {
                        serie:null,
                        numero:null,
                        data_emissao:null,
                        orgao_emissor:null,
                        uf:{
                            id: null,
                            label:null,
                            name: ""
                        },
                        tipo_doc:4
                    },{
                        numero:null,
                        data_emissao:null,
                        uf:{
                            id: null,
                            label:null,
                            name: ""
                        },
                        orgao_emissor:{
                            id: null,
                            label: null,
                            name: ""
                        },
                        tipo_doc:5
                    }
                    ,{
                        numero:null,
                        data_emissao:null,
                        orgao_emissor:{
                            id: null,
                            label: null,
                            name: ""
                        },
                        uf:null,
                        tipo_doc:6
                    }
                    ,{
                        numero:null,
                        data_emissao:null,
                        orgao_emissor:{
                            id: null,
                            label: null,
                            name: ""
                        },
                        uf:null,
                        tipo_doc:7
                    }],

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
        buscaMunicipios(){
            const axios = require('axios')
            const headers = {
                'Token': localStorage.getItem('token')
            }
            var reqJson = {
                "id":this.dados.endereco.uf.id
            }
            //REQ 1
            axios
            .post(`${process.env.apiURL}ufs/cod_municipio/`, reqJson,{headers})
            .then(response => {
                this.dados.endereco.cidade = 'Escolha seu municipio'
                this.status = ''
                this.municipios = response.data
            }).catch(erro => {
                // console.log(localStorage.getItem('token'))
            })
        },
        enviarDados(){
            this.mudarEstadoBotao('salvando')
            const axios = require('axios')
            const headers = {
                'Token': localStorage.getItem('token')
            }
           

            //Criando um array somente com os documentos preenchidos
            var arrayEnvio = []
            for(var i=0;i<=6;i++){
                if(this.dados.documento[i].numero == null){

                } 
                else{
                    arrayEnvio.push(this.dados.documento[i])
                }
                    
            }
            //Transferidno os dados para um novo json somente com os campos preenchidos
            var json = Object.assign({},this.dados)
            json.documento = arrayEnvio
            if(this.statusEditar == true){
                /*Provisório, até entender o allow_blank*/
                json.tipo_sanguineo == '' ? json.tipo_sanguineo = null : ''
                axios
                .put(`${process.env.apiURL}pessoas/${this.idUser}/`,json,{headers})
                .then(response => {
                    this.$router.push({path:'/visualizar-pessoas'})
                }).catch(erro => {
                    console.log(erro)
                    this.mudarEstadoBotao('normal')
                })
            }else{
                /*Provisório, até entender o allow_blank*/
                json.tipo_sanguineo == '' ? json.tipo_sanguineo = null : ''
                axios
                .post(`${process.env.apiURL}pessoas/`,json,{headers})
                .then(response => {
                    this.$router.push({path:'/visualizar-pessoas'})
                }).catch(erro => {
                  this.mudarEstadoBotao('normal')
                })
            }
        },
        recuperarDados(){
            if(this.$route.query.editar)
            {
                this.desabSelect = true
                this.statusEditar = true
                this.visualizar = false
                this.status = ''
            }
            else
            {
                this.visualizar = true
                this.statusEditar = false
            }



            const axios = require('axios')
            const headers = {
                'Token': localStorage.getItem('token')
            }
            axios
            .get(`${process.env.apiURL}pessoas/${this.$route.query.id}`,{headers})
            .then(response => {
                //Recuperando endereco
                this.dados.endereco = response.data.endereco
                //REQ nome
                this.dados.nome = response.data.nome
                //Req de sexo
                this.dados.sexo = response.data.sexo
                // // Req estado civil
                this.dados.estado_civil = response.data.estado_civil
                //Req tipo sanguineo
                if(response.data.tipo_sanguineo == null){

                }else{
                    this.dados.tipo_sanguineo = response.data.tipo_sanguineo
                }
                //REQ DE DOCS EXISTENTES
                var numDocs = Object.keys(response.data.documento).length
                for(var a =0; a<=6;a++){
                    for(var b=0;b < numDocs;b++){
                        if(this.dados.documento[a]['tipo_doc'] == response.data.documento[b].tipo_doc){
                            this.dados.documento[a] = response.data.documento[b]
                            break
                        }else{
                        }
                    }
                } 
                this.visibilityLoader = 'd-none'
                this.recovered ="visibility:visible;"
            }).catch(erro => {
                console.log(erro)
            })
         
        }
     
    },
    created(){
        this.idUser = this.$route.query.id
        if(this.idUser != null){
            this.visualizar = true
            this.desabSelect = 'pointer-events:none;'
            this.recuperarDados()
        }else{
            this.visibilityLoader = 'd-none'
            this.recovered ="visibility:visible;"
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
        .get(`${process.env.apiURL}ufs`,{headers})
        .then(response => {
          this.ufs = response.data
        }).catch(erro => {
            // console.log(localStorage.getItem('token'))
        })
        //REQ SEXOS
        axios
        .get(`${process.env.apiURL}sexos`,{headers})
        .then(response => {
          this.sexo = response.data
        }).catch(erro => {
            
        })
        //REQ ESTADOS CIVIS
        axios
        .get(`${process.env.apiURL}estados_civis`,{headers})
        .then(response => {
          this.estados_civis = response.data
        }).catch(erro => {
            // console.log(localStorage.getItem('token'))
        })
        //REQ TIPOS SANGUINEOS
        axios
        .get(`${process.env.apiURL}tipos_sanguineos`,{headers})
        .then(response => {
          this.tipos_sanguineos = response.data
        }).catch(erro => {
            // console.log(localStorage.getItem('token'))
        })
        //REQ ORGAOS EMISSORES http://127.0.0.1:8000/api/orgaos_emissores/
        axios
        .get(`${process.env.apiURL}orgaos_emissores_documentos`,{headers})
        .then(response => {
          this.orgaos_emissores = response.data
        }).catch(erro => {
            // console.log(localStorage.getItem('token'))
        })
    },
    watch:{
        $route: async (to,from) =>{
            window.location.reload()
        }
    }
}

</script>

<style scoped>

.bgCard{
        background-color: rgba(0,48,255);  
    }

.loaderBox{
        width: 25px;
        height: 35px;
        font-size: 10vh;
        margin-top: 5%;
        color: rgb(34, 0, 187);
    }

</style>