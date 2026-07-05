// Validates required environment variables exist at boot time.
// Fails fast with a clear error instead of a confusing runtime crash later.
const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];

function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = { validateEnv };
