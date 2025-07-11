import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BugReportRequest {
  type: string;
  title: string;
  description: string;
  email?: string;
  steps?: string;
  expected?: string;
  actual?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      type,
      title,
      description,
      email,
      steps,
      expected,
      actual
    }: BugReportRequest = await req.json();

    const typeEmoji = {
      bug: "🐛",
      feature: "💡",
      improvement: "🔧",
      other: "📝"
    };

    const reportType = type.charAt(0).toUpperCase() + type.slice(1);
    const emoji = typeEmoji[type as keyof typeof typeEmoji] || "📝";

    let emailBody = `
      <h2>${emoji} ${reportType} Report</h2>
      <h3>Title: ${title}</h3>
      
      <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <h4>Description:</h4>
        <p style="white-space: pre-wrap;">${description}</p>
      </div>
    `;

    if (type === 'bug') {
      if (steps) {
        emailBody += `
          <div style="background: #fff3cd; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>Steps to Reproduce:</h4>
            <p style="white-space: pre-wrap;">${steps}</p>
          </div>
        `;
      }

      if (expected || actual) {
        emailBody += `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
        `;
        
        if (expected) {
          emailBody += `
            <div style="background: #d1f2eb; padding: 16px; border-radius: 8px;">
              <h4>Expected Behavior:</h4>
              <p style="white-space: pre-wrap;">${expected}</p>
            </div>
          `;
        }
        
        if (actual) {
          emailBody += `
            <div style="background: #fadbd8; padding: 16px; border-radius: 8px;">
              <h4>Actual Behavior:</h4>
              <p style="white-space: pre-wrap;">${actual}</p>
            </div>
          `;
        }
        
        emailBody += `</div>`;
      }
    }

    if (email) {
      emailBody += `
        <div style="background: #e8f4fd; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4>Reporter's Email:</h4>
          <p>${email}</p>
        </div>
      `;
    }

    emailBody += `
      <hr style="margin: 24px 0;">
      <p style="color: #666; font-size: 14px;">
        Submitted from: Filipino AAC Soundboard<br>
        Timestamp: ${new Date().toISOString()}
      </p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Filipino AAC Soundboard <onboarding@resend.dev>",
      to: ["Marvin.guevarra@gmail.com"],
      subject: `${emoji} ${reportType}: ${title}`,
      html: emailBody,
    });

    console.log("Bug report sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-bug-report function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);