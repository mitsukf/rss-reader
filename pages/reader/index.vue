<template>
  <div>
    <Nav :title="$route.query.profile" />
    <section class="container-fluid bg-secondary" style="padding-left: 20px;">
      <table class="table">
        <tbody>
          <tr v-for="rss in rssList" :key="rss.id">
            <div
              class="border rounded-lg bg-light"
              style="margin-top: 10px; padding: 10px;"
            >
              <div class="row txt1">
                <div class="col-4">{{ rss.item.date }}</div>
                <div class="col-4 txt3">
                  <a :href="rss.site.link" target="_blank" class="txt3">{{
                    rss.site.name
                  }}</a>
                </div>
              </div>
              <div class="row txt2">
                <div class="col-12">
                  <a :href="rss.item.link" target="_blank">{{
                    rss.item.title
                  }}</a>
                </div>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
      <client-only>
        <infinite-loading spinner="circle" @infinite="infiniteHandler">
          <span slot="no-more">-----読み込み完了-----</span>
          <span slot="no-results">-----読み込み結果はありません-----</span>
        </infinite-loading>
      </client-only>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import Nav from '~/components/Nav'

export default {
  components: {
    Nav,
    InfiniteLoading
  },
  async fetch({ store, query }) {
    await store.dispatch('reader/readRss', query.profile)
  },
  computed: {
    ...mapGetters({
      rssList: 'reader/rssList'
    })
  },
  methods: {
    async infiniteHandler($state) {
      if (this.loading) return

      const response = await this.get()
      if (response > 0) {
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    async get(value) {
      return await this.$store.dispatch('reader/readRss')
    }
  }
}
</script>

<style>
.txt1 {
  font-size: 12px;
  color: #999999;
}
.txt2 {
  font-size: 16px;
}
a.txt3 {
  color: #999999;
}
</style>
