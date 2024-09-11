import { writable } from "svelte/store";

export enum HomeOptions {
    REPORTS = "Your Reports",
    SEND_REPORT = "Send Report",
}

export const homeOptionsStore = writable<HomeOptions>(HomeOptions.REPORTS);