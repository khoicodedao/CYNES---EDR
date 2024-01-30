function objectToArrayString(obj: object) {
  return Object.entries(obj).map(([key, value]) => `${key}:${value}`);
}

export default objectToArrayString;
