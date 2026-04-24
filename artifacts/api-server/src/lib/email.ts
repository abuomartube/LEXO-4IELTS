// Lightweight admin-alert email helper.
//
// Uses SendGrid if SENDGRID_API_KEY is set; otherwise gracefully no-ops and
// logs a warning so the app keeps working in dev / before the integration is
// wired up. Designed to never throw — alert delivery must not break a real
// AI request.
import { logger } from "./logger";

const ADMIN_ALERT_EMAIL = process.env["ADMIN_ALERT_EMAIL"] || "askabuomar@gmail.com";
const SENDGRID_FROM = process.env["SENDGRID_FROM"] || "askabuomar@gmail.com";
const SENDGRID_API_KEY = process.env["SENDGRID_API_KEY"] || "";

export interface AdminAlertParams {
  subject: string;
  text: string;
  html?: string;
}

export function getAdminAlertEmail(): string {
  return ADMIN_ALERT_EMAIL;
}

export function isEmailConfigured(): boolean {
  return Boolean(SENDGRID_API_KEY);
}

export async function sendAdminAlert(params: AdminAlertParams): Promise<{ delivered: boolean; reason?: string }> {
  const { subject, text, html } = params;

  if (!SENDGRID_API_KEY) {
    logger.warn(
      { subject, to: ADMIN_ALERT_EMAIL },
      "Admin alert NOT sent: SENDGRID_API_KEY not configured. Email content logged below.",
    );
    logger.warn({ subject, text }, "Admin alert payload (would-be email)");
    return { delivered: false, reason: "sendgrid_not_configured" };
  }

  // Direct REST call so we don't have to install the SDK before the user has
  // approved the integration — SendGrid v3 mail send works with just the key.
  try {
    const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: ADMIN_ALERT_EMAIL }] }],
        from: { email: SENDGRID_FROM, name: "LEXO Alerts" },
        subject,
        content: [
          { type: "text/plain", value: text },
          ...(html ? [{ type: "text/html", value: html }] : []),
        ],
      }),
    });
    if (!resp.ok) {
      const body = await resp.text();
      logger.error({ status: resp.status, body, subject }, "Admin alert send failed");
      return { delivered: false, reason: `sendgrid_${resp.status}` };
    }
    logger.info({ to: ADMIN_ALERT_EMAIL, subject }, "Admin alert sent");
    return { delivered: true };
  } catch (err) {
    logger.error({ err, subject }, "Admin alert send threw");
    return { delivered: false, reason: "exception" };
  }
}
