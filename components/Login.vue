<template>
    <div id="layout" class="container" >
        <div class="row justify-content-center">
            <div class="box-branco  pt-5 pl-4 pr-4 pb-3 mt-5 bg-light">
                <LogoUpp/>
                <form @submit.prevent="geraRecaptcha" method="post">
                    <div class="row mb-4">
                        <div class="col">
                            <input type="email" id="txt_email"  class="form-control bg-light login" v-model="dados.username" placeholder="Digite seu email">
                            <span></span>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col">
                            <input type="password"  class="form-control bg-light password " v-model="dados.password" placeholder="Digite sua senha">
                        </div>
                    </div>
                    <span class="container pl-3 aviso" :class='dNone'>
                        Ops! verifique email ou senha
                    </span>
                    <div class="row mt-2">
                        <BtnSave :style="opacity" color="bg-primary" :texto="textoLogin" :visible="visible"  />
                        <!-- <button type="submit"></button> -->
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
export default {
    components:{
        LogoUpp,
        BtnSave
    },
    data(){
        return{
            textoLogin:'Entrar',
            visible:'invisible',
            opacity:'opacity:1;',
            dNone:'d-none',
            dados:{
                username:'',
                password:'',
                "grant_type":"password",
                "googleRecaptchaResponse":''
            }
        }
    },
    beforeCreate(){
        localStorage.setItem('token','n/a')
    },
    async mounted() {
        await this.$recaptcha.init()
    },
    methods:{
            async geraRecaptcha() {
                this.dNone = 'd-none'
                this.opacity = 'opacity:0.6;'
                this.textoLogin = "Entrando...."
                this.visible="visible"
                try {
                    const recaptcha = await this.$recaptcha.execute('login')
                    this.dados.googleRecaptchaResponse = recaptcha
                    this.enviarDados()
                } catch (error) {
                    console.log('Login error:', recaptcha)
                }
            },
            async enviarDados(){
                localStorage.clear()
                try{
                    const axios = require('axios')
                    
                    const retorno = await axios.post('https://api.upp.vc/login', this.dados)
                  
                    if(retorno.status == 201){
                        localStorage.setItem('token',retorno.data.token)
                        this.$router.push({path: '/home'})
                    }
                }catch{
                    this.opacity = 'opacity:1'
                    this.textoLogin = 'Entrar'
                    this.visible="invisible",
                    this.dNone = ''
                }    
            },
            
    }
}
</script>

<style scoped>
    a{
        text-decoration: none;
        color: gray;
    }

    .aviso{
        color: rgb(250, 48, 48);
        font-size: 14px;
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
        width: 100%;
        height: 100vh;
        background-color:rgb(0,48,255);
    }
    .box-branco{
        border-radius: 20px;
    }
</style>