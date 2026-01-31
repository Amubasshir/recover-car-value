/**
 * Run Supabase migrations (002_diminished_car_value, 003_add_post_plot_generated).
 * Requires DATABASE_URL in .env.local (Supabase Dashboard → Settings → Database → Connection string URI).
 */
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Load .env.local then .env
function loadEnv() {
  const paths = [path.join(__dirname, '..', '.env.local'), path.join(__dirname, '..', '.env')];
  for (const p of paths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      content.split('\n').forEach((line) => {
        const m = line.match(/^([^#=]+)=(.*)$/);
        if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
      });
      return;
    }
  }
}

loadEnv();

const DATABASE_URL = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

if (!DATABASE_URL) {
  console.error('Missing DATABASE_URL or SUPABASE_DB_URL.');
  console.error('Add to .env.local from Supabase Dashboard → Settings → Database → Connection string (URI).');
  process.exit(1);
}

const migrationsDir = path.join(__dirname, '..', 'app', 'supabase', 'migrations');
const files = ['002_diminished_car_value.sql', '003_add_post_plot_generated.sql'];

async function run() {
  const client = new Client({ connectionString: DATABASE_URL });
  try {
    await client.connect();
    for (const file of files) {
      const filepath = path.join(migrationsDir, file);
      if (!fs.existsSync(filepath)) {
        console.warn('Skip (not found):', file);
        continue;
      }
      const sql = fs.readFileSync(filepath, 'utf8');
      console.log('Running', file, '...');
      await client.query(sql);
      console.log('OK:', file);
    }
    console.log('Migrations done.');
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
