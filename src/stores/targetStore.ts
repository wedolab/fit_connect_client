import { writable } from 'svelte/store';
import { CustomTarget, SubTarget } from '../models/CustomTarget';

const initialData: CustomTarget[] = []; // Пустой массив начальных данных

const targetStore = writable(initialData);

export default targetStore;