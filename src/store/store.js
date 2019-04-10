import Vuex from 'vuex'
import Vue from 'vue'
import listaUsuarios from '../data/lista-usuarios.json'
import comunicados from '../data/comunicados.json'

Vue.use(Vuex) 

export default new Vuex.Store({ 
    state: {
        usuario:{},
        listaUsuarios,
        comunicados
    },
    getters: {
        getListaUsuarios(state) {
            return state.listaUsuarios.filter(
                (usuario) => usuario.id != state.usuario.id
            ); 
        },
        getUsuario(state) {
            return state.usuario;
        },
        getComunicados(state) {
            return state.comunicados;
             
        }
    },
    mutations:{
        setUsuario(state,usuario) {
            state.usuario = usuario;
        }
    }

})