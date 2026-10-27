import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, CheckCircle, ArrowLeft, Award, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { getUserProfile } from '../utils/storage';

export default function Certificate({
  userProfile: propUserProfile,
  onClose,
  score,
  totalQuestions,
  moduleTitle = 'OPPO Find X10 Series Academy'
}) {
  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf'); // 'pdf' | 'png'

  // Retrieve user profile data with fallback
  const sessionProfile = propUserProfile || getUserProfile() || {};
  const firstName = sessionProfile.firstName || (sessionProfile.fullName ? sessionProfile.fullName.split(' ')[0] : 'Alex');
  const surname = sessionProfile.surname || (sessionProfile.fullName ? sessionProfile.fullName.split(' ').slice(1).join(' ') : 'Morgan');
  const userName = sessionProfile.fullName || `${firstName} ${surname}`.trim() || 'Alex Morgan';
  const storeName = sessionProfile.storeName || sessionProfile.store || 'Retail Flagship Partner';

  // Formatted completion date
  const completionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const certificateId = `OPPO-X10-${Math.floor(100000 + Math.random() * 900000)}`;

  /**
   * Generates high-quality landscape PDF or PNG using html2canvas & jsPDF
   */
  const handleDownload = async (format = downloadFormat) => {
    if (!certificateRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      // 1. Render certificate element to high-res canvas
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5, // 2.5x retina scaling for crisp print-grade typography
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
        logging: false,
      });

      if (format === 'png') {
        // Direct PNG download
        const imageUri = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = 'OPPO_Find_X10_Academy_Certificate.png';
        link.href = imageUri;
        link.click();
      } else {
        // Landscape A4 PDF export
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4', // 297mm x 210mm
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Fit with 10mm margins
        const margin = 10;
        const availWidth = pdfWidth - margin * 2;
        const availHeight = pdfHeight - margin * 2;

        const imgRatio = canvas.width / canvas.height;
        let renderWidth = availWidth;
        let renderHeight = renderWidth / imgRatio;

        if (renderHeight > availHeight) {
          renderHeight = availHeight;
          renderWidth = renderHeight * imgRatio;
        }

        const xPos = (pdfWidth - renderWidth) / 2;
        const yPos = (pdfHeight - renderHeight) / 2;

        pdf.addImage(imgData, 'PNG', xPos, yPos, renderWidth, renderHeight, undefined, 'FAST');
        pdf.save('OPPO_Find_X10_Academy_Certificate.pdf');
      }
    } catch (error) {
      console.error('Failed to export certificate:', error);
      // Fallback alert
      alert('Unable to generate PDF directly. Trying PNG image export...');
      try {
        const canvas = await html2canvas(certificateRef.current, { scale: 2 });
        const link = document.createElement('a');
        link.download = 'OPPO_Find_X10_Academy_Certificate.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error('PNG fallback also failed:', err);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col items-center justify-center p-1 sm:p-4 select-none box-border">
      {/* Top Congratulatory Header Bar */}
      <div className="w-full max-w-full sm:max-w-3xl text-center mb-2 sm:mb-4 px-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 shadow-sm">
          <Award className="w-3 h-3 text-amber-600" />
          <span>Official Accreditation</span>
        </div>
        <h1 className="text-sm sm:text-xl md:text-2xl font-black text-titanium-dark tracking-tight leading-snug px-1">
          Well done for completing the OPPO Find X10 Series Academy Training
        </h1>
        <p className="text-[11px] sm:text-sm text-titanium-dark/70 mt-0.5 sm:mt-1 max-w-xl mx-auto px-1">
          You have mastered all core product pillars and qualified as an accredited OPPO Find X10 Series Specialist.
        </p>
      </div>

      {/* Main Visual HTML Certificate Container */}
      <div className="w-full max-w-full sm:max-w-3xl min-w-0 overflow-hidden shadow-2xl rounded-2xl box-border">
        <div
          ref={certificateRef}
          className="relative w-full max-w-full min-w-0 box-border bg-[#FAF7F2] text-[#2D2A26] p-1.5 sm:p-7 md:p-8"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #FFFFFF 0%, #FAF6EE 70%, #F3ECE0 100%)',
          }}
        >
          {/* Metallic Gold Outer Frame Border */}
          <div
            className="p-[2.5px] sm:p-[4px] rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #C59B27 0%, #FDF5A6 20%, #B8860B 40%, #FFE57E 60%, #9A7B1C 80%, #DFBA5A 100%)',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1), 0 4px 15px rgba(184,134,11,0.25)',
            }}
          >
            {/* Inner Content Area with Gold Pinstripe & Corner Accents */}
            <div className="relative w-full max-w-full min-w-0 box-border bg-white/95 rounded-lg p-2.5 sm:p-8 border border-[#D4AF37]/50 flex flex-col justify-between items-center text-center overflow-hidden">
              
              {/* Corner Metallic Ornaments */}
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 text-[#C59B27]">
                <svg width="18" height="18" className="sm:w-7 sm:h-7" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M0,0 L20,0 C12,8 8,12 0,20 Z" />
                  <circle cx="6" cy="6" r="2.5" />
                  <line x1="2" y1="20" x2="20" y2="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-[#C59B27] rotate-90">
                <svg width="18" height="18" className="sm:w-7 sm:h-7" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M0,0 L20,0 C12,8 8,12 0,20 Z" />
                  <circle cx="6" cy="6" r="2.5" />
                  <line x1="2" y1="20" x2="20" y2="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 text-[#C59B27] -rotate-90">
                <svg width="18" height="18" className="sm:w-7 sm:h-7" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M0,0 L20,0 C12,8 8,12 0,20 Z" />
                  <circle cx="6" cy="6" r="2.5" />
                  <line x1="2" y1="20" x2="20" y2="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-[#C59B27] rotate-180">
                <svg width="18" height="18" className="sm:w-7 sm:h-7" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M0,0 L20,0 C12,8 8,12 0,20 Z" />
                  <circle cx="6" cy="6" r="2.5" />
                  <line x1="2" y1="20" x2="20" y2="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Watermark in background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <span className="text-[70px] sm:text-[120px] font-black tracking-widest text-[#2D2A26]">OPPO</span>
              </div>

              {/* Top Certificate Header */}
              <div className="relative z-10 w-full flex flex-col items-center">
                {/* Brand Logo & Academy Monogram */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-2">
                  <span className="text-sm sm:text-2xl font-black tracking-widest text-[#1C1B18] font-sans">
                    OPPO
                  </span>
                  <span className="h-3 sm:h-4 w-[1.5px] bg-[#C59B27]/60" />
                  <span className="text-[9px] sm:text-sm font-bold tracking-[0.18em] sm:tracking-[0.25em] text-[#9A7B1C] uppercase font-sans">
                    ACADEMY
                  </span>
                </div>

                {/* Certificate Main Title */}
                <h2
                  className="text-[11px] sm:text-2xl md:text-3xl font-black uppercase tracking-[0.06em] sm:tracking-[0.18em] my-0.5 sm:my-1"
                  style={{
                    background: 'linear-gradient(135deg, #7A560E 0%, #C59B27 50%, #7A560E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Certificate of Completion
                </h2>

                <div className="flex items-center justify-center gap-1.5 sm:gap-3 w-28 sm:w-64 my-0.5 sm:my-1">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />
                  <span className="text-[7px] sm:text-[10px] text-[#C59B27]">✦</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />
                </div>

                <p className="text-[7px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#8C6D23] mt-0.5">
                  This is proudly presented to
                </p>
              </div>

              {/* Recipient [User's Name] Field */}
              <div className="relative z-10 my-1 sm:my-4 w-full">
                <h3 className="text-base sm:text-3xl md:text-4xl font-black text-[#1C1B18] tracking-tight font-serif pb-0.5 sm:pb-1 px-1 truncate">
                  {userName}
                </h3>
                <div className="w-24 sm:w-60 h-[1.5px] sm:h-[2px] mx-auto bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />
                <p className="text-[9px] sm:text-xs text-[#6B655B] font-medium mt-0.5 sm:mt-1 truncate">
                  {storeName}
                </p>
              </div>

              {/* Accreditation Statement */}
              <div className="relative z-10 max-w-lg mx-auto mb-1.5 sm:mb-3">
                <p className="text-[8px] sm:text-xs text-[#4A453E] leading-tight sm:leading-relaxed font-sans px-1">
                  For successfully completing the comprehensive <strong className="text-[#1C1B18]">OPPO Find X10 Series</strong> curriculum, mastering the Triple 200MP Hasselblad Camera, Silicon-Carbon 7150mAh battery technology, and next-generation Dimensity performance architecture.
                </p>
              </div>

              {/* Bottom Details Footer: Perfectly Centered Golden Award Seal & Date Information */}
              <div className="relative z-10 w-full flex flex-col items-center justify-center pt-2 sm:pt-4 border-t border-[#D4AF37]/30 px-2 sm:px-4">
                
                {/* Center: Award-Style Golden Seal Badge Graphic */}
                <div className="flex flex-col items-center justify-center -mb-0.5 sm:-mb-1 flex-shrink-0">
                  <div className="relative flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20">
                    <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md overflow-visible">
                      <defs>
                        <linearGradient id="goldGradCert" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#DFBA5A" />
                          <stop offset="25%" stopColor="#FFF2A3" />
                          <stop offset="50%" stopColor="#C59324" />
                          <stop offset="75%" stopColor="#FFE57E" />
                          <stop offset="100%" stopColor="#8C6514" />
                        </linearGradient>
                        <linearGradient id="goldDarkCert" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#9C721D" />
                          <stop offset="50%" stopColor="#DFBA5A" />
                          <stop offset="100%" stopColor="#75500A" />
                        </linearGradient>
                        <linearGradient id="ribbonLeftCert" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#C59324" />
                          <stop offset="100%" stopColor="#855B0A" />
                        </linearGradient>
                        <linearGradient id="ribbonRightCert" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#DFBA5A" />
                          <stop offset="100%" stopColor="#9C721D" />
                        </linearGradient>
                      </defs>

                      {/* Ribbons */}
                      <polygon points="45,85 30,135 48,125 55,135 55,85" fill="url(#ribbonLeftCert)" />
                      <polygon points="65,85 65,135 72,125 90,135 75,85" fill="url(#ribbonRightCert)" />

                      {/* Rosette Serrated Circle */}
                      <g transform="translate(60,60)">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <rect
                            key={i}
                            x="-4"
                            y="-50"
                            width="8"
                            height="12"
                            rx="2"
                            fill="url(#goldGradCert)"
                            transform={`rotate(${i * 15})`}
                          />
                        ))}
                        <circle r="44" fill="url(#goldGradCert)" stroke="#7A560E" strokeWidth="1" />
                        <circle r="38" fill="#FFFDF8" stroke="url(#goldDarkCert)" strokeWidth="1.5" strokeDasharray="3,2" />
                        <circle r="34" fill="url(#goldGradCert)" />
                        
                        {/* Center Medallion */}
                        <g fill="#7A560E">
                          <polygon points="0,-16 2.5,-10 8,-10 4,-6 5.5,0 0,-3 -5.5,0 -4,-6 -8,-10 -2.5,-10" />
                        </g>
                        <text
                          x="0"
                          y="-2"
                          textAnchor="middle"
                          fill="#523906"
                          fontSize="6.5"
                          fontWeight="900"
                          letterSpacing="0.8"
                          fontFamily="sans-serif"
                        >
                          OPPO
                        </text>
                        <text
                          x="0"
                          y="6"
                          textAnchor="middle"
                          fill="#523906"
                          fontSize="5"
                          fontWeight="800"
                          letterSpacing="0.6"
                          fontFamily="sans-serif"
                        >
                          ACADEMY
                        </text>
                        <text
                          x="0"
                          y="14"
                          textAnchor="middle"
                          fill="#7A560E"
                          fontSize="4"
                          fontWeight="700"
                          letterSpacing="0.5"
                          fontFamily="sans-serif"
                        >
                          ★ CERTIFIED ★
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Centered Date of Issue & Official Verification ID */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-center mt-1 sm:mt-1.5 flex-wrap">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="text-[7px] sm:text-[10px] uppercase font-bold tracking-wider text-[#8C6D23]">
                      Date of Issue
                    </span>
                    <span className="text-[8px] sm:text-xs font-semibold text-[#1C1B18]">
                      {completionDate}
                    </span>
                  </div>
                  <span className="text-[#C59B27] text-[7px] sm:text-xs">✦</span>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="text-[7px] sm:text-[10px] uppercase font-bold tracking-wider text-[#8C6D23]">
                      Verification ID
                    </span>
                    <span className="text-[7px] sm:text-[10px] text-[#8C6D23]/90 font-mono font-semibold">
                      {certificateId}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Action Controls & Format Selector */}
      <div className="w-full max-w-full sm:max-w-3xl min-w-0 mt-3 sm:mt-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 px-1 box-border">
        {/* Format Selector Pills */}
        <div className="flex items-center justify-center gap-1.5 bg-white border border-light-titanium p-1 rounded-full shadow-sm text-xs w-full sm:w-auto">
          <button
            onClick={() => setDownloadFormat('pdf')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-full font-semibold transition-all ${
              downloadFormat === 'pdf'
                ? 'bg-titanium-dark text-white shadow-sm'
                : 'text-titanium-dark/70 hover:text-titanium-dark'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF Landscape</span>
          </button>
          <button
            onClick={() => setDownloadFormat('png')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-full font-semibold transition-all ${
              downloadFormat === 'png'
                ? 'bg-titanium-dark text-white shadow-sm'
                : 'text-titanium-dark/70 hover:text-titanium-dark'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>PNG Image</span>
          </button>
        </div>

        {/* Buttons: Prominent Download Certificate + Return to Dashboard */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onClose && (
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white hover:bg-light-titanium/50 border border-light-titanium text-xs sm:text-sm font-bold text-titanium-dark flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-warm-orange flex-shrink-0" />
              <span className="whitespace-nowrap">Dashboard</span>
            </button>
          )}

          <button
            onClick={() => handleDownload(downloadFormat)}
            disabled={isDownloading}
            className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-warm-orange hover:bg-opacity-90 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-warm-orange/30 active:scale-95 transition-all disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white flex-shrink-0" />
                <span className="whitespace-nowrap">Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-white flex-shrink-0" />
                <span className="whitespace-nowrap">Download Certificate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
