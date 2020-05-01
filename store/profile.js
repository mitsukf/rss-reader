export const state = () => ({
  profileList: [],
  isLoad: false,
  isEdit: false
})

export const actions = {
  // profile登録
  addProfile({ state, commit }, name) {
    // profile名チェック
    if (name === '') {
      return false
    }

    const result = state.profileList.filter((obj) => obj.name === name)
    if (result.length !== 0) {
      // 同名のprofileが存在する場合はエラー
      return false
    }

    // profile登録
    commit('addProfile', name)
    return true
  },
  addUrl({ state, commit }, arg) {
    commit('addUrl', { url: arg.url, name: arg.name })
    // eslint-disable-next-line no-console
    console.log(state.profileList)
  },
  // profile移動
  moveProfile({ state, commit }, name, isUp) {
    for (let i = 0; i < state.profileList.length; i++) {
      if (state.profileList[i].name !== name) {
        continue
      }

      // 移動先を設定
      const dest = isUp ? i - 1 : i + 1
      if (dest < 0 || dest >= state.profileList.length) {
        // 移動先が不正な場合は終了
        return
      }

      // 移動
      commit('moveProfile', i, dest)
      break
    }
  },
  // profile保存
  saveProfile({ state }) {
    localStorage.profileList = JSON.stringify(state.profileList)
  },
  // profile読み込み
  loadProfile({ state, commit }) {
    // 初期値設定
    if (!localStorage.profileList) {
      // eslint-disable-next-line no-console
      console.log('no profile')
      localStorage.profileList = JSON.stringify([
        {
          name: 'ニュース',
          urlList: [
            'http://feeds.cnn.co.jp/rss/cnn/cnn.rdf',
            'http://feeds.japan.cnet.com/rss/cnet/all.rdf'
          ]
        },
        {
          name: '技術',
          urlList: [
            'https://rss.itmedia.co.jp/rss/2.0/tt_develop.xml',
            'https://rss.itmedia.co.jp/rss/2.0/ait_systemdesign.xml'
          ]
        },
        {
          name: '趣味',
          urlList: [
            'https://www.4gamer.net/rss/pc/pc_news.xml',
            'https://www.4gamer.net/rss/ps3/ps3_news.xml',
            'https://www.4gamer.net/rss/wii/wii_news.xml'
          ]
        }
      ])
    }

    if (state.isLoad) return
    commit('loadProfile')
  }
}

export const mutations = {
  addProfile(state, profileName) {
    state.profileList.push({ name: profileName, urlList: [] })
  },
  addUrl(state, arg) {
    state.profileList.map((obj) => {
      if (obj.name === arg.name) {
        obj.urlList.push(arg.url)
      }
    })
  },
  moveProfile(state, from, to) {
    const tmp = state.profileList[to]
    state.profileList[to] = state.profileList[from]
    state.profileList[from] = tmp
  },
  loadProfile(state) {
    state.profileList = JSON.parse(localStorage.profileList)
    state.isLoad = true
  }
}

export const getters = {
  profileList(state) {
    return state.profileList
  }
}
