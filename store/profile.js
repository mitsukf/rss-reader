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
      // 空文字の場合はエラー
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
  // URL登録
  addUrl({ commit }, arg) {
    commit('addUrl', { url: arg.url, name: arg.name })
  },
  // profile移動
  moveProfile({ state, commit }, arg) {
    for (let i = 0; i < state.profileList.length; i++) {
      if (state.profileList[i].name !== arg.name) {
        continue
      }

      // 移動先を設定
      const dest = arg.isUp ? i - 1 : i + 1
      if (dest < 0 || dest >= state.profileList.length) {
        // 移動先が不正な場合は終了
        return
      }

      // 移動
      commit('moveProfile', { from: i, to: dest })
      return
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
            'https://www.gamespark.jp/rss/index.rdf',
            'https://www.4gamer.net/rss/news_topics.xml'
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
  removeProfile(state, profileName) {
    state.profileList = state.profileList.filter((obj) => {
      return obj.name !== profileName
    })
  },
  removeUrl(state, arg) {
    state.profileList.map((obj) => {
      if (obj.name === arg.name) {
        obj.urlList = obj.urlList.filter((url) => {
          return url !== arg.url
        })
      }
    })
  },
  moveProfile(state, arg) {
    const tmp = state.profileList[arg.to]
    state.profileList[arg.to] = state.profileList[arg.from]
    state.profileList[arg.from] = tmp

    // TODO watch発火のための暫定処理
    state.profileList.push({})
    state.profileList.pop()
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
