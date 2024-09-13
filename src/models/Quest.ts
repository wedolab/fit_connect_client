

export class Answer {
    id: number;
    textAnswer: string;

    constructor(id: number, text_answer: string) {
        this.id = id;
        this.textAnswer = text_answer;
    }
}

export class Question {
    id: number;
    textQuestion: string;
    answerType: string;
    answers: Answer[];
    isVisible: boolean;

    constructor(id: number, text_question: string, answer_type: string, answers: Answer[], isVisible: boolean) {
        this.id = id;
        this.textQuestion = text_question;
        this.answerType = answer_type;
        this.answers = answers;
        this.isVisible = isVisible;
    }
}


export class Quest {
    id: number;

    questions: Question[];

    constructor(id: number, questions: Question[]) {
        this.id = id;
        this.questions = questions;
    }
}