import { Operator, ScientificFunction } from '../types';
import { MAX_DIGITS } from '../constants';

const formatResult = (num: number): string => {
  if (!isFinite(num)) return 'Error';
  const stringNum = num.toString();
  if (stringNum.length > MAX_DIGITS) {
    return num.toPrecision(MAX_DIGITS).replace(/\.?0+$/, ""); // Remove trailing zeros
  }
  return stringNum;
};

export const calculateBinary = (left: number, right: number, op: Operator): string => {
  let result = 0;
  switch (op) {
    case Operator.ADD:
      result = left + right;
      break;
    case Operator.SUBTRACT:
      result = left - right;
      break;
    case Operator.MULTIPLY:
      result = left * right;
      break;
    case Operator.DIVIDE:
      if (right === 0) return 'Error';
      result = left / right;
      break;
    default:
      return right.toString();
  }
  return formatResult(result);
};

export const calculateUnary = (value: number, func: ScientificFunction): string => {
  let result = 0;
  switch (func) {
    case ScientificFunction.SIN:
      // JS Math.sin uses radians. Convert degrees to radians.
      result = Math.sin(value * (Math.PI / 180));
      // Fix floating point errors for common values like sin(180)
      if (Math.abs(result) < 1e-10) result = 0;
      break;
    case ScientificFunction.COS:
      result = Math.cos(value * (Math.PI / 180));
      if (Math.abs(result) < 1e-10) result = 0;
      break;
    case ScientificFunction.SQRT:
      if (value < 0) return 'Error';
      result = Math.sqrt(value);
      break;
    case ScientificFunction.SQUARE:
      result = Math.pow(value, 2);
      break;
    default:
      return value.toString();
  }
  return formatResult(result);
};
