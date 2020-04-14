<template>
  <section class="container">
    <h1 class="h1">RSSリーダー - {{ $route.query.profile }}</h1>
    <table class="table table-striped">
      <tbody>
        <tr v-for="rss in rssList" :key="rss.id" class="container">
          <div class="row">
            <div class="col-4">{{ rss.item.date }}</div>
            <div class="col-4">{{ rss.site.name }}</div>
          </div>
          <div class="row">
            <div class="col-12">{{ rss.item.title }}</div>
          </div>
        </tr>
      </tbody>
    </table>
    <client-only>
      <infinite-loading spinner="circle" @infinite="infiniteHandler">
        <span slot="no-more">-----検索結果は以上です-----</span>
        <span slot="no-results">-----検索結果はありません-----</span>
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
      await this.get()
      $state.loaded()
    },
    async get(value) {
      await this.$store.dispatch('reader/readRss')
    }
  }
}
</script>

<style>
.container {
  max-width: 730px;
}
</style>
