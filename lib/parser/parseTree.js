import grammar from './grammar';
import { tokenize } from '../utils/tokenizer';

export class ParseNode {
  constructor(symbol) {
    this.symbol = symbol;
    this.children = [];
  }
}

/**
 * Builds a parse tree from the input sentence using LL(1) rules
 * @param {string} sentence
 * @returns {object} { success, root, error, trace }
 */
export function buildParseTree(sentence) {
  const tokens = [...tokenize(sentence), '$'];
  const stack = [new ParseNode('$'), new ParseNode('S')];
  const root = stack[1];
  let index = 0;
  const trace = [];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    const top = currentNode.symbol;
    const currentToken = tokens[index];

    trace.push(`Top: ${top}, Token: ${currentToken}`);

    // Terminal match
    if (grammar.terminals.includes(top)) {
      if (top === currentToken) {
        currentNode.children.push(new ParseNode(currentToken));
        index++;
      } else {
        return { success: false, root, error: `Expected "${top}", but got "${currentToken}"`, trace };
      }
      continue;
    }

    // End symbol
    if (top === '$') {
      if (currentToken === '$') {
        return { success: true, root, error: null, trace };
      } else {
        return { success: false, root, error: `Extra input after parsing: "${currentToken}"`, trace };
      }
    }

    // Get production rule
    const production = grammar.parseTable[top]?.[currentToken];

    if (!production) {
      return {
        success: false,
        root,
        error: `No rule for "${top}" with token "${currentToken}"`,
        trace
      };
    }

    trace.push(`Apply: ${top} → ${production.join(' ')}`);

    for (let i = production.length - 1; i >= 0; i--) {
      const symbol = production[i];
      const child = new ParseNode(symbol);
      currentNode.children.unshift(child); // left to right
      if (symbol !== 'ε') {
        stack.push(child);
      }
    }
  }

  if (index !== tokens.length - 1) {
    return {
      success: false,
      root,
      error: `Parsing incomplete. Unconsumed token: "${tokens[index]}"`,
      trace
    };
  }

  return { success: true, root, error: null, trace };
}