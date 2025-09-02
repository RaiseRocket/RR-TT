import fs from 'fs';
import path from 'path';

export interface OfferAnalysisRequest {
  jobTitle: string;
  company: string;
  offerAmount: string;
  benefits: string;
  additionalContext: string;
  uploadedFiles?: Array<{
    name: string;
    size: number;
    type: string;
    lastModified: number;
  }>;
  offerDocumentText?: string;
}

export interface OfferAnalysisResponse {
  offerSummary: string;
  benchmarkAssessment: string;
  strengths: string;
  negotiationOpportunities: string;
  suggestedStrategy: string;
  risksConsiderations: string;
  rawResponse?: string;
  debugPayload?: any;
}

export class OpenAIService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openai.com/v1';

  constructor(apiKeyType: 'free_assessment' | 'paid_customer') {
    if (apiKeyType === 'free_assessment') {
      this.apiKey = process.env.OPENAI_FREE_ASSESSMENT_API_KEY || '';
    } else {
      this.apiKey = process.env.OPENAI_PAID_CUSTOMER_API_KEY || '';
    }

    if (!this.apiKey) {
      throw new Error(`${apiKeyType === 'free_assessment' ? 'OPENAI_FREE_ASSESSMENT_API_KEY' : 'OPENAI_PAID_CUSTOMER_API_KEY'} environment variable is required`);
    }
  }

  /**
   * Load the offer analysis prompt from the prompts directory
   */
  private loadOfferAnalysisPrompt(): string {
    try {
      const promptPath = path.join(process.cwd(), 'src', 'prompts', 'offer-analysis-prompt.md');
      return fs.readFileSync(promptPath, 'utf-8');
    } catch (error) {
      console.error('Error loading prompt file:', error);
      throw new Error('Failed to load analysis prompt');
    }
  }

  /**
   * Replace variables in the prompt template
   */
  private replacePromptVariables(template: string, data: OfferAnalysisRequest): string {
    return template
      .replace(/\{\{job_title\}\}/g, data.jobTitle || 'Not provided')
      .replace(/\{\{company_name\}\}/g, data.company || 'Not provided')
      .replace(/\{\{offer_amount\}\}/g, data.offerAmount || 'Not provided')
      .replace(/\{\{benefits_package\}\}/g, data.benefits || 'Not provided')
      .replace(/\{\{additional_context\}\}/g, data.additionalContext || 'None')
      .replace(/\{\{offer_document_text\}\}/g, data.offerDocumentText || 'No document provided');
  }

  /**
   * Analyze an offer using OpenAI
   */
  async analyzeOffer(data: OfferAnalysisRequest): Promise<OfferAnalysisResponse> {
    try {
      // Load the prompt template
      const basePrompt = this.loadOfferAnalysisPrompt();
      
      // Split the prompt into system instruction and user task
      const systemInstruction = basePrompt.split('## User Input Variables:')[0];
      const userTask = basePrompt.split('## User Input Variables:')[1].split('## Task:')[0];
      const outputFormat = basePrompt.split('## Output Format:')[1];

      // Replace variables in the user task
      const userPrompt = this.replacePromptVariables(userTask, data);

      // Debug: Log the data being sent
      console.log('Data being sent to OpenAI:', data);
      console.log('User prompt after variable replacement:', userPrompt);
      
      // Store the full payload for debugging
      const fullPayload = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemInstruction
          },
          {
            role: 'user',
            content: `${userPrompt}\n\n${outputFormat}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      };
      console.log('Full OpenAI payload:', JSON.stringify(fullPayload, null, 2));

      // Make API call to OpenAI
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      const analysisText = result.choices[0]?.message?.content;

      if (!analysisText) {
        throw new Error('No analysis received from OpenAI');
      }

      // Debug: Log the raw response
      console.log('Raw OpenAI response:', analysisText);

      // Parse the structured response
      const parsedResponse = this.parseAnalysisResponse(analysisText);
      
      // Include raw response and payload for debugging
      return {
        ...parsedResponse,
        rawResponse: analysisText,
        debugPayload: fullPayload
      };
    } catch (error) {
      console.error('Error analyzing offer:', error);
      throw new Error(`Failed to analyze offer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse the structured response from OpenAI
   */
  private parseAnalysisResponse(response: string): OfferAnalysisResponse {
    try {
      return {
        offerSummary: this.extractSection(response, 'Offer Summary'),
        benchmarkAssessment: this.extractSection(response, 'Benchmark Assessment'),
        strengths: this.extractSection(response, 'Strengths'),
        negotiationOpportunities: this.extractSection(response, 'Negotiation Opportunities'),
        suggestedStrategy: this.extractSection(response, 'Suggested Strategy'),
        risksConsiderations: this.extractSection(response, 'Risks / Things to Consider'),
      };
    } catch (error) {
      console.error('Error parsing analysis response:', error);
      // Return fallback response
      return {
        offerSummary: 'Analysis parsing failed. Please try again.',
        benchmarkAssessment: 'Unable to parse benchmark assessment.',
        strengths: 'Unable to parse strengths.',
        negotiationOpportunities: 'Unable to parse negotiation opportunities.',
        suggestedStrategy: 'Unable to parse suggested strategy.',
        risksConsiderations: 'Unable to parse risks and considerations.',
      };
    }
  }

  /**
   * Extract a specific section from the response
   */
  private extractSection(response: string, sectionName: string): string {
    const patterns = [
      new RegExp(`- \\*\\*${sectionName}\\*\\*:([\\s\\S]*?)(?=- \\*\\*|$)`, 'i'),
      new RegExp(`### ${sectionName}:([\\s\\S]*?)(?=### |$)`, 'i'),
      new RegExp(`## ${sectionName}:([\\s\\S]*?)(?=## |$)`, 'i'),
      new RegExp(`${sectionName}:([\\s\\S]*?)(?=\\n\\n|$)`, 'i'),
    ];

    for (const pattern of patterns) {
      const match = response.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return `No ${sectionName.toLowerCase()} information provided.`;
  }
}

// Lazy initialization for both services to avoid immediate API key requirement
let _freeAssessmentService: OpenAIService | null = null;
let _paidCustomerService: OpenAIService | null = null;

export const getFreeAssessmentService = () => {
  if (!_freeAssessmentService) {
    _freeAssessmentService = new OpenAIService('free_assessment');
  }
  return _freeAssessmentService;
};

export const getPaidCustomerService = () => {
  if (!_paidCustomerService) {
    _paidCustomerService = new OpenAIService('paid_customer');
  }
  return _paidCustomerService;
};

// Export singleton instances for different use cases (lazy initialization)
export const freeAssessmentService = getFreeAssessmentService;
export const paidCustomerService = getPaidCustomerService;

// Default export for backward compatibility (uses free assessment)
export const openAIService = getFreeAssessmentService;