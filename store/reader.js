export const state = () => ({
  profile: null,
  rssList: [],
  offset: 0,
  total: 0
})

export const actions = {
  async readRss({ state, commit }) {
    if (state.profile) {
    }
    const getOffset = state.offset
    const getCount = 20

    let res
    try {
      res = await this.$axios.get('/api/getRssItems', {
        params: {
          profile: '',
          offset: getOffset,
          count: getCount
        }
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      throw err
    }

    for (const data of res.data) {
      commit('addRssItem', data)
    }
    commit('setOffset', state.rssList.length)
    return res.data.length
  }
}

export const mutations = {
  addRssItem(state, item) {
    item.id = state.rssList.length + 1
    state.rssList.push(item)
  },
  setOffset(state, offset) {
    state.offset = offset
  }
}

export const getters = {
  rssList(state) {
    return state.rssList
  }
}
