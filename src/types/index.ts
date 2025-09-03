export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  currentSalary?: number;
  targetSalary?: number;
  experience?: number;
  location?: string;
  skills?: string[];
}

export interface NegotiationData {
  id: string;
  userId: string;
  currentRole: string;
  targetRole?: string;
  currentSalary: number;
  targetSalary: number;
  company: string;
  location: string;
  experience: number;
  skills: string[];
  status: 'draft' | 'active' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketData {
  role: string;
  location: string;
  experience: number;
  averageSalary: number;
  percentile25: number;
  percentile75: number;
  percentile90: number;
  sampleSize: number;
}

export interface ExpertRecommendation {
  id: string;
  negotiationId: string;
  strategy: string;
  justification: string;
  confidence: number;
  expectedOutcome: {
    minIncrease: number;
    maxIncrease: number;
    probability: number;
  };
  tactics: string[];
  createdAt: Date;
}

// New interfaces for offer analysis
export interface ExtractedOfferInfo {
  companyName?: string;
  jobTitle?: string;
  baseSalary?: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface OfferAnalysisRequest {
  offerInput: string; // Single input field - can be text or file content
  inputType: 'text' | 'file';
  fileName?: string; // Optional filename if uploaded
}

export interface OfferAnalysisResponse {
  extractedInfo: ExtractedOfferInfo;
  offerSummary: string;
  benchmarkAssessment: string;
  strengths: string;
  negotiationOpportunities: string;
  suggestedStrategy: string;
  risksConsiderations: string;
  rawResponse?: string;
  debugPayload?: any;
}