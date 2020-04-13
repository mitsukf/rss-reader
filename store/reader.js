/* eslint-disable no-console */
import axios from 'axios'

export const state = () => ({
  profile: null,
  rssList: [],
  offset: 0,
  total: 0
})

export const actions = {
  async readRss ({ commit }) {
    await axios.get('/api/getRssInfo').then(
      (res) => {
        for (const data of res.data) {
        // eslint-disable-next-line no-console
          console.log(data)
          commit('addRssItem', data)
        }
        return res.data
      }
    )
  }
}

export const mutations = {
  addRssItem (state, item) {
    console.log(state.rssList.length)
    state.rssList.push(item)
  }
}

export const getters = {
  rssList (state) {
    return state.rssList
  }
}
