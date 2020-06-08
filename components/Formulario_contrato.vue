<template>

    <div class="card bg-transparent border-0 col-md-10 col-lg-9">
        <div class="loaderBox mx-auto mt-4" :class="visibilityLoader">
            <Loader/>    
        </div>
        <div :style="recovered">
            <div  class="card-header border-bottom border-white text-white bg-transparent mb-4">
                <h3>Cadastro de contratos</h3>
            </div>
            <form @submit.prevent="enviarDados">
                <div class="card bgCard shadow text-white border-0 mb-4">
                    <div class="card-header  border-0 bg-transparent">
                        <h4>Dados contratuais</h4>
                    </div>
                        <div class="card-body d-flex for md flex-wrap justify-content-around">
                            <div class="form-group col-md-6 col-lg-4">
                                <label>Salário</label>
                                <input type="text" required v-model="dados.salario" :readonly='visualizar'  class="form-control"  /> 
                            </div>
                            <div class="form-group col-md-3 col-lg-4">
                                <label>Tipo de contrato</label>
                                <select name="" required v-model="dados.tipo_contrato" :style="desabSelect"  class="form-control">
                                    <option  v-if="statusEditar == true" :value="dados.tipo_contrato">{{dados.tipo_contrato}}</option>
                                    <option value="" v-else>Escolha o tipo de contrato</option>
                                    <option v-for="(value) in arrayTiposContratos" v-show="value.label != dados.tipo_contrato" :key="value.id" :value="value.label"> {{value.codigo + '-' + value.label}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3 col-lg-4">
                                <label>Contratado</label>
                                <select name="" required v-model="dados.contratado" :style="desabSelect"  class="form-control">
                                    <option :value="dados.contratado" v-if="statusEditar == true">{{dados.contratado}}</option>
                                    <option value="" v-else>Escolha  instituição</option>
                                    <option v-for="(value) in arrayPessoas" :key="value.id" v-show="value.nome != dados.contratado" :value="value.nome"> {{value.nome}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3 col-lg-4">
                                <label>Cargo</label>
                                <select name="" required v-model="dados.cargo" :style="desabSelect"  class="form-control">
                                    <option :value="dados.cargo" v-if="statusEditar == true">{{dados.cargo}}</option>
                                    <option value="" v-else>Escolha  o cargo</option>
                                    <option v-for="(value) in arrayCargos" :key="value.id" v-show="value.label != dados.cargo" :value="value.label"> {{value.label}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3 col-lg-4 mr-auto">
                                <label>Empresa contratante</label>
                                <select name="" required v-model="dados.contratante" :style="desabSelect"  class="form-control">
                                    <option :value="dados.contratante" v-if="statusEditar == true">{{dados.contratante}}</option>
                                    <option value="" v-else>Escolha  instituição</option>
                                    <option v-for="(value) in arrayEmpresas" v-show="value.apelido != dados.contratante" :key="value.id" :value="value.apelido"> {{value.apelido}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6 col-lg-4">
                                <label>Instituição de ensino</label>
                                <select name="" v-if="dados.instituicao_de_ensino != null" v-model="dados.instituicao_de_ensino" :style="desabSelect"  class="form-control">
                                    <option :value="dados.instituicao_de_ensino" v-if="statusEditar == true"> {{dados.instituicao_de_ensino}}</option>
                                    <option value="" v-else>Escolha  instituição</option>
                                    <option v-for="(value) in arrayInstituicoes" v-show="value.apelido != dados.instituicao_de_ensino" :key="value.id" :value="value.apelido"> {{value.apelido}}</option>
                                </select>
                                <select name="" v-else v-model="dados.instituicao_de_ensino" :style="desabSelect"  class="form-control">
                                    <option :value="dados.instituicao_de_ensino" v-if="statusEditar == true">Escolha instituição</option>
                                    <option value="" v-else>Escolha  instituição</option>
                                    <option v-for="(value) in arrayInstituicoes" :key="value.id" :value="value.apelido"> {{value.apelido}}</option>
                                </select>  
                            </div>
                            <div class="form-group col-md-3 col-lg-4">
                                <label>Numero apólice</label>
                                <select v-if="dados.apolices_seguro != null" v-model="dados.apolices_seguro" :style="desabSelect"  class="form-control">
                                    <option :value="dados.apolices_seguro" v-if="statusEditar == true">{{dados.apolices_seguro}}</option>
                                    <option value="" v-else>Numero da apolice</option>
                                    <option v-for="(value) in arrayApolices" v-show="value.numero != dados.apolices_seguro" :key="value.id" :value="value.numero"> {{value.numero}}</option>
                                </select>
                                <select v-else v-model="dados.apolices_seguro" :style="desabSelect"  class="form-control">
                                    <option :value="dados.apolices_seguro" v-if="statusEditar == true">Numero da apolice</option>
                                    <option value="" v-else>Numero da apolice</option>
                                    <option v-for="(value) in arrayApolices"  :key="value.id" :value="value.numero"> {{value.numero}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3 col-lg-4 mr-auto">
                                <label>Supervisor do estágio</label>
                                <select v-if="dados.supervisor_estagio != null"  name="" v-model="dados.supervisor_estagio" :style="desabSelect"  class="form-control">
                                    <option :value="dados.supervisor_estagio" v-if="statusEditar == true">{{dados.supervisor_estagio}}</option>
                                    <option value="" v-else>Escolha  instituição</option>
                                    <option v-for="(value) in arrayPessoas" :key="value.id" v-show="value.nome != dados.supervisor_estagio && value != dados.contratado" :value="value.nome"> {{value.nome}}</option>
                                </select>
                                <select v-else  name="" v-model="dados.supervisor_estagio" :style="desabSelect"  class="form-control">
                                    <option :value="dados.supervisor_estagio" v-if="statusEditar == true">Escolher supervisor</option>
                                    <option value="" v-else>Escolha  instituição</option>
                                    <option v-for="(value) in arrayPessoas" :key="value.id" v-show="value != dados.contratado" :value="value.nome"> {{value.nome}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6 col-lg-4">
                                <label>Numero de matrícula</label>
                                <input type="text" v-mask="'#########'" required v-model="dados.numero_matricula" :readonly='visualizar'  class="form-control"  /> 
                            </div>
                        </div>
                </div>
                <div class="card bgCard shadow text-white border-0 mb-4 pb-2">
                    <div class="card-header  border-0 bg-transparent">
                        <h4>Proventos</h4>
                    </div>
                    <div v-for="value in quantidadeProventos" :key="value" class="card-body d-flex for md flex-wrap justify-content-around">
                        <div class="form-group col-md-6 col-lg-4">
                            <label>Valor</label>
                            <input type="number"  v-model="dados.proventos[value - 1].valor"  :readonly='visualizar' class="form-control"/> 
                        </div>
                        <div class="form-group col-md-3 col-lg-4">
                            <label>Periodicidade</label>
                            <select name="" v-model="dados.proventos[value -1].periodicidade" :style="desabSelect"  class="form-control">
                                <option :value="dados.proventos.periodicidade" v-if="statusEditar == true">Escolher periodicidade</option>
                                <option value="" v-else>Escolha  instituição</option>
                                <option v-for="(value) in arrayPeriodicidades" :key="value.id" v-show="value != dados.proventos.periodicidade" :value="value.label"> {{value.label}}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4 mr-auto">
                            <label>Tipo do provento</label>
                            <select name="" v-model="dados.proventos[value -1].tipo_provento" :style="desabSelect"  class="form-control">
                                <option :value="dados.proventos[value -1].tipo_provento" v-if="statusEditar == true">{{dados.proventos[value -1].tipo_provento}}</option>
                                <option value="" v-else>Escolha  instituição</option>
                                <option v-for="(valueTipo) in arrayTiposProventos" :key="valueTipo.id" v-show="valueTipo != dados.proventos[value - 1].tipo_provento" :value="valueTipo.label"> {{valueTipo.label}}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3 col-lg-4">
                            <label>Data de inicio</label>
                            <input type="date" v-model="dados.proventos[value -1].data_inicio" :readonly='dataDisable' class="form-control"   />
                        </div>
                        <div class="form-group col-md-3 col-lg-4">
                            <label>Data de fim</label>
                            <input type="date" v-model="dados.proventos[value -1].data_fim"   maxlength="18"  :readonly='dataDisable' class="form-control"  />
                        </div>
                        <div class=" col-md-4 pt-4">
                            <button type="button" @click="dataDisable = false" class="btn btn-primary">Inserir datas</button>
                        </div>
                    </div>
                    <div class="col-lg-4 ml-3">
                        <button type="button" @click="adicionaProvento()" class="btn btn-primary ">Adicionar um novo provento</button>
                    </div>
                </div>
                <div  class="card bgCard shadow text-white border-0 mb-4">
                    <div class="card-header  border-0 bg-transparent">
                        <h4>Horarios e datas</h4>
                    </div>
                    <div class="card-body d-flex for md flex-wrap justify-content-around">
                        <div class="form-group col-md-6 col-lg-4">
                            <label>Data de admissao</label>
                            <input type="date" required v-model="dados.data_admissao" :readonly='visualizar'  class="form-control" name=""  /> 
                        </div>
                        <div class="form-group col-md-3 col-lg-4">
                            <label>Data de termino contratual</label>
                            <input type="date" required v-model="dados.data_termino_contratual" :readonly='visualizar'  class="form-control"   />
                        </div>
                        <div class="form-group col-md-3 col-lg-4">
                            <label>Data de termino efetiva</label>
                            <input type="date" v-model="dados.data_termino_efetiva" :readonly='visualizar' class="form-control"   />
                        </div>
                        <div class="form-group col-md-3 col-lg-4">
                            <label>Horas semanais</label>
                            <input type="text" v-model="dados.horas_semanais"   maxlength="18"  :readonly='visualizar' class="form-control"  />
                        </div>
                        <div class="form-group col-md-4 mr-auto">
                            <label>Horas Mensais</label>
                            <input type="text" v-model="dados.horas_mensais" :readonly='visualizar'  class="form-control"   />
                        </div>
                    </div>
                </div>
                <div class="card-body bg-transparent"  :style="recovered" id="divMainCard">
                        <div class="form-group">
                            <div class="card border-0 bgCard shadow mb-4 text-white">

                            </div>
                            <BtnSave @click.native="desbloquearInputs" :style="opacity" v-if="visualizar"  edit="true" type="button" color="bg-warning" texto="Editar" :visible="visible"  />
                            <BtnSave :style="opacity" v-else color="bg-primary"  edit="false" type="submit" :texto="textoLogin" :visible="visible"  />
                        </div>
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
                idContrato:'',
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
                //Array dados
                arrayInstituicoes:[],
                arrayTiposContratos:[],
                arrayEmpresas:[],
                arrayPessoas:[],
                arrayApolices:[],
                arrayCargos:[],
                arrayPeriodicidades:[],
                arrayTiposProventos:[],
                quantidadeProventos:1,
                dataDisable:true,
                dados:{
                    data_admissao:null,
                    data_termino_contratual:null,
                    data_termino_efetiva:null,
                    horas_semanais:null,
                    horas_mensais:null,
                    salario:null,
                    id:null,
                    cargo:null,
                    instituicao_de_ensino:null,
                    supervisor_estagio:null,
                    tipo_contrato:null,
                    contratante:null,
                    contratado:null,
                    apolices_seguro:null,
                    numero_matricula:null,
                    proventos:[{
                        valor:null,
                        periodicidade:null,
                        data_inicio:null,
                        data_fim:null,
                        tipo_provento:null
                    }]
                }
            }
    },
    methods:{
        desbloquearInputs(e){
            e.preventDefault()
            this.dataDisable = false
            this.visualizar = false
            this.desabSelect = ''
            this.statusEditar = true
        },
        adicionaProvento(){
            this.quantidadeProventos +=1
            this.dados.proventos.push({
                        valor:null,
                        periodicidade:null,
                        data_inicio:null,
                        data_fim:null,
                        tipo_provento:null})
            this.statusEditar = true
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

        recuperaContrato(){
             if(this.$route.query.editar){
                this.dataDisable = false
                this.desabSelect = true
                this.statusEditar = true
                this.visualizar = false
            }else{
                this.visualizar = true
                this.statusEditar = false
            }
            const headers = {
                'Token':localStorage.getItem('token')
            }
            const axios = require('axios')
            
            //Req conferir existencia de contrato
            axios
            .get(`${process.env.apiURL}contratos/${this.idContrato}/`,{headers})
            .then(response => {
                this.dados = response.data
                if(this.dados.proventos == []){
                    this.dados.proventos = [{
                        valor:null,
                        periodicidade:null,
                        data_inicio:null,
                        data_fim:null,
                        tipo_provento:null
                    }]
                }
                
                this.quantidadeProventos = this.dados.proventos.length

                this.visibilityLoader = 'd-none'
                this.recovered ="visibility:visible;"
            })

          
           

            
        },
        async enviarDados(event){
            this.mudarEstadoBotao('salvando')
            const axios = require('axios')
            event.preventDefault()
            if(this.statusEditar == true){
                try{
                    const headers = {
                    'Token':localStorage.getItem('token')
                    }
                    const retorno = await axios.put(`${process.env.apiURL}contratos/${this.dados.id}/`,this.dados, {headers})
                    if(retorno.status == 200){
                        this.$router.push({path:'/visualizar-contratos'})
                    }
                }catch(erro){
                     this.mudarEstadoBotao('normal')
                }
            }else{
                console.log(this.dados)
                try{
                    const headers = 
                    {
                        'Token':localStorage.getItem('token')
                    }
                    const retorno = await axios.post(`${process.env.apiURL}contratos/`,this.dados, {headers})
                    console.log(this.dados)
                    if(retorno.status == 201)
                    {
                        this.$router.push({path:'/visualizar-contratos'})
                    }
                }catch(erro){
                        console.log(this.dados)
                        console.log(erro)
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
       
        //REQ Instituicoes
        axios
        .get(`${process.env.apiURL}empresas/instituicoes_de_ensino`,{headers})
        .then(response => {  
          this.arrayInstituicoes =  response.data
        })

        //REQ tipos contratos
        axios
        .get(`${process.env.apiURL}contratos/tipos_contratos`,{headers})
        .then(response => {
          this.arrayTiposContratos =  response.data
        })
        //Req empresas
        axios
        .get(`${process.env.apiURL}empresas/apelidos`,{headers})
        .then(response => {  
          this.arrayEmpresas =  response.data
        })

        //Req pessoas
        axios
        .get(`${process.env.apiURL}pessoas/nome`,{headers})
        .then(response => {  
          this.arrayPessoas =  response.data
        })
        
        //Req apolices
        axios
        .get(`${process.env.apiURL}apolices`,{headers})
        .then(response => {  
          this.arrayApolices =  response.data
        
        })
        axios
        .get(`${process.env.apiURL}cargos`,{headers})
        .then(response => {  
          
          this.arrayCargos =  response.data
        })
        //Req de periodicidades
        axios
        .get(`${process.env.apiURL}contratos/proventos/periodicidades`,{headers})
        .then(response => {  
          this.arrayPeriodicidades =  response.data
        })
        //Req tipos proventos
        axios
        .get(`${process.env.apiURL}contratos/proventos/tipos_proventos`,{headers})
        .then(response => {  
          this.arrayTiposProventos =  response.data

        })
     
    },
    created(){
        this.idContrato = this.$route.query.id
        if(this.idContrato != null){
            this.visualizar = true
            this.desabSelect = 'pointer-events:none;'
            this.recuperaContrato()
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