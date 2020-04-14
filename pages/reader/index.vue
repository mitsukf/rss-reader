<template>
  <section class="container">
    <h1 class="h1">RSSリーダー - {{ $route.query.profile }}</h1>
    <button @click="get">
      データ取得
    </button>
    <div>rssList=[{{ rssList }}]</div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // computed: {
  //  getRssList () {
  //    return this.$store.getters['reader/rssList']
  //  }
  // },
  computed: {
    ...mapGetters(['reader'])
  },
  methods: {
    get(value) {
      this.$store.dispatch('reader/readRss')
    }
  }
}
</script>

<style></style>
