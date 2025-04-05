// lib/utils/tokenizer.js

import grammar from '../parser/grammar';

/**
 * Tokenizes an input English sentence into lowercase, grammar-friendly tokens
 * @param {string} sentence
 * @returns {string[]} tokens
 */
export function tokenize(sentence) {
  const normalized = sentence
    .toLowerCase()
    .replace(/[^\w\s]/g, '')     // Remove punctuation
    .split(/\s+/)                // Split on spaces
    .filter(Boolean);            // Remove empty strings

  return normalized;
}

/**
 * Returns unknown tokens not present in the grammar terminals
 * Useful for showing suggestions/errors
 * @param {string[]} tokens
 * @returns {string[]}
 */
export function findUnknownTokens(tokens) {
  return tokens.filter(token => !grammar.terminals.includes(token));
}