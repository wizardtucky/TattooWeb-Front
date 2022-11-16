<script setup lang="ts">
import type { User } from '@/api/api';
import { computed, reactive, toRaw } from 'vue';

export interface UserListProps {
  user?: Partial<User>
  enabledFields: (keyof User)[]
  hideDisabledFields?: boolean
}

const props = defineProps<UserListProps>()

const emit = defineEmits<{
  (e: 'submit', user: Partial<User>): void
  (e: 'delete', id: number): void
}>()

const DATA_FIELDS = [
  {
    name: 'Id',
    key: 'id',
  },
  {
    name: 'Name',
    key: 'name',
  },
  {
    name: 'Email',
    key: 'email',
  },
  {
    name: 'Date of birth (yyyy-mm-dd)',
    key: 'dateOfBirth',
  },
] as const

const isFieldEnabled = (field: typeof DATA_FIELDS[number]) => props.enabledFields?.includes(field.key)

// TODO. Loose typechecking
type State = Record<string, string>


const entries = DATA_FIELDS.map(({ key }) => [key, props.user?.[key] || ''])
const state = reactive<State>(Object.fromEntries(entries))

const fields = computed(() => props.hideDisabledFields ? DATA_FIELDS.filter((field) => isFieldEnabled(field)) : DATA_FIELDS)

const onSubmit = () => {
  emit('submit', { ...props.user, ...toRaw(state) })
}
</script>

<template>
  <div class="w-full flex flex-col gap-16">
    <div class="flex flex-col gap-8">
      <input v-for="field in fields" :key="field.key" v-model="state[field.key]" type="text" :name="field.key"
        :readonly="!isFieldEnabled(field)" :placeholder="field.name"
        class="px-16 rounded-4 h-40 border border-solid border-300" :class="{
          'focus:outline-purple-700': isFieldEnabled(field),
          'outline-none': !isFieldEnabled(field),
        }" />
    </div>
    <div class="flex gap-8">
      <button class="outlined-button" @click="onSubmit">
        Submit
      </button>
    </div>
  </div>
</template>
