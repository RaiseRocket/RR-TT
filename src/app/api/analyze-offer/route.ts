import { NextRequest, NextResponse } from 'next/server';
import { freeAssessmentService, OfferAnalysisRequest } from '@/services/openai';

export async function POST(request: NextRequest) {
  try {
    const body: OfferAnalysisRequest = await request.json();

    // Validate required fields
    if (!body.jobTitle || !body.company || !body.offerAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: jobTitle, company, offerAmount' },
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
