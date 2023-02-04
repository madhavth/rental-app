export class Utils {
  static convertNumToArray(num: number) {
    const arr = [0, 0, 0, 0, 0];
    arr.forEach((element, i) => {
      if (i < parseInt(num.toString().split('.')[0])) {
        arr[i] = i + 1;
      }
    });
    return { arr: arr, rating: num };
  }
}
