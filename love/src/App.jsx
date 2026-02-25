/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Heart, Cigarette, Wind, Star, Sparkles, Skull, Baby, Trophy, Flame, CloudOff, SmilePlus, X } from "lucide-react";

const loveQuotes = [
  { text: "أنت أغلى من أي سيجارة في العالم... لا تبادل نفسك بالدخان", emoji: "💛" },
  { text: "كل نفَس تأخذه بلا دخان هو هدية تقدّمها لنفسك ولمن يحبك", emoji: "🌸" },
  { text: "الشجاع ليس من لا يخاف... الشجاع من يقرر أن يحيا بصحة", emoji: "🦁" },
  { text: "جسدك بيتك الوحيد... عامله بالحب الذي يستحقه", emoji: "🏡" },
  { text: "أحبك يا صديقي بما يكفي لأقول لك الحقيقة: أنت تستحق أفضل من هذا", emoji: "🫂" },
  { text: "التوقف ليس ضعفاً... بل هو أعظم قرار ستتخذه في حياتك", emoji: "🌟" },
  { text: "لأجل ابتسامتك التي أحبها... خليك هنا معنا طويلاً", emoji: "😊" },
  { text: "كل يوم دون تدخين هو انتصار يستحق الاحتفال", emoji: "🎊" },
];

const questions = [
  {
    id: 1,
    emoji: "🚬",
    question: "هل تدخن حالياً؟",
    yesText: "نعم، للأسف",
    noText: "لا، أنا بخير!",
    yesReaction: { emoji: "😨", msg: "أووه لا! تعال نتحدث يا صديقي..." },
    noReaction: { emoji: "🎉", msg: "يييي! أنت بطل! استمر كذلك!" },
  },
  {
    id: 2,
    emoji: "💨",
    question: "هل تعرف أن كل سيجارة تسرق 11 دقيقة من عمرك؟",
    yesText: "نعم أعرف",
    noText: "لا، لم أعرف!",
    yesReaction: { emoji: "😰", msg: "إذا كنت تعرف... فلماذا؟! أنت تستحق حياة أطول 💙" },
    noReaction: { emoji: "😱", msg: "الآن تعرف! 11 دقيقة × كل سيجارة = سنوات من عمرك تذهب هباءً!" },
  },
  {
    id: 3,
    emoji: "❤️",
    question: "هل تحب نفسك وتريد حياة طويلة وصحية؟",
    yesText: "بالتأكيد!",
    noText: "لست متأكداً",
    yesReaction: { emoji: "🥹", msg: "إذاً قلبك يعرف الجواب... التوقف عن التدخين = حب نفسك حقاً 💪" },
    noReaction: { emoji: "🫂", msg: "أنا هنا أخبرك: أنت تستحق كل الحب والصحة في العالم!" },
  },
  {
    id: 4,
    emoji: "🏃",
    question: "هل تريد أن تتنفس بحرية وتركض دون ضيق؟",
    yesText: "أريد ذلك جداً!",
    noText: "لا يهمني",
    yesReaction: { emoji: "🌬️", msg: "بعد التوقف بأسبوعين فقط ستتنفس أفضل بكثير! الأمر يستحق!" },
    noReaction: { emoji: "🫁", msg: "رئتاك تقولان: نحن نهتم! دعنا نتنفس بحرية من فضلك! 🙏" },
  },
  {
    id: 5,
    emoji: "💰",
    question: "هل تعلم كم تنفق على السجائر شهرياً؟",
    yesText: "نعم، كثير جداً",
    noText: "لم أحسب ذلك",
    yesReaction: { emoji: "🤑", msg: "تخيل تلك الأموال على سفر، هدايا، أو مدخرات! استثمر في سعادتك!" },
    noReaction: { emoji: "🧮", msg: "احسبها الآن: سعر العلبة × 30 يوماً = مبلغ يمكن أن يسعدك!" },
  },
];

const FloatingParticle = ({ style, children }) => (
  <div className="absolute pointer-events-none animate-bounce opacity-20 text-2xl" style={style}>
    {children}
  </div>
);

