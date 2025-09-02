# Services Documentation

## OpenAI API Key Management

This project uses separate OpenAI API keys for different use cases to enable better tracking and cost management:

### API Keys

1. **Free Assessment API Key** (`OPENAI_FREE_ASSESSMENT_API_KEY`)
   - Used for the free offer assessment tool
   - Allows tracking of free tool usage separately from paid customer usage
   - Set in `.env.local` file

2. **Paid Customer API Key** (`OPENAI_PAID_CUSTOMER_API_KEY`)
   - Used for paid customer features (future implementation)
   - Allows tracking of paid customer usage separately
   - Set in `.env.local` file

### Services

- `openai.ts` - Main OpenAI service with lazy initialization
- `paid-customer-openai.ts` - Enhanced service for paid customers (future features)

### Usage

The services use lazy initialization to prevent immediate API key validation errors during application startup. API keys are only validated when the service is actually used.