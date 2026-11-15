interface Env {
  // Optional Cloudflare KV namespace for signups:
  // e.g. wrangler kv namespace create SIGNUPS_KV
  SIGNUPS_KV?: any;
  // Optional webhook URL (e.g., Slack, Discord, Zapier, Formspree)
  SIGNUP_WEBHOOK_URL?: string;
}

interface SignupRequestBody {
  email: string;
  apps: string[];
  betaInterest?: boolean;
  referrer?: string;
  timestamp?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    // Parse JSON body
    let body: SignupRequestBody;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'invalid_json', message: 'Invalid JSON payload received.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { email, apps, betaInterest = false, referrer = '', timestamp = new Date().toISOString() } = body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'invalid_email', message: 'Please provide a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Apps validation
    if (!Array.isArray(apps) || apps.length === 0) {
      return new Response(
        JSON.stringify({ error: 'no_apps_selected', message: 'Please select at least one app.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const signupRecord = {
      email: email.toLowerCase().trim(),
      apps,
      betaInterest,
      referrer,
      timestamp,
      ip: request.headers.get('cf-connecting-ip') || 'unknown',
      country: request.headers.get('cf-ipcountry') || 'unknown',
    };

    // 1. If Cloudflare KV is bound, store the record
    if (env.SIGNUPS_KV) {
      const key = `signup:${signupRecord.email}:${Date.now()}`;
      await env.SIGNUPS_KV.put(key, JSON.stringify(signupRecord));
    }

    // 2. If a webhook URL is configured in Cloudflare environment variables
    if (env.SIGNUP_WEBHOOK_URL) {
      try {
        await fetch(env.SIGNUP_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `New Keep It Simpler Signup: ${signupRecord.email} for [${signupRecord.apps.join(', ')}] (Beta: ${betaInterest ? 'Yes' : 'No'})`,
            record: signupRecord,
          }),
        });
      } catch (webhookErr) {
        console.error('Webhook notification failed:', webhookErr);
      }
    }

    // Return success
    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Successfully registered for launch updates.',
        apps: signupRecord.apps,
        betaInterest: signupRecord.betaInterest,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    console.error('Signup error:', err);
    return new Response(
      JSON.stringify({ error: 'server_error', message: 'Internal server error processing signup.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
