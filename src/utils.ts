export enum Bundle {
  DRY,
  BALANCED,
  OILY,
}

interface Answer {
  text: string;
  bundle: Bundle;
}

export class DataItem {
  id: number;
  question: string;
  answers: Answer[];
  answerWeight?: number;

  constructor(id: number, question: string, answerWeight?: number) {
    this.id = id;
    this.question = question;
    this.answers = [];
    if (answerWeight) {
      this.answerWeight = answerWeight;
    } else this.answerWeight = 1;
  }

  addAnswer(text: string, bundle: Bundle) {
    const newAnswer: Answer = { text, bundle };
    this.answers = [...this.answers, newAnswer];
    return this;
  }
}
