<template>
  <div class="card bg-light bg-transparent  border-0  col-lg-12">
    <div class="loaderBox mx-auto mt-4" :class="visibilityLoader">
      <Loader />
    </div>
    <div
      :style="recovered"
      class="card-header border-bottom border-white text-white bg-transparent"
    >
      <h3>Cálculos de salário</h3>
    </div>
    <div class="card-body bg-transparent" :style="recovered" id="divMainCard">
      <form method="POST" @submit.prevent="enviarDados">
        <div class="form-group">
          <div class="card bgCard shadow text-white border-0 mb-4">
            <div class="card-header  border-0 bg-transparent">
              <h4>Calcular salário</h4>
            </div>
            <div
              class="card-body d-flex for md flex-wrap justify-content-around"
            >
              <div class="form-group col-md-6 col-lg-4">
                <label>Empresa</label>
                <select
                  name=""
                  @change="procuraContratos"
                  v-model="dados.empresa"
                  :style="desabSelect"
                  class="form-control"
                >
                  <option value="">Escolha a empresa</option>
                  <option
                    v-for="value in arrayEmpresas"
                    :key="value.id"
                    v-show="value.apelido != dados.empresa"
                    :value="value.apelido"
                  >
                    {{ value.apelido }}</option
                  >
                </select>
              </div>
              <div class="form-group col-md-3 col-lg-4 mr-auto">
                <label>Data de pagamento</label>
                <select
                  name=""
                  v-model="dados.datas"
                  @blur="verificaFeriados"
                  :style="desabSelect"
                  class="form-control"
                >
                  <option value="">Escolha a data</option>
                  <option
                    v-for="value in data_pagamento_referencia"
                    :key="value.id"
                    :value="value"
                  >
                    {{ value.data_pagamento }}</option
                  >
                </select>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-dark table-sm mb-0">
                <thead v-if="visibleTable">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Pessoa</th>
                    <th scope="col">Provento</th>
                    <th scope="col">Periodicidade</th>
                    <th scope="col">Valor do provento</th>
                    <th scope="col">Valor proporcional</th>
                    <th scope="col">Base Ir</th>
                    <th scope="col">Total a pagar</th>
                    <th scope="col">Data ref inicial</th>
                    <th scope="col">Data ref final</th>
                    <th scope="col">Data inicio provento</th>
                    <th scope="col">Data fim provento</th>
                    <th scope="col">Data admissao</th>
                    <th scope="col">Data termino efetiva</th>
                    <th scope="col">Dias efetivos</th>
                    <th scope="col">Dias úteis</th>
                  </tr>
                </thead>
                <tbody
                  v-show="visibleTable"
                  v-for="(contrato, cont) in arrayContratos"
                  :key="contrato.id"
                >
                  <!-- <tbody v-for="a in contrato.proventos.length" :key="a">
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>{{contrato}}</td>
                                        </tr>
                                    </tbody> -->
                  <tr v-for="(i, index) in contrato.proventos.length" :key="i">
                    <th scope="row">{{ cont + 1 }}</th>
                    <!-- <td>{{contrato.proventos[index].data_inicio < dados.datas.data_inicial_referencia}}</td> -->
                    <td>{{ contrato.contratado }}</td>
                    <td>{{ contrato.proventos[index].tipo_provento }}</td>
                    <td>{{ contrato.proventos[index].periodicidade }}</td>
                    <td>{{ contrato.proventos[index].valor }}</td>

                    <td>
                      {{
                        contrato.proventos[index].valorProporcional
                          ? contrato.proventos[index].valorProporcional.toFixed(
                              2
                            )
                          : contrato.proventos[index].valorProporcional
                      }}
                    </td>
                    <!-- <td>VAzio</td> -->
                    <!-- <td v-if="contrato.proventos.length == 0">{{ parseInt(contrato.salario)}}</td>
                                        <td v-else>{{ parseInt(contrato.salario)  + contrato.proventos[0].valor}}</td>    -->
                    <td></td>
                    <td>
                      {{
                        contrato.proventos[index].valorProporcional
                          ? contrato.proventos[index].valorProporcional.toFixed(
                              2
                            )
                          : contrato.proventos[index].valorProporcional
                      }}
                    </td>
                    <!-- <td>VAzio</td> -->
                    <td>{{ dados.datas.data_inicial_referencia }}</td>
                    <td>{{ dados.datas.data_final_referencia }}</td>
                    <td>{{ contrato.proventos[index].data_inicio }}</td>
                    <td>{{ contrato.proventos[index].data_fim }}</td>
                    <td>{{ contrato.data_admissao }}</td>
                    <td>{{ contrato.data_termino_efetiva }}</td>
                    <!-- - contrato.proventos[index].dia_inicial + 1 -->
                    <td>
                      {{
                        contrato.proventos[index].dia_final -
                          contrato.proventos[index].dia_inicial +
                          1
                      }}
                    </td>
                    <td>{{ dias_uteis }}</td>
                    <!-- <td>{{parseInt(contrato.salario)/30*dia_data }}</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <BtnSave
            @click.native="desbloquearInputs"
            :style="opacity"
            v-if="visualizar"
            origin="empresa"
            edit="true"
            type="button"
            color="bg-warning"
            texto="Editar"
            :visible="visible"
          />
          <BtnSave
            :style="opacity"
            v-else
            color="bg-primary"
            edit="false"
            type="submit"
            :texto="textoLogin"
            :visible="visible"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BtnSave from "./BtnSave";
