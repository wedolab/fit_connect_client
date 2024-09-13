import { writable } from "svelte/store";

export enum HomeOptions {
    REPORTS = "Ваши отчеты",
    SEND_REPORT = "Отправить отчет",
}

export const homeOptionsStore = writable<HomeOptions>(HomeOptions.REPORTS);