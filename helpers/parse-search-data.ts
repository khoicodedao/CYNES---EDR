interface Condition {
  field: string;
  operator: string;
  value: string;
}

const parseInput = (input: string): Condition[] => {
  const conditions: Condition[] = [];
  const regex = /(\w+)\s*(:|=|>=|<=|>|<)\s*([\w.\s-]+)/g;
  let match;

  while ((match = regex.exec(input)) !== null) {
    const [, field, operator, value] = match;
    conditions.push({ field, operator, value: value.trim() });
  }

  return conditions;
};

export default parseInput;
