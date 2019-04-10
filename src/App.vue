<template>
  <v-app>
  <v-toolbar color="white"  v-if=" getUsuario.nome != undefined" >

     <img
                    src="https://scontent.fbsb12-1.fna.fbcdn.net/v/t1.0-9/39891376_992316040952435_4843759430895927296_n.png?_nc_cat=101&_nc_eui2=AeFVX6g9Dt6lNdhfUcYedyw9vaEvmJd6MXEE9-JnLh2sStuV1U7Xp1ovzSQV-5chCAjBDTLGMzrcBRMSUtkWq6Fj0aEtc_A3YKUkQsMAmiFA1A&_nc_ht=scontent.fbsb12-1.fna&oh=8596c56ab1d2299013131232ea11c892&oe=5D061E06"
                    width="50px">

   <img
                    src="https://scontent.fbsb12-1.fna.fbcdn.net/v/t1.0-9/56403728_368797673726250_4690519099468414976_n.jpg?_nc_cat=107&_nc_eui2=AeEhR8_f80kn21g2zz3DPeJqjN1o46RLComTpxHDNgJUsjoxyTyC3H4muUE_x8cTRarWp9rMFG9hLMGG1TiSvUqIe911oHrLZHmNNmz_pLKOlw&_nc_ht=scontent.fbsb12-1.fna&oh=78db02891b34b703759f74895ada9ac4&oe=5D31F017"
                    width="200px">

    <v-spacer></v-spacer>
    <v-flex xs12 md3>
    <v-text-field 
    label="Buscador"
    ></v-text-field>

        </v-flex>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
  
    <div class="text-xs-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }" >
        <img v-on="on" :src="getUsuario.imagem"  class="imagem-usuario" >
      </template>
      <v-list>
          <v-list-tile
              v-for="(usuario, index) in getListaUsuarios.filter(function(usuario) { return usuario.nome != getUsuario.nome; })"
              :key="index"
              @click="alterarUsuario(usuario)"
              >
                <v-list-tile-title class="menu" >
                    <img :src="usuario.imagem" class="mini-menu">{{ usuario.nome }}
                </v-list-tile-title>
                            
          </v-list-tile>
                              
          <v-list-tile @click="sair()">

                <v-list-tile-title>Sair</v-list-tile-title>
                    
          </v-list-tile>
      </v-list>
    </v-menu>
  </div>
  </v-toolbar>
    
    <router-view></router-view>
    
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      absolute
      dark
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img :src="getUsuario.imagem">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              {{getUsuario.nome}}
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    drawer: null,
    items: [
    { title: 'Home', icon: 'home' },
    { title: 'Categorias', icon: 'style' },
    { title: 'Vídeo', icon: 'movie_creation' }
    ],
    mini: false,
    right: null
    }
  },
  computed:{
    ...mapGetters([
      'getUsuario',
      'getListaUsuarios'
    ])
  },
  
  methods: {
    ...mapMutations([
      'setUsuario'
    ]),
    alterarUsuario(usuario) {
      this.setUsuario(usuario);
      
    },
    sair() {
      this.setUsuario({});
      this.$router.push('/');
    }
  }
}
</script>

<style>
.imagem-usuario{
  width: 49px;
  display:flex;
  align-items: center;
}
.mini-menu{
  width: 24px;
  margin-right: 8px;
  
}

.menu{
  display: flex;
  align-items: center;
  justify-content: space-evelyn;
}

body
{
  height: 1000px;
}

</style>
