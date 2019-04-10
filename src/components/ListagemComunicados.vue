<template>
  <div>
    <v-toolbar flat color="orange">
      <v-toolbar-title>Comunicados</v-toolbar-title>
      <v-divider
              class="mx-2"
              inset
              vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="gray" dark class="mb-2" v-on="on">Adicionar</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="itemEditado.titulo" label="Titulo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="itemEditado.descricao" label="Descrição"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-menu
                          ref="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                              @blur="date = parseDate(itemEditado.data)"
                              color="orange"
                              v-model="itemEditado.data"
                              label="Data"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker v-model="itemEditado.data" no-title scrollable color="orange">
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(itemEditado.data)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="fechar">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="salvar">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
            :headers="headers"
            :items="comunicado"
            hide-actions
            pagination.sync="pagination"
            class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.titulo }}</td>
        <td>{{ props.item.descricao }}</td>
        <td>{{ props.item.data }}</td>
        <td>
          <v-icon
                  small
                  class="mr-2"
                  @click="editarItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
                  small
                  @click="deletarItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'ID',
        align: 'left',
        sortable: true,
        value: 'id'
      },
      {text: 'Titulo', value: 'titulo', sortable: false},
      {text: 'Descrição', value: 'descricao', sortable: false},
      {text: 'Data', value: 'data', sortable: false},
      {text: 'Ações', value: 'name', sortable: false}
    ],
    comunicado: [],
    editedIndex: -1,
    itemEditado: {
      titulo: '',
      descricao: '',
      data: ''
    },
    defaultItem: {
      titulo: '',
      descricao: '',
      data: ''
    }
  }),

  computed: {
    ...mapGetters([
      'getComunicados'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Comunicado' : 'Editar Comunicado'
    }
  },

  watch: {
    dialog (val) {
      val || this.fechar()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      for (let i = 0; i < this.getComunicados.length; i++) {
        this.comunicado.push(this.getComunicados[i])
      }
    },
    
    editarItem (item) {
      this.editedIndex = this.comunicado.indexOf(item)
      this.itemEditado = Object.assign({}, item)
      this.dialog = true
    },
    
    deletarItem (item) {
      const index = this.comunicado.indexOf(item)
      confirm('Tem certeza que deseja deletar esse item?') && this.comunicado.splice(index, 1)
    },
    
    fechar () {
      this.dialog = false
      setTimeout(() => {
        this.itemEditado = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    
    randomId (item1) {
      let newId
      let tamanhoItem = item1.length
      newId = item1[tamanhoItem - 1].id
      return newId + 1
    },
    
    salvar () {
      if (this.editedIndex > -1) {
        return Object.assign(this.comunicado[this.editedIndex], this.itemEditado)
      }
      this.itemEditado.id = this.randomId(this.comunicado)
      this.comunicado.push(this.itemEditado)
      this.fechar()
    }
  }
}
</script>