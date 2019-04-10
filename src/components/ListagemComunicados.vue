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
                 
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.titulo" label="Titulo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.descricao" label="Descrição"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                   <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="editedItem.data" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(editedItem.data)">OK</v-btn>
        </v-date-picker>
      </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table 
      :headers="headers"
      :items="desserts"
       hide-actions
      pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td >{{ props.item.titulo }}</td>
        <td >{{ props.item.descricao }}</td>
        <td >{{ props.item.data }}</td>
        <td>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
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
import {mapGetters} from 'vuex'
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
        { text: 'Titulo', value: 'titulo' ,sortable: false},
        { text: 'Descrição', value: 'descricao', sortable: false},
        { text: 'Data', value: 'data', sortable: false },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        titulo: '',
        descricao: '',
        data: ''
      },
      defaultItem: {
        name: '',
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
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          for(var i=0; i<this.getComunicados.length; i++) {
            this.desserts.push (this.getComunicados[i]);
            
            }
        },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Tem certeza que deseja deletar esse item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          
        } else {
          this.desserts.push(this.editedItem)
          this.editedItem.id = this.desserts.length;
          
          
        }
        this.close()
      }
    }
  }
</script>