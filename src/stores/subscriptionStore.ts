import { writable } from "svelte/store";
import type { Subscription } from "../models/Subscriptions";

export const subscriptionStore = writable<Subscription[]>([]);