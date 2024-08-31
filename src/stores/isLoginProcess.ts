import { writable } from "svelte/store";
import { ServiceLoginProcess } from "../models/ServiceLoginProcess";

export const isLoginProcessStore = writable<ServiceLoginProcess>(new ServiceLoginProcess(false, false))