import { writable } from 'svelte/store';
import { CustomGoal, SubTarget } from '../models/CustomGoal';

const initialData: CustomGoal[] = []; // Пустой массив начальных данных

const targetStore = writable(initialData);

export default targetStore;