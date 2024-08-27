import { writable } from "svelte/store";

export enum HomeOptions { 
    PRODUCTS = "Our Products",
    SUBSCRIPTIONS = "Subscriptions",
 }

export const homeOptionsStore = writable<HomeOptions>(HomeOptions.PRODUCTS);