<template>
  <section class="container">
    <h1 class="h1">RSSリーダー - {{ $route.query.profile }}</h1>
    <table class="table table-striped">
      <tbody>
        <tr v-for="rss in rssList" :key="rss.id" class="container">
          <div class="row txt1">
            <div class="col-4">{{ rss.item.date }}</div>
            <a :href="rss.site.link" class="col-4 txt3">{{
              rss.site.name
            }}</a>
          </div>
          <div class="row txt2">
            <div class="col-12">
              <a :href="rss.item.link">{{ rss.item.title }}</a>
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
</template>

<script>
import { mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {
    InfiniteLoading
  },
  async fetch({ store }) {
    await store.dispatch('reader/readRss')
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
.container {
  max-width: 730px;
}
.txt1 {
  font-size: 12px;
  color: #999999;
}
.txt2 {
  font-size: 18px;
}
a.txt3 {
  color: #999999;
}
</style>
