import { writable } from 'svelte/store';

export const userStore = writable<any>({ last_name: "Unknown User" });