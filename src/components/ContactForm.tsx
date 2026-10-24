'use client';
import { useRef, useState, type FormEvent } from 'react';
import { site } from '@/content/site';
import { Arrow } from './ui';

const AREAS = ['AI & intelligent automation', 'Enterprise software & applications', 'Embedded systems & industrial IoT', 'Edge AI', 'PCB & hardware design', 'Embedded firmware & microcontrollers', 'VLSI & FPGA design support', 'Electronic product prototyping', 'Cloud & infrastructure', 'Cybersecurity', 'Managed services', 'Something else'];
type Field = 'name' | 'email' | 'message' | 'consent';
type Errors = Partial<Record<Field, string>>;
type State = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
export function validate(v: { name: string; email: string; message: string; consent: boolean }): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!EMAIL.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.message.trim().length < 10) e.message = 'Please tell us a little about what you need (at least 10 characters).';
  if (!v.consent) e.consent = 'Please confirm consent so we can reply.';
  return e;
}

export default function ContactForm({ defaultArea }: { defaultArea?: string }) {
  const ref = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>('idle');
  const [serverMsg, setServerMsg] = useState('');

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const v = {
      name: String(f.get('name') ?? ''), email: String(f.get('email') ?? ''), org: String(f.get('org') ?? ''),
      phone: String(f.get('phone') ?? ''), area: String(f.get('area') ?? ''), message: String(f.get('message') ?? ''),
      consent: f.get('consent') === 'on', website: String(f.get('website') ?? ''),
    };
    const errs = validate(v);
    setErrors(errs);
    const first = (['name', 'email', 'message', 'consent'] as Field[]).find((k) => errs[k]);
    if (first) { ref.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    setState('sending'); setServerMsg('');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
      if (r.ok) { setState('sent'); ref.current?.reset(); return; }
      const data = (await r.json().catch(() => ({}))) as { errors?: Errors; error?: string };
      if (r.status === 400 && data.errors) { setErrors(data.errors); setState('idle'); return; }
      setServerMsg(r.status === 429 ? 'Too many enquiries from this connection. Please try again in a little while, or contact us directly.' : 'Sorry, your enquiry could not be sent.');
      setState('error');
    } catch {
      setServerMsg('We could not reach the server. Please check your connection.');
      setState('error');
    }
  }

  const bad = (k: Field) => (errors[k] ? ' bad' : '');
  const inv = (k: Field) => (errors[k] ? true : undefined);

  if (state === 'sent') {
    return (
      <div className="status" role="status" data-testid="sent">
        <b>Thank you. Your enquiry has been sent.</b>
        <p style={{ margin: '8px 0 0' }}>We will reply to the email address you gave us. If it is urgent, call <a href={`tel:${site.phones[0].tel}`} style={{ textDecoration: 'underline' }}>{site.phones[0].display}</a> or <a href={`tel:${site.phones[1].tel}`} style={{ textDecoration: 'underline' }}>{site.phones[1].display}</a>.</p>
      </div>
    );
  }

  return (
    <form id="enquiry" ref={ref} onSubmit={onSubmit} noValidate aria-labelledby="f-h">
      <h2 id="f-h">Send an enquiry</h2>
      <div className="row">
        <div className={`field${bad('name')}`}>
          <label htmlFor="n">Name</label>
          <input id="n" name="name" autoComplete="name" required aria-required="true" aria-invalid={inv('name')} aria-describedby={errors.name ? 'n-e' : undefined} />
          {errors.name && <div className="err" id="n-e" role="alert">{errors.name}</div>}
        </div>
        <div className={`field${bad('email')}`}>
          <label htmlFor="e">Work email</label>
          <input id="e" name="email" type="email" autoComplete="email" required aria-required="true" aria-invalid={inv('email')} aria-describedby={errors.email ? 'e-e' : undefined} />
          {errors.email && <div className="err" id="e-e" role="alert">{errors.email}</div>}
        </div>
      </div>
      <div className="row">
        <div className="field"><label htmlFor="o">Organisation <small>optional</small></label><input id="o" name="org" autoComplete="organization" /></div>
        <div className="field"><label htmlFor="p">Phone <small>optional</small></label><input id="p" name="phone" type="tel" autoComplete="tel" /></div>
      </div>
      <div className="field">
        <label htmlFor="a">Area of interest</label>
        <select id="a" name="area" defaultValue={defaultArea ?? AREAS[0]}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select>
      </div>
      <div className={`field${bad('message')}`}>
        <label htmlFor="m">How can we help?</label>
        <textarea id="m" name="message" required aria-required="true" aria-invalid={inv('message')} aria-describedby={errors.message ? 'm-e' : undefined} />
        {errors.message && <div className="err" id="m-e" role="alert">{errors.message}</div>}
      </div>
      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="w">Website</label><input id="w" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={`consent field${bad('consent')}`}>
        <input type="checkbox" id="c" name="consent" aria-invalid={inv('consent')} aria-describedby={errors.consent ? 'c-e' : undefined} />
        <label htmlFor="c" style={{ font: '400 15px/1.5 var(--f-body)', margin: 0 }}>
          I agree that {site.short} may use these details to reply to my enquiry. They are not shared or used for marketing. <a href="/privacy/" style={{ textDecoration: 'underline' }}>Privacy notice</a>
        </label>
      </div>
      {errors.consent && <div className="err" id="c-e" role="alert" style={{ margin: '-4px 0 18px 34px' }}>{errors.consent}</div>}
      <button className="btn btn--green" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send enquiry'}<span className="arr"><Arrow /></span>
      </button>
      {state === 'error' && (
        <div className="status" style={{ borderColor: '#E7A29B', background: '#FDECEA' }} role="alert" data-testid="send-error">
          {serverMsg} You can also email <a href={`mailto:${site.email}`} style={{ textDecoration: 'underline' }}>{site.email}</a> or call <a href={`tel:${site.phones[0].tel}`} style={{ textDecoration: 'underline' }}>{site.phones[0].display}</a> or <a href={`tel:${site.phones[1].tel}`} style={{ textDecoration: 'underline' }}>{site.phones[1].display}</a>.
        </div>
      )}
      <p className="fine" style={{ marginTop: 20 }}>Enquiries are sent by email to Siddhrans and are not stored on this website.</p>
    </form>
  );
}
