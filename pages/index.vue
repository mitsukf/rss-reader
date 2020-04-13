<template>
  <section class="container">
    <h1 class="h1">
      RSSリーダー - トップ
    </h1>
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
</template>

<script></script>

<style></style>
