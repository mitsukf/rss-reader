<template>
  <nav class="navbar navbar-dark bg-dark" style="padding-left: 20px;">
    <a href="/" class="navbar-brand"
      >RSSリーダー <span v-if="title">- {{ title }}</span></a
    >
    <a href="/edit" class="navbar-brand" style="font-size: 14px;">Edit</a>
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
