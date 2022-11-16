<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-full">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>
