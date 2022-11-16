<script setup lang="ts">
import type { User } from '@/api/api';

export interface UserListProps {
  users: User[]
}

defineProps<UserListProps>()

const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id" class="flex items-center border-b border-solid border-gray-400">
      <div class="flex flex-col">
        <div>{{ user.name }}</div>
        <div>{{ user.email }}</div>
      </div>

      <div class="ml-auto flex gap-8">
        <button class="outlined-button" @click="emit('edit', user.id)">
          Edit
        </button>
        <button class="outlined-button" @click="emit('delete', user.id)">
          Delete
        </button>
      </div>
    </li>
  </ul>
</template>
