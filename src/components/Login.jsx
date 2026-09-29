import React, { useState, useEffect } from 'react';
import { Smartphone, Sparkles, Building, User, ChevronDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { saveUserProfile } from '../utils/storage';

const ASM_LIST = ['David', 'Zach', 'Matt P', 'Matt W', 'Phil'];
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyh9iWT5q6qWBk3NEG7SznHaqmo8mLFkJVo5XAwugc_qp6D1u6VIDhTSLxwCnIe_HWZOQ/exec';

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    storeName: '',
    asmName: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger smooth zoom-out animation when the component loads
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please enter your First Name';
    }

    if (!formData.surname.trim()) {
      newErrors.surname = 'Please enter your Surname';
    }

    if (!formData.storeName.trim()) {
      newErrors.storeName = 'Please enter your Store or Contact Centre';
    }

    if (!formData.asmName) {
      newErrors.asmName = 'Please select your Area Sales Manager';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    const firstName = formData.firstName.trim();
    const surname = formData.surname.trim();
    const storeName = formData.storeName.trim();
    const asmName = formData.asmName;
    const fullName = `${firstName} ${surname}`.trim();

    // 1. Save to localStorage
    const saved = saveUserProfile({
      firstName,
      surname,
      fullName,
      storeName,
      asmName
    });

    // 2. Construct JSON payload with distinct FirstName and Surname variables
    const payload = {
      FirstName: firstName,
      Surname: surname,
      firstName,
      surname,
      fullName,
      name: fullName,
      store: storeName,
      storeName,
      asm: asmName,
      asmName,
      type: 'registration'
    };

    console.log('Dispatching data capture payload to backend endpoint:', payload);

    try {
      // 3. Dispatch POST request to Google Apps Script / backend endpoint
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      console.log('Data capture submitted successfully.');
    } catch (error) {
      console.warn('Backend sync failed, saved profile locally:', error);
    } finally {
      setIsSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess(saved);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative select-none overflow-x-hidden">
      {/* Full-Screen Glassmorphism Background Image with Smooth Zoom-Out Animation */}
      <img
        src="/assets/images/X10TOGETHER.jpg"
        alt="OPPO Find X10 Series"
        className={`fixed inset-0 w-full h-full object-cover -z-10 animate-zoom-out transition-transform duration-[2500ms] ease-out origin-center ${
          isLoaded ? 'scale-100' : 'scale-110'
        }`}
      />

      {/* Centered Floating Glassmorphism Container */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-8 flex flex-col space-y-5 my-auto">
        {/* Top Brand Header */}
        <header className="text-center">
          <img
            src="/assets/images/OPPOLOGO.png"
            alt="OPPO Logo"
            className="mx-auto h-12 w-auto mb-4 object-contain"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-titanium-dark mb-2">
            OPPO Find <span className="text-warm-orange">X10</span> Series Academy
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-warm-orange" />
            <span className="text-[11px] uppercase tracking-widest text-warm-orange font-bold">Flagship Certification</span>
          </div>
          <p className="text-xs sm:text-sm text-titanium-dark/80 max-w-xs mx-auto leading-relaxed">
            Mobile retail excellence &amp; interactive product accreditation.
          </p>
        </header>

        {/* Featured Product Image */}
        <img
          src="/assets/images/X10TOGETHER.jpg"
          alt="OPPO Find X10 Series"
          className="w-full h-auto max-h-64 object-cover rounded-2xl shadow-lg mb-6"
        />

        {/* Data Capture Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields - Stacked for Mobile */}
          <div className="flex flex-col gap-4">
            {/* First Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-titanium-dark/80 mb-1.5">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-titanium-dark/50">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. Alex"
                  className={`w-full bg-white/70 backdrop-blur-sm border ${
                    errors.firstName ? 'border-red-500/80 focus:border-red-500' : 'border-white/50 focus:border-warm-orange'
                  } rounded-xl pl-10 pr-4 py-3 text-sm text-titanium-dark placeholder-titanium-dark/50 focus:outline-none focus:ring-1 focus:ring-warm-orange focus:bg-white/90 transition-all`}
                />
              </div>
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1.5 pl-1 font-medium">{errors.firstName}</p>
              )}
            </div>

            {/* Surname */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-titanium-dark/80 mb-1.5">
                Surname
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-titanium-dark/50">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="e.g. Morgan"
                  className={`w-full bg-white/70 backdrop-blur-sm border ${
                    errors.surname ? 'border-red-500/80 focus:border-red-500' : 'border-white/50 focus:border-warm-orange'
                  } rounded-xl pl-10 pr-4 py-3 text-sm text-titanium-dark placeholder-titanium-dark/50 focus:outline-none focus:ring-1 focus:ring-warm-orange focus:bg-white/90 transition-all`}
                />
              </div>
              {errors.surname && (
                <p className="text-xs text-red-500 mt-1.5 pl-1 font-medium">{errors.surname}</p>
              )}
            </div>
          </div>

          {/* Store / Contact Centre */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-titanium-dark/80 mb-1.5">
              Store / Contact Centre Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-titanium-dark/50">
                <Building className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="e.g. Oxford Street Flagship / Leeds CC"
                className={`w-full bg-white/70 backdrop-blur-sm border ${
                  errors.storeName ? 'border-red-500/80 focus:border-red-500' : 'border-white/50 focus:border-warm-orange'
                } rounded-xl pl-10 pr-4 py-3 text-sm text-titanium-dark placeholder-titanium-dark/50 focus:outline-none focus:ring-1 focus:ring-warm-orange focus:bg-white/90 transition-all`}
              />
            </div>
            {errors.storeName && (
              <p className="text-xs text-red-500 mt-1.5 pl-1 font-medium">{errors.storeName}</p>
            )}
          </div>

          {/* ASM Name Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-titanium-dark/80 mb-1.5">
              Area Sales Manager (ASM)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-titanium-dark/50">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <select
                name="asmName"
                value={formData.asmName}
                onChange={handleChange}
                className={`w-full bg-white/70 backdrop-blur-sm border appearance-none ${
                  errors.asmName ? 'border-red-500/80 focus:border-red-500' : 'border-white/50 focus:border-warm-orange'
                } rounded-xl pl-10 pr-10 py-3 text-sm text-titanium-dark focus:outline-none focus:ring-1 focus:ring-warm-orange focus:bg-white/90 transition-all cursor-pointer`}
              >
                <option value="" disabled className="text-titanium-dark/40">
                  Select your ASM...
                </option>
                {ASM_LIST.map((asm) => (
                  <option key={asm} value={asm} className="bg-white text-titanium-dark">
                    {asm}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-titanium-dark/50">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            {errors.asmName && (
              <p className="text-xs text-red-500 mt-1.5 pl-1 font-medium">{errors.asmName}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-warm-orange hover:bg-opacity-90 active:scale-[0.98] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-warm-orange/25 flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Enter Training Academy</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <footer className="pt-1 text-center text-xs text-titanium-dark/60">
          <p>OPPO Find X10 Series Training Portal</p>
          <p className="mt-0.5 text-[11px]">Authorized UK Retail &amp; Contact Centre Staff</p>
        </footer>
      </div>
    </div>
  );
}
