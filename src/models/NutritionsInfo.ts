export class NutritionInfo {
    ccal: number;
    protein: number;
    fat: number;
    c: number;

    constructor(ccal: number, protein: number, fat: number, c: number) {
        this.ccal = ccal;
        this.protein = protein;
        this.fat = fat;
        this.c = c;
    }
}
