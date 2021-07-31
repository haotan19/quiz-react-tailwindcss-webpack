export enum Bundle {
  DRY = 0,
  BALANCED = 1,
  OILY = 2,
}

export interface Answer {
  text: string;
  bundle: Bundle;
}

export class DataItem {
  id: number;
  question: string;
  answers: Answer[];
  answerWeight: number;

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

export const calculateResult = (
  selectedAnswers: number[],
  answersWeight: number[]
) => {
  // 0 is DRY, 1 is BALANCED, 2 is OILY
  // const score = { 0: 0, 1: 0, 2: 0 };
  const score = [0, 0, 0];
  selectedAnswers.map(
    (answer, idx) => (score[answer] = score[answer] + 1 * answersWeight[idx])
  );
  // https://stackoverflow.com/questions/29493455/get-array-index-by-max-value
  switch (score.indexOf(Math.max.apply(null, score))) {
    case 0:
      return Bundle.DRY;
    case 1:
      return Bundle.BALANCED;
    case 2:
      return Bundle.OILY;
  }
  return Bundle.BALANCED;
};

export const fetchFakeTestProduct = (bundle: Bundle) => ({
  title: "This is a test title, bundle is:" + bundle,
  handle: "test-handle",
  price: 12900,
  images: [
    "//cdn.shopify.com/s/files/1/0106/3986/7961/products/combination-skin.png?v=1607391178",
  ],
});

export const fetchProduct = async (result: Bundle) => {
  let fetchUrl = "";
  switch (result) {
    case Bundle.DRY:
      fetchUrl = "/products/dry-mature-skin-bundle.js";
      break;
    case Bundle.BALANCED:
      fetchUrl = "/products/balanced-skin-bundle.js";
      break;
    case Bundle.OILY:
      fetchUrl = "/products/combination-skin-bundle.js";
      break;
  }
  const response = await fetch(fetchUrl);
  return response.json();
};

export const bundleAddToCart = async (productId: number) => {
  let formData = {
    items: [
      {
        id: productId,
        quantity: 1,
      },
    ],
  };
  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
