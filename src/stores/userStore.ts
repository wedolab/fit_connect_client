import { writable } from 'svelte/store';

export const userStore = writable<any>({ first_name: "Unknown", last_name: "User" });