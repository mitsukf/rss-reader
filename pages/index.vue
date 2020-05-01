<template>
  <div>
    <Nav />
    <section class="container-fluid">
      <table class="table no-border">
        <tbody>
          <tr v-for="profile in profileList" :key="profile.name">
            <td>
              <nuxt-link
                :to="{ name: 'reader', query: { profile: profile.name } }"
              >
                {{ profile.name }}
              </nuxt-link>
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
  computed: {
    ...mapGetters({
      profileList: 'profile/profileList'
    })
  }
}
</script>

<style></style>