export default function NoSmokingPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [reaction, setReaction] = useState(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const [particles, setParticles] = useState([]);
  const [noCount, setNoCount] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [quoteFading, setQuoteFading] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);

  useEffect(() => {
    const emojis = ["💨", "🌿", "💙", "⭐", "🌸", "✨", "🍃"];
    const p = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      style: {
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
        fontSize: `${1 + Math.random() * 1.5}rem`,
      },
    }));
    setParticles(p);
  }, []);

  const handleAnswer = (isYes) => {
    const q = questions[currentQ];
    const react = isYes ? q.yesReaction : q.noReaction;
    setAnswered(isYes);
    setReaction(react);
    setShowPulse(true);
    if (!isYes) setNoCount((n) => n + 1);
    else setScore((s) => s + 1);
    setTimeout(() => setShowPulse(false), 600);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setAnswered(null);
      setReaction(null);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswered(null);
    setReaction(null);
    setFinished(false);
    setScore(0);
    setNoCount(0);
  };

  const progress = ((currentQ + (answered !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <div
      dir="rtl"
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-10"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)",
        fontFamily: "'Cairo', 'Tajawal', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes popIn {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          70% { transform: scale(1.1) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(167,139,250,0.3); }
          50% { box-shadow: 0 0 40px rgba(167,139,250,0.8), 0 0 60px rgba(139,92,246,0.4); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.3); }
          30% { transform: scale(1); }
          45% { transform: scale(1.2); }
          60% { transform: scale(1); }
        }
        @keyframes smokeRise {
          0% { transform: translateY(0) scaleX(1); opacity: 0.6; }
          100% { transform: translateY(-100px) scaleX(2); opacity: 0; }
        }
        .float-anim { animation: float 3s ease-in-out infinite; }
        .wiggle-anim { animation: wiggle 2s ease-in-out infinite; }
        .pop-in { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .slide-up { animation: slideUp 0.4s ease forwards; }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .shake-anim { animation: shake 0.5s ease; }
        .heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        .smoke-rise { animation: smokeRise 2s ease-out infinite; }
        
        .btn-yes {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          transition: all 0.2s;
          border: 2px solid rgba(255,100,100,0.3);
        }
        .btn-yes:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 10px 30px rgba(239,68,68,0.5);
        }
        .btn-no {
          background: linear-gradient(135deg, #10b981, #059669);
          transition: all 0.2s;
          border: 2px solid rgba(100,255,180,0.3);
        }
        .btn-no:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 10px 30px rgba(16,185,129,0.5);
        }
        .card-glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>

      {/* Background particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none opacity-10"
          style={{ ...p.style, position: "absolute", animation: `float ${p.style.animationDuration} ease-in-out ${p.style.animationDelay} infinite` }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Glowing orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", filter: "blur(40px)" }} />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)", filter: "blur(50px)" }} />

      <div className="relative z-10 w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8 slide-up">
          <div className="flex justify-center items-center gap-3 mb-3">
            <div className="heartbeat text-4xl">❤️</div>
            <h1 className="text-4xl font-black text-white" style={{ textShadow: "0 0 30px rgba(167,139,250,0.8)" }}>
              لأجلك يا صديقي
            </h1>
            <div className="heartbeat text-4xl" style={{ animationDelay: "0.5s" }}>❤️</div>
          </div>
          <p className="text-purple-300 text-lg font-medium">رسالة من قلب يهتم بك 💙</p>
        </div>

        {!finished ? (
          <>
            {/* Progress bar */}
            <div className="mb-6 slide-up">
              <div className="flex justify-between text-xs text-purple-400 mb-2 font-medium">
                <span>السؤال {currentQ + 1} من {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                    boxShadow: "0 0 10px rgba(139,92,246,0.8)",
                  }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="card-glass rounded-3xl p-8 mb-6 pulse-glow slide-up" key={currentQ}>
              <div className="text-center mb-6">
                <div className="text-7xl mb-4 float-anim inline-block">
                  {questions[currentQ].emoji}
                </div>
                <h2 className="text-2xl font-bold text-white leading-relaxed">
                  {questions[currentQ].question}
                </h2>
              </div>

              {answered === null ? (
                <div className="flex gap-4">
                  <button
                    className="btn-yes flex-1 py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2"
                    onClick={() => handleAnswer(true)}
                  >
                    <span>{questions[currentQ].yesText}</span>
                    <span>😔</span>
                  </button>
                  <button
                    className="btn-no flex-1 py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2"
                    onClick={() => handleAnswer(false)}
                  >
                    <span>{questions[currentQ].noText}</span>
                    <span>😊</span>
                  </button>
                </div>
              ) : (
                <div className="pop-in">
                  <div
                    className="rounded-2xl p-6 text-center mb-4"
                    style={{
                      background: answered
                        ? "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(220,38,38,0.1))"
                        : "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.1))",
                      border: `1px solid ${answered ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}`,
                    }}
                  >
                    <div className="text-5xl mb-3">{reaction?.emoji}</div>
                    <p className="text-white font-semibold text-lg leading-relaxed">{reaction?.msg}</p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                      boxShadow: "0 5px 20px rgba(139,92,246,0.4)",
                    }}
                  >
                    {currentQ + 1 >= questions.length ? "رؤية النتيجة 🎯" : "السؤال التالي ←"}
                  </button>
                </div>
              )}
            </div>

            {/* Fun fact strip */}
            <div
              className="rounded-2xl p-4 text-center wiggle-anim"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}
            >
              <p className="text-purple-300 text-sm font-medium">
                💡 هل تعلم؟ جسمك يبدأ بالتعافي بعد 20 دقيقة فقط من التوقف عن التدخين!
              </p>
            </div>
          </>
        ) : (
          /* Final result screen */
          <div className="card-glass rounded-3xl p-8 text-center pop-in pulse-glow">
            <div className="text-8xl mb-4 float-anim">
              {noCount >= 3 ? "🌟" : noCount >= 2 ? "💪" : "🥺"}
            </div>
            <h2 className="text-3xl font-black text-white mb-3" style={{ textShadow: "0 0 20px rgba(167,139,250,0.6)" }}>
              {noCount >= 4 ? "أنت رائع بالفعل! 🎉" : noCount >= 2 ? "الطريق واضح أمامك 💙" : "أنا هنا معك! 🫂"}
            </h2>

            <div
              className="rounded-2xl p-5 mb-6 text-right"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}
            >
              {noCount >= 4 ? (
                <p className="text-purple-100 text-base leading-loose font-medium">
                  🎊 أنت تقريباً في المكان الصح! تذكر فقط: كل لحظة دون دخان هي هدية لنفسك ولمن تحب. استمر ولا تتراجع! أحبك يا صديقي ❤️
                </p>
              ) : noCount >= 2 ? (
                <p className="text-purple-100 text-base leading-loose font-medium">
                  💫 قلبك يعرف الحق، والطريق إلى الصحة بدأ. كل خطوة صغيرة تحسب. أنت لا تدخن لأنك قوي... أنت تتوقف لأنك أقوى! 💪
                </p>
              ) : (
                <p className="text-purple-100 text-base leading-loose font-medium">
                  🫁 صديقي العزيز، لن أقول لك توقف لأنني آمر... سأقول لك توقف لأنك تستحق أن تتنفس بعمق، أن تضحك دون سعال، أن تعيش بكامل طاقتك. أنا معك في هذا الطريق 💙
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl p-4" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <div className="text-3xl font-black text-emerald-400">{noCount}</div>
                <div className="text-emerald-300 text-sm font-medium">إجابة واعية 💚</div>
              </div>
              <div className="rounded-2xl p-4" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
                <div className="text-3xl font-black text-red-400">{questions.length - noCount}</div>
                <div className="text-red-300 text-sm font-medium">فرصة للتغيير 🔥</div>
              </div>
            </div>

            {/* Timeline of recovery */}
            <div className="text-right mb-6">
              <h3 className="text-purple-300 font-bold mb-3 text-base">⏰ جسمك بعد التوقف:</h3>
              {[
                { time: "20 دقيقة", effect: "ضغط الدم يعود لطبيعته", icon: "💓" },
                { time: "8 ساعات", effect: "الأكسجين في دمك يتضاعف", icon: "🌬️" },
                { time: "2 أسبوع", effect: "التنفس يصبح أسهل بكثير", icon: "🫁" },
                { time: "1 سنة", effect: "خطر القلب ينخفض 50%", icon: "❤️‍🔥" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl mb-2"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-purple-400 font-bold text-sm min-w-fit">{item.time}</span>
                  <span className="text-gray-300 text-sm">{item.effect}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 mb-3"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                boxShadow: "0 5px 20px rgba(139,92,246,0.5)",
              }}
            >
              🔄 ابدأ من جديد
            </button>

            <div className="text-purple-400 text-sm mt-2 font-medium">
              "الوقت الأفضل للتوقف كان أمس... الوقت الثاني الأفضل هو الآن" 🌱
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-purple-500 text-sm font-medium">
          صُنع بـ ❤️ من صديق يهتم بك
        </div>
      </div>
    </div>
  );
}