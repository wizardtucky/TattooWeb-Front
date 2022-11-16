import { apiFetch } from './api-fetch'

export interface User {
  age: number
  dateOfBirth: string
  email: string
  id: number
  name: string
}

export const getAllUsers = () => apiFetch<User[]>('/api/user')

export interface UserCreationOptions {
  dateOfBirth: string
  email: string
  name: string
}

export const createNewUser = (options: UserCreationOptions) =>
  apiFetch<User[]>('/api/user', {
    method: 'POST',
    body: options,
  })

export interface UserPutOptions {
  id: number
  name: string
  email: string
}

export const putUser = (options: UserPutOptions) => {
  const { id, ...opts } = options

  const query = new URLSearchParams(opts)

  return apiFetch<User[]>(`/api/user/${id}?${query.toString()}`, {
    method: 'PUT',
  })
}

export const deleteUser = (id: number) =>
  apiFetch<User[]>(`/api/user/${id}`, {
    method: 'DELETE',
  })
