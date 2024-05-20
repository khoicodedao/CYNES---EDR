function calculatePercentages(obj: { [key: string]: number }): {
  [key: string]: string;
} {
  // Tính tổng các giá trị
  const total = Object.values(obj).reduce((acc, val) => acc + val, 0);

  // Tạo một object mới chứa phần trăm của từng giá trị
  const percentages: { [key: string]: string } = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      percentages[key] = ((obj[key] / total) * 100).toFixed(0);
    }
  }

  return percentages;
}

export default calculatePercentages;
