<script setup lang="ts">
import {
  type User,
  getAllUsers,
  createNewUser,
  deleteUser,
  putUser,
} from '@/api/api'
import UserEditor from '@/components/UserEditor.vue';
import UsersList from '@/components/UsersList.vue';
import { reactive, ref } from 'vue'

interface State {
  users: User[]
}

const state = reactive<State>({
  users: [],
})

const refreshUsers = async () => {
  state.users = await getAllUsers()
}

// Populate initial state
await refreshUsers()

const deleteUserFromList = async (id: number) => {
  await deleteUser(id)
  await refreshUsers()
}

const createNewUserUI = async (user: Omit<User, 'id'>) => {
  await createNewUser(user)
  await refreshUsers()
}

const selectedUserEditId = ref<number>()

const editUser = async (user: Omit<User, 'id'>) => {
  const userId = selectedUserEditId.value
  if (userId === undefined) {
    throw new Error('User id undefined')
  }

  console.log('edit', user, userId)
  await putUser({
    id: userId,
    name: user.name,
    email: user.email,
  })
  await refreshUsers()
  selectedUserEditId.value = undefined
}
</script>

<template>
  <main class="max-w-[500px] w-full mx-auto gap-24 flex flex-col p-16">
    <template v-if="selectedUserEditId === undefined">
      <UsersList :users="state.users" @delete="deleteUserFromList" @edit="selectedUserEditId = $event" />

      <section>
        <h2 class="font-bold">Create new user</h2>

        <UserEditor hide-disabled-fields :enabled-fields="['email', 'name', 'dateOfBirth']" @submit="createNewUserUI" />
      </section>
    </template>
    <section v-else class="flex flex-col gap-24">
      <header class="flex justify-between items-center">
        <h2 class="font-bold">Edit user {{ selectedUserEditId }}</h2>
        <button class="outlined-button" @click="selectedUserEditId = undefined">
          Close
        </button>
      </header>

      <UserEditor :user="state.users.find((u) => u.id === selectedUserEditId)" :enabled-fields="['email', 'name']"
        @submit="editUser" />

    </section>
  </main>
</template>
