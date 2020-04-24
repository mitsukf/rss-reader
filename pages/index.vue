<template>
  <div>
    <Nav />
    <section class="container-fluid">
      <table class="table no-border">
        <tbody>
          <tr>
            <td>
              <nuxt-link to="/reader?profile=ニュース">
                ニュース
              </nuxt-link>
            </td>
          </tr>
          <tr>
            <td>
              <nuxt-link to="/reader?profile=技術系">
                技術系
              </nuxt-link>
            </td>
          </tr>
          <tr>
            <td>
              <nuxt-link to="/reader?profile=趣味">
                趣味
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>

      <b-button variant="primary">
        プロファイル編集
      </b-button>
    </section>
  </div>
</template>

<script>
import Nav from '~/components/Nav'

export default {
  components: {
    Nav
  }
}
</script>

<style></style>
