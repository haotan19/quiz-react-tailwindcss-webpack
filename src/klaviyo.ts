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
    // console.log("Data will be sent:");
    // console.log(obj);
    _learnq.push(["track", "Quiz Answers", obj]);
  } catch (err) {
    console.error(err);
  }
};
