import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user_id: 0,
      messages:[],
      mood:null,
      friends:[],
      userInfo:{},
      othermessages:[]
    }
  },
  mutations: {
    login (state,payload) {
      state.user_id = payload.user_id
    },
    pushMessage(state,payload) {
      state.messages.push(payload.message)
    },
    oneMood(state,payload) {
      state.mood = payload.mood
    },
    setUserId(state,payload) {
      state.user_id = payload.user_id
    },
    setFriends(state,payload) {
      state.friends = payload.friends
    },
    setUserInfo(state, payload) {
      state.userInfo = payload.userInfo
    },
    removeMessage(state,payload) {
      state.messages.splice(payload.start,1)
    },
    pushOtherMessage(state,payload) {
      state.othermessages.push(payload.message)
    }
  }
})
export default store