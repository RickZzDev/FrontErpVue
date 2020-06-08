<template>
    <div>
        <b-navbar toggleable="lg" type="dark"  >
            <LogoUppBranco class="ml-lg-5 col-lg-1 col-sm-2 col-2 text-light"/>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item-dropdown text="Visualizar cadastrados" v-if="verPessoas && verEmpresas" right>
                    <b-dropdown-item href="#" v-show="verPessoas">
                        <nuxt-link to="/visualizar-pessoas" class="text-dark" >
                            Visualizar pessoas
                        </nuxt-link>  
                        <div class="bg-light barraBranca"></div>
                    </b-dropdown-item>
                    <b-dropdown-item href="#" v-if="verEmpresas">
                        <nuxt-link to="/visualizar-empresas" class="text-dark">
                            Visualizar empresas
                        </nuxt-link>  
                    </b-dropdown-item>
                    <b-dropdown-item href="#" v-if="verEmpresas">
                        <nuxt-link to="/visualizar-apolices" class="text-dark">
                            Visualizar apolices
                        </nuxt-link>  
                    </b-dropdown-item>
                    <b-dropdown-item href="#" v-if="verEmpresas">
                        <nuxt-link to="/visualizar-cargos" class="text-dark">
                            Visualizar cargos
                        </nuxt-link>  
                    </b-dropdown-item>
                    <b-dropdown-item href="#" v-if="verEmpresas">
                        <nuxt-link to="/visualizar-contratos" class="text-dark">
                            Visualizar contratos
                        </nuxt-link>  
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Cadastrar" v-if="cadastrarPessoa && cadastrarEmpresa" right>
                    <b-dropdown-item href="#" v-if="cadastrarEmpresa">
                        <nuxt-link to="/cadastrar-empresa" class="text-dark">
                            Cadastrar empresa
                        </nuxt-link>  
                        <div class="bg-light barraBranca"></div>
                    </b-dropdown-item>
                    <b-dropdown-item href="#" v-if="cadastrarPessoa">
                        <nuxt-link to="/cadastrar-pessoa" class="text-dark">
                            Cadastrar pessoa
                        </nuxt-link>  
                    </b-dropdown-item>
                    <b-dropdown-item href="#" v-if="cadastrarPessoa">
                        <nuxt-link to="/cadastrar-cargo" class="text-dark">
                            Cadastrar cargo
                        </nuxt-link>  
                    </b-dropdown-item>
                    <b-dropdown-item href="#" v-if="cadastrarPessoa">
                        <nuxt-link to="/cadastrar-apolice" class="text-dark">
                            Cadastrar apolice
                        </nuxt-link>  
                    </b-dropdown-item>
                    <b-dropdown-item href="#" v-if="cadastrarPessoa">
                        <nuxt-link to="/cadastrar-contrato" class="text-dark">
                            Cadastrar contrato
                        </nuxt-link>  
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                     <b-nav-item-dropdown text="Calculos" v-if="verPessoas && verEmpresas" right>
                    <b-dropdown-item href="#" v-show="verPessoas">
                        <nuxt-link to="/calcular-salario" class="text-dark" >
                            Calcular salário
                        </nuxt-link>  
                        <div class="bg-light barraBranca"></div>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em>User</em>
                </template>
                <b-dropdown-item  @click="sair" href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

    import LogoUppBranco from '../components/LogoUppBranco'
    

    export default {
        components:{
            LogoUppBranco
        },
        data:function(){
            
            return{
                newStatus:null,
                verPessoas:true,
                verEmpresas:true,
                cadastrarEmpresa:true,
                cadastrarPessoa:true,
                verified:false
            } 
        },
        mounted(){
        },
        props:['status'],
        methods:{
            sair(){
                localStorage.clear('token')
                this.$router.push({path:'/'})
            },
            emitStatus(){
                this.newStatus = true
                this.$emit('permVerified', this.newStatus )
            },
            
        },
        beforeCreate(){
            const axios = require('axios')
            const headers = {
                'Token': localStorage.getItem('token')
            }
            //REQ 1
            axios
            .get(`${process.env.apiURL}permissoes`,{headers})
            .then(response => {
                if(response.data.perms[0] == 'all'){
                    this.verified = true
                }else{
                    this.verPessoas = false
                    this.verEmpresas = false
                    this.cadastrarEmpresa = false
                    this.cadastrarPessoa = false
                    this.verified = true
                }
            }).catch(erro => {
                console.log(erro)
                // console.log(localStorage.getItem('token'))
            })
        },
        watch:{
            verified:async function(){
                if(this.verified){
                    this.emitStatus()
                }
            }
        },
        name:'Menu'
    }
</script>

<style scoped>

    a{
        text-decoration:none;
        color: white;
    }

    .barraBranca{
        height: 2px;
        width: 0%;
        transition: 0.5s;
    }

    .itemMenu:hover{
        cursor: pointer;

    }

    .itemMenu:hover > .barraBranca{
        width: 100%;
        transition: 1s;
    }

    .navMenu{
        background-color: rgb(0,48,255);
    }

    .bgBlue{
         background-color: rgb(247,247,247);
    }


</style>