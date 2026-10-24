import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Award, Heart, Flame, Sparkles, Volume2, VolumeX, CheckCircle, 
  ChevronRight, Edit3, RotateCw, Play, ArrowLeft, RefreshCw, Star, HelpCircle,
  Users, Crown, Zap, Shield, Share2, Copy, Link, Check
} from 'lucide-react';

// Google Pixel Font Loader & Global Retro CSS
const RetroGlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    .font-pixel {
      font-family: 'Press Start 2P', cursive, monospace;
    }

    * {
      image-rendering: pixelated;
    }

    .pixel-border {
      box-shadow: 
        -4px 0 0 0 #000,
        4px 0 0 0 #000,
        0 -4px 0 0 #000,
        0 4px 0 0 #000;
      margin: 4px;
    }

    .pixel-border-gold {
      box-shadow: 
        -4px 0 0 0 #2b201a,
        4px 0 0 0 #2b201a,
        0 -4px 0 0 #2b201a,
        0 4px 0 0 #2b201a,
        -4px -4px 0 0 #fbd000,
        4px 4px 0 0 #fbd000;
    }

    .pixel-btn {
      position: relative;
      display: inline-block;
      text-transform: uppercase;
      box-shadow: inset -4px -4px 0px 0px rgba(0, 0, 0, 0.4);
      transition: all 0.1s ease;
    }

    .pixel-btn:active {
      box-shadow: inset 4px 4px 0px 0px rgba(0, 0, 0, 0.4);
      transform: translateY(2px);
    }

    .scanlines {
      background: linear-gradient(
        rgba(18, 16, 16, 0) 50%, 
        rgba(0, 0, 0, 0.25) 50%
      );
      background-size: 100% 4px;
    }

    @keyframes qblock {
      0%, 100% { background-color: #fbd000; }
      50% { background-color: #e59000; }
    }

    .q-block-anim {
      animation: qblock 1s infinite;
    }
  `}</style>
);

// Fireworks Effect
const FireworksCanvas = ({ active }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#E52521', '#0090E0', '#FBD000', '#43B047', '#FFFFFF', '#FF00FE'];

    const createExplosion = (x, y) => {
      for (let i = 0; i < 40; i++) {
        const angle = (Math.PI * 2 * i) / 40;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 60
        });
      }
    };

    let interval = setInterval(() => {
      createExplosion(
        Math.random() * canvas.width, 
        Math.random() * (canvas.height * 0.6)
      );
    }, 400);

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);

        if (p.life <= 0) particles.splice(i, 1);
      }
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 w-full h-full" />;
};

const MARIO_AVATARS = [
  { id: 'mario', name: 'Mario', symbol: '🔴' },
  { id: 'luigi', name: 'Luigi', symbol: '🟢' },
  { id: 'peach', name: 'Peach', symbol: '👑' },
  { id: 'toad', name: 'Toad', symbol: '🍄' },
  { id: 'yoshi', name: 'Yoshi', symbol: '🦖' },
  { id: 'bowser', name: 'Bowser', symbol: '🐢' },
  { id: 'wario', name: 'Wario', symbol: '🟡' },
  { id: 'star', name: 'Superstar', symbol: '⭐' }
];

const DEFAULT_TRIVIA = [
  {
    round: 1,
    difficulty: "WORLD 1-1: EASY",
    question: "What is Barinder's absolute favorite go-to comfort meal?",
    options: ["Butter Chicken & Naan", "Pizza & Garlic Dip", "Gourmet Burgers", "Fresh Sushi Combo"],
    correctIndex: 0,
    points: 100
  },
  {
    round: 2,
    difficulty: "WORLD 1-2: MEDIUM",
    question: "How does Barinder prefer his morning brew to power up?",
    options: ["Black Espresso", "Hot Ginger Chai", "Iced Vanilla Latte", "Green Tea"],
    correctIndex: 1,
    points: 200
  },
  {
    round: 3,
    difficulty: "WORLD 1-3: HARD",
    question: "What is Barinder's secret guilty pleasure pastime on weekends?",
    options: ["Bingeing tech videos", "Online gadget shopping", "Long afternoon nap", "Gaming till 3 AM"],
    correctIndex: 0,
    points: 300
  },
  {
    round: 4,
    difficulty: "WORLD 1-4: EXPERT",
    question: "Which iconic habit is Barinder most famous for among friends?",
    options: ["Checking locks 3 times", "Hyper-detailed travel plans", "45-minute hot showers", "Losing his keys daily"],
    correctIndex: 1,
    points: 400
  },
  {
    round: 5,
    difficulty: "BOWSER'S CASTLE: ULTIMATE",
    question: "If Barinder won a lifetime supply of one thing, what would he choose?",
    options: ["Flight Tickets", "Fresh Cookies", "Sneakers", "Coffee Beans"],
    correctIndex: 0,
    points: 500
  }
];

const BLUFF_FACTS = [
  {
    fact: "Barinder once tried to build his own computer and accidentally created a makeshift toaster.",
    isReal: false,
    explanation: "Fake! He built a working PC, but it definitely didn't toast bread."
  },
  {
    fact: "Bananas are naturally radioactive due to high potassium content.",
    isReal: true,
    explanation: "Real! They contain Potassium-40, though completely harmless!"
  },
  {
    fact: "Mario was originally named 'Jumpman' in his debut game Donkey Kong.",
    isReal: true,
    explanation: "Real! Nintendo later named him Mario after their landlord."
  },
  {
    fact: "Wombat poop is shaped like distinct cubes to stop it from rolling away.",
    isReal: true,
    explanation: "Real! Wombats use their square droppings to mark territory on rocks and logs."
  },
  {
    fact: "Scotland's official national animal is the Unicorn.",
    isReal: true,
    explanation: "Real! In Celtic mythology, the unicorn was a symbol of purity and power."
  },
  {
    fact: "Honey never spoils; archaeologists found 3,000-year-old edible honey in Egyptian tombs.",
    isReal: true,
    explanation: "Real! Its low moisture and acidic pH keep it edible indefinitely!"
  },
  {
    fact: "In 1998, NASA lost a $125 million Mars orbiter because one team used metric units and another used Imperial.",
    isReal: true,
    explanation: "Real! A simple unit conversion error destroyed the spacecraft!"
  },
  {
    fact: "Penguins originally had wings that allowed them to fly up to 20 miles per hour.",
    isReal: false,
    explanation: "Fake! Ancient penguins evolved directly into wing-paddles for swimming millions of years ago."
  },
  {
    fact: "Oxford University is older than the Aztec Empire.",
    isReal: true,
    explanation: "Real! Teaching existed at Oxford in 1096, while the Aztec Empire started around 1428."
  },
  {
    fact: "Bubble wrap was originally invented to be textured 3D wallpaper.",
    isReal: true,
    explanation: "Real! It failed as wallpaper before finding success as protective packaging."
  }
];

const MOST_LIKELY_QUESTIONS = [
  "Who is most likely to eat the last slice of birthday cake without asking?",
  "Who is most likely to fall asleep first during a late-night movie?",
  "Who is most likely to launch a crazy business idea with Barinder at 2 AM?",
  "Who is most likely to score 100% on Barinder trivia without studying?",
  "Who is most likely to organize an impromptu surprise trip?"
];

export default function App() {
  const [activeTab, setActiveTab] = useState('hub'); 
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fireworksActive, setFireworksActive] = useState(false);
  const [coins, setCoins] = useState(99);

  // Share & Room State
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [roomCode] = useState(() => 'BARINDER-' + Math.floor(1000 + Math.random() * 9000));

  // Load custom trivia from LocalStorage or fallback to default
  const [triviaQuestions, setTriviaQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('barinder_custom_trivia');
      return saved ? JSON.parse(saved) : DEFAULT_TRIVIA;
    } catch (e) {
      return DEFAULT_TRIVIA;
    }
  });

  // Save trivia changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('barinder_custom_trivia', JSON.stringify(triviaQuestions));
    } catch (e) {}
  }, [triviaQuestions]);

  const [players, setPlayers] = useState([
    { id: 1, name: 'BARINDER', avatar: '👑', score: 0 },
    { id: 2, name: 'PLAYER 1', avatar: '🔴', score: 0 },
    { id: 3, name: 'PLAYER 2', avatar: '🟢', score: 0 },
    { id: 4, name: 'PLAYER 3', avatar: '🍄', score: 0 },
    { id: 5, name: 'PLAYER 4', avatar: '🦖', score: 0 },
  ]);

  const [activePlayerIdx, setActivePlayerIdx] = useState(1);

  // Mini-Game States
  const [l1Round, setL1Round] = useState(0);
  const [l1SelectedOpt, setL1SelectedOpt] = useState(null);
  const [l1Revealed, setL1Revealed] = useState(false);

  const [racePositions, setRacePositions] = useState([0, 0, 0, 0, 0]);
  const [raceFinished, setRaceFinished] = useState(false);
  const [raceWinner, setRaceWinner] = useState(null);

  const [mlQuestionIdx, setMlQuestionIdx] = useState(0);
  const [mlVotes, setMlVotes] = useState({});

  const [bluffIndex, setBluffIndex] = useState(0);
  const [bluffRevealed, setBluffRevealed] = useState(false);
  const [bluffUserChoice, setBluffUserChoice] = useState(null);

  const playRetroSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'coin') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        setCoins(c => c + 1);
      } else if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'powerup') {
        osc.type = 'triangle';
        [330, 392, 659, 523, 587, 784].forEach((freq, i) => {
          osc.frequency.setValueAtTime(freq, now + i * 0.05);
        });
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.setValueAtTime(110, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'fanfare') {
        setFireworksActive(true);
        setTimeout(() => setFireworksActive(false), 5000);
        osc.type = 'square';
        [523.25, 523.25, 523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          osc.frequency.setValueAtTime(freq, now + i * 0.12);
        });
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      }
    } catch (e) {}
  };

  const addPointsToPlayer = (playerIdx, pts) => {
    const targetPlayerId = players[playerIdx].id;
    setPlayers(prev => prev.map(p => p.id === targetPlayerId ? { ...p, score: Math.max(0, p.score + pts) } : p));
  };

  const addPointsToCurrentPlayer = (pts) => {
    addPointsToPlayer(activePlayerIdx, pts);
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    playRetroSound('coin');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleL1Answer = (optIdx) => {
    if (l1Revealed) return;
    setL1SelectedOpt(optIdx);
    setL1Revealed(true);

    const q = triviaQuestions[l1Round];
    if (optIdx === q.correctIndex) {
      playRetroSound('powerup');
      addPointsToCurrentPlayer(q.points);
    } else {
      playRetroSound('wrong');
    }
  };

  const handlePlayerTap = (pIdx) => {
    if (raceFinished) return;
    playRetroSound('jump');
    setRacePositions(prev => {
      const updated = [...prev];
      updated[pIdx] = Math.min(100, updated[pIdx] + 8);

      if (updated[pIdx] >= 100 && !raceFinished) {
        setRaceFinished(true);
        setRaceWinner(players[pIdx]);
        playRetroSound('fanfare');
        addPointsToPlayer(pIdx, 300);
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#2b201a] text-white font-pixel scanlines flex flex-col justify-between selection:bg-yellow-400 selection:text-black relative overflow-x-hidden">
      <RetroGlobalStyles />
      <FireworksCanvas active={fireworksActive} />

      {/* SHARE MULTIPLAYER MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0090E0] border-4 border-black p-6 rounded-lg pixel-border max-w-md w-full space-y-4 text-center">
            <span className="text-3xl">🎮</span>
            <h3 className="text-sm md:text-base font-black text-yellow-300 uppercase">
              SHARE GAME WITH FRIENDS
            </h3>
            <p className="text-[10px] text-blue-100 leading-relaxed">
              Send this link to all 5 friends! You can host the game on Zoom, FaceTime, or cast it to your TV screen while everyone plays together!
            </p>

            <div className="bg-black/60 p-3 rounded border border-black flex items-center justify-between gap-2">
              <span className="text-[10px] text-yellow-300 truncate font-mono">
                {window.location.origin}?room={roomCode}
              </span>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-[#FBD000] text-black font-bold text-[10px] rounded pixel-border flex items-center space-x-1 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'COPIED!' : 'COPY'}</span>
              </button>
            </div>

            <button
              onClick={() => { playRetroSound('coin'); setShowShareModal(false); }}
              className="w-full py-2 bg-[#E52521] text-white font-black text-xs rounded pixel-border"
            >
              CLOSE & BACK TO GAME
            </button>
          </div>
        </div>
      )}

      {/* ARCADE HEADER */}
      <header className="bg-[#0090E0] border-b-4 border-black p-3 md:p-4 text-xs sticky top-0 z-40 shadow-xl">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div 
            onClick={() => { playRetroSound('coin'); setActiveTab('hub'); }} 
            className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition transform"
          >
            <div className="bg-[#E52521] text-white p-2 rounded pixel-border flex items-center justify-center font-extrabold text-sm">
              🍄
            </div>
            <div>
              <div className="text-[#FBD000] font-black text-sm md:text-base tracking-widest drop-shadow-[2px_2px_0px_#000]">
                BARINDER'S B-DAY
              </div>
              <div className="text-white text-[10px] tracking-tight">ONLINE MULTIPLAYER ROOM</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => { setShowShareModal(true); playRetroSound('jump'); }}
              className="px-2.5 py-1.5 bg-[#E52521] hover:bg-red-600 text-white rounded pixel-border text-[10px] font-bold flex items-center space-x-1 animate-pulse"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>SHARE LINK</span>
            </button>

            <button
              onClick={() => { setSoundEnabled(!soundEnabled); playRetroSound('coin'); }}
              className="p-1.5 bg-[#43B047] hover:bg-[#38963c] text-white rounded pixel-border text-[10px]"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-300" />}
            </button>

            <button
              onClick={() => { playRetroSound('jump'); setActiveTab('edit'); }}
              className="px-2.5 py-1.5 bg-[#FBD000] hover:bg-yellow-400 text-black rounded pixel-border text-[10px] font-bold flex items-center space-x-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">EDIT TRIVIA</span>
            </button>
          </div>
        </div>

        {/* ACTIVE PLAYER BAR */}
        <div className="mt-3 pt-2 border-t border-blue-400/50 flex items-center justify-between overflow-x-auto gap-2">
          <span className="text-[10px] text-blue-100 uppercase shrink-0">CURRENT TURN:</span>
          <div className="flex space-x-2">
            {players.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => { setActivePlayerIdx(idx); playRetroSound('coin'); }}
                className={`px-2 py-1 rounded text-[9px] flex items-center space-x-1 transition ${
                  activePlayerIdx === idx 
                    ? 'bg-[#E52521] text-white pixel-border-gold font-bold scale-105' 
                    : 'bg-[#0060a0] text-blue-200 hover:bg-blue-700'
                }`}
              >
                <span>{p.avatar}</span>
                <span className="max-w-[70px] truncate">{p.name}</span>
                <span className="text-[#FBD000] font-black">({p.score})</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN GAME CONTENT */}
      <main className="max-w-4xl w-full mx-auto p-4 md:p-6 flex-1 flex flex-col justify-center">

        {/* ----------------- HUB MAP ----------------- */}
        {activeTab === 'hub' && (
          <div className="space-y-6">
            <div className="bg-[#43B047] border-4 border-black p-5 md:p-8 rounded-lg pixel-border text-center relative overflow-hidden">
              <span className="bg-[#E52521] text-white text-[10px] px-3 py-1 rounded pixel-border uppercase font-bold tracking-widest">
                STAGE CLEAR • HAPPY BIRTHDAY
              </span>
              <h2 className="text-xl md:text-3xl text-[#FBD000] font-black mt-3 drop-shadow-[3px_3px_0px_#000] leading-snug">
                BARINDER'S BIRTHDAY BASH!
              </h2>
              <p className="text-white text-[11px] md:text-xs mt-3 max-w-xl mx-auto leading-relaxed">
                INVITE YOUR 5 FRIENDS WITH THE LINK AND START PLAYING!
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => { playRetroSound('powerup'); setActiveTab('level1'); }}
                  className="px-5 py-3 bg-[#E52521] hover:bg-red-600 text-white text-xs font-bold rounded pixel-border pixel-btn flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>START LEVEL 1</span>
                </button>
                <button 
                  onClick={() => { setShowShareModal(true); playRetroSound('jump'); }}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded pixel-border pixel-btn flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>SHARE LINK WITH FRIENDS</span>
                </button>
              </div>
            </div>

            {/* PLAYER SETUP CARD */}
            <div className="bg-[#0090E0] border-4 border-black p-4 rounded-lg pixel-border">
              <div className="flex items-center justify-between mb-3 border-b-2 border-black/40 pb-2">
                <h3 className="text-xs text-[#FBD000] font-bold flex items-center space-x-2 drop-shadow-[1px_1px_0px_#000]">
                  <Users className="w-4 h-4" />
                  <span>5-PLAYER CHARACTER SETUP</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {players.map((player, idx) => (
                  <div 
                    key={player.id} 
                    className={`p-2 rounded border-2 border-black flex flex-col items-center justify-between text-center transition ${
                      activePlayerIdx === idx ? 'bg-[#FBD000] text-black font-bold' : 'bg-blue-900/80 text-white'
                    }`}
                  >
                    <span className="text-2xl mb-1">{player.avatar}</span>
                    <input 
                      type="text" 
                      value={player.name}
                      onChange={(e) => {
                        const updated = [...players];
                        updated[idx].name = e.target.value.toUpperCase();
                        setPlayers(updated);
                      }}
                      className="bg-transparent text-center text-[10px] font-bold focus:outline-none focus:bg-white/20 rounded w-full uppercase"
                    />

                    <div className="flex space-x-1 mt-2 overflow-x-auto max-w-full">
                      {MARIO_AVATARS.slice(0, 4).map(av => (
                        <button
                          key={av.id}
                          onClick={() => {
                            const updated = [...players];
                            updated[idx].avatar = av.symbol;
                            setPlayers(updated);
                            playRetroSound('coin');
                          }}
                          className="text-[10px] hover:scale-125 transition"
                        >
                          {av.symbol}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LEVEL SELECTION CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => { playRetroSound('jump'); setActiveTab('level1'); }}
                className="bg-[#E52521] hover:bg-red-600 border-4 border-black p-4 rounded-lg pixel-border cursor-pointer transition transform hover:-translate-y-1 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-[#FBD000] text-black p-3 rounded pixel-border q-block-anim font-black text-xl shrink-0">?</div>
                  <div>
                    <span className="text-[9px] text-yellow-200 uppercase font-bold">LEVEL 1 • TRIVIA</span>
                    <h4 className="text-sm font-black text-white group-hover:text-[#FBD000] transition mt-1">SUPER TRIVIA (BARINDER SCHOLAR)</h4>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => { playRetroSound('jump'); setActiveTab('level2'); }}
                className="bg-[#FBD000] hover:bg-yellow-400 border-4 border-black p-4 rounded-lg pixel-border cursor-pointer transition transform hover:-translate-y-1 text-black group"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-[#0090E0] text-white p-3 rounded pixel-border font-black text-xl shrink-0">🏎️</div>
                  <div>
                    <span className="text-[9px] text-red-900 uppercase font-bold">LEVEL 2 • SPEED RALLY</span>
                    <h4 className="text-sm font-black text-black group-hover:text-red-700 transition mt-1">MARIO KART SPEED TAP</h4>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => { playRetroSound('jump'); setActiveTab('level3'); }}
                className="bg-[#43B047] hover:bg-emerald-600 border-4 border-black p-4 rounded-lg pixel-border cursor-pointer transition transform hover:-translate-y-1 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-[#FBD000] text-black p-3 rounded pixel-border font-black text-xl shrink-0">👑</div>
                  <div>
                    <span className="text-[9px] text-green-100 uppercase font-bold">LEVEL 3 • VOTING</span>
                    <h4 className="text-sm font-black text-white group-hover:text-[#FBD000] transition mt-1">MOST LIKELY TO...</h4>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => { playRetroSound('jump'); setActiveTab('level4'); }}
                className="bg-[#0090E0] hover:bg-blue-600 border-4 border-black p-4 rounded-lg pixel-border cursor-pointer transition transform hover:-translate-y-1 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-600 text-white p-3 rounded pixel-border font-black text-xl shrink-0">🕵️</div>
                  <div>
                    <span className="text-[9px] text-blue-200 uppercase font-bold">LEVEL 4 • FAKE NEWS</span>
                    <h4 className="text-sm font-black text-white group-hover:text-[#FBD000] transition mt-1">THE BLUFFER'S DILEMMA</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- LEVEL 1: TRIVIA (PRESERVED USER CUSTOM TRIVIA) ----------------- */}
        {activeTab === 'level1' && (
          <div className="space-y-6">
            <button 
              onClick={() => { playRetroSound('coin'); setActiveTab('hub'); }}
              className="text-[10px] font-bold text-yellow-400 hover:underline flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO WORLD MAP</span>
            </button>

            <div className="bg-[#E52521] border-4 border-black p-5 md:p-6 rounded-lg pixel-border space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black/40 pb-3">
                <div>
                  <span className="text-[9px] text-yellow-300 font-bold uppercase">
                    {triviaQuestions[l1Round]?.difficulty}
                  </span>
                  <h3 className="text-base md:text-xl font-black text-white mt-1">
                    {triviaQuestions[l1Round]?.question}
                  </h3>
                </div>
                <div className="bg-[#FBD000] text-black px-3 py-1.5 rounded pixel-border text-center shrink-0">
                  <span className="text-[9px] block font-bold">PTS</span>
                  <span className="text-sm font-black">+{triviaQuestions[l1Round]?.points}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                {triviaQuestions[l1Round]?.options.map((opt, idx) => {
                  let btnBg = "bg-[#0090E0] hover:bg-blue-600 text-white";
                  if (l1Revealed) {
                    if (idx === triviaQuestions[l1Round].correctIndex) {
                      btnBg = "bg-[#43B047] text-white font-bold ring-4 ring-yellow-300";
                    } else if (idx === l1SelectedOpt) {
                      btnBg = "bg-stone-800 text-red-300";
                    } else {
                      btnBg = "bg-stone-900 text-stone-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleL1Answer(idx)}
                      disabled={l1Revealed}
                      className={`p-4 rounded border-2 border-black text-left text-xs font-bold transition flex items-center justify-between ${btnBg}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-black/40 text-yellow-300 rounded flex items-center justify-center text-[10px]">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {l1Revealed && idx === triviaQuestions[l1Round].correctIndex && (
                        <span>⭐</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {l1Revealed && (
                <div className="bg-black/60 border-2 border-black p-4 rounded flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs">
                    <p className="font-bold text-yellow-300">
                      {l1SelectedOpt === triviaQuestions[l1Round].correctIndex 
                        ? "POWER UP! CORRECT ANSWER! 🎉" 
                        : "OH NO! WRONG BLOCK! 🍄"}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (l1Round < triviaQuestions.length - 1) {
                        setL1Round(r => r + 1);
                        setL1Revealed(false);
                        setL1SelectedOpt(null);
                        playRetroSound('coin');
                      } else {
                        playRetroSound('fanfare');
                        setActiveTab('victory');
                      }
                    }}
                    className="px-4 py-2 bg-[#FBD000] hover:bg-yellow-400 text-black font-bold text-xs rounded pixel-border flex items-center space-x-1"
                  >
                    <span>{l1Round < triviaQuestions.length - 1 ? 'NEXT ROUND →' : 'SEE CHAMPION PODIUM'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ----------------- LEVEL 2: SPEED TAP RACE ----------------- */}
        {activeTab === 'level2' && (
          <div className="space-y-6">
            <button 
              onClick={() => { playRetroSound('coin'); setActiveTab('hub'); }}
              className="text-[10px] font-bold text-yellow-400 hover:underline flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO WORLD MAP</span>
            </button>

            <div className="bg-[#FBD000] text-black border-4 border-black p-5 md:p-6 rounded-lg pixel-border space-y-4">
              <h3 className="text-lg md:text-xl font-black text-black">MARIO KART SPEED TAP!</h3>
              <div className="bg-stone-900 border-4 border-black p-4 rounded space-y-3 text-white">
                {players.map((p, pIdx) => (
                  <div key={p.id} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-stone-300">
                      <span>{p.avatar} {p.name}</span>
                      <span>{racePositions[pIdx]}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-stone-800 h-6 border border-stone-600 rounded relative overflow-hidden">
                        <div 
                          className="bg-yellow-400 h-full transition-all duration-100 flex items-center justify-end pr-1 text-xs"
                          style={{ width: `${racePositions[pIdx]}%` }}
                        >
                          🏎️
                        </div>
                      </div>
                      <button
                        onClick={() => handlePlayerTap(pIdx)}
                        disabled={raceFinished}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-black text-[10px] rounded pixel-border active:scale-95 shrink-0"
                      >
                        TAP!
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- LEVEL 3: MOST LIKELY TO ----------------- */}
        {activeTab === 'level3' && (
          <div className="space-y-6">
            <button 
              onClick={() => { playRetroSound('coin'); setActiveTab('hub'); }}
              className="text-[10px] font-bold text-yellow-400 hover:underline flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO WORLD MAP</span>
            </button>

            <div className="bg-[#43B047] border-4 border-black p-6 rounded-lg pixel-border space-y-4">
              <h3 className="text-lg md:text-xl font-black text-white">MOST LIKELY TO...</h3>
              <div className="bg-emerald-950 border-2 border-black p-5 rounded space-y-4">
                <p className="text-sm font-black text-yellow-300 text-center leading-relaxed">
                  "{MOST_LIKELY_QUESTIONS[mlQuestionIdx]}"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                  {players.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        playRetroSound('coin');
                        setMlVotes(v => ({ ...v, [idx]: (v[idx] || 0) + 1 }));
                        addPointsToPlayer(idx, 50);
                      }}
                      className="p-3 bg-stone-900 hover:bg-stone-800 text-white border-2 border-black rounded text-center space-y-1 transition transform hover:scale-105"
                    >
                      <div className="text-2xl">{p.avatar}</div>
                      <div className="text-[10px] font-bold truncate">{p.name}</div>
                      <div className="text-[9px] text-yellow-400 font-black">
                        VOTES: {mlVotes[idx] || 0}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- LEVEL 4: BLUFFER'S DILEMMA ----------------- */}
        {activeTab === 'level4' && (
          <div className="space-y-6">
            <button 
              onClick={() => { playRetroSound('coin'); setActiveTab('hub'); }}
              className="text-[10px] font-bold text-yellow-400 hover:underline flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO WORLD MAP</span>
            </button>

            <div className="bg-[#0090E0] border-4 border-black p-6 rounded-lg pixel-border space-y-4">
              <h3 className="text-lg md:text-xl font-black text-white">THE BLUFFER'S DILEMMA</h3>
              <div className="bg-blue-950 border-2 border-black p-5 rounded space-y-3">
                <p className="text-xs md:text-sm font-bold text-yellow-300 leading-relaxed">
                  "{BLUFF_FACTS[bluffIndex].fact}"
                </p>

                {!bluffRevealed ? (
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={() => {
                        setBluffUserChoice(true);
                        setBluffRevealed(true);
                        if (BLUFF_FACTS[bluffIndex].isReal) {
                          playRetroSound('powerup');
                          addPointsToCurrentPlayer(150);
                        } else {
                          playRetroSound('wrong');
                        }
                      }}
                      className="p-3 bg-green-600 hover:bg-green-500 text-white font-black text-xs rounded pixel-border"
                    >
                      REAL FACT! 👍
                    </button>
                    <button
                      onClick={() => {
                        setBluffUserChoice(false);
                        setBluffRevealed(true);
                        if (!BLUFF_FACTS[bluffIndex].isReal) {
                          playRetroSound('powerup');
                          addPointsToCurrentPlayer(150);
                        } else {
                          playRetroSound('wrong');
                        }
                      }}
                      className="p-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded pixel-border"
                    >
                      FAKE NEWS! 👎
                    </button>
                  </div>
                ) : (
                  <div className="bg-black/60 p-4 rounded space-y-2 border border-black">
                    <p className="text-xs font-bold text-yellow-400">
                      {(bluffUserChoice === BLUFF_FACTS[bluffIndex].isReal) ? "CORRECT! +150 PTS 🎉" : "WRONG BLUFF! 🍄"}
                    </p>
                    <p className="text-[11px] text-white">{BLUFF_FACTS[bluffIndex].explanation}</p>
                    <button
                      onClick={() => {
                        setBluffIndex(i => (i + 1) % BLUFF_FACTS.length);
                        setBluffRevealed(false);
                        playRetroSound('coin');
                      }}
                      className="mt-2 px-4 py-2 bg-yellow-400 text-black font-bold text-xs rounded pixel-border"
                    >
                      NEXT FACT →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- EDIT TRIVIA ----------------- */}
        {activeTab === 'edit' && (
          <div className="space-y-6">
            <button 
              onClick={() => { playRetroSound('coin'); setActiveTab('hub'); }}
              className="text-[10px] font-bold text-yellow-400 hover:underline flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO WORLD MAP</span>
            </button>

            <div className="bg-[#2b201a] border-4 border-black p-5 rounded-lg pixel-border space-y-4">
              <h3 className="text-sm font-black text-yellow-300 uppercase">EDIT BARINDER'S TRIVIA QUESTIONS</h3>
              {triviaQuestions.map((q, qIdx) => (
                <div key={qIdx} className="bg-stone-900 border-2 border-black p-3 rounded space-y-2">
                  <span className="text-[9px] text-red-400 font-bold">ROUND {qIdx + 1} QUESTION:</span>
                  <input 
                    type="text" 
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...triviaQuestions];
                      updated[qIdx].question = e.target.value;
                      setTriviaQuestions(updated);
                    }}
                    className="w-full bg-black border border-stone-700 p-2 text-xs text-white rounded font-pixel"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name={`correct-${qIdx}`}
                          checked={q.correctIndex === oIdx}
                          onChange={() => {
                            const updated = [...triviaQuestions];
                            updated[qIdx].correctIndex = oIdx;
                            setTriviaQuestions(updated);
                          }}
                          className="accent-yellow-400"
                        />
                        <input 
                          type="text" 
                          value={opt}
                          onChange={(e) => {
                            const updated = [...triviaQuestions];
                            updated[qIdx].options[oIdx] = e.target.value;
                            setTriviaQuestions(updated);
                          }}
                          className="w-full bg-black border border-stone-800 p-1.5 text-[10px] text-stone-200 rounded font-pixel"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={() => { playRetroSound('powerup'); setActiveTab('hub'); }}
                className="w-full py-3 bg-[#43B047] hover:bg-emerald-600 text-white font-black text-xs rounded pixel-border"
              >
                SAVE & RETURN TO MAP
              </button>
            </div>
          </div>
        )}

        {/* ----------------- VICTORY PODIUM ----------------- */}
        {activeTab === 'victory' && (
          <div className="space-y-6 text-center">
            <button 
              onClick={() => { playRetroSound('coin'); setActiveTab('hub'); }}
              className="text-[10px] font-bold text-yellow-400 hover:underline flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO WORLD MAP</span>
            </button>

            <div className="bg-[#0090E0] border-4 border-black p-6 rounded-lg pixel-border flex flex-col items-center">
              <h2 className="text-xl md:text-2xl text-yellow-300 font-black mt-2">
                GAME CLEAR! WINNER PODIUM
              </h2>
              <div className="w-full max-w-md my-6 space-y-2">
                {[...players].sort((a, b) => b.score - a.score).map((p, rank) => (
                  <div 
                    key={p.id}
                    className={`p-3 rounded border-2 border-black flex items-center justify-between text-xs font-bold ${
                      rank === 0 ? 'bg-[#FBD000] text-black font-black scale-105' : 'bg-blue-950 text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-black/40 text-yellow-300 rounded flex items-center justify-center text-[10px]">
                        #{rank + 1}
                      </span>
                      <span className="text-xl">{p.avatar}</span>
                      <span>{p.name}</span>
                    </div>
                    <span className="text-sm font-black">{p.score} PTS</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="bg-black border-t-4 border-black p-3 text-center text-[9px] text-stone-400">
        SUPER BARINDER B-DAY BASH • RETRO 8-BIT EDITION
      </footer>
    </div>
  );
}
