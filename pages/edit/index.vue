<template>
  <div>
    <Nav title="編集" :edit="true" />
    <section class="container-fluid">
      <table class="table no-border">
        <tbody>
          <tr v-for="profile in profileList" :key="profile.name">
            <td class="container-fluid">
              <!-- プロファイル表示 -->
              <div class="row">
                <span :class="[$ua.deviceType() === 'pc' ? 'col-8' : 'col-12']">
                  <span class="text-nowrap">
                    {{ profile.name }}
                    <i
                      class="fas fa-window-close remove-button fa-lg"
                      @click="removeProfile(profile.name)"
                    ></i>
                  </span>
                  <span class="text-nowrap move-button">
                    <i
                      class="fas fa-arrow-circle-up fa-lg"
                      @click="moveProfile(profile.name, true)"
                    ></i>
                    <i
                      class="fas fa-arrow-circle-down fa-lg"
                      @click="moveProfile(profile.name, false)"
                    ></i>
                  </span>
                </span>
              </div>
              <!-- URL表示 -->
              <ul :class="[$ua.deviceType() === 'pc' ? 'col-8' : 'col-12']">
                <div class="url-list">
                  <li
                    v-for="(value, index) in profile.urlList"
                    :key="index"
                    style="word-break: break-all;"
                  >
                    <a :href="value">{{ value }}</a>
                    <i
                      class="fas fa-window-close remove-button fa-lg"
                      @click="removeUrl(profile.name, value)"
                    ></i>
                  </li>
                </div>
              </ul>
              <!-- URL入力 -->
              <div class="row url-input">
                <div
                  :class="[
                    'input-group',
                    $ua.deviceType() === 'pc' ? 'col-8' : 'col-12'
                  ]"
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="URL"
                    @input="inputUrl($event.target.value, profile.name)"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="addUrl(profile.name)"
                    >
                      登録
                    </button>
                  </div>
                </div>
                <div
                  v-show="
                    urlStatus.isExistingValidate &&
                    urlStatus.name == profile.name
                  "
                  class="loader"
                >
                  Loading
                </div>
                <div
                  v-if="urlStatus.isError && urlStatus.name == profile.name"
                  class="col-8"
                  style="color: red; margin-top: 8px;"
                >
                  {{ urlStatus.errorMessage }}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <!-- プロファイル入力 -->
            <td class="container-fluid">
              <div class="row">
                <div :class="[$ua.deviceType() === 'pc' ? 'col-8' : 'col-12']">
                  <div class="input-group">
                    <input
                      v-model="profileName"
                      type="text"
                      class="form-control"
                      placeholder="プロファイル名"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="addProfile"
                      >
                        登録
                      </button>
                    </div>
                  </div>
                  <p v-if="isError" style="color: red; margin-top: 8px;">
                    空文字または同名のプロファイルは登録できません
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Nav from '~/components/Nav'

export default {
  components: {
    Nav
  },
  data() {
    return {
      profileName: '',
      urls: {},
      isError: false,
      isPc: true
    }
  },
  computed: {
    ...mapGetters({
      profileList: 'profile/profileList',
      urlStatus: 'profile/urlStatus'
    })
  },
  mounted() {
    this.$store.dispatch('profile/loadProfile')
    this.isPc = this.$ua.deviceType() === 'pc'
  },
  methods: {
    async addProfile() {
      this.isError = !(await this.$store.dispatch(
        'profile/addProfile',
        this.profileName
      ))
      // 入力値をクリア
      this.profileName = ''
    },
    addUrl(profileName) {
      this.$store.dispatch('profile/addUrl', {
        name: profileName,
        url: this.urls[profileName]
      })
    },
    inputUrl(url, profileName) {
      this.urls[profileName] = url
    },
    removeProfile(name) {
      const res = confirm('「' + name + '」を削除します')
      if (res) {
        this.$store.commit('profile/removeProfile', name)
      }
    },
    moveProfile(moveName, isMoveUp) {
      this.$store.dispatch('profile/moveProfile', {
        name: moveName,
        isUp: isMoveUp
      })
    },
    removeUrl(removeName, removeUrl) {
      const res = confirm('選択したURLを削除します')
      if (res) {
        this.$store.commit('profile/removeUrl', {
          name: removeName,
          url: removeUrl
        })
      }
    },
    save() {
      this.$store.dispatch('profile/saveProfile')
    }
  }
}
</script>

<style>
.remove-button {
  color: red;
  margin-left: 10px;
}
.move-button {
  margin-left: 10px;
}
.url-list {
  margin-top: 15px;
  margin-left: 15px;
}
.url-input {
  margin-top: 15px;
}
</style>
