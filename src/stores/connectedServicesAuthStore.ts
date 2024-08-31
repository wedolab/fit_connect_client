import { writable } from "svelte/store";
import type { ServiceAuth } from "../models/ServiceAuth";

export const connectedServiceAuthStore = writable<ServiceAuth>();