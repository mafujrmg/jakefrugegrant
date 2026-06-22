import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const errs = validate(form);
    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      const bodyData = new URLSearchParams();
      form.forEach((value, key) => {
        bodyData.append(key, value.toString());
      });
      if (!bodyData.has('form-name')) {
        bodyData.append('form-name', 'apply');
      }

      fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyData.toString(),
      })
        .then((res) => {
          if (res.ok) {
            setSubmitted(true);
          } else {
            console.error('Form submission failed');
          }
        })
        .catch((err) => {
          console.error('Form submission error:', err);
        });
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-surface text-white text-sm md:text-base transition-all duration-200 placeholder:text-text-muted/50 ${errors[field] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`;

  if (submitted) {
    return (
      <>
        <SEO
          title={`Application Submitted | ${SUBJECT_NAME} Grant`}
          description={`Your application for the ${SUBJECT_NAME} Grant has been submitted successfully.`}
          canonical="/apply"
        />
        <section className="min-h-screen flex items-center justify-center bg-base py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_40%)] opacity-10 pointer-events-none" />
          <div className="max-w-lg mx-auto px-4 text-center relative z-10">
            <div className="w-24 h-24 mx-auto mb-8 bg-primary/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-primary/30">
              <svg className="text-primary-light" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tight">Application Received</h1>
            <p className="text-text-muted text-lg leading-relaxed mb-10 font-light">
              Thank you for applying for the {SUBJECT_NAME} Grant. Your application has been submitted successfully. The {SUBJECT_NAME} Grant recipient will be announced on August 30, 2026. We wish you the best.
            </p>
            <Link to="/" className="inline-block bg-primary text-white px-10 py-4 font-accent uppercase tracking-widest text-sm hover:bg-primary-light transition-all rounded-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
              Return Home
            </Link>
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
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-30" style={{ backgroundImage: `url(${IMAGES.applicationDesk})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base/90 to-base" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4">Official Application</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-text-main mb-8 leading-tight tracking-tight">
              Apply Now
            </h1>
            <p className="text-text-muted text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              Submit your application for the 2026 cycle. Deadline: <strong className="text-text-main font-medium">{GRANT_DEADLINE}</strong>.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 md:py-36 bg-base relative z-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <form
            name="apply"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate
            className="glass-card p-8 md:p-14 rounded-3xl shadow-2xl border border-white/10"
          >
            <input type="hidden" name="form-name" value="apply" />
            <p style={{ display: 'none' }}>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Name */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">First Name</label>
                <input name="firstName" type="text" className={inputClass('firstName')} placeholder="First name" />
                {errors.firstName && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.firstName}</p>}
              </div>
              {/* Last Name */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Last Name</label>
                <input name="lastName" type="text" className={inputClass('lastName')} placeholder="Last name" />
                {errors.lastName && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.lastName}</p>}
              </div>
              {/* Email */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Email Address</label>
                <input name="email" type="email" className={inputClass('email')} placeholder="you@email.com" />
                {errors.email && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.email}</p>}
              </div>
              {/* Phone */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Phone Number</label>
                <input name="phone" type="tel" className={inputClass('phone')} placeholder="(555) 123-4567" />
                {errors.phone && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.phone}</p>}
              </div>
              {/* Date of Birth */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Date of Birth</label>
                <input name="dob" type="date" className={inputClass('dob')} />
                {errors.dob && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.dob}</p>}
              </div>
              {/* Street Address */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Street Address</label>
                <input name="street" type="text" className={inputClass('street')} placeholder="123 Main St" />
                {errors.street && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.street}</p>}
              </div>
              {/* City */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">City</label>
                <input name="city" type="text" className={inputClass('city')} placeholder="City" />
                {errors.city && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.city}</p>}
              </div>
              {/* State */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">State</label>
                <select name="state" className={inputClass('state')}>
                  <option value="">Select state</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.state}</p>}
              </div>
              {/* ZIP */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">ZIP Code</label>
                <input name="zip" type="text" className={inputClass('zip')} placeholder="70501" />
                {errors.zip && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.zip}</p>}
              </div>
              {/* University */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">University / College Name</label>
                <input name="university" type="text" className={inputClass('university')} placeholder="University name" />
                {errors.university && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.university}</p>}
              </div>
              {/* Program Level */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Program Level</label>
                <select name="programLevel" className={inputClass('programLevel')}>
                  <option value="">Select level</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Doctoral">Doctoral</option>
                </select>
                {errors.programLevel && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.programLevel}</p>}
              </div>
              {/* Major */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Field of Study / Major</label>
                <input name="major" type="text" className={inputClass('major')} placeholder="e.g., Business Administration" />
                {errors.major && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.major}</p>}
              </div>
              {/* Expected Graduation */}
              <div className="md:col-span-2">
                <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Expected Graduation Date</label>
                <input name="gradDate" type="date" className={inputClass('gradDate')} />
                {errors.gradDate && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.gradDate}</p>}
              </div>
            </div>

            {/* Brief Statement */}
            <div className="mt-10">
              <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3 flex items-center gap-2">
                Brief Statement <span className="text-text-muted font-normal lowercase">(Why do you deserve the {SUBJECT_NAME} Grant?)</span>
              </label>
              <textarea
                name="statement"
                rows={6}
                maxLength={500}
                className={inputClass('statement')}
                placeholder="Tell us why you deserve this grant..."
              />
              <div className="flex justify-between mt-3">
                {errors.statement ? (
                  <p className="text-red-500 text-xs font-semibold">{errors.statement}</p>
                ) : (
                  <span />
                )}
                <span className="text-[10px] text-text-muted font-accent uppercase tracking-widest">Max 500 characters</span>
              </div>
            </div>

            <div className="mt-12 text-center border-t border-white/5 pt-10">
              <button
                type="submit"
                className="w-full md:w-auto bg-primary hover:bg-primary-light text-white font-accent uppercase tracking-widest px-16 py-4 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg hover:shadow-primary/30"
              >
                Submit Application
              </button>
              <p className="text-text-muted/50 text-[10px] font-accent uppercase tracking-widest mt-6">
                By submitting, you confirm that all information provided is accurate and you agree to our terms.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
