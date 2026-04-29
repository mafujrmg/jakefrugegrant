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
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border-2 ${errors[field] ? 'border-red-500' : 'border-navy/10'} rounded-md focus:outline-none focus:border-gold bg-white text-navy text-sm md:text-base transition-all duration-200`;

  if (submitted) {
    return (
      <>
        <SEO
          title={`Application Submitted | ${SUBJECT_NAME} Grant`}
          description={`Your application for the ${SUBJECT_NAME} Grant has been submitted successfully.`}
          canonical="/apply"
        />
        <section className="min-h-[70vh] flex items-center justify-center bg-cream py-20">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-gold/20 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(184,134,11,0.2)]">
              <svg className="text-gold" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-display text-4xl font-bold text-navy mb-6">Application Received</h1>
            <p className="text-navy/70 text-lg leading-relaxed mb-8">
              Thank you for applying for the {SUBJECT_NAME} Grant. Your application has been submitted successfully. The {SUBJECT_NAME} Grant recipient will be announced on August 30, 2026. We wish you the best.
            </p>
            <Link to="/" className="inline-block bg-navy text-white px-8 py-3 font-accent uppercase tracking-widest text-sm hover:bg-navy-light transition-colors">
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
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.applicationDesk})` }} />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.3em] text-gold text-sm mb-4">Official Application</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              The {SUBJECT_NAME} Grant Application
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Complete the form below to submit your application for the 2026 cycle. The deadline is {GRANT_DEADLINE}. All fields are required.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} noValidate className="bg-white p-8 md:p-12 rounded-xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Name */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">First Name</label>
                <input name="firstName" type="text" className={inputClass('firstName')} placeholder="First name" />
                {errors.firstName && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.firstName}</p>}
              </div>
              {/* Last Name */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">Last Name</label>
                <input name="lastName" type="text" className={inputClass('lastName')} placeholder="Last name" />
                {errors.lastName && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.lastName}</p>}
              </div>
              {/* Email */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">Email Address</label>
                <input name="email" type="email" className={inputClass('email')} placeholder="you@email.com" />
                {errors.email && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.email}</p>}
              </div>
              {/* Phone */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">Phone Number</label>
                <input name="phone" type="tel" className={inputClass('phone')} placeholder="(555) 123-4567" />
                {errors.phone && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.phone}</p>}
              </div>
              {/* Date of Birth */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">Date of Birth</label>
                <input name="dob" type="date" className={inputClass('dob')} />
                {errors.dob && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.dob}</p>}
              </div>
              {/* Street Address */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">Street Address</label>
                <input name="street" type="text" className={inputClass('street')} placeholder="123 Main St" />
                {errors.street && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.street}</p>}
              </div>
              {/* City */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">City</label>
                <input name="city" type="text" className={inputClass('city')} placeholder="City" />
                {errors.city && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.city}</p>}
              </div>
              {/* State */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">State</label>
                <select name="state" className={inputClass('state')}>
                  <option value="">Select state</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.state}</p>}
              </div>
              {/* ZIP */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">ZIP Code</label>
                <input name="zip" type="text" className={inputClass('zip')} placeholder="70501" />
                {errors.zip && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.zip}</p>}
              </div>
              {/* University */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">University / College Name</label>
                <input name="university" type="text" className={inputClass('university')} placeholder="University name" />
                {errors.university && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.university}</p>}
              </div>
              {/* Program Level */}
              <div>
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">Program Level</label>
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
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">Field of Study / Major</label>
                <input name="major" type="text" className={inputClass('major')} placeholder="e.g., Business Administration" />
                {errors.major && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.major}</p>}
              </div>
              {/* Expected Graduation */}
              <div className="md:col-span-2">
                <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">Expected Graduation Date</label>
                <input name="gradDate" type="date" className={inputClass('gradDate')} />
                {errors.gradDate && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.gradDate}</p>}
              </div>
            </div>

            {/* Brief Statement */}
            <div className="mt-8">
              <label className="block font-accent uppercase tracking-widest text-[10px] md:text-xs font-bold text-navy mb-2">
                Brief Statement — Why do you deserve the {SUBJECT_NAME} Grant? (500 characters max)
              </label>
              <textarea
                name="statement"
                rows={6}
                maxLength={500}
                className={inputClass('statement')}
                placeholder="Tell us why you deserve this grant..."
              />
              <div className="flex justify-between mt-2">
                {errors.statement ? (
                  <p className="text-red-500 text-xs font-semibold">{errors.statement}</p>
                ) : (
                  <span />
                )}
                <span className="text-[10px] text-navy/40 font-accent uppercase tracking-widest">Max 500 characters</span>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                type="submit"
                className="w-full md:w-auto bg-gold hover:bg-gold-light text-navy font-accent uppercase tracking-[0.2em] px-16 py-4 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Submit Application
              </button>
              <p className="text-navy/40 text-[10px] font-accent uppercase tracking-[0.1em] mt-4">
                By submitting, you confirm that all information provided is accurate and you agree to our terms.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
