export const state = () => ({
  profile: null,
  rssList: [],
  offset: 0,
  total: 0
})

export const actions = {
  async readRss({ commit }) {
    const res = await this.$axios.get('/api/getRssInfo')
    for (const data of res.data) {
      commit('addRssItem', data)
    }
  }
}

export const mutations = {
  addRssItem(state, item) {
    item.id = state.rssList.length + 1
    state.rssList.push(item)
  }
}

export const getters = {
  rssList(state) {
    return state.rssList
  }
}
