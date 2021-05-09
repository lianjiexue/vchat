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
      othermessages:[],
      is_connect:0
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
    setUserHeadImg(state,payload) {
      state.userInfo.head_img = payload.head_img
    },
    removeMessage(state,payload) {
      state.messages.splice(payload.start,1)
    },
    pushOtherMessage(state,payload) {
      state.othermessages.push(payload.message)
    },
    setConnect(state,payload) {
      console.log("当前的链接状态",payload)
      state.is_connect = payload.is_connect
    }
  }
})
export default store