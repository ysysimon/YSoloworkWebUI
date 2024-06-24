<template>
  <h2>{{ $t('message.hello') }}, {{ userName }}.</h2>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const store = useAuthStore()
const userName = store.user.username
</script>

<style scoped>
/* Your styles go here */
</style>
