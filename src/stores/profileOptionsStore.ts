import { writable } from "svelte/store";

export enum ProfileOptions {
    GOOGLE_FIT = "Google Fit",
    FAT_SECRET = "Fat Secret",
}

export const profileOptionsStore = writable<ProfileOptions>(ProfileOptions.GOOGLE_FIT);