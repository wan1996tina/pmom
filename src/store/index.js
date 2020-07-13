import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const timeleft = parseInt(process.env.VUE_APP_TIMELEFT)
const timeleftBreak = parseInt(process.env.VUE_APP_TIMELEFT_BREAK)

export default new Vuex.Store({
  state: {
    todos: [],
    // 剩多少時間
    timeleft,
    // 可選鈴聲
    alarm: 'alarm1.mp3',
    // 目前
    current: '',
    // 是否休息中
    isBreak: false,
    progressNow: 0
  },
  mutations: {
    selectAlarm (state, data) {
      state.alarm = data
    },
    addTodo (state, data) {
      state.todos.push({ name: data, edit: false, model: data })
    },
    dragTodo (state, data) {
      state.todos = data
    },
    delTodo (state, index) {
      state.todos.splice(index, 1)
    },
    editTodo (state, data) {
      state.todos[data].edit = !state.todos[data].edit
    },
    cancelTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].model = state.todos[data].name
    },
    saveTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].name = state.todos[data].model
    },
    start (state) {
      if (state.isBreak) {
        state.current = '休息一下'
      } else if (!state.isBreak) {
        state.showProgress = 0
        state.current = state.todos[0].name
        state.todos.splice(0, 1)
      }
    },
    countdown (state, data) {
      state.timeleft--
      state.progressNow += data
      if (state.progressNow >= 100) {
        state.progressNow = 100
      }
    },
    finish (state) {
      if (state.todos.length > 0) {
        state.isBreak = !state.isBreak
      }
      state.current = ''
      state.timeleft = state.isBreak ? timeleftBreak : timeleft
      
    },
    showProgress (state, data) {
      state.progressNow += data
      if (state.progressNow >= 100) {
        state.progressNow = 100
      }
    },
    reset (state) {
      state.progressNow = 0
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    alarm (state) {
      return state.alarm
    },
    todos (state) {
      return state.todos
    },
    timeleft (state) {
      return state.timeleft
    },
    current (state) {
      return state.current
    },
    isBreak (state) {
      return state.isBreak
    },
    progressNow (state) {
      return state.progressNow
    }
  },
  plugins: [createPersistedState()]
})
