<template>
  <div>
    <nav class="navbar navbar-dark bg-dark" style="padding-left: 20px;">
      <a href="/" class="navbar-brand">RSSリーダー</a>
    </nav>
    <section class="container">
      <table class="table table-striped">
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

<script></script>

<style></style>
