import { useState, type FormEvent } from 'react';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import { SUBJECT_NAME, GRANT_AMOUNT, GRANT_DEADLINE, IMAGES } from '@/lib/siteConfig';

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
  'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
  'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
  'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData) => {
    const errs: Record<string, string> = {};
    const required = ['firstName','lastName','email','phone','dob','street','city','state','zip','university','programLevel','major','gradDate','statement'];
    required.forEach((f) => {
      if (!form.get(f)?.toString().trim()) errs[f] = 'This field is required';
    });
    const email = form.get('email')?.toString() || '';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    const statement = form.get('statement')?.toString() || '';
    if (statement.length > 500) errs.statement = 'Maximum 500 characters';
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      try {
        await fetch('/__forms.html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(form as any).toString(),
        });
        setSubmitted(true);
      } catch (error) {
        console.error('Form submission failed:', error);
      }
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 border ${errors[field] ? 'border-red-500' : 'border-navy/20'} rounded focus:outline-none focus:border-gold bg-white text-navy text-sm transition-colors duration-200`;

  if (submitted) {
    return (
      <>
        <SEO
          title={`Application Submitted | ${SUBJECT_NAME} Grant`}
          description={`Your application for the ${SUBJECT_NAME} Grant has been submitted successfully.`}
          canonical="/apply"
        />
        <section className="min-h-[70vh] flex items-center justify-center bg-cream">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gold/20 rounded-full flex items-center justify-center">
              <svg className="text-gold" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-bold text-navy mb-4">Application Received</h1>
            <p className="text-navy/70 leading-relaxed">
              Thank you for applying for the {SUBJECT_NAME} Grant. Your application has been submitted successfully. The {SUBJECT_NAME} Grant recipient will be announced on August 30, 2026. We wish you the best.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Apply for the ${SUBJECT_NAME} Grant | ${GRANT_AMOUNT} for College Students`}
        description={`Apply for the ${SUBJECT_NAME} Grant — a ${GRANT_AMOUNT} annual grant for US college students. No GPA or essay required. Founded by ${SUBJECT_NAME}, CEO of JFJ Holdings. Deadline: ${GRANT_DEADLINE}.`}
        canonical="/apply"
        ogImage={IMAGES.applicationDesk}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.applicationDesk})` }} />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Application</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Apply for the {SUBJECT_NAME} Grant
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Complete the form below to submit your application. The deadline is {GRANT_DEADLINE}. All fields are required.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form name="application" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="form-name" value="application" />
            <p style={{ display: 'none' }}>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">First Name</label>
                <input name="firstName" type="text" className={inputClass('firstName')} placeholder="First name" />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              {/* Last Name */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Last Name</label>
                <input name="lastName" type="text" className={inputClass('lastName')} placeholder="Last name" />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              {/* Email */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Email</label>
                <input name="email" type="email" className={inputClass('email')} placeholder="you@email.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              {/* Phone */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Phone</label>
                <input name="phone" type="tel" className={inputClass('phone')} placeholder="(555) 123-4567" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              {/* Date of Birth */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Date of Birth</label>
                <input name="dob" type="date" className={inputClass('dob')} />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>
              {/* Street Address */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Street Address</label>
                <input name="street" type="text" className={inputClass('street')} placeholder="123 Main St" />
                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
              </div>
              {/* City */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">City</label>
                <input name="city" type="text" className={inputClass('city')} placeholder="City" />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              {/* State */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">State</label>
                <select name="state" className={inputClass('state')}>
                  <option value="">Select state</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
              {/* ZIP */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">ZIP Code</label>
                <input name="zip" type="text" className={inputClass('zip')} placeholder="70501" />
                {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
              </div>
              {/* University */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">University / College Name</label>
                <input name="university" type="text" className={inputClass('university')} placeholder="University name" />
                {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
              </div>
              {/* Program Level */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Program Level</label>
                <select name="programLevel" className={inputClass('programLevel')}>
                  <option value="">Select level</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Doctoral">Doctoral</option>
                </select>
                {errors.programLevel && <p className="text-red-500 text-xs mt-1">{errors.programLevel}</p>}
              </div>
              {/* Major */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Field of Study / Major</label>
                <input name="major" type="text" className={inputClass('major')} placeholder="e.g., Business Administration" />
                {errors.major && <p className="text-red-500 text-xs mt-1">{errors.major}</p>}
              </div>
              {/* Expected Graduation */}
              <div>
                <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Expected Graduation Date</label>
                <input name="gradDate" type="date" className={inputClass('gradDate')} />
                {errors.gradDate && <p className="text-red-500 text-xs mt-1">{errors.gradDate}</p>}
              </div>
            </div>

            {/* Brief Statement */}
            <div className="mt-6">
              <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">
                Brief Statement — Why do you deserve the {SUBJECT_NAME} Grant? (500 characters max)
              </label>
              <textarea
                name="statement"
                rows={4}
                maxLength={500}
                className={inputClass('statement')}
                placeholder="Tell us why you deserve this grant..."
              />
              {errors.statement && <p className="text-red-500 text-xs mt-1">{errors.statement}</p>}
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="btn-primary w-full max-w-xs mx-auto"
              >
                Submit Application
              </button>
              <p className="text-navy/50 text-xs mt-3">
                By submitting, you confirm that all information provided is accurate.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
