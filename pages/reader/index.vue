<template>
  <div>
    <Nav :title="$route.query.profile" />
    <section class="container-fluid bg-secondary" style="padding-left: 20px;">
      <div class="header-footer">dummy</div>
      <table class="table" style="margin-bottom: 10px;">
        <tbody>
          <tr v-for="rss in rssList" :key="rss.id">
            <div
              class="border rounded-lg bg-light"
              style="margin-top: 10px; padding: 10px;"
            >
              <div class="row txt1">
                <div class="col-4">{{ rss.item.date }}</div>
                <div class="col-8 txt3 omission">
                  <a :href="rss.site.link" target="_blank" class="txt3">{{
                    rss.site.name
                  }}</a>
                </div>
              </div>
              <div v-if="$device.isDesktop">
                <div class="row txt2">
                  <div class="col-12">
                    <a :href="rss.item.link" target="_blank">{{
                      rss.item.title
                    }}</a>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="row txt2_sp">
                  <div class="col-12">
                    <a :href="rss.item.link" target="_blank">{{
                      rss.item.title
                    }}</a>
                  </div>
                </div>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
      <client-only>
        <div
          v-if="!isEnd"
          class="border rounded-lg bg-light"
          style="margin-bottom: 10px;"
        >
          <infinite-loading spinner="circle" @infinite="infiniteHandler">
            <span slot="no-more"></span>
            <span slot="no-results"></span>
          </infinite-loading>
        </div>
      </client-only>
      <div class="header-footer">dummy</div>
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
  data() {
    return {
      isEnd: false
    }
  },
  computed: {
    ...mapGetters({
      rssList: 'reader/rssList'
    })
  },
  methods: {
    async infiniteHandler($state) {
      if (this.loading) return

      this.isEnd = await this.get()
      if (!this.isEnd) {
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
  white-space: nowrap;
}
.txt2 {
  font-size: 16px;
}
.txt2_sp {
  font-size: 12px;
}
a.txt3 {
  color: #999999;
}
.header-footer {
  font-size: 0px;
}
.omission {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
