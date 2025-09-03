import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check content length
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json(
        { error: 'File too large. Please upload a PDF smaller than 10MB.' },
        { status: 413 }
      );
    }

    const { fileData, fileName, fileType } = await request.json();

    if (!fileData) {
      return NextResponse.json(
        { error: 'No file data provided' },
        { status: 400 }
      );
    }

    if (fileType !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    try {
      // For now, return a helpful message since PDF processing is complex
      // In a production environment, you'd want to use a proper PDF processing service
      return NextResponse.json({
        text: `PDF file "${fileName}" received successfully. However, PDF text extraction is currently being improved. Please copy and paste the text content from your PDF into the text area above for the best experience.`,
        pages: 1,
        info: { title: fileName },
        requiresManualInput: true
      });

    } catch (parseError) {
      console.error('PDF parsing error:', parseError);
      
      let errorMessage = 'Failed to extract text from PDF.';
      if (parseError instanceof Error) {
        if (parseError.message.includes('password')) {
          errorMessage = 'PDF is password-protected. Please copy and paste the text content instead.';
        } else if (parseError.message.includes('Invalid PDF')) {
          errorMessage = 'Invalid or corrupted PDF file. Please try a different file.';
        }
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('PDF processing API error:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF file. Please try copying and pasting the text content instead.' },
      { status: 500 }
    );
  }
}
