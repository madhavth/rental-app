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

  static calculatePropertyAverage(
    arr: Array<{ comment: string; rating: number; user_id: string }> | undefined
  ) {
    if (arr) {
      if (arr.length > 0) {
        const sum: number = arr?.reduce((a, b) => (a += b.rating), 0);
        return sum / arr.length;
      }
      return 0;
    }
    return 0;
  }
}
