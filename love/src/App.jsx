/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

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

export default function NoSmokingPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [reaction, setReaction] = useState(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
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
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`,
      size: `${1 + Math.random() * 1.5}rem`,
    }));
    setParticles(p);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteFading(true);
      setTimeout(() => {
        setCurrentQuote((q) => (q + 1) % loveQuotes.length);
        setQuoteFading(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (isYes) => {
    const q = questions[currentQ];
    const react = isYes ? q.yesReaction : q.noReaction;
    setAnswered(isYes);
    setReaction(react);
    if (!isYes) setNoCount((n) => n + 1);
    else setScore((s) => s + 1);
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
    setShowLoveLetter(false);
  };

  const progress = ((currentQ + (answered !== null ? 1 : 0)) / questions.length) * 100;
  const quote = loveQuotes[currentQuote];

  return (
    <div
      dir="rtl"
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-10"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)",
        fontFamily: "'Cairo', 'Tajawal', sans-serif",
      }}
    >
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
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(167,139,250,0.3); }
          50% { box-shadow: 0 0 40px rgba(167,139,250,0.8), 0 0 60px rgba(139,92,246,0.4); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.3); }
          30% { transform: scale(1); }
          45% { transform: scale(1.2); }
          60% { transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .float-anim { animation: float 3s ease-in-out infinite; }
        .wiggle-anim { animation: wiggle 2s ease-in-out infinite; }
        .pop-in { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .slide-up { animation: slideUp 0.4s ease forwards; }
        .slide-down { animation: slideDown 0.4s ease forwards; }
        .pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
        .heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #c084fc, #f472b6, #818cf8, #c084fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

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
        .love-letter-card {
          background: linear-gradient(135deg, rgba(244,114,182,0.1), rgba(139,92,246,0.1));
          border: 1px solid rgba(244,114,182,0.3);
          backdrop-filter: blur(20px);
        }
        .quote-card {
          background: linear-gradient(135deg, rgba(251,191,36,0.08), rgba(244,114,182,0.08));
          border: 1px solid rgba(251,191,36,0.2);
        }
        .love-pill {
          background: linear-gradient(135deg, rgba(244,114,182,0.2), rgba(167,139,250,0.2));
          border: 1px solid rgba(244,114,182,0.3);
        }
      `}</style>

      {/* Background floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none opacity-10"
          style={{
            top: p.top, left: p.left, fontSize: p.size,
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Glowing orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", filter: "blur(40px)" }} />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f472b6, transparent)", filter: "blur(50px)" }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)", filter: "blur(60px)", transform: "translate(-50%,-50%)" }} />

      <div className="relative z-10 w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-6 slide-up">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="heartbeat text-4xl">❤️</div>
            <h1 className="text-4xl font-black text-white" style={{ textShadow: "0 0 30px rgba(167,139,250,0.8)" }}>
              لأجلك يا صديقي
            </h1>
            <div className="heartbeat text-4xl" style={{ animationDelay: "0.5s" }}>❤️</div>
          </div>
          <p className="text-purple-300 text-base font-medium">رسالة من قلب يهتم بك 💙</p>
        </div>

        {/* ✨ ROTATING LOVE QUOTE BANNER */}
        <div className="quote-card rounded-2xl px-5 py-4 mb-5 text-center relative overflow-hidden">
          <div className="absolute top-2 right-3 text-yellow-400 opacity-40 text-xs">✦ ✦ ✦</div>
          <div className="absolute bottom-2 left-3 text-pink-400 opacity-40 text-xs">✦ ✦ ✦</div>
          <div
            style={{
              transition: "opacity 0.4s ease, transform 0.4s ease",
              opacity: quoteFading ? 0 : 1,
              transform: quoteFading ? "translateY(-8px)" : "translateY(0)",
            }}
          >
            <div className="text-2xl mb-1">{quote.emoji}</div>
            <p className="text-yellow-100 font-semibold text-sm leading-relaxed italic">
              "{quote.text}"
            </p>
          </div>
          {/* dots indicator */}
          <div className="flex justify-center gap-1 mt-3">
            {loveQuotes.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuoteFading(true);
                  setTimeout(() => { setCurrentQuote(i); setQuoteFading(false); }, 300);
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentQuote ? "16px" : "6px",
                  height: "6px",
                  background: i === currentQuote ? "#f472b6" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {!finished ? (
          <>
            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-purple-400 mb-2 font-medium">
                <span>السؤال {currentQ + 1} من {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #8b5cf6, #f472b6, #06b6d4)",
                    boxShadow: "0 0 10px rgba(244,114,182,0.8)",
                  }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="card-glass rounded-3xl p-8 mb-5 pulse-glow" key={currentQ}>
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

            {/* Love pills strip */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {["أنت تستحق الأفضل 💖", "صحتك أغلى شيء 🌿", "أنا معك دائماً 🫂", "كن قوياً 💪"].map((pill, i) => (
                <span key={i} className="love-pill rounded-full px-3 py-1 text-pink-200 text-xs font-semibold">
                  {pill}
                </span>
              ))}
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
          <div className="card-glass rounded-3xl p-8 text-center pop-in pulse-glow">
            <div className="text-8xl mb-4 float-anim">
              {noCount >= 3 ? "🌟" : noCount >= 2 ? "💪" : "🥺"}
            </div>
            <h2 className="text-3xl font-black text-white mb-1" style={{ textShadow: "0 0 20px rgba(167,139,250,0.6)" }}>
              {noCount >= 4 ? "أنت رائع بالفعل! 🎉" : noCount >= 2 ? "الطريق واضح أمامك 💙" : "أنا هنا معك! 🫂"}
            </h2>
            <p className="shimmer-text font-bold text-base mb-5">
              {noCount >= 4 ? "قلبي يفرح من أجلك 🌸" : noCount >= 2 ? "خطوة بخطوة، معاً نصل 🌿" : "حبك لنفسك هو البداية ❤️"}
            </p>

            <div
              className="rounded-2xl p-5 mb-5 text-right"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}
            >
              {noCount >= 4 ? (
                <p className="text-purple-100 text-base leading-loose font-medium">
                  🎊 أنت تقريباً في المكان الصح! تذكر فقط: كل لحظة دون دخان هي هدية لنفسك ولمن تحب. استمر ولا تتراجع! أحبك يا صديقي ❤️
                </p>
              ) : noCount >= 2 ? (
                <p className="text-purple-100 text-base leading-loose font-medium">
                  💫 قلبك يعرف الحق، والطريق إلى الصحة بدأ. كل خطوة صغيرة تحسب. أنت لا تتوقف لأنك ضعيف... بل لأنك أقوى! 💪
                </p>
              ) : (
                <p className="text-purple-100 text-base leading-loose font-medium">
                  🫁 صديقي العزيز، لن أقول لك توقف لأنني آمر... سأقول لك توقف لأنك تستحق أن تتنفس بعمق، أن تضحك دون سعال، أن تعيش بكامل طاقتك. أنا معك في هذا الطريق 💙
                </p>
              )}
            </div>

            {/* 💌 Love Letter Toggle */}
            <button
              onClick={() => setShowLoveLetter(!showLoveLetter)}
              className="w-full py-3 rounded-2xl font-bold text-base text-white mb-4 transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f472b6, #ec4899)",
                boxShadow: "0 5px 20px rgba(244,114,182,0.4)",
              }}
            >
              {showLoveLetter ? "إخفاء الرسالة 💌" : "💌 اقرأ رسالتي لك"}
            </button>

            {showLoveLetter && (
              <div className="love-letter-card rounded-2xl p-6 mb-5 text-right slide-down">
                <div className="text-center text-3xl mb-3">💌</div>
                <h3 className="text-pink-300 font-black text-lg mb-3 text-center">رسالة من القلب</h3>
                <div className="text-pink-100 text-sm leading-loose font-medium space-y-3">
                  <p>صديقي العزيز،</p>
                  <p>
                    أكتب لك هذه الكلمات لأنك تعني لي الكثير. ليس لأن أحداً طلب مني، بل لأن قلبي يرفض أن يصمت وهو يراك تؤذي نفسك.
                  </p>
                  <p>
                    🌿 أنت أكثر من مجرد عادة سيئة... أنت شخص له قيمة هائلة، له ضحكة تضيء المكان، وروح تستحق أن تعيش بكامل قوتها وصحتها.
                  </p>
                  <p>
                    💙 أعرف أن التوقف ليس سهلاً. أعرف أن هناك لحظات ضغط وإجهاد وقهر. لكنني أعرف أيضاً أنك قادر، لأنك أقوى مما تظن.
                  </p>
                  <p>
                    🌸 تخيل نفسك بعد سنة من الآن: تتنفس بحرية، تركض دون تعب، تضحك دون سعال. هذا الشخص موجود فيك الآن، فقط يحتاج فرصة.
                  </p>
                  <p>
                    ❤️ أنا هنا، دائماً، أشجعك وأحبك وأفتخر بك في كل خطوة تخطوها نحو صحتك.
                  </p>
                  <p className="text-pink-300 font-bold mt-2 text-center">بكل الحب والتمني لك ✨</p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-5">
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
            <div className="text-right mb-5">
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

            {/* Extra love quotes in result */}
            <div className="mb-5">
              <h3 className="text-pink-300 font-bold mb-3 text-sm text-center">💬 كلمات من القلب</h3>
              <div className="flex flex-col gap-2">
                {[
                  { q: "أنت لا تحتاج الدخان لتكون رائعاً... أنت رائع بدونه", e: "✨" },
                  { q: "كل سيجارة ترفضها = دقائق إضافية مع من تحب", e: "⏳" },
                  { q: "قرار التوقف هو أعظم هدية تقدمها لنفسك", e: "🎁" },
                  { q: "من يحب نفسه لا يسمح للدخان أن يسرق عمره", e: "💝" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-4 py-3 flex items-center gap-3"
                    style={{
                      background: "linear-gradient(135deg, rgba(244,114,182,0.08), rgba(139,92,246,0.08))",
                      border: "1px solid rgba(244,114,182,0.15)",
                    }}
                  >
                    <span className="text-xl ">{item.e}</span>
                    <p className="text-gray-200 text-sm font-medium leading-relaxed">{item.q}</p>
                  </div>
                ))}
              </div>
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
        <div className="text-center mt-6 text-pink-500 text-sm font-medium flex items-center justify-center gap-2">
          <span className="heartbeat inline-block">❤️</span>
          <span>صُنع بحب من صديق يهتم بك</span>
          <span className="heartbeat inline-block" style={{ animationDelay: "0.7s" }}>❤️</span>
        </div>
      </div>
    </div>
  );
}