import { NextResponse } from 'next/server';
import { tokenize, findUnknownTokens } from '@/lib/utils/tokenizer';
import { buildParseTree } from '@/lib/parser/parseTree';

export async function POST(request) {
  try {
    const { sentence } = await request.json();

    if (!sentence || typeof sentence !== 'string') {
      return NextResponse.json({ error: 'Invalid sentence' }, { status: 400 });
    }

    const tokens = tokenize(sentence);
    const unknownTokens = findUnknownTokens(tokens);

    if (unknownTokens.length > 0) {
      return NextResponse.json({
        success: false,
        isValid: false,
        error: `Unknown token(s): ${unknownTokens.join(', ')}`,
        message: 'Check for spelling or grammar mistakes in your sentence.',
        tokens
      });
    }

    const result = buildParseTree(sentence);

    if (result.success) {
      return NextResponse.json({
        success: true,
        isValid: true,
        tokens,
        tree: result.root,
        trace: result.trace
      });
    } else {
      return NextResponse.json({
        success: false,
        isValid: false,
        error: result.error,
        message: 'Please review sentence structure or try rephrasing.',
        tokens,
        trace: result.trace
      });
    }

  } catch (err) {
    return NextResponse.json({
      error: 'Server error',
      details: err.message,
      isValid: false,
      message: 'An unexpected error occurred while parsing.'
    }, { status: 500 });
  }
}