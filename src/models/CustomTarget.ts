class SubTarget {
    subtarget: string;
    value: number;

    constructor(subtarget: string, value: number) {
        this.subtarget = subtarget;
        this.value = value;
    }
}

class CustomTarget {
    id: string;
    target: string;
    subTargets: SubTarget[];

    constructor(id: string, target: string, subClasses: SubTarget[]) {
        this.id = id;
        this.target = target;
        this.subTargets = subClasses;
    }
}

export { CustomTarget, SubTarget };