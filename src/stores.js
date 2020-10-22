import { writable, derived } from 'svelte/store'

export const teachers = writable([])
export const sortedTeachers = derived(teachers, (value) => value.sort((a, b) => b.date - a.date))
