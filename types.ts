export enum Operator {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '×',
  DIVIDE = '÷',
}

export enum ScientificFunction {
  SIN = 'sin',
  COS = 'cos',
  SQRT = '√',
  SQUARE = 'x²',
}

export type CalculatorState = {
  currentValue: string;
  previousValue: string | null;
  operator: Operator | null;
  isNewEntry: boolean; // True if the next number input should start a new value
  error: string | null;
};

export enum Tab {
  CALCULATOR = 'calculator',
  AI_SOLVER = 'ai_solver',
}
