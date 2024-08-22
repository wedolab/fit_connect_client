class SubTarget {
    id: string;
    subtarget: string;
    value: number;

    constructor(id: string, subtarget: string, value: number) {
        this.id = id,
        this.subtarget = subtarget;
        this.value = value;
    }
}

class CustomGoal {
    id: string;
    goal: string;
    subTargets: SubTarget[];

    constructor(id: string, target: string, subClasses: SubTarget[]) {
        this.id = id;
        this.goal = target;
        this.subTargets = subClasses;
    }
}

export { CustomGoal, SubTarget };