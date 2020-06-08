<template>
 
  <div id="body" class="container-fluid py-4">  
    <login />
  </div>
</template>

<script>

import Logo from '~/components/Logo.vue'
import Menu from '~/components/Menu.vue'
import FormEmpresa from '~/components/Formulario_empresas.vue'
import login from '~/components/Login.vue'
import Cadastro from '~/components/Cadastro.vue'

export default {
  components: {
    Logo,
    Menu,
    FormEmpresa,
    login,
    Cadastro
  }
}
</script>

<style scoped>


#body{
  background-color:rgb(0,48,255);
}


.row{
  /* background-color: red; */
}

  

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
