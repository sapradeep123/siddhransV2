// Branded enquiry notification email: table layout + inline CSS (Outlook, Gmail, Apple Mail, mobile).
// Pure functions only: no I/O. Every visitor-supplied value is HTML-escaped before it reaches the markup.

const NAVY = '#0A1326';
const NAVY_2 = '#12213F';
const GREEN = '#009040';
const GREEN_D = '#00743A';
const YELLOW = '#F8E000';
const INK = '#0A1326';
const INK_2 = '#34425E';
const MUTED = '#66748F';
const LINE = '#DAE1EC';
const MIST = '#F3F6FB';
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const COMPANY = {
  name: 'Siddhrans InfoTech Pvt Ltd',
  city: 'Bengaluru, India',
  phones: ['+91 89712 34343', '+91 99024 06387'],
};

export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Subject component: single line, no pipe or control characters, bounded length. */
export const subjectPart = (v) => String(v ?? '').replace(/[\u0000-\u001f\u007f\u2028\u2029|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);
export const buildSubject = (area) => `New Website Enquiry | ${subjectPart(area) || 'General'} | Siddhrans`;

/** "23 Oct 2026, 3:12 PM IST" */
export function formatWhen(date) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
  return `${parts.replace(/\bam\b/, 'AM').replace(/\bpm\b/, 'PM')} IST`;
}

const mailtoHref = (email, subject) => `mailto:${encodeURIComponent(email).replace(/%40/g, '@')}?subject=${encodeURIComponent(subject)}`;
const multiline = (s) => esc(s).replace(/\r\n|\r|\n/g, '<br>');

function detailRow({ label, valueHtml, last }) {
  const border = last ? '' : `border-bottom:1px solid ${LINE};`;
  return `<tr>
<td class="stack stack-label" width="150" valign="top" style="width:150px;padding:14px 16px 14px 0;${border}font-family:${FONT};font-size:11px;line-height:16px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${MUTED};">${esc(label)}</td>
<td class="stack" valign="top" style="padding:12px 0 14px 0;${border}font-family:${FONT};font-size:16px;line-height:24px;color:${INK};word-break:break-word;">${valueHtml}</td>
</tr>`;
}

/**
 * @param {{name:string,email:string,org?:string,phone?:string,area:string,message:string}} data validated enquiry
 * @param {{siteUrl:string, receivedAt?:Date}} opts
 * @returns {{subject:string, html:string, text:string}}
 */