import Loader from "./LoaderAnim";

export default {
  components: {
    BtnSave,
    Loader,
  },
  name: "FormSeries",
  data: function() {
    return {
      editando: false,
      idCargo: "",
      statusEditar: false,
      visibilityLoader: "",
      recovered: "visibility:hidden;",
      desabSelect: null,
      visualizar: false,
      //Estilizando spinner
      textoLogin: "Salvar",
      visible: "invisible",
      opacity: "opacity:1;",
      dNone: "d-none",
      //fim
      data_pagamento: null,
      data_pagamento_referencia: [
        {
          data_inicial_referencia: null,
          data_final_referencia: null,
        },
      ],
      arrayEmpresas: [],
      arrayContratos: [
        {
          proventos: [
            {
              teste: null,
            },
          ],
        },
      ],
      arrayValorProventos: [],
      visibleTable: false,
      novaData: false,
      dia_data: null,
      dias_corridos: null,
      dias_uteis: null,
      diaFinalMax: null,
      diaInicialMin: null,
      valorProv1: null,
      dados: {
        empresa: null,
        datas: [],
      },
    };
  },
  methods: {
    desbloquearInputs(e) {
      e.preventDefault();
      this.visualizar = false;
      this.statusEditar = true;
      this.desabSelect = "";
    },

    verificaFeriados() {
      const axios = require("axios");
      const headers = {
        Token: localStorage.getItem("token"),
      };
      var mes = this.data_pagamento_referencia[0].data_final_referencia.split(
        "-",
        3
      )[1];
      axios
        .post(`${process.env.apiURL}feriados/`, { mes: mes }, { headers })
        .then((response) => {
          var feriadosArray = response.data;
          var contFeriados = 0;
          var numFeriados = feriadosArray.length;
          while (contFeriados < feriadosArray.length) {
            var feriadoAtual = new Date(feriadosArray[contFeriados].feriado);
            feriadoAtual.toString().split(" ")[0] == "Sun"
              ? numFeriados - 1
              : "";
            contFeriados++;
          }
          this.calculoDiasUteis(numFeriados);
          this.verificaMesProvento();
          this.calculoDiasFinaisCorridos();
          this.calculoDiasIniciaisCorridos();
          this.calculoFator();
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    calculoFator() {
      var contContratos = 0;
      var contProventos = 0;
      while (contContratos < this.arrayContratos.length) {
        while (
          contProventos < this.arrayContratos[contContratos].proventos.length
        ) {
          var diasEfetivos =
            this.arrayContratos[contContratos].proventos[contProventos]
              .dia_final -
            this.arrayContratos[contContratos].proventos[contProventos]
              .dia_inicial +
            1;
          var diasCorridos = parseInt(
            this.data_pagamento_referencia[0].data_final_referencia.split(
              "-",
              3
            )[2]
          );
          var fatorProporcional = diasEfetivos / diasCorridos;
          this.arrayContratos[contContratos].proventos[
            contProventos
          ].valorProporcional =
            this.arrayContratos[contContratos].proventos[contProventos].valor *
            fatorProporcional;
          contProventos++;
        }
        contProventos = 0;
        contContratos++;
      }
    },
    calculoDiasUteis(numFeriados) {
      var nomeDiaInicial = new Date(
        this.data_pagamento_referencia[0].data_inicial_referencia
      );
      var nomeDiaFinal = new Date(
        this.data_pagamento_referencia[0].data_final_referencia
      );

      var diaInicial = this.dados.datas.data_inicial_referencia.split(
        "-",
        3
      )[2];
      var diaFinal = this.dados.datas.data_final_referencia.split("-", 3)[2];
      var diasCorridos = parseInt(diaFinal) - parseInt(diaInicial);
      this.dias_corridos = diasCorridos;
      var nomeDiaInicial = nomeDiaInicial.toString().split(" ")[0];
      var nomeDiaFinal = nomeDiaFinal.toString().split(" ")[0];

      var cont = 0;
      var diasUteis = 0;
      var diaAtual = new Date(
        this.data_pagamento_referencia[0].data_inicial_referencia
      );
      while (cont <= diasCorridos) {
        diaAtual.toString().split(" ")[0] == "Sun" ? " " : (diasUteis += 1);
        diaAtual.setDate(diaAtual.getDate() + 1);
        cont++;
      }
      this.dias_uteis = diasUteis - numFeriados;
    },
    verificaMesProvento() {
      var contContrato = 0;
      var contProvento = 0;
      var dataFinalReferencia = new Date(
        this.dados.datas.data_final_referencia
      ).toISOString();
      while (contContrato < this.arrayContratos.length) {
        if (this.arrayContratos[contContrato].data_termino_efetiva != null) {
          if (
            this.arrayContratos[contContrato].data_termino_efetiva.split(
              "-",
              3
            )[1] != this.dados.datas.data_inicial_referencia.split("-", 3)[1]
          ) {
            this.arrayContratos.splice(contContrato, 1);
          }
        } else if (
          this.arrayContratos[contContrato].data_termino_contratual.split(
            "-",
            3
          )[1] == this.dados.datas.data_final_referencia.split("-", 3)[1]
        ) {
          this.arrayContratos.splice(contContrato, 1);
        } else {
          // while(contProventos < this.arrayContratos[contContrato].proventos.length){
          //     if(this.arrayContratos[contContrato].proventos[contProvento].data_fim <= dataFinalReferencia && this.arrayContratos[contContrato].proventos[contProvento].data_inicio >= )
          //     contProvento++
          // }
        }
        // if()
        // console.log(this.dados.datas.data_inicial_referencia.split('-',3)[1])
        // this.arrayContratos[0].data_termino_efetiva.split('-',3)[1] != this.dados.datas.data_inicial_referencia ? this.arrayContratos.splice(contContrato,1) : ''
        contContrato++;
      }
    },

    calculoDiasFinaisCorridos() {
      var contContratos = 0;
      var contProventos = 0;
      while (contContratos < this.arrayContratos.length) {
        while (
          contProventos < this.arrayContratos[contContratos].proventos.length
        ) {
          var diaRefFinal = this.dados.datas.data_final_referencia.split(
            "-",
            3
          )[2];
          var arrayDias = [parseInt(diaRefFinal)];
          this.arrayContratos[contContratos].proventos[contProventos]
            .data_fim != null
            ? arrayDias.push(
                this.arrayContratos[contContratos].proventos[
                  contProventos
                ].data_fim.split("-", 3)[2]
              )
            : "";
          this.arrayContratos[contContratos].data_termino_efetiva != null
            ? arrayDias.push(
                this.arrayContratos[contContratos].data_termino_efetiva.split(
                  "-",
                  3
                )[2]
              )
            : "";
          this.diaFinalMax = Math.min(...arrayDias);
          this.arrayContratos[contContratos].proventos[
            contProventos
          ].dia_final = Math.min(...arrayDias);
          contProventos++;
        }
        contProventos = 0;
        contContratos++;
      }

      return Math.min(...arrayDias);
    },
    calculoDiasIniciaisCorridos() {
      var contContratos = 0;
      var contProventos = 0;
      while (contContratos < this.arrayContratos.length) {
        while (
          contProventos < this.arrayContratos[contContratos].proventos.length
        ) {
          var diaRefInicial = this.dados.datas.data_inicial_referencia.split(
            "-",
            3
          )[2];
          var arrayDias = [parseInt(diaRefInicial)];
          this.arrayContratos[contContratos].proventos[contProventos]
            .data_inicio != null &&
          this.arrayContratos[contContratos].proventos[
            contProventos
          ].data_inicio.split("-", 3)[1] ==
            this.dados.datas.data_final_referencia.split("-", 3)[1]
            ? arrayDias.push(
                this.arrayContratos[contContratos].proventos[
                  contProventos
                ].data_inicio.split("-", 3)[2]
              )
            : "";
          this.arrayContratos[contContratos].data_admissao.split("-", 3)[1] ==
          this.dados.datas.data_final_referencia.split("-", 3)[1]
            ? arrayDias.push(
                this.arrayContratos[contContratos].data_admissao.split(
                  "-",
                  3
                )[2]
              )
            : "";
          this.diaInicialMin = Math.max(...arrayDias);
          this.arrayContratos[contContratos].proventos[
            contProventos
          ].dia_inicial = Math.max(...arrayDias);
          contProventos++;
        }
        contProventos = 0;
        contContratos++;
      }

      return Math.max(...arrayDias);
    },
    arrumaData(e) {
      var t = e.target.value.split("-", 3);
      this.dia_data = t[2];
    },
    procuraContratos() {
      const axios = require("axios");

      const headers = {
        Token: localStorage.getItem("token"),
      };

      axios
        .post(
          `${process.env.apiURL}contratos/pessoa/`,
          { apelido: this.dados.empresa },
          { headers }
        )
        .then((response) => {
          this.arrayContratos = response.data;

          axios
            .post(
              `${process.env.apiURL}empresas/search/apelido/`,
              { apelido: this.arrayContratos[0].contratante },
              { headers }
            )
            .then((response) => {
              this.data_pagamento_referencia = response.data[0].datas_pagamento;
              this.visibleTable = true;
            })
            .catch((erro) => {
              console.log(erro);
            });
        })
        .catch((erro) => {
          console.log(erro);
        });
    },

    adicionarDataPagamento() {
      this.novaData = true;
    },
  },
  watch: {
    $route: async (to, from) => {
      window.location.reload();
    },
  },
  beforeCreate() {
    //Utilizando o axios para fazer requisições na API
    const axios = require("axios");
    const headers = {
      Token: localStorage.getItem("token"),
    };
    //REQ 1
    axios
      .get(`${process.env.apiURL}empresas/apelidos`, { headers })
      .then((response) => {
        this.arrayEmpresas = response.data;
      });
  },
  created() {
    this.idCargo = this.$route.query.id;
    if (this.idCargo != null) {
      this.visualizar = true;
      this.desabSelect = "pointer-events:none;";
      this.recuperarDados();
    } else {
      this.visibilityLoader = "d-none";
      this.recovered = "visibility:visible;";
    }
  },
};
</script>

<style scoped>
.bgCard {
  background-color: rgba(0, 48, 255);
  /* width:100vw;   */
}

.card-body {
  background-color: rgba(255, 255, 255, 0);
}
.loaderBox {
  width: 25px;
  height: 35px;
  font-size: 10vh;
  margin-top: 5%;
  color: rgb(34, 0, 187);
}
</style>
