import { Operator, ScientificFunction } from './types';

export const MAX_DIGITS = 12;

export const BUTTON_LAYOUT = [
  [
    { label: 'C', type: 'action', value: 'clear', className: 'col-span-1 bg-red-500 hover:bg-red-600' },
    { label: '⌫', type: 'action', value: 'backspace', className: 'bg-calc-btnSec hover:bg-calc-btnSecHover' },
    { label: '%', type: 'action', value: 'percent', className: 'bg-calc-btnSec hover:bg-calc-btnSecHover' },
    { label: '÷', type: 'operator', value: Operator.DIVIDE, className: 'bg-calc-btnOp hover:bg-calc-btnOpHover' },
  ],
  [
    { label: 'sin', type: 'func', value: ScientificFunction.SIN, className: 'bg-calc-btnSec hover:bg-calc-btnSecHover text-sm' },
    { label: 'cos', type: 'func', value: ScientificFunction.COS, className: 'bg-calc-btnSec hover:bg-calc-btnSecHover text-sm' },
    { label: 'x²', type: 'func', value: ScientificFunction.SQUARE, className: 'bg-calc-btnSec hover:bg-calc-btnSecHover text-sm' },
    { label: '√', type: 'func', value: ScientificFunction.SQRT, className: 'bg-calc-btnSec hover:bg-calc-btnSecHover text-sm' },
  ],
  [
    { label: '7', type: 'number', value: '7', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '8', type: 'number', value: '8', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '9', type: 'number', value: '9', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '×', type: 'operator', value: Operator.MULTIPLY, className: 'bg-calc-btnOp hover:bg-calc-btnOpHover' },
  ],
  [
    { label: '4', type: 'number', value: '4', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '5', type: 'number', value: '5', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '6', type: 'number', value: '6', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '-', type: 'operator', value: Operator.SUBTRACT, className: 'bg-calc-btnOp hover:bg-calc-btnOpHover' },
  ],
  [
    { label: '1', type: 'number', value: '1', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '2', type: 'number', value: '2', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '3', type: 'number', value: '3', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '+', type: 'operator', value: Operator.ADD, className: 'bg-calc-btnOp hover:bg-calc-btnOpHover' },
  ],
  [
    { label: '0', type: 'number', value: '0', className: 'col-span-2 bg-gray-700 hover:bg-gray-600' },
    { label: '.', type: 'number', value: '.', className: 'bg-gray-700 hover:bg-gray-600' },
    { label: '=', type: 'action', value: 'equals', className: 'bg-calc-btn hover:bg-calc-btnHover' },
  ],
];
