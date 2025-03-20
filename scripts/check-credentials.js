/**
 * Credential Scanner for Decoding Death
 * 
 * This script scans files for potential credential leaks before committing.
 * It's designed to be run as a pre-commit hook or manually.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Patterns to detect potential credentials
const CREDENTIAL_PATTERNS = [
  // Supabase keys (JWT format) - using a safer pattern that won't match itself
  /eyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}/,
  
  // Stripe keys
  /sk_(test|live)_[0-9a-zA-Z]{24,}/,
  /pk_(test|live)_[0-9a-zA-Z]{24,}/,
  
  // Generic API keys
  /api[_-]?key.*[=:]["']?[0-9a-zA-Z]{16,}["']?/i,
  
  // Generic tokens
  /token.*[=:]["']?[0-9a-zA-Z]{16,}["']?/i,
  
  // Generic secrets
  /secret.*[=:]["']?[0-9a-zA-Z]{16,}["']?/i,
  
  // Test passwords (specific pattern)
  /Password123!/i,
];

// Files and directories to ignore
const IGNORE_PATTERNS = [
  /\.env$/,
  /\.env\.local$/,
  /\.env\.example$/,
  /node_modules/,
  /\.git\//,
  /package-lock\.json$/,
  /\.next\//,
  /\.husky\//,
  /check-credentials\.js$/
];

// Lines to ignore (false positives)
const IGNORE_LINES = [
  // HTML password input fields (not actual credentials)
  /<input[^>]*type=["']password["'][^>]*>/i,
  // Password state variables in React
  /const \[\w*[pP]assword\w*, set\w*[pP]assword\w*\] = useState/,
  // Password form field references
  /const password = e\.target\.password\.value/,
  /const password = passwordInput\.value/,
  // Password input element references
  /const passwordInput = document\.getElementById\('password'\)/,
  // Environment variable placeholders
  /process\.env\.\w+\s*\|\|\s*['"][\w-]+-placeholder['"]/,
  // Example JWT tokens in documentation
  /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.\.\./,
];

// Get staged files
function getStagedFiles() {
  try {
    const result = execSync('git diff --cached --name-only --diff-filter=ACM').toString();
    return result.split('\n').filter(file => file.trim() !== '');
  } catch (error) {
    console.error('Error getting staged files:', error.message);
    console.log('Running in standalone mode - checking all files');
    return getAllFiles();
  }
}

// Get all files recursively
function getAllFiles(dir = process.cwd()) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(process.cwd(), fullPath);
    
    // Skip ignored files
    if (IGNORE_PATTERNS.some(pattern => pattern.test(relativePath))) {
      return;
    }
    
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(relativePath);
    }
  });
  
  return results;
}

// Check a file for credentials
function checkFileForCredentials(filePath) {
  try {
    // Skip files that don't exist or are ignored
    if (!fs.existsSync(filePath) || IGNORE_PATTERNS.some(pattern => pattern.test(filePath))) {
      return [];
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const matches = [];
    
    lines.forEach((line, index) => {
      // Skip lines that match ignore patterns (false positives)
      if (IGNORE_LINES.some(pattern => pattern.test(line))) {
        return;
      }
      
      CREDENTIAL_PATTERNS.forEach(pattern => {
        if (pattern.test(line)) {
          matches.push({
            file: filePath,
            line: index + 1,
            content: line.trim(),
            pattern: pattern.toString()
          });
        }
      });
    });
    
    return matches;
  } catch (error) {
    console.error(`Error checking file ${filePath}:`, error.message);
    return [];
  }
}

// Main function
function main() {
  console.log('🔒 Scanning for potential credential leaks in Decoding Death...');
  
  const isPreCommit = process.argv.includes('--pre-commit');
  const files = isPreCommit ? getStagedFiles() : getAllFiles();
  
  console.log(`Scanning ${files.length} files...`);
  
  let allMatches = [];
  files.forEach(file => {
    const matches = checkFileForCredentials(file);
    allMatches = allMatches.concat(matches);
  });
  
  if (allMatches.length > 0) {
    console.error('\n❌ POTENTIAL CREDENTIALS FOUND:');
    console.error('===============================');
    
    allMatches.forEach(match => {
      console.error(`File: ${match.file}`);
      console.error(`Line: ${match.line}`);
      console.error(`Content: ${match.content}`);
      console.error('---------------');
    });
    
    console.error('\n⚠️ Please remove these credentials before committing!');
    console.error('Use environment variables or .env files instead.');
    
    if (isPreCommit) {
      console.error('\nTo bypass this check (NOT RECOMMENDED), use:');
      console.error('  git commit --no-verify');
    }
    
    process.exit(1);
  } else {
    console.log('✅ No credentials found!');
    process.exit(0);
  }
}

// Run the script
main();
