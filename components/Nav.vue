<template>
  <nav class="navbar navbar-dark bg-dark" style="padding-left: 20px;">
    <a href="/" class="navbar-brand"
      >RSSリーダー <span v-if="title">- {{ title }}</span></a
    >
    <a
      v-if="!title"
      href="/edit"
      class="border rounded-lg border-white navbar-brand edit"
      >Edit</a
    >
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style>
.edit {
  font-size: 14px;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
