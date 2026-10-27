import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowLeft, Loader2, Database } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getUserProfile, saveModuleProgress } from '../utils/storage';
import Certificate from './Certificate';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyh9iWT5q6qWBk3NEG7SznHaqmo8mLFkJVo5XAwugc_qp6D1u6VIDhTSLxwCnIe_HWZOQ/exec';

export default function ChatQuiz({ quiz = [], onComplete, onExit, moduleId = 'module-1', moduleTitle }) {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const chatMessagesRef = useRef(null);

  // Auto-scroll chat to the latest message without hijacking parent container scroll
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTo({
        top: chatMessagesRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnswered, submissionStatus]);

  // Load the first question into chat stream on mount or quiz reset
  useEffect(() => {
    if (!quiz || quiz.length === 0) return;

    setMessages([
      {
        id: `q-0-${Date.now()}`,
        sender: 'bot',
        type: 'question',
        text: quiz[0].question,
        questionIndex: 0
      }
    ]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
    setSubmissionStatus('idle');
  }, [quiz]);

  /**
   * Sends user results to Google Apps Script Web App (connected to Google Sheets)
   */
  const submitQuizResults = async (finalScore) => {
    setIsSubmitting(true);
    setSubmissionStatus('submitting');

    // 1. Retrieve user's profile data from localStorage
    const userProfile = getUserProfile() || {};
    const firstName = userProfile.firstName || (userProfile.fullName ? userProfile.fullName.split(' ')[0] : 'Anonymous');
    const surname = userProfile.surname || (userProfile.fullName ? userProfile.fullName.split(' ').slice(1).join(' ') : 'Trainee');
    const name = userProfile.fullName || `${firstName} ${surname}`.trim() || 'Anonymous Trainee';
    const store = userProfile.storeName || userProfile.store || 'Unknown Store';
    const asm = userProfile.asmName || userProfile.asm || 'Unassigned';

    // 2. Construct JSON payload with distinct FirstName and Surname variables
    const currentModuleTitle = moduleTitle || (moduleId === 'module-1' ? 'Find X10 Pro Max: Camera' : 'Find X10 Pro Max: Power & OS');
    const payload = {
      FirstName: firstName,
      Surname: surname,
      firstName,
      surname,
      name,
      fullName: name,
      store,
      asm,
      module: currentModuleTitle,
      score: finalScore
    };

    console.log('Dispatching payload to Google Apps Script:', payload);

    try {
      // 3. Send POST request with mode: "no-cors"
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('Google Sheets record submitted successfully.');
      setSubmissionStatus('success');

      // 4. Update localStorage to mark module completed
      const cleanModId = (moduleId || 'module-1').replace('-', '');
      localStorage.setItem(`${cleanModId}_complete`, 'true');
      localStorage.setItem(`${moduleId}_complete`, 'true');
      saveModuleProgress(moduleId, finalScore, quiz.length);

      // 5. Provide smooth feedback, then reroute back to Main Dashboard (only for Modules 1 & 2)
      const isModule3 = moduleId === 'module-3' || moduleId === 'module3';
      if (!isModule3) {
        setTimeout(() => {
          if (onComplete) {
            onComplete(finalScore, quiz.length);
          }
        }, 1500);
      }

    } catch (error) {
      console.error('Failed to submit to Google Sheets:', error);
      setSubmissionStatus('error');

      // Ensure local state is logged so trainee progress is never blocked
      const cleanModId = (moduleId || 'module-1').replace('-', '');
      localStorage.setItem(`${cleanModId}_complete`, 'true');
      localStorage.setItem(`${moduleId}_complete`, 'true');
      saveModuleProgress(moduleId, finalScore, quiz.length);

      const isModule3 = moduleId === 'module-3' || moduleId === 'module3';
      if (!isModule3) {
        setTimeout(() => {
          if (onComplete) {
            onComplete(finalScore, quiz.length);
          }
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionClick = (option) => {
    if (isAnswered || isFinished || !quiz[currentQuestionIndex]) return;

    const currentQ = quiz[currentQuestionIndex];
    const isCorrect = option === currentQ.answer;
    const newScore = isCorrect ? score + 1 : score;

    setIsAnswered(true);
    if (isCorrect) {
      setScore(newScore);
    }

    // 1. Render user selection as a right-aligned copper chat bubble
    const userMsg = {
      id: `ans-${Date.now()}`,
      sender: 'user',
      text: option
    };

    setMessages((prev) => [...prev, userMsg]);

    // 2. Bot evaluates and replies immediately
    setTimeout(() => {
      const feedbackMsg = {
        id: `feedback-${Date.now()}`,
        sender: 'bot',
        type: 'feedback',
        isCorrect,
        text: isCorrect
          ? 'Correct! 🎉'
          : `Incorrect ❌ The correct answer is: ${currentQ.answer}`,
        explanation: currentQ.explanation
      };

      setMessages((prev) => [...prev, feedbackMsg]);

      // 3. Move to next question or complete quiz
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < quiz.length) {
        setTimeout(() => {
          const nextQ = quiz[nextIndex];
          setMessages((prev) => [
            ...prev,
            {
              id: `q-${nextIndex}-${Date.now()}`,
              sender: 'bot',
              type: 'question',
              text: nextQ.question,
              questionIndex: nextIndex
            }
          ]);
          setCurrentQuestionIndex(nextIndex);
          setIsAnswered(false);
        }, 800);
      } else {
        // All questions answered
        setTimeout(() => {
          setIsFinished(true);
          const finalScore = isCorrect ? score + 1 : score;

          // Celebration confetti
          if (finalScore >= Math.ceil(quiz.length * 0.6)) {
            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
              });
            } catch (e) {
              // fallback
            }
          }

          // Trigger backend Google Sheets submission
          submitQuizResults(finalScore);
        }, 700);
      }
    }, 400);
  };

  const handleRestart = () => {
    if (!quiz || quiz.length === 0) return;
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setIsFinished(false);
    setSubmissionStatus('idle');
    setMessages([
      {
        id: `restart-${Date.now()}`,
        sender: 'bot',
        type: 'question',
        text: quiz[0].question,
        questionIndex: 0
      }
    ]);
  };

  const currentQ = quiz[currentQuestionIndex];
  const isModule3 = moduleId === 'module-3' || moduleId === 'module3';

  // When Module 3 quiz is completed, render the visual Certificate of Completion
  if (isFinished && isModule3) {
    return (
      <div className="h-full w-full flex flex-col bg-moon-white text-titanium-dark rounded-3xl overflow-y-auto border border-light-titanium shadow-2xl p-2 sm:p-4">
        {submissionStatus === 'submitting' && (
          <div className="mb-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-2 text-xs text-amber-700 flex-shrink-0">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Recording graduation to Google Sheets...</span>
          </div>
        )}
        <Certificate
          userProfile={getUserProfile()}
          score={score}
          totalQuestions={quiz.length}
          onClose={() => {
            if (onComplete) {
              onComplete(score, quiz.length);
            } else if (onExit) {
              onExit();
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col justify-between bg-moon-white text-titanium-dark rounded-t-3xl overflow-hidden border-t border-light-titanium select-none shadow-2xl">
      {/* Top Header Bar */}
      <div className="px-4 py-3 bg-white/90 backdrop-blur-md border-b border-light-titanium flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-warm-orange flex items-center justify-center text-white shadow-md">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-titanium-dark flex items-center gap-1.5">
              <span>Find X10 AI Coach</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h4>
            <p className="text-[10px] text-titanium-dark/60 font-medium">Module Mastery Assessment</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-warm-orange bg-white px-2.5 py-1 rounded-full border border-light-titanium shadow-sm">
            {isFinished ? 'Complete' : `Q ${currentQuestionIndex + 1} / ${quiz.length}`}
          </span>
          {onExit && (
            <button
              onClick={onExit}
              className="p-1.5 rounded-lg bg-white hover:bg-light-titanium/50 border border-light-titanium text-titanium-dark/70 hover:text-titanium-dark transition-colors shadow-sm"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            // User message bubble: bg-warm-orange text-white rounded-bl-none shadow-md
            return (
              <div key={msg.id} className="flex justify-end items-end gap-2">
                <div className="bg-warm-orange text-white rounded-bl-none shadow-md p-3.5 rounded-2xl text-sm max-w-[80%] font-medium leading-relaxed">
                  {msg.text}
                </div>
                <div className="w-6 h-6 rounded-full bg-light-titanium flex items-center justify-center flex-shrink-0 text-titanium-dark text-[10px]">
                  <User className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          }

          // Bot question or feedback bubble: bg-light-titanium text-titanium-dark rounded-br-none
          return (
            <div key={msg.id} className="flex justify-start items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white border border-light-titanium flex items-center justify-center flex-shrink-0 text-warm-orange shadow-sm">
                <Bot className="w-4 h-4" />
              </div>

              <div className="max-w-[85%] space-y-1">
                {msg.type === 'question' ? (
                  // Bot Question Bubble
                  <div className="bg-light-titanium text-titanium-dark rounded-br-none p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm">
                    <div className="text-[10px] font-bold text-warm-orange uppercase tracking-wider mb-1">
                      Question {(msg.questionIndex ?? 0) + 1} of {quiz.length}
                    </div>
                    <p className="font-semibold text-titanium-dark">{msg.text}</p>
                  </div>
                ) : (
                  // Bot Feedback Bubble
                  <div
                    className={`p-3.5 rounded-2xl rounded-br-none text-sm leading-relaxed border shadow-sm ${
                      msg.isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold">
                      {msg.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                      <span>{msg.text}</span>
                    </div>
                    {msg.explanation && (
                      <p className="mt-1.5 pt-1.5 border-t border-black/10 text-xs text-titanium-dark/80">
                        💡 {msg.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Area: Multiple-Choice Pill Buttons & Backend Sync Status */}
      <div className="p-3.5 bg-white/90 backdrop-blur-md border-t border-light-titanium flex-shrink-0">
        {isFinished ? (
          // Completion Score & Backend Submission Status
          <div className="text-center py-2 space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-light-titanium shadow-md shadow-warm-orange/10">
              <Trophy className="w-6 h-6 text-warm-orange" />
            </div>
            <div>
              <h3 className="text-base font-bold text-titanium-dark">Assessment Complete!</h3>
              <p className="text-xs text-titanium-dark/70 mt-0.5">
                Final Score: <span className="font-extrabold text-warm-orange text-sm">{score}</span> / {quiz.length} Correct
              </p>
            </div>

            {/* Google Sheets Sync Indicator */}
            <div className="p-2.5 rounded-xl bg-white border border-light-titanium flex items-center justify-center gap-2 text-xs shadow-sm">
              {submissionStatus === 'submitting' && (
                <>
                  <Loader2 className="w-4 h-4 text-warm-orange animate-spin" />
                  <span className="text-warm-orange font-medium">Recording certification to Google Sheets...</span>
                </>
              )}
              {submissionStatus === 'success' && (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Logged in Google Sheets database! Rerouting...</span>
                </>
              )}
              {submissionStatus === 'error' && (
                <>
                  <Database className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">Saved to local device. Rerouting to Dashboard...</span>
                </>
              )}
              {submissionStatus === 'idle' && (
                <span className="text-titanium-dark/60">Ready to return to dashboard.</span>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleRestart}
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-3 rounded-full bg-white hover:bg-light-titanium/40 border border-light-titanium text-xs font-semibold text-titanium-dark flex items-center justify-center gap-1.5 active:scale-95 transition-all disabled:opacity-50 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
              {onComplete && (
                <button
                  onClick={() => onComplete(score, quiz.length)}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-3 rounded-full bg-warm-orange hover:bg-opacity-90 text-xs font-semibold text-white shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Main Dashboard</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          // Multiple-Choice Pill Buttons: bg-warm-orange text-white rounded-bl-none shadow-md hover:bg-opacity-90 active:scale-95 transition-all
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-titanium-dark/70 px-1 flex items-center justify-between">
              <span>Choose your answer:</span>
              {isAnswered && <span className="text-warm-orange animate-pulse">Evaluating...</span>}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {currentQ?.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                  className="px-4 py-2.5 rounded-2xl rounded-bl-none bg-warm-orange text-white shadow-md hover:bg-opacity-90 active:scale-95 transition-all text-xs sm:text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
