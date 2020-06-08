<template>
        <div class="col pl-0 pr-0">
            <label for="btn-sub" class="col-12 pl-0 pr-0 mb-0">
                <div class="botao text-white" :class=color >
                    <div class="d-flex pt-2 pb-2  pr-2 justify-content-center" >
                        <div class="div-spinner inline-block  mr-2" :class=visible>
                            <b-spinner label="Loading..." ></b-spinner>
                        </div>
                        <span class="fs mr-2" v-if="edit == 'true'">
                            {{texto}}
                        </span>
                        <span class="fs mr-2" v-else>
                             {{texto}} 
                        </span>
                        
                    </div>
                    
                </div>
            </label>

            <button  :type=type id="btn-sub" class="btn btn-primary col-12 d-none invisible ">

            </button>
        </div>
        
    <!-- </div> -->
</template>

<script>
export default {
    props:['texto','visible','color','type','edit','origin']
}
</script>

<style scoped>
.fs{
    font-size: 20px;
}
.div-spinner{
    height: 20px;
}
.botao{
    /* background-color:rgb(0,48,255); */
    border-radius: 5px;
    transition: 0.3s;
}
.botao:hover{
    cursor: pointer;
    transition: 0.3s;
    -webkit-box-shadow: 0px 0px 10px 1px rgba(0,102,255,1);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0,102,255,1);
    box-shadow: 0px 0px 10px 1px rgba(0,102,255,1);
}
.loader4 {
   width:45px;
   height:45px;
   display:inline-block;
   padding:0px;
   border-radius:100%;
   border:5px solid;
   border-top-color:rgba(246, 36, 89, 1);
   border-bottom-color:rgba(255,255,255, 0.3);
   border-left-color:rgba(246, 36, 89, 1);
   border-right-color:rgba(255,255,255, 0.3);
   -webkit-animation: loader4 1s ease-in-out infinite;
   animation: loader4 1s ease-in-out infinite;
}
@keyframes loader4 {
   from {transform: rotate(0deg);}
   to {transform: rotate(360deg);}
}
@-webkit-keyframes loader4 {
   from {-webkit-transform: rotate(0deg);}
   to {-webkit-transform: rotate(360deg);}
}

a{
    text-decoration: none;
    color: inherit;
}
</style>