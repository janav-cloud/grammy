import grammar from './grammar';
import { tokenize, findUnknownTokens } from '../utils/tokenizer';

/**
 * LL(1) Parser Engine
 * @param {string} sentence - Input sentence to parse
 * @returns {object} result - Parsing result
 */
export function parseSentence(sentence) {
  const tokens = [...tokenize(sentence), '$'];
  const unknowns = findUnknownTokens(tokens.filter(t => t !== '$'));

  // Early exit for unknown tokens
  if (unknowns.length > 0) {
    return {
      isValid: false,
      message: `Unknown token(s): ${unknowns.join(', ')}`,
      trace: []
    };
  }

  const stack = ['$', 'S'];
  let index = 0;
  const trace = [];

  while (stack.length > 0) {
    const top = stack.pop();
    const currentToken = tokens[index];

    // Matching terminal
    if (grammar.terminals.includes(top)) {
      if (top === currentToken) {
        trace.push(`✓ Matched terminal: "${top}"`);
        index++;
      } else {
        return formatError(`Expected "${top}", but found "${currentToken}".`, trace);
      }
      continue;
    }

    // End marker
    if (top === '$') {
      if (currentToken === '$') {
        return {
          isValid: true,
          message: 'Successfully parsed the sentence.',
          trace
        };
      } else {
        return formatError(`Extra input after parsing: "${currentToken}"`, trace);
      }
    }

    // Look up in parse table
    const production = grammar.parseTable[top]?.[currentToken];

    if (!production) {
      return formatError(`No rule to match non-terminal "${top}" with token "${currentToken}".`, trace);
    }

    trace.push(`→ Expand: ${top} → ${production.join(' ')}`);

    // Push production to stack (in reverse)
    for (let i = production.length - 1; i >= 0; i--) {
      if (production[i] !== 'ε') stack.push(production[i]);
    }
  }

  // If tokens still remain after parsing is done
  if (index !== tokens.length - 1) {
    return formatError('Parsing incomplete: input not fully consumed.', trace);
  }

  return {
    isValid: true,
    message: 'Successfully parsed the sentence.',
    trace
  };
}

function formatError(message, trace) {
  return {
    isValid: false,
    message,
    trace
  };
}