export function buildEnquiryEmail(data, { siteUrl, receivedAt = new Date() }) {
  const site = String(siteUrl).replace(/\/$/, '');
  const logoUrl = `${site}/brand/Siddhrans_Logo.png`;
  const when = formatWhen(receivedAt);
  const subject = buildSubject(data.area);
  const replySubject = `Re: Your enquiry to Siddhrans (${subjectPart(data.area) || 'General'})`;
  const reply = mailtoHref(data.email, replySubject);

  const rows = [
    { label: 'Name', valueHtml: `<strong>${esc(data.name)}</strong>` },
    { label: 'Email', valueHtml: `<a href="${esc(mailtoHref(data.email, replySubject))}" style="color:${GREEN_D};text-decoration:underline;">${esc(data.email)}</a>` },
    data.phone ? { label: 'Phone', valueHtml: esc(data.phone) } : null,
    data.org ? { label: 'Organisation', valueHtml: esc(data.org) } : null,
    { label: 'Area of interest', valueHtml: esc(data.area) },
    { label: 'Received', valueHtml: esc(when) },
  ].filter(Boolean).map((r, i, a) => detailRow({ ...r, last: i === a.length - 1 }));

  const phonesHtml = COMPANY.phones.map((p) => `<a href="tel:${p.replace(/[^\d+]/g, '')}" style="color:#FFFFFF;text-decoration:none;">${esc(p)}</a>`).join('&nbsp;&nbsp;|&nbsp;&nbsp;');
  const preheader = `${data.name} — ${data.area}`;

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><style>table,td,th,div,p,a,h1{font-family:Arial,Helvetica,sans-serif !important;}</style><![endif]-->
<style>
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
  @media only screen and (max-width:620px){
    .wrap{width:100% !important;}
    .pad{padding-left:22px !important;padding-right:22px !important;}
    .stack{display:block !important;width:100% !important;padding-right:0 !important;}
    .stack-label{padding-bottom:0 !important;border-bottom:0 !important;}
    .h1{font-size:26px !important;line-height:32px !important;}
    .btn td{padding-left:24px !important;padding-right:24px !important;}
  }
</style>
</head>
<body style="margin:0;padding:0;background:#E9EDF4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:#E9EDF4;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#E9EDF4" style="background:#E9EDF4;">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" class="wrap" width="620" cellpadding="0" cellspacing="0" border="0" style="width:620px;max-width:620px;">
    <tr><td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="background:#FFFFFF;border-radius:10px;overflow:hidden;">
        <!-- brand accent -->
        <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="75%" height="5" bgcolor="${GREEN}" style="height:5px;line-height:5px;font-size:5px;background:${GREEN};">&nbsp;</td>
          <td width="25%" height="5" bgcolor="${YELLOW}" style="height:5px;line-height:5px;font-size:5px;background:${YELLOW};">&nbsp;</td>
        </tr></table></td></tr>
        <!-- logo on white -->
        <tr><td class="pad" align="left" bgcolor="#FFFFFF" style="padding:26px 40px 24px 40px;background:#FFFFFF;">
          <a href="${esc(site)}/" style="text-decoration:none;"><img src="${esc(logoUrl)}" width="280" height="141" alt="Siddhrans InfoTech" style="display:block;width:280px;height:auto;max-width:100%;border:0;"></a>
        </td></tr>
        <!-- navy header -->
        <tr><td class="pad" bgcolor="${NAVY}" style="padding:34px 40px 36px 40px;background:${NAVY};">
          <div style="font-family:${FONT};font-size:12px;line-height:16px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:${YELLOW};">Website enquiry</div>
          <h1 class="h1" style="margin:12px 0 10px 0;font-family:${FONT};font-size:32px;line-height:38px;font-weight:700;color:#FFFFFF;">New business enquiry</h1>
          <div style="font-family:${FONT};font-size:15px;line-height:23px;color:#C3CCDD;">A new enquiry has been received through the Siddhrans website.</div>
        </td></tr>
        <tr><td height="3" bgcolor="${NAVY_2}" style="height:3px;line-height:3px;font-size:3px;background:${NAVY_2};">&nbsp;</td></tr>
        <!-- details -->
        <tr><td class="pad" style="padding:34px 40px 8px 40px;">
          <div style="font-family:${FONT};font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GREEN_D};padding-bottom:6px;">Enquiry details</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid ${NAVY};margin-top:8px;">
${rows.join('\n')}
          </table>
        </td></tr>
        <!-- message -->
        <tr><td class="pad" style="padding:26px 40px 8px 40px;">
          <div style="font-family:${FONT};font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${GREEN_D};padding-bottom:12px;">Message</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="4" bgcolor="${GREEN}" style="width:4px;background:${GREEN};font-size:0;line-height:0;">&nbsp;</td>
            <td bgcolor="${MIST}" style="background:${MIST};padding:20px 22px;font-family:${FONT};font-size:16px;line-height:26px;color:${INK_2};word-break:break-word;">${multiline(data.message)}</td>
          </tr></table>
        </td></tr>
        <!-- reply button -->
        <tr><td class="pad" align="left" style="padding:30px 40px 40px 40px;">
          <table role="presentation" class="btn" cellpadding="0" cellspacing="0" border="0"><tr>
            <td align="center" bgcolor="${GREEN_D}" style="background:${GREEN_D};border-radius:6px;padding:15px 34px;">
              <a href="${esc(reply)}" style="font-family:${FONT};font-size:16px;line-height:20px;font-weight:700;color:#FFFFFF;text-decoration:none;display:inline-block;">Reply to enquiry&nbsp;&rarr;</a>
            </td>
          </tr></table>
          <div style="font-family:${FONT};font-size:13px;line-height:20px;color:${MUTED};padding-top:12px;">Or simply reply to this email: it goes straight to ${esc(data.name)}.</div>
        </td></tr>
        <!-- footer -->
        <tr><td class="pad" bgcolor="${NAVY}" style="padding:28px 40px 30px 40px;background:${NAVY};">
          <div style="font-family:${FONT};font-size:16px;line-height:22px;font-weight:700;color:#FFFFFF;">${esc(COMPANY.name)}</div>
          <div style="font-family:${FONT};font-size:14px;line-height:22px;color:#C3CCDD;padding-top:2px;">${esc(COMPANY.city)}</div>
          <div style="font-family:${FONT};font-size:14px;line-height:22px;color:#C3CCDD;padding-top:10px;">Website: <a href="${esc(site)}/" style="color:${YELLOW};text-decoration:none;">${esc(site)}</a></div>
          <div style="font-family:${FONT};font-size:14px;line-height:22px;color:#C3CCDD;padding-top:2px;">Phone: ${phonesHtml}</div>
          <div style="border-top:1px solid #2A3B60;margin-top:20px;padding-top:16px;font-family:${FONT};font-size:12px;line-height:18px;color:#8D9AB3;">This is an automated notification generated from the Siddhrans website contact form.</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    'NEW BUSINESS ENQUIRY',
    'A new enquiry has been received through the Siddhrans website.',
    '',
    'ENQUIRY DETAILS',
    '---------------',
    `Name:             ${data.name}`,
    `Email:            ${data.email}`,
    data.phone ? `Phone:            ${data.phone}` : null,
    data.org ? `Organisation:     ${data.org}` : null,
    `Area of interest: ${data.area}`,
    `Received:         ${when}`,
    '',
    'MESSAGE',
    '-------',
    data.message,
    '',
    `Reply to enquiry: ${reply}`,
    '(or simply reply to this email)',
    '',
    '--',
    COMPANY.name,
    COMPANY.city,
    `Website: ${site}`,
    `Phone: ${COMPANY.phones.join(' | ')}`,
    '',
    'This is an automated notification generated from the Siddhrans website contact form.',
  ].filter((l) => l !== null).join('\n');

  return { subject, html, text };
}
