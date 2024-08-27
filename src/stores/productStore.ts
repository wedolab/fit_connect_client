import { writable } from "svelte/store";
import type { Product } from "../models/Product";

export const productStore = writable<Product[]>([]);