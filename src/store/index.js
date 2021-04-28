import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user_id: 0,
      messages:[]
    }
  },
  mutations: {
    login (state,payload) {
      state.user_id = payload.user_id
    },
    pushMessage(state,payload) {
      state.messages.push(payload.message)
    }
  }
})
export default store