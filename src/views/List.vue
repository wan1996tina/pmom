<template>
    <div id="list">
      <div class="container d-flex align-items-center flex-column">
        <h5 class="title">Todo List</h5>
      <b-input-group size="lg" class="addInput">
        <b-form-input v-model="newtodo" class="col-10 my-3 mx-auto" placeholder="請輸入事項名稱..." @keydown.enter="addTodo">
        </b-form-input>
      </b-input-group>
      <b-btn variant="light" @click="addTodo" class="col-12 my-3 btn1" >新增</b-btn>

      <!-- <b-table-simple>

        <b-thead>
          <b-tr>
            <b-th>事項</b-th>
            <b-th>動作</b-th>
          </b-tr>
        </b-thead>

        <draggable v-model="todos" tag="tbody" v-bind="dragOption">
          <b-tr v-if="todos.length == 0">
            <b-td colspan="2">沒有資料</b-td>
          </b-tr>

          <b-tr v-for="(todo,index) in todos" :key="index" >

            <b-td>
            <b-form-input v-model="todo.model" v-if="todo.edit"></b-form-input>
            <b-btn variant="link" class="text-danger" v-if="todo.edit" @click="cancelTodo(index)">
              <font-awesome-icon :icon="['fas', 'undo']"></font-awesome-icon>
            </b-btn>
            <b-btn variant="link" class="text-success" v-if="todo.edit" @click="saveTodo(index)">
              <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
            </b-btn>
            <span v-else>{{ todo.name }}</span>
          </b-td>

          <b-td>
            <b-btn variant="link" class="text-primary" @click="editTodo(index)">
              <font-awesome-icon :icon="['fas', 'pen']"></font-awesome-icon>
            </b-btn>
            <b-btn variant="link" class="text-danger" @click="delTodo(index)">
              <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
            </b-btn>
          </b-td>
          </b-tr>
      </draggable>
      </b-table-simple> -->
<!-- 新 list 列表 --------------------------------------------------------------------------->

      <ul v-if="todos.length" class="col-12">
        <draggable class="dragwrap" v-model="todos" v-bind="dragOption">
          <li v-for="(todo,index) in todos" :key="index">
          <input type="text" v-model="todo.model" v-if="todo.edit" class="editInput">
          <div v-if="todo.edit" class="editBtns">
            <button class="btn-save" @click="saveTodo(index)">
              <font-awesome-icon :icon="['fas', 'check']"></font-awesome-icon>
            </button>
            <button class="btn-cancel" @click="cancelTodo(index)">
              <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
            </button>
          </div>
          <p v-else>{{todo.name}}</p>

          <div class="editBtns" v-if="!todo.edit">
            <button class="btn-edit" @click="editTodo(index)">
              <font-awesome-icon :icon="['fas', 'pen']"></font-awesome-icon>
            </button>
            <button class="btn-del" @click="delTodo(index)">
              <font-awesome-icon :icon="['fas', 'trash-alt']"></font-awesome-icon>
            </button>
          </div>

          </li>
        </draggable>
      </ul>
      <span v-else class="empitySpan">朋友你好，<br >你的清單空空如也 ...</span>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      newtodo: '',
      dragOption: {
        animation: 200
      }
    }
  },
  methods: {
    addTodo () {
      if (this.newtodo.length > 0) { this.$store.commit('addTodo', this.newtodo) }
      this.newtodo = ''
    },
    delTodo (index) {
      this.$store.commit('delTodo', index)
    },
    editTodo (index) {
      this.$store.commit('editTodo', index)
    },
    cancelTodo (index) {
      this.$store.commit('cancelTodo', index)
    },
    saveTodo (index) {
      this.$store.commit('saveTodo', index)
    }
  },
  computed: {
    todos: {
      get () {
        return this.$store.getters.todos
      },
      set (value) {
        this.$store.commit('dragTodo', value)
      }
    }
  }
}
</script>
