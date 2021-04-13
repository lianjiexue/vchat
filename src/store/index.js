import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user_id: 0
    }
  },
  mutations: {
    login (state,payload) {
      state.user_id = payload.user_id
    }
  }
})
export default store