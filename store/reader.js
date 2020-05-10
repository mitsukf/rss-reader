export const state = () => ({
  profile: null,
  urlList: [],
  rssList: [],
  offset: 0
})

export const actions = {
  async readRss({ rootGetters, state, commit }, profile) {
    if (profile && state.profile !== profile) {
      // profileのURL取得
      const xmlList = []
      rootGetters['profile/profileList'].map((obj) => {
        if (obj.name === profile) {
          xmlList.push(...obj.urlList)
        }
      })
      commit('setProfileInfo', { name: profile, urlList: xmlList })
    }

    const getOffset = state.offset
    const getCount = 20

    let res
    try {
      res = await this.$axios.get('/api/getRssItems', {
        params: {
          urlList: state.urlList,
          offset: getOffset,
          count: getCount
        }
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      throw err
    }

    for (const rssItem of res.data.rssItems) {
      commit('addRssItem', rssItem)
    }
    return res.data.end
  }
}

export const mutations = {
  setProfileInfo(state, { name, urlList }) {
    state.profile = name
    state.urlList = urlList
    state.rssList = []
    state.offset = 0
  },
  addRssItem(state, item) {
    item.id = state.rssList.length + 1
    state.rssList.push(item)
    state.offset = state.rssList.length
  }
}

export const getters = {
  rssList(state) {
    return state.rssList
  }
}
