import React, { useState, useCallback } from 'react';
import { Display } from './components/Display';
import { Button } from './components/Button';
import { AiSolver } from './components/AiSolver';
import { BUTTON_LAYOUT, MAX_DIGITS } from './constants';
import { CalculatorState, Operator, ScientificFunction, Tab } from './types';
import { calculateBinary, calculateUnary } from './utils/mathUtils';
import { Calculator, Bot } from 'lucide-react';

const INITIAL_STATE: CalculatorState = {
  currentValue: '0',
  previousValue: null,
  operator: null,
  isNewEntry: true,
  error: null,
};

const App: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CALCULATOR);

  const handleNumber = useCallback((numStr: string) => {
    setState((prev) => {
      if (prev.error) return INITIAL_STATE; // Reset on error
      
      let newValue = prev.currentValue;

      if (prev.isNewEntry) {
        newValue = numStr;
      } else {
        if (newValue.length >= MAX_DIGITS) return prev;
        newValue = newValue === '0' ? numStr : newValue + numStr;
      }

      return {
        ...prev,
        currentValue: newValue,
        isNewEntry: false,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.error) return INITIAL_STATE;
      if (prev.isNewEntry) {
        return { ...prev, currentValue: '0.', isNewEntry: false };
      }
      if (prev.currentValue.includes('.')) return prev;
      return { ...prev, currentValue: prev.currentValue + '.' };
    });
  }, []);

  const handleOperator = useCallback((op: Operator) => {
    setState((prev) => {
      if (prev.error) return INITIAL_STATE;

      // If we already have an operator and previous value, calculate intermediate result
      if (prev.operator && prev.previousValue && !prev.isNewEntry) {
        const result = calculateBinary(
          parseFloat(prev.previousValue),
          parseFloat(prev.currentValue),
          prev.operator
        );
        return {
          currentValue: result,
          previousValue: result, // Chain calculation
          operator: op,
          isNewEntry: true,
          error: result === 'Error' ? 'Error' : null,
        };
      }

      return {
        ...prev,
        previousValue: prev.currentValue,
        operator: op,
        isNewEntry: true,
      };
    });
  }, []);

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (!prev.operator || !prev.previousValue) return prev;

      const result = calculateBinary(
        parseFloat(prev.previousValue),
        parseFloat(prev.currentValue),
        prev.operator
      );

      return {
        ...prev,
        currentValue: result,
        previousValue: null,
        operator: null,
        isNewEntry: true,
        error: result === 'Error' ? 'Error' : null,
      };
    });
  }, []);

  const handleScientific = useCallback((func: ScientificFunction) => {
    setState((prev) => {
      if (prev.error) return INITIAL_STATE;
      const result = calculateUnary(parseFloat(prev.currentValue), func);
      return {
        ...prev,
        currentValue: result,
        isNewEntry: true,
        error: result === 'Error' ? 'Error' : null,
      };
    });
  }, []);

  const handleAction = useCallback((action: string) => {
    switch (action) {
      case 'clear':
        setState(INITIAL_STATE);
        break;
      case 'backspace':
        setState((prev) => {
          if (prev.error) return INITIAL_STATE;
          if (prev.isNewEntry) return prev;
          const newVal = prev.currentValue.slice(0, -1) || '0';
          return { ...prev, currentValue: newVal };
        });
        break;
      case 'percent':
        setState((prev) => {
          const val = parseFloat(prev.currentValue);
          return { ...prev, currentValue: (val / 100).toString() };
        });
        break;
      case 'equals':
        handleEquals();
        break;
    }
  }, [handleEquals]);

  const onButtonClick = (btn: any) => {
    if (btn.type === 'number') {
      if (btn.value === '.') handleDecimal();
      else handleNumber(btn.value);
    } else if (btn.type === 'operator') {
      handleOperator(btn.value);
    } else if (btn.type === 'func') {
      handleScientific(btn.value);
    } else if (btn.type === 'action') {
      handleAction(btn.value);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-900 p-4 sm:p-8">
      <div className="w-full max-w-md bg-calc-bg rounded-[40px] p-6 shadow-2xl border border-gray-800 flex flex-col h-[90vh] sm:h-auto">
        
        {/* Tab Switcher */}
        <div className="flex bg-calc-display rounded-full p-1 mb-6">
          <button
            onClick={() => setActiveTab(Tab.CALCULATOR)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === Tab.CALCULATOR 
                ? 'bg-calc-btn text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calculator size={16} />
            計算機
          </button>
          <button
            onClick={() => setActiveTab(Tab.AI_SOLVER)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === Tab.AI_SOLVER 
                ? 'bg-calc-btnOp text-white shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Bot size={16} />
            智慧解題
          </button>
        </div>

        {activeTab === Tab.CALCULATOR ? (
          <>
            <Display
              value={state.currentValue}
              previousValue={state.previousValue}
              operator={state.operator}
              error={state.error}
            />
            
            <div className="grid grid-cols-4 gap-3 sm:gap-4 flex-1">
              {BUTTON_LAYOUT.flat().map((btn, idx) => (
                <Button
                  key={`${btn.label}-${idx}`}
                  label={btn.label}
                  onClick={() => onButtonClick(btn)}
                  className={btn.className}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-hidden">
            <AiSolver />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
