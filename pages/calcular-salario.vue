<template>
    <div id="body" class="container-fluid pl-0 pr-0">
        <Menu class="mb-2" />  
        <FormSalario class="bg-light mx-0 px-0"  />
    </div>
</template>

<script>

import FormSalario from '~/components/Formulario_calculo_salario.vue'
import Menu from '~/components/Menu.vue'

export default {
    components:{
        FormSalario,
        Menu,
    },
    data:function(){
        return{
        }
    },
    beforeCreate(){
        localStorage.getItem('token') == "n/a" ||localStorage.getItem('token') == "" ? this.$router.push({path: "/"}):console.log('')
    }
}
</script>

<style scoped>

    #body{
        background-color: rgb(82, 165, 255);
        min-height: 100vh;
    }

</style>