<template>
    <div class="div-main flex">
        <div class="div-second flex">
            <span id="span-texto">Bem vindo ao Eu Empreendo</span>
            <img class="icon-logo" 
                    src="https://scontent.fbsb12-1.fna.fbcdn.net/v/t1.0-9/39891376_992316040952435_4843759430895927296_n.png?_nc_cat=101&_nc_eui2=AeFVX6g9Dt6lNdhfUcYedyw9vaEvmJd6MXEE9-JnLh2sStuV1U7Xp1ovzSQV-5chCAjBDTLGMzrcBRMSUtkWq6Fj0aEtc_A3YKUkQsMAmiFA1A&_nc_ht=scontent.fbsb12-1.fna&oh=8596c56ab1d2299013131232ea11c892&oe=5D061E06"
                    width="200px">
            <div class="div-usuarios flex">
                <div class="div-usuario" v-for="usuario in getListaUsuarios" :key="usuario.id" @click="selecionarUsuario(usuario)">
                    <img class="icon-usuario" :src="usuario.imagem">
                    <span class="nome-usuario">{{ usuario.nome }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    name: 'usuario', /*definindo o nome do componente*/

    computed:{
      ...mapGetters([
        'getListaUsuarios'
      ])
    },
    methods:{
      ...mapMutations([
        'setUsuario'
      ]),
      selecionarUsuario(usuario) {
        this.setUsuario(usuario);
        this.$router.push('/lista-comunicados');
      }
    }
}
</script>

<style>
body {
  font-family: 'Helvetica';
}
.div-main{
  height: calc(100% - 64px);
}

.icon-usuario {
  border-radius: 5px;
  height: 10vw;
  width: 10vw;
  min-height: 84px;
  min-width: 84px;
  position: relative; 
}

.div-usuario {
  height: 190px;
 
  width: 160px;
}

.div-usuario:hover span {
  color: rgb(12, 12, 12);
  cursor: pointer;
}

.div-usuario:hover img {
  border: 4px solid rgb(245, 183, 12);
  cursor: pointer;
}

.div-second {
  text-align: center;
  flex-direction: column; 
  width: 100%;
}

.div-usuarios {
  display: flex;
  cursor: default;
  justify-content: center;
  align-items: center;

}

.flex {
  display: flex;
  cursor: default;
  justify-content: center;
  align-items: center;
}

#span-texto {
  color: rgb(7, 7, 7);
  font-size: 40pt;
}

.nome-usuario {
  display: block;
  text-align: center;
  font-size: 18pt;
  color: rgb(12, 12, 12);
}

.icon-logo{
  
  border-radius: 105px;
  height: 10vw;
  width: 10vw;
  min-height: 84px;
  min-width: 84px;
  position: relative; 
}
</style>