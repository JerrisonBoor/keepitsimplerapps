import { createMimeMessage } from 'mimetext';

interface Env {
  DB?: any;
  SEND_EMAIL?: any;
  NOTIFICATION_EMAIL?: string;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Intercept form submissions
    if (url.pathname === '/api/signup' && request.method === 'POST') {
      try {
        const data = (await request.json()) as {
          email?: string;
          apps?: string[];
          betaInterest?: boolean;
          referrer?: string;
        };

        const email = data.email?.toLowerCase().trim() || '';
        const apps = (data.apps || []).join(', ');
        const betaInterest = data.betaInterest ? 'Yes' : 'No';
        const date = new Date().toISOString();

        if (!email || !email.includes('@')) {
          return new Response(JSON.stringify({ error: 'invalid_email', message: 'Invalid email address.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        // 1. Save to Cloudflare D1 (if database is bound)
        if (env.DB) {
          try {
            await env.DB.prepare(
              'INSERT INTO signups (email, apps, beta_interest, created_at) VALUES (?, ?, ?, ?)'
            )
              .bind(email, apps, betaInterest, date)
              .run();
          } catch (dbErr) {
            console.error('D1 Insert Error:', dbErr);
          }
        }

        // 2. Send email notification via Cloudflare Email Routing (if bound and configured)
        if (env.SEND_EMAIL && env.NOTIFICATION_EMAIL) {
          try {
            const sender = 'notifications@keepitsimpler.app';
            const msg = createMimeMessage();
            msg.setSender({ name: 'Keep It Simpler', addr: sender });
            msg.setRecipient(env.NOTIFICATION_EMAIL);
            msg.setSubject(`🚀 New Prelaunch Signup: ${email}`);
            msg.addMessage({
              contentType: 'text/plain',
              data: `New prelaunch signup received for Keep It Simpler!\n\nEmail: ${email}\nApps: ${apps}\nBeta Interest: ${betaInterest}\nTimestamp: ${date}\n`,
            });

            // EmailMessage is a Cloudflare Workers global available when send_email binding is active
            // @ts-ignore
            const emailMsg = new EmailMessage(sender, env.NOTIFICATION_EMAIL, msg.asRaw());
            await env.SEND_EMAIL.send(emailMsg);
          } catch (mailErr) {
            console.error('Email Routing Send Error:', mailErr);
          }
        }

        return new Response(
          JSON.stringify({
            status: 'success',
            message: 'Successfully registered for launch updates.',
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
        return new Response(
          JSON.stringify({ error: 'server_error', message: err.message || 'Error processing signup.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Serve Astro static assets for all other routes
    return env.ASSETS.fetch(request);
  },
};
