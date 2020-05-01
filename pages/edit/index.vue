<template>
  <div>
    <Nav title="プロファイル編集" :edit="true" />
    <section class="container-fluid">
      <table class="table no-border">
        <tbody>
          <tr v-for="profile in profileList" :key="profile.name">
            <td class="container-fluid">
              <div class="row">
                <div class="col-4">
                  {{ profile.name }}
                </div>
                <ul class="col-4">
                  <li v-for="(value, index) in profile.urlList" :key="index">
                    {{ value }}
                  </li>
                  <br />
                  <div class="input-group">
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
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td class="container-fluid">
              <div class="input-group col-8">
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
              <p v-if="isError" style="color: red;">
                空文字または同名のプロファイルは登録できません
              </p>
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
      isError: false
    }
  },
  computed: {
    ...mapGetters({
      profileList: 'profile/profileList'
    })
  },
  mounted() {
    this.$store.dispatch('profile/loadProfile')
  },
  methods: {
    async addProfile() {
      const result = await this.$store.dispatch(
        'profile/addProfile',
        this.profileName
      )
      this.profileName = ''
      if (result) {
        this.isError = false
      } else {
        this.isError = true
      }
    },
    addUrl(profileName) {
      // eslint-disable-next-line no-console
      console.log(this.urls[profileName])
      this.$store.dispatch('profile/addUrl', {
        name: profileName,
        url: this.urls[profileName]
      })
    },
    inputUrl(url, profileName) {
      this.urls[profileName] = url
    },
    save() {
      this.$store.dispatch('profile/saveProfile')
    }
  }
}
</script>

<style></style>
