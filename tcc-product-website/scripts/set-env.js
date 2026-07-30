const fs = require('fs');
const path = require('path');

const mode = process.argv[2] === 'production' ? 'production' : 'development';
const projectRoot = path.join(__dirname, '..');
const environmentsDir = path.join(projectRoot, 'src', 'environments');
const developmentFile = path.join(environmentsDir, 'environment.generated.ts');
const productionFile = path.join(environmentsDir, 'environment.generated.prod.ts');

loadEnvFile(path.join(projectRoot, '.env'));
loadEnvFile(path.join(projectRoot, '.env.local'));

const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY || '';

if (mode === 'production' && !web3formsAccessKey) {
  console.error('WEB3FORMS_ACCESS_KEY must be set for production builds.');
  process.exit(1);
}

fs.mkdirSync(environmentsDir, { recursive: true });
fs.writeFileSync(developmentFile, createEnvironmentFile(false, web3formsAccessKey));

if (web3formsAccessKey) {
  fs.writeFileSync(productionFile, createEnvironmentFile(true, web3formsAccessKey));
} else {
  console.warn('WEB3FORMS_ACCESS_KEY is not set. Form submissions will be disabled in local development.');
}

console.log(`Generated environment for ${mode}`);

function createEnvironmentFile(production, accessKey) {
  return `export const environment = {
  production: ${production},
  web3formsAccessKey: '${escapeForSingleQuotedString(accessKey)}',
};
`;
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');

  for (const line of fileContents.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function escapeForSingleQuotedString(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
