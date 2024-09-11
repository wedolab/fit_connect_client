import { writable } from "svelte/store";
import type { Report } from "../models/Report";

export const reportsStore = writable<Report[]>([]);