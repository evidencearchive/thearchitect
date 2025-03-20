// Simple utility to generate a JWT token for testing the evidence archive
const jwt = require('jsonwebtoken');

// JWT secret key - MUST match the one in your backend
const JWT_SECRET = process.env.JWT_SECRET || 'decoding-death-premium-secret';
// Token expiration time (24 hours)
const TOKEN_EXPIRATION = '24h';

/**
 * Generate a JWT token for premium content access
 * @param {string} playerEmail - The player's email
 * @param {string} premiumTier - The player's premium tier
 * @returns {string} - JWT token
 */
function generatePremiumToken(playerEmail, premiumTier) {
  try {
    const payload = {
      playerEmail,
      premiumTier,
      iat: Math.floor(Date.now() / 1000),
    };
    
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
  } catch (error) {
    console.error('Failed to generate token:', error);
    throw new Error('Failed to generate access token');
  }
}

// Generate token for test user
const playerEmail = process.argv[2] || 'test_player_1741299383627_2@decodingtests.com';
const premiumTier = process.argv[3] || 'investigator-toolkit';

const token = generatePremiumToken(playerEmail, premiumTier);

console.log('\n=== JWT Token for Evidence Archive Testing ===');
console.log(`\nPlayer: ${playerEmail}`);
console.log(`Premium Tier: ${premiumTier}`);
console.log('\nToken:');
console.log(token);
console.log('\nUse this token in the test-link.html page to access the evidence archive.');
console.log('==============================================\n');
