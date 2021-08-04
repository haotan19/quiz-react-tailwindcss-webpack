declare global {
  //   interface Window {
  //     _learnq: any;
  //     }
  var _learnq: any;
}
export const submitAnswers = (data: string[][]) => {
  try {
    const obj = {};
    data.map((item) => (obj[item[0]] = item[1]));

    _learnq.push(["track", "Quiz Answers", obj]);
  } catch (err) {
    console.error(err);
  }
};

export const submitAddToCart = (productData: any) => {
  try {
    if(productData){
      const obj = {
        Brand:productData.vendor,
        CompareAtPrice: productData.compare_at_price,
        ImageURL: productData.images[0],
        Name: productData.title,
        Price: productData.price * 100,
        ProductID: productData.id
      }
      _learnq.push(["track", "Added to Cart", obj]);
    }
  } catch (err) {
    console.error(err);
  } 
}