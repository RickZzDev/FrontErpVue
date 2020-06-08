<template>
    <div id="body" class="container-fluid pl-0 pr-0">
        <Menu />
        <FormPessoas class="mx-auto" />
    </div>
</template>

<script>

import Menu from '../components/Menu'
import FormPessoas from '../components/Formulario_pessoas'
export default {
    components:{
        Menu,
        FormPessoas
    },
}
</script>

<style scoped>

    #body{
         background-color: rgb(82, 165, 255);
         min-height: 100vh;
    }

</style>