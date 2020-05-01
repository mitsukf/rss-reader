export default function ({ store }) {
  // 初回ロード
  store.dispatch('profile/loadProfile')
}
