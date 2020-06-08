<template>
    <div  class="container-fluid pl-0 pr-0" id="body">
        <div  class="loaderBox mx-auto mt-0 pt-5" v-show="status == false" >
            <Loader/>    
        </div>
        <Menu class="mb-2" :status="status" @permVerified="status = $event" v-show="status==true" />
        <div class="text-light col-4 mx-auto rounded text-center" id="divWelcome"  v-show="status==true">
            <h4>Bem vindo!</h4>
            <h5>O que vamos fazer hoje? </h5> 
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
        testando(){
            alert('a')
        }
    },
    data()
    {
        return{
            status:false,
            visibilityLoader:'',
            visibilityMenu:false,
            visibilityContainer:'d-none',
            arrayEmpresas:[],
            tamanhoArray:null
        }
    },
    mounted(){
        this.$anime.timeline()
        .add({
            targets:'#divWelcome',
            translateY: 35,
            easing: 'easeOutExpo',
        })

    },
    // beforeCreate(){
    //     const axios = require('axios')

    //     const headers = {
    //         'Token': localStorage.getItem('token')
    //     }
       
    //     axios
    //     .get(`${process.env.apiURL}`,{headers})
    //     .then(response => {
    //         this.arrayEmpresas = response.data
    //         this.tamanhoArray = this.arrayEmpresas.length
    //         this.visibilityContainer = ''
    //         this.visibilityLoader = 'd-none'
    //     }).catch(erro => {
    //         console.log(erro)
    //     })
    // }
}
</script>

<style scoped>

    a{
        text-decoration: none;
        color: inherit;
    }

    #divWelcome{
        margin-top: -35px;
    }

    #body{
        background-color: rgb(82, 165, 255);
        
    }


    #body{
     height: 100vh;        
    }

    .fs-custom{
        font-size: 13px;
    }

    .loaderBox{
        width: 25px;
        height: 35px;
        font-size: 10vh;
        margin-top: 5%;
        color: rgb(34, 0, 187);
    }
</style>