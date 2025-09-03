import { NextRequest, NextResponse } from 'next/server';
import { freeAssessmentService } from '@/services/openai';
import { OfferAnalysisRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: OfferAnalysisRequest = await request.json();

    // Validate required fields for new format
    if (!body.offerInput || !body.inputType) {
      return NextResponse.json(
        { error: 'Missing required fields: offerInput, inputType' },
        { status: 400 }
      );
    }

    // Validate input type
    if (!['text', 'file'].includes(body.inputType)) {
      return NextResponse.json(
        { error: 'Invalid inputType. Must be "text" or "file"' },
        { status: 400 }
      );
    }

    // Analyze the offer using OpenAI (free assessment service)
    const analysis = await freeAssessmentService().analyzeOffer(body);

    return NextResponse.json({
      success: true,
      analysis,
      rawResponse: analysis.rawResponse, // Include raw response for debugging
      debugPayload: analysis.debugPayload, // Include full OpenAI payload for debugging
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in analyze-offer API:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze offer',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
