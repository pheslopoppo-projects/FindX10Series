import React from 'react';
import { Camera, Zap, Smartphone, ChevronRight, Lock, CheckCircle2, User, Building, Shield, Award, Sparkles, LogOut } from 'lucide-react';
import { getTrainingProgress } from '../utils/storage';
import { moduleContent } from '../data/moduleContent';

export default function Dashboard({ userProfile, onSelectModule, onLogout }) {
  const progress = getTrainingProgress();

  const getModuleIcon = (iconName, modIndex) => {
    if (modIndex === 0) return <Camera className="w-5 h-5 text-warm-orange" />;
    if (modIndex === 1) return <Zap className="w-5 h-5 text-warm-orange" />;
    return <Smartphone className="w-5 h-5 text-titanium-dark/70" />;
  };

  const modules = moduleContent;

  return (
    <div className="min-h-screen w-full bg-moon-white text-titanium-dark p-4 sm:p-6 max-w-lg mx-auto flex flex-col justify-between select-none">
      {/* Top App Header & Profile Card */}
      <div>
        <header className="flex items-center justify-between pt-3 pb-5 border-b border-light-titanium">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-warm-orange flex items-center justify-center font-bold text-white shadow-md shadow-warm-orange/20">
              {userProfile?.fullName ? userProfile.fullName.charAt(0).toUpperCase() : 'X'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-titanium-dark leading-tight">
                  {userProfile?.fullName || 'Trainee'}
                </h2>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-titanium-dark/70 flex items-center gap-1 mt-0.5">
                <Building className="w-3 h-3 text-warm-orange" />
                <span className="truncate max-w-[160px]">{userProfile?.storeName || 'Store'}</span>
                <span className="text-light-titanium">•</span>
                <span className="text-warm-orange font-semibold">ASM: {userProfile?.asmName || 'N/A'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Switch User / Logout"
            className="p-2 rounded-xl bg-white border border-light-titanium hover:bg-light-titanium/40 text-titanium-dark/70 hover:text-titanium-dark transition-colors shadow-sm"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </header>

        {/* Hero Accreditation Progress */}
        <section className="mt-5 p-4 rounded-2xl bg-white border border-light-titanium relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-warm-orange/10 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-warm-orange uppercase tracking-wider mb-1">
                <Award className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Certification Roadmap</span>
              </div>
              <h3 className="text-lg font-extrabold text-titanium-dark">Find X10 Series</h3>
              <p className="text-xs text-titanium-dark/70 mt-0.5 leading-tight">
                Complete all unlocked modules to earn your Pro Badge.
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-2xl font-black text-warm-orange">
                {((progress['module-1']?.completed || localStorage.getItem('module1_complete') === 'true' || localStorage.getItem('module-1_complete') === 'true' ? 1 : 0) +
                  (progress['module-2']?.completed || localStorage.getItem('module2_complete') === 'true' || localStorage.getItem('module-2_complete') === 'true' ? 1 : 0))}/2
              </span>
              <p className="text-[10px] uppercase tracking-wider text-titanium-dark/60 font-semibold whitespace-nowrap">Modules Passed</p>
            </div>
          </div>
        </section>

        {/* Modules List */}
        <section className="mt-6 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-titanium-dark/60">
              Training Modules
            </h4>
            <span className="text-xs text-warm-orange font-semibold">Swipe-Up Learning</span>
          </div>

          {modules.map((mod, index) => {
            const modProgress = progress[mod.id];
            const cleanModId = mod.id.replace('-', '');
            const isCompleted = modProgress?.completed || 
              localStorage.getItem(`${cleanModId}_complete`) === 'true' || 
              localStorage.getItem(`${mod.id}_complete`) === 'true';

            if (mod.locked) {
              // Module 3: Locked / Coming Soon Card with translucent bg-light-titanium/50 overlay with text-titanium-dark
              return (
                <div
                  key={mod.id}
                  className="relative rounded-2xl bg-white border border-light-titanium p-4.5 cursor-not-allowed overflow-hidden select-none shadow-sm"
                >
                  {/* Translucent bg-light-titanium/50 overlay */}
                  <div className="absolute inset-0 bg-light-titanium/50 z-10 pointer-events-none" />

                  <div className="flex items-center gap-3.5 relative z-20">
                    <div className="w-12 h-12 rounded-xl bg-moon-white flex items-center justify-center flex-shrink-0 border border-light-titanium ml-4">
                      {getModuleIcon(mod.icon, index)}
                    </div>
                    <div className="text-center flex flex-col items-center justify-center flex-1 min-w-0">
                      <div className="text-xs font-semibold text-titanium-dark/60 uppercase tracking-wider text-center">
                        Module 03
                      </div>
                      <h3 className="text-base font-bold text-titanium-dark mt-0.5 text-center">{mod.title}</h3>
                      <p className="text-xs text-titanium-dark/70 mt-1 leading-relaxed text-center">
                        {mod.subtitle}
                      </p>
                      <div className="mt-2.5 inline-flex items-center justify-center gap-1 text-[11px] text-titanium-dark/60 text-center">
                        <span>{mod.lessons}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-light-titanium text-titanium-dark text-xs font-bold uppercase tracking-wider shadow-sm flex-shrink-0 mr-4">
                      <Lock className="w-3 h-3 text-titanium-dark/70" />
                      <span>Soon</span>
                    </div>
                  </div>
                </div>
              );
            }

            // Unlocked Modules (Module 1 & 2): white background, border-light-titanium, rounded-2xl
            return (
              <div
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className="group relative rounded-2xl bg-white hover:border-warm-orange border border-light-titanium p-4.5 cursor-pointer transition-all duration-200 active:scale-[0.99] shadow-sm hover:shadow-md overflow-hidden"
              >
                <div className="flex items-center gap-3.5">
                  {/* Left Icon with ml-4 */}
                  <div className="w-12 h-12 rounded-xl bg-moon-white group-hover:bg-warm-orange/10 flex items-center justify-center flex-shrink-0 border border-light-titanium group-hover:border-warm-orange/50 transition-colors ml-4">
                    {getModuleIcon(mod.icon, index)}
                  </div>

                  {/* Centered Text Content */}
                  <div className="text-center flex flex-col items-center justify-center flex-1 min-w-0">
                    <div className="text-xs font-semibold text-warm-orange uppercase tracking-wider flex items-center justify-center gap-2 text-center">
                      <span>Module 0{index + 1}</span>
                      {isCompleted && (
                        <span className="text-[10px] bg-warm-orange/15 text-warm-orange px-1.5 py-0.5 rounded font-semibold">
                          Reviewable
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-titanium-dark group-hover:text-warm-orange mt-0.5 transition-colors text-center">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-titanium-dark/70 mt-1 leading-relaxed text-center">
                      {mod.subtitle}
                    </p>
                    <div className="mt-2.5 flex items-center justify-center text-[11px] text-titanium-dark/60 text-center">
                      <span className="text-warm-orange font-semibold">{mod.lessons}</span>
                    </div>
                  </div>

                  {/* Right Action / Button (Vertically Centered via parent items-center) */}
                  {isCompleted ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-semibold shadow-sm flex-shrink-0 mr-4">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>&gt;</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-moon-white border border-light-titanium text-warm-orange text-sm font-bold shadow-sm flex-shrink-0 mr-4 group-hover:bg-warm-orange group-hover:text-white group-hover:border-warm-orange transition-all">
                      <span>&gt;</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* X10 Series Comparisons & One Pagers Download Button */}
        <a
          href="/assets/docs/X10-Comparisons.pdf"
          download
          className="block w-full text-center bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-lg mt-8 mb-4 active:scale-95 transition-transform"
        >
          X10 Series Comparisons and One Pagers
        </a>
      </div>

      {/* Footer Navigation / Instructions */}
      <footer className="mt-8 text-center text-xs text-titanium-dark/60 py-3 border-t border-light-titanium">
        <p>Tap any unlocked module above to launch interactive vertical swipe training.</p>
      </footer>
    </div>
  );
}
