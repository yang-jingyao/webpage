// api/subscribe.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.warn('Supabase env vars missing');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  // use fetch to ensure compatibility with edge runtimes if required
  global: { fetch }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, schoolName } = req.body || {};

    // Basic validation
    if (!fullName || !email || !schoolName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Prevent quick abuse: trim fields
    const payload = {
      full_name: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      school_name: String(schoolName).trim()
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([payload])
      .select()
      .single();

    if (error) {
      // unique violation or other DB error - return friendly message
      console.error('Supabase insert error', error);
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email already on waitlist' });
      }
      return res.status(500).json({ error: 'Database error' });
    }

    // Success
    return res.status(200).json({ message: 'Successfully joined the waitlist' });
  } catch (err) {
    console.error('Handler error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
