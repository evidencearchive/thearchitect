# Security Policy for Decoding Death

This document outlines the security practices and policies for the Decoding Death project.

## Credential Management

### Environment Variables
- All sensitive credentials must be stored in `.env` files
- Never commit `.env` files to the repository
- Use `.env.example` files with placeholder values for documentation
- All repositories include environment variable validation on startup

### Pre-commit Hooks
- Git pre-commit hooks are configured to scan for potential credential leaks
- The credential scanner checks for:
  - Supabase JWT tokens
  - Stripe API keys
  - Generic API keys and tokens
  - Hardcoded passwords
- To bypass in exceptional cases: `git commit --no-verify` (not recommended)

## API Security

### Rate Limiting
- All API endpoints implement rate limiting
- Default: 100 requests per 15 minutes
- Stricter limits on sensitive endpoints (authentication, payments)
- Rate limits are enforced using Supabase for persistence
- System fails closed (blocks requests on errors)

### Authentication
- JWT-based authentication using Supabase
- Service role keys are only used server-side
- Public anon keys have limited permissions
- Admin endpoints require additional API key verification

## Data Security

### Player Data
- Psychological profiles are stored securely in Supabase
- Premium content is personalized based on profiles
- Access to player data is restricted by role-based permissions

### Payment Processing
- All payment processing is handled by Stripe
- No payment details are stored in our database
- Webhook signatures are verified for authenticity

## Security Reporting

If you discover a security vulnerability, please report it by:
1. **DO NOT** create a public GitHub issue
2. Email [security@example.com](mailto:security@example.com)
3. Include detailed information about the vulnerability

## Security Updates

- Security dependencies are regularly updated
- Security practices are reviewed quarterly
- All developers must follow these guidelines

Last updated: March 19, 2025
