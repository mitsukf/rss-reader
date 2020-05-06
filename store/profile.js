export const state = () => ({
  profileList: [],
  urlStatus: {
    name: null,
    isExistingValidate: false,
    isError: false,
    errorMessage: null
  },
  isLoad: false
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
  async addUrl({ state, commit }, arg) {
    commit('startUrlCheck', { name: arg.name })
    // URLバリデーション
    let judge = true
    try {
      const res = await this.$axios.get('/api/validRssUrl', {
        params: {
          url: arg.url
        }
      })
      judge = res.data.validate
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message)
    }

    // URL重複チェック
    state.profileList.map((obj) => {
      if (obj.name !== arg.name) {
        return
      }
      obj.urlList.map((obj2) => {
        if (obj2 === arg.url) {
          // 同URLが存在する場合はエラー
          judge = false
        }
      })
    })
    commit('endUrlCheck', { name: arg.name, isError: !judge })

    if (judge) {
      commit('addUrl', { url: arg.url, name: arg.name })
    }
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
  },
  startUrlCheck(state, arg) {
    state.urlStatus.name = arg.name
    state.urlStatus.isExistingValidate = true
    state.urlStatus.isError = false
  },
  endUrlCheck(state, arg) {
    state.urlStatus.name = arg.name
    state.urlStatus.isExistingValidate = false
    if (arg.isError) {
      state.urlStatus.isError = arg.isError
      state.urlStatus.errorMessage = 'URL登録に失敗しました'
    }
  }
}

export const getters = {
  profileList(state) {
    return state.profileList
  },
  urlStatus(state) {
    return state.urlStatus
  }
}
