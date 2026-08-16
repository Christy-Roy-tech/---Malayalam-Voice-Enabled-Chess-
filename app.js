/* ========================================================================
   ചതുരംഗം (Chathurangam) — Malayalam Voice Chess
   Complete Application Logic
   ======================================================================== */

// ============================================================
// 1. CONSTANTS & CONFIGURATION
// ============================================================

const PIECE_UNICODE = {
    wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
    bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟'
};

const PIECE_NAMES_ML = {
    k: 'രാജാവ്', q: 'മന്ത്രി', r: 'തേര്', b: 'ആന', n: 'കുതിര', p: 'കാലാൾ'
};

const PIECE_NAMES_EN = {
    k: 'King', q: 'Queen', r: 'Rook', b: 'Bishop', n: 'Knight', p: 'Pawn'
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];

// Malayalam piece name mappings (various spoken forms & grammatical declensions)
const ML_PIECE_MAP = {
    // King
    'രാജാവ്': 'k', 'രാജാവിനെ': 'k', 'രാജാവ': 'k', 'കിങ്': 'k', 'കിംഗ്': 'k', 'കിങ്ങിനെ': 'k', 'king': 'k',
    // Queen
    'മന്ത്രി': 'q', 'മന്ത്രിയെ': 'q', 'റാണി': 'q', 'റാണിയെ': 'q', 'ക്വീൻ': 'q', 'ക്വീനിനെ': 'q', 'queen': 'q', 'rani': 'q',
    // Rook
    'തേര്': 'r', 'തേര': 'r', 'തേരനെ': 'r', 'തേർ': 'r', 'കോട്ട': 'r', 'കോട്ടയെ': 'r', 'റൂക്ക്': 'r', 'റൂക്കിനെ': 'r', 'rook': 'r',
    // Bishop
    'ആന': 'b', 'ആനയെ': 'b', 'ബിഷപ്പ്': 'b', 'ബിഷപ്': 'b', 'ബിഷപ്പിനെ': 'b', 'bishop': 'b',
    // Knight
    'കുതിര': 'n', 'കുതിരയെ': 'n', 'നൈറ്റ്': 'n', 'നൈറ്റിനെ': 'n', 'knight': 'n', 'horse': 'n',
    // Pawn
    'കാലാൾ': 'p', 'കാലാള്': 'p', 'കാലാളെ': 'p', 'കാലാളിനെ': 'p', 'പടയാളി': 'p', 'പടയാളിയെ': 'p', 'പോൺ': 'p', 'പോണിനെ': 'p', 'pawn': 'p'
};

// Malayalam file (column) mappings (comprehensive phonetic coverage for A, B, C, D, E, F, G, H)
const ML_FILE_MAP = {
    // File A (all spoken variations in Malayalam & English)
    'എ': 'a', 'ഏ': 'a', 'ആ': 'a', 'a': 'a', 'A': 'a',
    'എയ്': 'a', 'എയി': 'a', 'ഏയ്': 'a', 'ആഹ്': 'a', 'aye': 'a', 'ay': 'a', 'eh': 'a',

    // File B
    'ബി': 'b', 'ബീ': 'b', 'b': 'b', 'B': 'b', 'bee': 'b', 'be': 'b', 'ബ': 'b',

    // File C
    'സി': 'c', 'സീ': 'c', 'c': 'c', 'C': 'c', 'see': 'c', 'sea': 'c',

    // File D
    'ഡി': 'd', 'ഡീ': 'd', 'd': 'd', 'D': 'd', 'dee': 'd', 'ദി': 'd', 'ദീ': 'd', 'ഡ': 'd',

    // File E (all spoken variations in Malayalam & English)
    'ഇ': 'e', 'ഈ': 'e', 'e': 'e', 'E': 'e',
    'യി': 'e', 'യീ': 'e', 'ഇയ്': 'e', 'ഈയ്': 'e', 'ഇയ്യ്': 'e',
    'ee': 'e', 'ea': 'e', 'ii': 'e',

    // File F
    'എഫ്': 'f', 'എഫ': 'f', 'f': 'f', 'F': 'f', 'ef': 'f', 'eff': 'f',

    // File G
    'ജി': 'g', 'ജീ': 'g', 'g': 'g', 'G': 'g', 'jee': 'g',

    // File H (all spoken variations in Malayalam & English)
    'എച്ച്': 'h', 'എച്ച': 'h', 'എയ്ച്ച്': 'h', 'എയിച്ച്': 'h', 'ഏച്ച്': 'h', 'ഏച്ച': 'h',
    'ഹെച്ച്': 'h', 'ഹെച്ച': 'h', 'ഹാ': 'h', 'ഹ': 'h', 'ഹ്': 'h', 'h': 'h', 'H': 'h',
    'aitch': 'h', 'ach': 'h', 'he': 'h'
};

// Malayalam rank (row) number mappings (spoken numerals & words)
const ML_RANK_MAP = {
    // Rank 1 (all spoken forms in Malayalam & English)
    'ഒന്ന്': '1', 'ഒന്നു': '1', 'ഒന്ന': '1', 'ഒൻ': '1', 'ഒന്': '1', 'ഒന്ന്‍': '1', 'ഒന്ൻ': '1',
    'വൺ': '1', 'വണ്': '1', 'വന്': '1', 'വാൻ': '1', '1': '1', 'one': '1', 'on': '1', 'won': '1',
    '൧': '1', 'first': '1', 'ഫസ്റ്റ്': '1', 'ഫസ്റ്റ': '1', '1st': '1',

    // Rank 2
    'രണ്ട്': '2', 'രണ്ടു': '2', 'രണ്ട': '2', 'ടു': '2', '2': '2', 'two': '2', '൨': '2', 'second': '2', '2nd': '2',

    // Rank 3
    'മൂന്ന്': '3', 'മൂന്നു': '3', 'മൂന്ന': '3', 'ത്രീ': '3', '3': '3', 'three': '3', '൩': '3', 'third': '3', '3rd': '3',

    // Rank 4
    'നാല്': '4', 'നാലു': '4', 'നാല': '4', 'ഫോർ': '4', 'ഫോറ്': '4', 'ഫോറ': '4', 'ഫോറില്': '4', 'ഫോറിൽ': '4', '4': '4', 'four': '4', '൪': '4', 'fourth': '4', '4th': '4',

    // Rank 5
    'അഞ്ച്': '5', 'അഞ്ചു': '5', 'അഞ്ച': '5', 'ഫൈവ്': '5', '5': '5', 'five': '5', '൫': '5', 'fifth': '5', '5th': '5',

    // Rank 6
    'ആറ്': '6', 'ആറു': '6', 'ആറ': '6', 'സിക്സ്': '6', '6': '6', 'six': '6', '൬': '6', 'sixth': '6', '6th': '6',

    // Rank 7
    'ഏഴ്': '7', 'ഏഴു': '7', 'ഏഴ': '7', 'സെവൻ': '7', '7': '7', 'seven': '7', '൭': '7', 'seventh': '7', '7th': '7',

    // Rank 8
    'എട്ട്': '8', 'എട്ടു': '8', 'എട്ട': '8', 'എയ്റ്റ്': '8', '8': '8', 'eight': '8', '൮': '8', 'eighth': '8', '8th': '8'
};

// Malayalam command words
const ML_COMMANDS = {
    undo: ['പിൻവലിക്കുക', 'പിന്‍വലിക്കുക', 'അൺഡു', 'undo', 'back'],
    resign: ['കീഴടങ്ങുക', 'തോല്‍ക്കുക', 'റിസൈൻ', 'resign'],
    hint: ['സൂചന', 'ഹിന്റ്', 'hint', 'സഹായിക്കൂ', 'best move', 'ബെസ്റ്റ്'],
    help: ['സഹായം', 'ഹെൽപ്', 'help', 'എന്താ ചെയ്യേണ്ടത്'],
    newGame: ['പുതിയ കളി', 'ന്യൂ ഗെയിം', 'new game', 'പുതിയഗെയിം', 'restart'],
    castle: ['കോട്ട കെട്ടുക', 'കോട്ടകെട്ടുക', 'ക്യാസിൽ', 'castle', 'castling'],
    castleKing: ['കിങ് സൈഡ്', 'രാജാവിന്റെ ഭാഗം', 'kingside', 'short castle', 'ഷോർട്ട്'],
    castleQueen: ['ക്വീൻ സൈഡ്', 'മന്ത്രിയുടെ ഭാഗം', 'queenside', 'long castle', 'ലോങ്'],
    // Voice modal & navigation commands
    close: ['ക്ലോസ്', 'അടയ്ക്കുക', 'അടക്ക്', 'ബാക്ക്', 'മടങ്ങുക', 'വേണ്ട', 'എക്സിറ്റ്', 'close', 'back', 'exit', 'തുടങ്ങുക', 'തുടരുക', 'കളിക്കാം', 'കളി', 'hide'],
    confirm: ['ശരി', 'ശരിയാണ്', 'യെസ്', 'ഓകെ', 'ok', 'okay', 'yes', 'proceed', 'മാറ്റൂ', 'ചെയ്യ്', 'തീർച്ചയായും', 'ശരിയായി', 'നീക്കൂ', 'move', 'done', 'go', 'ശരി തന്നെ'],
    cancel: ['വേണ്ട', 'ക്യാൻസൽ', 'cancel', 'no', 'മാറ്റുക', 'റദ്ദാക്കുക', 'വേണ്ടതില്ല', 'നോ', 'തെറ്റാണ്', 'റോങ്', 'wrong', 'അല്ല'],
    // Difficulty
    easy: ['എളുപ്പം', 'ഈസി', 'easy', 'തുടക്കം', 'beginner'],
    medium: ['ഇടത്തരം', 'മീഡിയം', 'medium', 'intermediate', 'നോർമൽ', 'normal'],
    hard: ['കഠിനം', 'ഹാർഡ്', 'hard', 'expert', 'വിദഗ്ധൻ', 'difficult'],
    startGame: ['ആരംഭിക്കുക', 'സ്റ്റാർട്ട്', 'start', 'തുടങ്ങുക', 'begin', 'play'],
    friendGame: ['സുഹൃത്ത്', 'ഫ്രണ്ട്', 'friend', 'രണ്ടുപേർ', 'two player', 'multiplayer'],
    stopListening: ['നിർത്തുക', 'സ്റ്റോപ്പ്', 'stop listening', 'മൈക്ക് ഓഫ്'],
    startListening: ['കേൾക്കുക', 'മൈക്ക് ഓൺ', 'listen', 'start listening'],
    // Settings, navigation & UI options
    settings: ['സെറ്റിംഗ്സ്', 'ക്രമീകരണങ്ങൾ', 'settings', 'ഓപ്ഷൻ', 'options'],
    history: ['ഹിസ്റ്ററി', 'നീക്കങ്ങൾ', 'history', 'moves list', 'ലിസ്റ്റ്'],
    flip: ['തിരിക്കുക', 'ബോർഡ് തിരിക്കുക', 'flip', 'rotate', 'ഫ്ലിപ്'],
    soundToggle: ['ശബ്ദം', 'സൗണ്ട്', 'sound', 'mute', 'unmute'],

    // Promotion via voice
    promoteQueen: ['മന്ത്രി', 'ക്വീൻ', 'queen'],
    promoteRook: ['തേര്', 'റൂക്ക്', 'rook'],
    promoteBishop: ['ആന', 'ബിഷപ്പ്', 'bishop'],
    promoteKnight: ['കുതിര', 'നൈറ്റ്', 'knight']
};

// Chess tips in Malayalam
const CHESS_TIPS_ML = [
    'കേന്ദ്രം നിയന്ത്രിക്കുക — Control the center of the board.',
    'കുതിരകളെയും ആനകളെയും ആദ്യം വികസിപ്പിക്കുക — Develop knights and bishops first.',
    'നേരത്തെ കോട്ട കെട്ടുക — Castle early for king safety.',
    'മന്ത്രിയെ വളരെ നേരത്തെ പുറത്തിറക്കരുത് — Don\'t bring queen out too early.',
    'ഓരോ നീക്കത്തിനും ഒരു ലക്ഷ്യം ഉണ്ടായിരിക്കണം — Every move should have a purpose.',
    'എതിരാളിയുടെ ഭീഷണികൾ ശ്രദ്ധിക്കുക — Watch for opponent\'s threats.',
    'കാലാളുകളുടെ ഘടന നല്ലതായി നിലനിർത്തുക — Keep a good pawn structure.',
    'കരുക്കൾ പരസ്പരം സഹായിക്കട്ടെ — Let your pieces protect each other.',
    'തേരുകൾ തുറന്ന നിരകളിൽ വയ്ക്കുക — Place rooks on open files.',
    'എൻഡ്‌ഗെയിമിൽ രാജാവിനെ സജീവമാക്കുക — Activate your king in the endgame.'
];

// Piece-square tables for AI evaluation
const PST = {
    p: [ // Pawn
        [0, 0, 0, 0, 0, 0, 0, 0],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [10, 10, 20, 30, 30, 20, 10, 10],
        [5, 5, 10, 25, 25, 10, 5, 5],
        [0, 0, 0, 20, 20, 0, 0, 0],
        [5, -5, -10, 0, 0, -10, -5, 5],
        [5, 10, 10, -20, -20, 10, 10, 5],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    n: [ // Knight
        [-50, -40, -30, -30, -30, -30, -40, -50],
        [-40, -20, 0, 0, 0, 0, -20, -40],
        [-30, 0, 10, 15, 15, 10, 0, -30],
        [-30, 5, 15, 20, 20, 15, 5, -30],
        [-30, 0, 15, 20, 20, 15, 0, -30],
        [-30, 5, 10, 15, 15, 10, 5, -30],
        [-40, -20, 0, 5, 5, 0, -20, -40],
        [-50, -40, -30, -30, -30, -30, -40, -50]
    ],
    b: [ // Bishop
        [-20, -10, -10, -10, -10, -10, -10, -20],
        [-10, 0, 0, 0, 0, 0, 0, -10],
        [-10, 0, 10, 10, 10, 10, 0, -10],
        [-10, 5, 5, 10, 10, 5, 5, -10],
        [-10, 0, 5, 10, 10, 5, 0, -10],
        [-10, 10, 10, 10, 10, 10, 10, -10],
        [-10, 5, 0, 0, 0, 0, 5, -10],
        [-20, -10, -10, -10, -10, -10, -10, -20]
    ],
    r: [ // Rook
        [0, 0, 0, 0, 0, 0, 0, 0],
        [5, 10, 10, 10, 10, 10, 10, 5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [-5, 0, 0, 0, 0, 0, 0, -5],
        [0, 0, 0, 5, 5, 0, 0, 0]
    ],
    q: [ // Queen
        [-20, -10, -10, -5, -5, -10, -10, -20],
        [-10, 0, 0, 0, 0, 0, 0, -10],
        [-10, 0, 5, 5, 5, 5, 0, -10],
        [-5, 0, 5, 5, 5, 5, 0, -5],
        [0, 0, 5, 5, 5, 5, 0, -5],
        [-10, 5, 5, 5, 5, 5, 0, -10],
        [-10, 0, 5, 0, 0, 0, 0, -10],
        [-20, -10, -10, -5, -5, -10, -10, -20]
    ],
    k: [ // King (middlegame)
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-30, -40, -40, -50, -50, -40, -40, -30],
        [-20, -30, -30, -40, -40, -30, -30, -20],
        [-10, -20, -20, -20, -20, -20, -20, -10],
        [20, 20, 0, 0, 0, 0, 20, 20],
        [20, 30, 10, 0, 0, 10, 30, 20]
    ]
};

const PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };


// ============================================================
// 2. GAME STATE
// ============================================================

const App = {
    chess: null,
    gameMode: 'bot', // 'bot' or 'friend'
    playerColor: 'w',
    botDepth: 2,
    isListening: false,
    isBotThinking: false,
    coachMode: true,
    soundEnabled: true,
    voiceLang: 'ml-IN',
    recognition: null,
    timer: null,
    elapsedSeconds: 0,
    capturedPieces: { w: [], b: [] },
    lastMoveFrom: null,
    lastMoveTo: null,
    pendingPromotion: null,
    moveCount: 0,
    // Custom introduction state
    isIntroPlaying: false,
    introTextML: localStorage.getItem('chess_intro_ml') || 'ചതുരംഗത്തിലേക്ക് സ്വാഗതം! കളി ആരംഭിക്കുന്നു. നിങ്ങൾ വെള്ള കരുക്കൾ ആണ്. കരുവിന്റെ പേരോ കളങ്ങളോ പറയുക.',
    introTextEN: localStorage.getItem('chess_intro_en') || 'Welcome to Chathurangam! Game is starting. You are White. Speak your move.',
    speechDebounceTimer: null,
    // Staged move tracking
    stagedMove: {
        piece: null,
        from: null,
        to: null,
        awaitingConfirmation: false,
        moveObj: null
    }
};


// ============================================================
// 3. INITIALIZATION & INTRODUCTION FLOW
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initGame();
    initUI();
    initVoice();
    initWakeLock();

    // Hide loading screen after brief delay
    setTimeout(() => {
        const loadingEl = document.getElementById('loading-screen');
        if (loadingEl) {
            loadingEl.classList.add('fade-out');
            setTimeout(() => {
                loadingEl.style.display = 'none';
                // *** HANDS-FREE: Start introduction first, game starts when intro finishes ***
                autoStartGame();
            }, 800);
        }
    }, 1200);
});

function playIntroduction(onFinished) {
    App.isIntroPlaying = true;
    setCommandText('🎙️ ആമുഖം പറയുന്നു... Introduction playing...');
    showToast('🎙️ ആമുഖം കേൾക്കുന്നു... (Introduction)', 'info');

    speakML(
        App.introTextML,
        App.introTextEN,
        () => {
            finishIntroduction(onFinished);
        }
    );
}

function finishIntroduction(onFinished) {
    App.isIntroPlaying = false;
    playGameStartSound();
    startTimer();
    startListening();
    showToast('⚔️ കളി ആരംഭിച്ചു! നിങ്ങളുടെ ഊഴം — Game started!', 'success');
    setCommandText('⚔ Ready — Say your move! (e.g. "e2 e4" or "കുതിര f3")');
    if (onFinished) onFinished();
}

function autoStartGame() {
    // Set default bot game (easy, white)
    App.playerColor = 'w';
    App.gameMode = 'bot';
    App.botDepth = 2;

    document.getElementById('white-name').textContent = 'You / നിങ്ങൾ';
    document.getElementById('white-subtitle').textContent = 'Player';
    document.getElementById('black-name').textContent = 'Bot / ബോട്ട്';
    document.getElementById('black-subtitle').textContent = 'Beginner / തുടക്കക്കാരൻ';

    initGame();
    // Do not start timer or listen yet — play intro first!
    playIntroduction();
}

function initGame() {
    App.chess = new Chess();
    App.capturedPieces = { w: [], b: [] };
    App.lastMoveFrom = null;
    App.lastMoveTo = null;
    App.moveCount = 0;
    App.elapsedSeconds = 0;
    App.isBotThinking = false;
    App.pendingPromotion = null;
    resetStagedMove();
    stopTimer();
    renderBoard();
    updateStatusPanel();
    updateCapturedPieces();
    clearHighlights();
}


// ============================================================
// 4. BOARD RENDERING
// ============================================================

function renderBoard() {
    const boardEl = document.getElementById('chess-board');
    boardEl.innerHTML = '';

    const board = App.chess.board();
    // Render from rank 8 (top) to rank 1 (bottom)
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const file = FILES[col];
            const rank = RANKS[7 - row];
            const square = file + rank;
            const isLight = (row + col) % 2 === 0;

            const squareEl = document.createElement('div');
            squareEl.className = `square ${isLight ? 'light' : 'dark'}`;
            squareEl.dataset.square = square;
            squareEl.id = `sq-${square}`;

            // Coordinate labels
            if (row === 7) {
                const fileLabel = document.createElement('span');
                fileLabel.className = 'coord-file';
                fileLabel.textContent = file;
                squareEl.appendChild(fileLabel);
            }
            if (col === 0) {
                const rankLabel = document.createElement('span');
                rankLabel.className = 'coord-rank';
                rankLabel.textContent = rank;
                squareEl.appendChild(rankLabel);
            }

            // Piece
            const piece = board[row][col];
            if (piece) {
                const pieceEl = document.createElement('span');
                const key = (piece.color === 'w' ? 'w' : 'b') + piece.type.toUpperCase();
                pieceEl.className = `piece ${piece.color === 'w' ? 'white-piece' : 'black-piece'}`;
                pieceEl.textContent = PIECE_UNICODE[key];
                squareEl.appendChild(pieceEl);
            }

            // Last move highlights
            if (square === App.lastMoveFrom || square === App.lastMoveTo) {
                squareEl.classList.add('last-move');
            }

            // Check highlight
            if (App.chess.in_check()) {
                const kingSquare = findKingSquare(App.chess.turn());
                if (square === kingSquare) {
                    squareEl.classList.add('check');
                }
            }

            // Click handler for touch/mouse fallback
            squareEl.addEventListener('click', () => handleSquareClick(square));

            boardEl.appendChild(squareEl);
        }
    }
}

function findKingSquare(color) {
    const board = App.chess.board();
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.type === 'k' && piece.color === color) {
                return FILES[col] + RANKS[7 - row];
            }
        }
    }
    return null;
}

function clearHighlights() {
    document.querySelectorAll('.square.selected, .square.legal-move, .square.legal-capture, .square.staged-from, .square.staged-to, .square.candidate-piece').forEach(el => {
        el.classList.remove('selected', 'legal-move', 'legal-capture', 'staged-from', 'staged-to', 'candidate-piece');
    });
    document.getElementById('command-banner')?.classList.remove('confirming');
}

function resetStagedMove() {
    App.stagedMove = {
        piece: null,
        from: null,
        to: null,
        awaitingConfirmation: false,
        moveObj: null
    };
    clearHighlights();
}

function highlightLegalMoves(square) {
    clearHighlights();
    const sqEl = document.getElementById(`sq-${square}`);
    if (sqEl) sqEl.classList.add('selected');

    const moves = App.chess.moves({ square: square, verbose: true });
    moves.forEach(move => {
        const targetEl = document.getElementById(`sq-${move.to}`);
        if (targetEl) {
            if (move.captured) {
                targetEl.classList.add('legal-capture');
            } else {
                targetEl.classList.add('legal-move');
            }
        }
    });
}

// Touch/click fallback (selected square tracking)
let selectedSquare = null;

function handleSquareClick(square) {
    if (App.isBotThinking) return;
    if (App.gameMode === 'bot' && App.chess.turn() !== App.playerColor) return;

    const piece = App.chess.get(square);

    if (selectedSquare) {
        // Try to move
        const moveResult = tryMove(selectedSquare, square);
        selectedSquare = null;
        clearHighlights();
        if (!moveResult && piece && piece.color === App.chess.turn()) {
            // Clicked on own piece — select it instead
            selectedSquare = square;
            highlightLegalMoves(square);
        }
    } else if (piece && piece.color === App.chess.turn()) {
        selectedSquare = square;
        highlightLegalMoves(square);
    }
}


// ============================================================
// 5. MOVE EXECUTION
// ============================================================

function tryMove(from, to, promotionPiece) {
    // Check if this is a promotion move
    const piece = App.chess.get(from);
    if (piece && piece.type === 'p') {
        const promoRank = piece.color === 'w' ? '8' : '1';
        if (to[1] === promoRank && !promotionPiece) {
            // Need to ask for promotion piece
            App.pendingPromotion = { from, to };
            showPromotionModal(piece.color);
            return true;
        }
    }

    const move = App.chess.move({
        from: from,
        to: to,
        promotion: promotionPiece || 'q'
    });

    if (move) {
        executeMove(move);
        return true;
    }
    return false;
}

function executeMove(move) {
    // Reset staged move upon execution
    resetStagedMove();

    // Track captured pieces
    if (move.captured) {
        const capturedColor = move.color === 'w' ? 'b' : 'w';
        App.capturedPieces[capturedColor].push(move.captured);
    }

    App.lastMoveFrom = move.from;
    App.lastMoveTo = move.to;
    App.moveCount++;

    renderBoard();
    updateStatusPanel();
    updateCapturedPieces();
    updateMoveHistory();
    clearHighlights();

    // Play move sound
    if (App.soundEnabled) playMoveSound(move);

    // Announce move
    const moveText = describeMoveML(move);
    setCommandText(moveText);

    // Check game end
    if (App.chess.game_over()) {
        setTimeout(() => handleGameOver(), 500);
        return;
    }

    // Coach mode — blunder detection for player's move
    if (App.coachMode && App.gameMode === 'bot' && move.color === App.playerColor) {
        checkForBlunder(move);
    }

    // Bot's turn
    if (App.gameMode === 'bot' && App.chess.turn() !== App.playerColor) {
        setTimeout(() => botMove(), 500);
    }

    // Show a random tip
    if (App.moveCount % 3 === 0) {
        showRandomTip();
    }
}

function describeMoveML(move) {
    const pieceName = PIECE_NAMES_ML[move.piece] || move.piece;
    const fromSq = move.from;
    const toSq = move.to;

    if (move.flags.includes('k')) {
        return 'കോട്ട കെട്ടി (Kingside Castle)';
    }
    if (move.flags.includes('q')) {
        return 'കോട്ട കെട്ടി (Queenside Castle)';
    }

    let text = `${pieceName} ${fromSq} ൽ നിന്ന് ${toSq} ലേക്ക്`;
    if (move.captured) {
        const capturedName = PIECE_NAMES_ML[move.captured] || move.captured;
        text += ` (${capturedName} പിടിച്ചു)`;
    }
    if (move.promotion) {
        const promoName = PIECE_NAMES_ML[move.promotion] || move.promotion;
        text += ` [${promoName} ആയി]`;
    }
    if (App.chess.in_check()) {
        text += ' — ചെക്ക്!';
    }

    return text;
}

function describeMoveEN(move) {
    const pieceName = PIECE_NAMES_EN[move.piece] || move.piece;
    const fromSq = move.from;
    const toSq = move.to;

    if (move.flags.includes('k')) return 'Kingside castle';
    if (move.flags.includes('q')) return 'Queenside castle';

    let text = `${pieceName} ${fromSq} to ${toSq}`;
    if (move.captured) {
        const capturedName = PIECE_NAMES_EN[move.captured] || move.captured;
        text += ` takes ${capturedName}`;
    }
    if (move.promotion) {
        const promoName = PIECE_NAMES_EN[move.promotion] || move.promotion;
        text += ` promoted to ${promoName}`;
    }
    if (App.chess.in_check()) {
        text += ' check!';
    }
    return text;
}


// ============================================================
// 6. CHESS AI (Minimax with Alpha-Beta Pruning)
// ============================================================

function botMove() {
    if (App.chess.game_over()) return;

    App.isBotThinking = true;
    showThinking(true);
    setCommandText('Bot is thinking... / ബോട്ട് ചിന്തിക്കുന്നു...');

    setTimeout(() => {
        try {
            const result = findBestMove(App.chess, Math.min(App.botDepth, 3));
            if (result && result.move) {
                const move = App.chess.move(result.move);
                if (move) {
                    executeMove(move);
                }
            }
        } catch (err) {
            console.error('Error during bot move:', err);
        } finally {
            App.isBotThinking = false;
            showThinking(false);
            setCommandText('⚔ Ready — Say your move! (e.g. "e2 e4" or "കുതിര f3")');
        }
    }, 80);
}

function findBestMove(chess, depth) {
    const moves = chess.moves();
    if (moves.length === 0) return null;

    // Add some randomness at lower depths for variety
    const shuffled = shuffleArray([...moves]);

    let bestMove = null;
    let bestScore = chess.turn() === 'w' ? -Infinity : Infinity;

    for (const move of shuffled) {
        chess.move(move);
        const score = minimax(chess, depth - 1, -Infinity, Infinity, chess.turn() === 'w');
        chess.undo();

        if (chess.turn() === 'w') {
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        } else {
            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
    }

    return { move: bestMove, score: bestScore };
}

function minimax(chess, depth, alpha, beta, maximizing) {
    if (depth === 0 || chess.game_over()) {
        return evaluateBoard(chess);
    }

    const moves = chess.moves();

    if (maximizing) {
        let maxEval = -Infinity;
        for (const move of moves) {
            chess.move(move);
            const evalScore = minimax(chess, depth - 1, alpha, beta, false);
            chess.undo();
            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            chess.move(move);
            const evalScore = minimax(chess, depth - 1, alpha, beta, true);
            chess.undo();
            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

function evaluateBoard(chess) {
    if (chess.in_checkmate()) {
        return chess.turn() === 'w' ? -99999 : 99999;
    }
    if (chess.in_draw() || chess.in_stalemate() || chess.in_threefold_repetition()) {
        return 0;
    }

    let score = 0;
    const board = chess.board();

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (!piece) continue;

            const value = PIECE_VALUES[piece.type] || 0;
            const pstRow = piece.color === 'w' ? row : (7 - row);
            const pstValue = (PST[piece.type] && PST[piece.type][pstRow]) ?
                PST[piece.type][pstRow][col] : 0;

            if (piece.color === 'w') {
                score += value + pstValue;
            } else {
                score -= value + pstValue;
            }
        }
    }

    // Mobility bonus
    const currentMoves = chess.moves().length;
    score += (chess.turn() === 'w' ? 1 : -1) * currentMoves * 2;

    return score;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


// ============================================================
// 7. BLUNDER DETECTION & HINTS
// ============================================================

function checkForBlunder(move) {
    // Evaluate position before and after the move
    // Simple heuristic: if material balance shifted significantly against the player
    const evalAfter = evaluateBoard(App.chess);
    const threshold = App.playerColor === 'w' ? -150 : 150;

    // Check if evaluation is significantly worse
    if ((App.playerColor === 'w' && evalAfter < threshold) ||
        (App.playerColor === 'b' && evalAfter > -threshold)) {

        // Check if a piece is hanging
        const prevBoard = App.chess.board();
        const moveSquare = move.to;
        const movedPiece = App.chess.get(moveSquare);

        if (movedPiece) {
            // Check if the moved piece is attacked
            const opponentMoves = App.chess.moves({ verbose: true });
            const isAttacked = opponentMoves.some(m => m.to === moveSquare);
            const isDefended = checkDefended(moveSquare, move.color);

            if (isAttacked && !isDefended && PIECE_VALUES[movedPiece.type] > 100) {
                const pieceName = PIECE_NAMES_ML[movedPiece.type];
                const warning = `⚠️ ശ്രദ്ധിക്കുക! ${pieceName} ആക്രമിക്കപ്പെട്ടിരിക്കുന്നു!`;
                showHint(warning);
                playErrorSound();
                showToast(warning, 'warning');
            }
        }
    }
}

function checkDefended(square, color) {
    // Simple check: see if any friendly piece can recapture on that square
    const tempChess = new Chess(App.chess.fen());
    // Simulate opponent taking the piece
    const opMoves = tempChess.moves({ verbose: true });
    const capture = opMoves.find(m => m.to === square && m.captured);
    if (capture) {
        tempChess.move(capture);
        const recaptures = tempChess.moves({ verbose: true });
        return recaptures.some(m => m.to === square);
    }
    return true;
}

function getHintMove() {
    if (App.chess.game_over()) return null;

    // Use a deeper search for the hint
    const hintDepth = Math.max(App.botDepth, 3);
    const result = findBestMove(App.chess, hintDepth);
    return result;
}

function showHintToUser() {
    const result = getHintMove();
    if (result && result.move) {
        // Parse the SAN move
        const tempChess = new Chess(App.chess.fen());
        const move = tempChess.move(result.move);
        if (move) {
            const pieceName = PIECE_NAMES_ML[move.piece];
            const pieceNameEN = PIECE_NAMES_EN[move.piece];
            const hintText = `💡 സൂചന: ${pieceName} ${move.from} → ${move.to}`;
            showHint(hintText);
            setCommandText(hintText);
            if (App.soundEnabled) {
                speakML(`സൂചന. ${pieceName} ${move.from} ൽ നിന്ന് ${move.to} ലേക്ക് മാറ്റുക`, `Hint: move ${pieceNameEN} from ${move.from} to ${move.to}`);
            }

            // Highlight the suggested move
            clearHighlights();
            const fromEl = document.getElementById(`sq-${move.from}`);
            const toEl = document.getElementById(`sq-${move.to}`);
            if (fromEl) fromEl.classList.add('selected');
            if (toEl) toEl.classList.add('legal-move');

            showToast(hintText, 'info');
        }
    }
}

function showRandomTip() {
    App.currentTipIndex = (App.currentTipIndex + 1) % CHESS_TIPS_ML.length;
    showHint('💡 ' + CHESS_TIPS_ML[App.currentTipIndex]);
}


// ============================================================
// 8. MALAYALAM VOICE RECOGNITION
// ============================================================

function initVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        showToast('Speech recognition not supported. Use Chrome.', 'error');
        document.getElementById('mic-status').textContent = 'Not supported';
        return;
    }

    App.recognition = new SpeechRecognition();
    App.recognition.lang = App.voiceLang;
    App.recognition.continuous = true;
    App.recognition.interimResults = true;
    App.recognition.maxAlternatives = 3;

    App.recognitionRunning = false;

    App.recognition.onstart = () => {
        App.isListening = true;
        App.recognitionRunning = true;
        updateMicUI(true);
    };

    App.recognition.onend = () => {
        App.recognitionRunning = false;
        if (App.isListening) {
            setTimeout(() => {
                if (App.isListening && !App.recognitionRunning) {
                    try {
                        App.recognition.start();
                    } catch (e) {}
                }
            }, 60);
        } else {
            updateMicUI(false);
        }
    };

    App.recognition.onerror = (event) => {
        console.warn('Speech error:', event.error);
        if (event.error === 'no-speech') {
            return;
        }
        if (event.error === 'not-allowed') {
            showToast('Microphone access denied. Please allow microphone.', 'error');
            App.isListening = false;
            App.recognitionRunning = false;
            updateMicUI(false);
        }
    };

    // Continuous Watchdog: starts recognition safely if dropped
    setInterval(() => {
        if (App.isListening && !App.isIntroPlaying && !App.recognitionRunning && App.recognition) {
            try {
                App.recognition.start();
            } catch (e) {}
        }
    }, 1500);

    App.recognition.onresult = (event) => {
        if (App.isIntroPlaying) {
            return;
        }

        // Cancel any pending speech synthesis so player voice always takes 100% priority
        if (TTS.speaking) {
            window.speechSynthesis.cancel();
            TTS.speaking = false;
        }

        const alternativeTexts = [];
        let isFinalBatch = false;
        let bestInterim = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const res = event.results[i];
            if (res.isFinal) isFinalBatch = true;
            for (let j = 0; j < res.length; j++) {
                const t = res[j].transcript.trim();
                if (t && !alternativeTexts.includes(t)) {
                    alternativeTexts.push(t);
                }
            }
            if (!res.isFinal && res[0]) {
                bestInterim = res[0].transcript.trim();
            }
        }

        if (alternativeTexts.length === 0) return;

        // Show live speech feedback
        setCommandText('🎤 ' + (bestInterim || alternativeTexts[0]), true);

        // 1. FAST-PATH: If ANY alternative contains a complete legal move, execute immediately!
        for (const candidate of alternativeTexts) {
            if (isQuickExecutableCommand(candidate)) {
                clearTimeout(App.speechDebounceTimer);
                processVoiceCommand(candidate);
                return;
            }
        }

        if (isFinalBatch) {
            clearTimeout(App.speechDebounceTimer);
            let handled = false;
            for (const candidate of alternativeTexts) {
                const tokens = tokenize(candidate);
                const squares = extractSquares(tokens);
                const piece = extractPiece(tokens);
                if (squares.length > 0 || piece || matchCommand(candidate.toLowerCase(), ML_COMMANDS.help) || matchCommand(candidate.toLowerCase(), ML_COMMANDS.cancel)) {
                    processVoiceCommand(candidate);
                    handled = true;
                    break;
                }
            }
            if (!handled) {
                processVoiceCommand(alternativeTexts[0]);
            }
        } else {
            // Adaptive 350ms debounce for interim speech so syllables are not cut off prematurely
            clearTimeout(App.speechDebounceTimer);
            App.speechDebounceTimer = setTimeout(() => {
                if (!App.isIntroPlaying) {
                    for (const candidate of alternativeTexts) {
                        const tokens = tokenize(candidate);
                        const squares = extractSquares(tokens);
                        const piece = extractPiece(tokens);
                        if (squares.length > 0 || piece) {
                            processVoiceCommand(candidate);
                            return;
                        }
                    }
                    if (bestInterim) {
                        processVoiceCommand(bestInterim);
                    }
                }
            }, 350);
        }
    };

    // Mic button handler
    document.getElementById('mic-button').addEventListener('click', toggleListening);
}

function toggleListening() {
    if (App.isListening) {
        stopListening();
    } else {
        startListening();
    }
}

function startListening() {
    if (!App.recognition) {
        showToast('Speech recognition not available', 'error');
        return;
    }

    App.recognition.lang = App.voiceLang;
    App.isListening = true;

    try {
        App.recognition.start();
    } catch (e) {
        // Already running
    }
    updateMicUI(true);
}

function stopListening() {
    App.isListening = false;
    if (App.recognition) {
        try {
            App.recognition.stop();
        } catch (e) { }
    }
    updateMicUI(false);
}

function updateMicUI(listening) {
    const micBtn = document.getElementById('mic-button');
    const micStatus = document.getElementById('mic-status');
    const waveform = document.getElementById('voice-waveform');

    if (listening) {
        micBtn.classList.add('listening');
        micStatus.textContent = 'Listening...';
        micStatus.classList.add('active');
        waveform.classList.add('active');
    } else {
        micBtn.classList.remove('listening');
        micStatus.textContent = 'Click to Start';
        micStatus.classList.remove('active');
        waveform.classList.remove('active');
    }
}


// ============================================================
// 9. MALAYALAM COMMAND PARSER
// ============================================================

// ============================================================
// 9. ROBUST VOICE COMMAND & MOVE PROCESSOR
// ============================================================

function processVoiceCommand(text) {
    console.log('Voice input received:', text);
    const lower = text.toLowerCase().trim();

    // Show what was heard
    setCommandText('🎤 "' + text + '"');

    // *** 1. VOICE CONTROL: Close any open modal ***
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal) {
        if (matchCommand(lower, ML_COMMANDS.close) || matchCommand(lower, ML_COMMANDS.cancel)) {
            closeAllModals();
            speakML('അടച്ചു. കളി തുടരാം.', 'Closed. Let us continue the game.');
            setCommandText('⚔ Ready — Say your move! / നീക്കം പറയൂ!');
            return;
        }
    }

    // *** 2. VOICE PROMOTION ***
    if (App.pendingPromotion) {
        if (matchCommand(lower, ML_COMMANDS.promoteQueen)) {
            closeModal('modal-promotion');
            tryMove(App.pendingPromotion.from, App.pendingPromotion.to, 'q');
            App.pendingPromotion = null;
            return;
        }
        if (matchCommand(lower, ML_COMMANDS.promoteRook)) {
            closeModal('modal-promotion');
            tryMove(App.pendingPromotion.from, App.pendingPromotion.to, 'r');
            App.pendingPromotion = null;
            return;
        }
        if (matchCommand(lower, ML_COMMANDS.promoteBishop)) {
            closeModal('modal-promotion');
            tryMove(App.pendingPromotion.from, App.pendingPromotion.to, 'b');
            App.pendingPromotion = null;
            return;
        }
        if (matchCommand(lower, ML_COMMANDS.promoteKnight)) {
            closeModal('modal-promotion');
            tryMove(App.pendingPromotion.from, App.pendingPromotion.to, 'n');
            App.pendingPromotion = null;
            return;
        }
        speakML('ഏത് കരുവാക്കണം? മന്ത്രി, തേര്, ആന, അല്ലെങ്കിൽ കുതിര?', 'Choose Queen, Rook, Bishop, or Knight');
        return;
    }

    // *** 3. CANCEL / CLEAR CURRENT SELECTION ***
    if (matchCommand(lower, ML_COMMANDS.cancel)) {
        resetStagedMove();
        setCommandText('❌ Selection cleared. Say piece or square.');
        showToast('Cleared / റദ്ദാക്കി', 'info');
        return;
    }

    // *** 4. GENERAL GAME COMMANDS ***
    if (matchCommand(lower, ML_COMMANDS.help)) {
        handleHelp();
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.undo)) {
        handleUndo();
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.resign)) {
        handleResign();
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.hint)) {
        showHintToUser();
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.settings)) {
        closeAllModals();
        openModal('modal-settings');
        showToast('⚙ Settings opened / സെറ്റിംഗ്സ്', 'info');
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.history)) {
        closeAllModals();
        openModal('modal-history');
        showToast('📜 Move history / നീക്കങ്ങൾ', 'info');
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.flip)) {
        App.isBoardFlipped = !App.isBoardFlipped;
        document.getElementById('chess-board').classList.toggle('flipped', App.isBoardFlipped);
        showToast('🔄 Board flipped / ബോർഡ് തിരിച്ചു', 'info');
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.castle)) {
        handleCastle(lower);
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.newGame)) {
        closeAllModals();
        App.gameMode = 'bot';
        App.playerColor = 'w';
        document.getElementById('white-name').textContent = 'You / നിങ്ങൾ';
        document.getElementById('white-subtitle').textContent = 'Player';
        document.getElementById('black-name').textContent = 'Bot / ബോട്ട്';
        document.getElementById('black-subtitle').textContent = getbotTitle();
        initGame();
        startTimer();
        showToast('⚔ New game started!', 'success');
        speakML('പുതിയ കളി ആരംഭിച്ചു. നിങ്ങളുടെ ഊഴം.', 'New game started. Your turn.');
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.friendGame)) {
        App.gameMode = 'friend';
        App.playerColor = 'w';
        document.getElementById('white-name').textContent = 'Player 1';
        document.getElementById('white-subtitle').textContent = 'White / വെള്ള';
        document.getElementById('black-name').textContent = 'Player 2';
        document.getElementById('black-subtitle').textContent = 'Black / കറുപ്പ്';
        closeAllModals();
        initGame();
        startTimer();
        showToast('👥 Friend game started!', 'success');
        speakML('സുഹൃത്തിനോടൊപ്പമുള്ള കളി ആരംഭിച്ചു. വെള്ളയുടെ ഊഴം.', 'Friend game started. White turn.');
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.easy)) {
        App.botDepth = 2;
        showToast('🟢 Easy mode / എളുപ്പം', 'info');
        speakML('എളുപ്പം മോഡ് സെറ്റ് ചെയ്തു', 'Easy mode set.');
        document.getElementById('black-subtitle').textContent = 'Beginner / തുടക്കക്കാരൻ';
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.medium)) {
        App.botDepth = 4;
        showToast('🟡 Medium mode / ഇടത്തരം', 'info');
        speakML('ഇടത്തരം മോഡ് സെറ്റ് ചെയ്തു', 'Medium mode set.');
        document.getElementById('black-subtitle').textContent = 'Intermediate / ഇടത്തരം';
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.hard)) {
        App.botDepth = 6;
        showToast('🔴 Hard mode / കഠിനം', 'info');
        speakML('കഠിനം മോഡ് സെറ്റ് ചെയ്തു', 'Hard mode set.');
        document.getElementById('black-subtitle').textContent = 'Expert / വിദഗ്ധൻ';
        return;
    }
    if (matchCommand(lower, ML_COMMANDS.stopListening)) {
        speakML('മൈക്ക് ഓഫ് ചെയ്യുന്നു', 'Microphone stopping.');
        setTimeout(() => stopListening(), 1500);
        return;
    }

    // If bot is currently thinking, tell user to wait
    if (App.isBotThinking) {
        showToast('ദയവായി കാത്തിരിക്കുക — Please wait', 'info');
        return;
    }
    if (App.gameMode === 'bot' && App.chess.turn() !== App.playerColor) {
        showToast('ബോട്ടിന്റെ ഊഴം — Bot\'s turn', 'info');
        return;
    }

    // *** 5. PARSE MOVE (INSTANT EXECUTION) ***
    handleInteractiveMoveInput(text);
}

function isQuickExecutableCommand(text) {
    const lower = text.toLowerCase().trim();
    if (matchCommand(lower, ML_COMMANDS.close) ||
        matchCommand(lower, ML_COMMANDS.cancel) ||
        matchCommand(lower, ML_COMMANDS.help) ||
        matchCommand(lower, ML_COMMANDS.undo) ||
        matchCommand(lower, ML_COMMANDS.resign) ||
        matchCommand(lower, ML_COMMANDS.hint) ||
        matchCommand(lower, ML_COMMANDS.castle) ||
        matchCommand(lower, ML_COMMANDS.newGame)) {
        return true;
    }
    const tokens = tokenize(text);
    const squares = extractSquares(tokens);
    if (squares.length >= 2) return true;
    const pieceType = extractPiece(tokens);
    if (pieceType && squares.length === 1) {
        const matching = App.chess.moves({ verbose: true }).filter(m => m.piece === pieceType && m.to === squares[0]);
        if (matching.length === 1) return true;
    }
    return false;
}

function executeFastMove(from, to, pieceType, promotionPiece) {
    let success = tryMove(from, to, promotionPiece || 'q');

    // Smart B <-> D disambiguation: if move fails due to acoustic confusion, try phonetic sibling
    if (!success && (from || to)) {
        const swapBD = (sq) => {
            if (!sq) return sq;
            if (sq.startsWith('b')) return 'd' + sq.slice(1);
            if (sq.startsWith('d')) return 'b' + sq.slice(1);
            return sq;
        };

        const altTo = swapBD(to);
        const altFrom = swapBD(from);

        if (altTo !== to && tryMove(from, altTo, promotionPiece || 'q')) {
            success = true;
        } else if (altFrom !== from && tryMove(altFrom, to, promotionPiece || 'q')) {
            success = true;
        } else if ((altFrom !== from || altTo !== to) && tryMove(altFrom, altTo, promotionPiece || 'q')) {
            success = true;
        }
    }

    if (!success) {
        playErrorSound();
        setCommandText(`❌ Illegal move: ${from} → ${to}`);
        showToast('ആ നീക്കം സാധ്യമല്ല — Invalid move', 'warning');
        resetStagedMove();
        return false;
    }
    return true;
}

function normalizeVoiceText(text) {
    let t = text.toLowerCase();
    
    // 1. Remove Malayalam post-positions / suffixes
    t = t.replace(/(ിലേക്ക്|ലേക്ക്|ഇലേക്ക്|യിലേക്ക്|യിൽനിന്ന്|ൽനിന്ന്|ൽ നിന്ന്|ിൽ നിന്ന്)/g, ' ');
    t = t.replace(/(ഫോറി|നാലി|മൂന്നി|രണ്ടി|ഒന്നി|അഞ്ചി|ആറി|ഏഴി|എട്ടി|വണ്ണി|ടുവി|ത്രീയി)(ൽ|ിൽ)/g, '$1');

    // 2. Separate letter-number combinations: e.g. 'g1' -> 'g 1', 'ജി1' -> 'ജി 1', 'd1' -> 'd 1', 'b1' -> 'b 1'
    t = t.replace(/(എഫ്|എഫ|എച്ച്|എച്ച|എയ്ച്ച്|എയിച്ച്|ഏച്ച്|ഏച്ച|ഹെച്ച്|ഹെച്ച|എ|ഏ|ആ|ബി|ബീ|ബ|സി|സീ|ഡി|ഡീ|ദി|ദീ|ഡ|ഇ|ഈ|യി|യീ|ജി|ജീ|ഹാ|ഹ|[a-h])([1-8])/gi, ' $1 $2 ');

    // 3. Separate letter-number words: e.g. 'ജിഒന്ന്' -> 'ജി ഒന്ന്', 'ഡിവൺ' -> 'ഡി വൺ'
    t = t.replace(/(എഫ്|എഫ|എച്ച്|എച്ച|എയ്ച്ച്|എയിച്ച്|ഏച്ച്|ഏച്ച|ഹെച്ച്|ഹെച്ച|എ|ഏ|ആ|ബി|ബീ|ബ|സി|സീ|ഡി|ഡീ|ദി|ദീ|ഡ|ഇ|ഈ|യി|യീ|ജി|ജീ|ഹാ|ഹ|[a-h])(ഒന്ന്|ഒന്നു|ഒന്ന|ഒൻ|ഒന്|വൺ|വണ്|വന്|വാൻ|രണ്ട്|മൂന്ന്|നാല്|അഞ്ച്|ആറ്|ഏഴ്|എട്ട്|one|on|two|three|four|five|six|seven|eight|first|second|third|fourth|fifth|sixth|seventh|eighth)/gi, ' $1 $2 ');

    return t;
}

function tokenize(text) {
    const norm = normalizeVoiceText(text);
    return norm.replace(/[,\.;:!?()]/g, ' ')
        .split(/\s+/).filter(w => w.length > 0);
}

function extractSquares(tokens) {
    const squares = [];
    for (let i = 0; i < tokens.length; i++) {
        const w = tokens[i];

        // Direct english square (e.g. 'e4')
        if (w.length === 2 && /^[a-h][1-8]$/.test(w)) {
            squares.push(w);
            continue;
        }

        const file = ML_FILE_MAP[w];
        if (file) {
            if (i + 1 < tokens.length) {
                const nextW = tokens[i + 1];
                let rank = ML_RANK_MAP[nextW];
                if (!rank) {
                    const stripped = nextW.replace(/[ാിീുൂൃെേൈൊോൌ]/g, '');
                    rank = ML_RANK_MAP[stripped] || ML_RANK_MAP[nextW.replace(/റ$/, 'ർ')];
                }
                if (rank) {
                    squares.push(file + rank);
                    i++;
                    continue;
                }
            }
        }
    }
    return squares;
}

function extractPiece(tokens) {
    for (const w of tokens) {
        if (ML_PIECE_MAP[w]) return ML_PIECE_MAP[w];
        const base = w.replace(/(യെ|നെ|െ|ിനെ)$/, '');
        if (ML_PIECE_MAP[base]) return ML_PIECE_MAP[base];
    }
    return null;
}

function handleInteractiveMoveInput(text) {
    const tokens = tokenize(text);
    console.log('Processed Tokens:', tokens);

    const squares = extractSquares(tokens);
    const pieceType = extractPiece(tokens);
    const legalMoves = App.chess.moves({ verbose: true });

    // CASE 1: Both From and To squares provided (e.g. "e2 e4" or "കാലാൾ ഇ രണ്ട് ഇ നാല്")
    if (squares.length >= 2) {
        const from = squares[0];
        const to = squares[1];
        executeFastMove(from, to, pieceType);
        return;
    }

    // CASE 2: Piece + Target Square provided (e.g. "കുതിര എഫ് മൂന്ന്" / "Knight f3")
    if (pieceType && squares.length === 1) {
        const targetSq = squares[0];

        // First check if any friendly piece of this type can move to targetSq
        const matchingMoves = legalMoves.filter(m => m.piece === pieceType && m.to === targetSq);
        if (matchingMoves.length === 1) {
            executeFastMove(matchingMoves[0].from, targetSq, pieceType);
            return;
        } else if (matchingMoves.length > 1) {
            // Ambiguous piece destination: highlight candidates visually
            clearHighlights();
            matchingMoves.forEach(m => {
                const el = document.getElementById(`sq-${m.from}`);
                if (el) el.classList.add('candidate-piece');
            });
            const pieceNameEN = PIECE_NAMES_EN[pieceType];
            setCommandText(`♟️ Multiple ${pieceNameEN}s can move to ${targetSq}. Say from-square.`);
            App.stagedMove = { piece: pieceType, from: null, to: targetSq, awaitingConfirmation: false, moveObj: null };
            playSelectionSound();
            return;
        }

        // Second check: maybe square was a "from" square (e.g. "കുതിര ജി വൺ" meaning "Knight on g1")
        const pieceAtSq = App.chess.get(targetSq);
        if (pieceAtSq && pieceAtSq.type === pieceType && pieceAtSq.color === App.chess.turn()) {
            highlightLegalMoves(targetSq);
            App.stagedMove = { piece: pieceType, from: targetSq, to: null, awaitingConfirmation: false, moveObj: null };
            const pieceNameEN = PIECE_NAMES_EN[pieceType];
            setCommandText(`📍 ${pieceNameEN} (${targetSq}) selected. Say target square.`);
            playSelectionSound();
            return;
        }
    }

    // CASE 3: Only 1 Square provided
    if (squares.length === 1) {
        const sq = squares[0];

        // Subcase 3A: We already have a staged FROM square -> execute immediately!
        if (App.stagedMove.from && App.stagedMove.from !== sq) {
            executeFastMove(App.stagedMove.from, sq, App.stagedMove.piece);
            return;
        }

        // Subcase 3B: We already have a staged PIECE and no from square
        if (App.stagedMove.piece && !App.stagedMove.from) {
            // First check: does sq contain a friendly piece of that type? (User is speaking the FROM square!)
            const pieceAtSq = App.chess.get(sq);
            if (pieceAtSq && pieceAtSq.type === App.stagedMove.piece && pieceAtSq.color === App.chess.turn()) {
                highlightLegalMoves(sq);
                App.stagedMove.from = sq;
                setCommandText(`📍 ${PIECE_NAMES_EN[pieceAtSq.type]} (${sq}) selected. Say target square.`);
                playSelectionSound();
                return;
            }

            // Second check: is sq a unique destination for one such piece? (User is speaking the TO square!)
            const matching = legalMoves.filter(m => m.piece === App.stagedMove.piece && m.to === sq);
            if (matching.length === 1) {
                executeFastMove(matching[0].from, sq, App.stagedMove.piece);
                return;
            } else if (matching.length > 1) {
                clearHighlights();
                matching.forEach(m => {
                    const el = document.getElementById(`sq-${m.from}`);
                    if (el) el.classList.add('candidate-piece');
                });
                setCommandText(`♟️ Multiple pieces can move to ${sq}. Say from-square.`);
                App.stagedMove.to = sq;
                playSelectionSound();
                return;
            }
        }

        // Subcase 3C: Square contains friendly piece -> Select it as FROM visually
        const pieceAtSq = App.chess.get(sq);
        if (pieceAtSq && pieceAtSq.color === App.chess.turn()) {
            highlightLegalMoves(sq);
            App.stagedMove = { piece: pieceAtSq.type, from: sq, to: null, awaitingConfirmation: false, moveObj: null };
            const pieceNameEN = PIECE_NAMES_EN[pieceAtSq.type];
            setCommandText(`📍 ${pieceNameEN} (${sq}) selected. Say target square.`);
            playSelectionSound();
            return;
        }

        // Subcase 3D: Pawn move to target square
        const pawnMoves = legalMoves.filter(m => m.piece === 'p' && m.to === sq);
        if (pawnMoves.length === 1) {
            executeFastMove(pawnMoves[0].from, sq, 'p');
            return;
        }
    }

    // CASE 4: Only Piece Name provided (e.g. "കുതിര" / "Knight")
    if (pieceType && squares.length === 0) {
        const friendlyPieceSquares = [];
        legalMoves.forEach(m => {
            if (m.piece === pieceType && !friendlyPieceSquares.includes(m.from)) {
                friendlyPieceSquares.push(m.from);
            }
        });

        const pieceNameEN = PIECE_NAMES_EN[pieceType];

        if (friendlyPieceSquares.length === 0) {
            playErrorSound();
            setCommandText(`❌ No legal moves for ${pieceNameEN}`);
            return;
        } else if (friendlyPieceSquares.length === 1) {
            // Exactly one piece can move -> select it visually!
            const fromSq = friendlyPieceSquares[0];
            highlightLegalMoves(fromSq);
            App.stagedMove = { piece: pieceType, from: fromSq, to: null, awaitingConfirmation: false, moveObj: null };
            setCommandText(`📍 ${pieceNameEN} (${fromSq}) selected. Say target square.`);
            playSelectionSound();
            return;
        } else {
            // Multiple candidate pieces -> highlight them visually
            clearHighlights();
            friendlyPieceSquares.forEach(sq => {
                const el = document.getElementById(`sq-${sq}`);
                if (el) el.classList.add('candidate-piece');
            });
            App.stagedMove = { piece: pieceType, from: null, to: null, awaitingConfirmation: false, moveObj: null };
            setCommandText(`♟️ ${pieceNameEN} selected. Say from-square (${friendlyPieceSquares.join(', ')}).`);
            playSelectionSound();
            return;
        }
    }

    // Direct SAN fallback (e.g. "Nf3" or "e4")
    try {
        const directText = text.replace(/\s+/g, '').toLowerCase();
        const testChess = new Chess(App.chess.fen());
        const directMove = testChess.move(directText, { sloppy: true });
        if (directMove) {
            executeFastMove(directMove.from, directMove.to, directMove.piece, directMove.promotion);
            return;
        }
    } catch (e) { }

    playErrorSound();
    setCommandText('❓ മനസ്സിലായില്ല — Could not understand. Say piece, from, or to square.');
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
}

function matchCommand(text, commands) {
    return commands.some(cmd => text.includes(cmd.toLowerCase()));
}


function extractFile(tokens) {
    for (const token of tokens) {
        const f = parseFile(token);
        if (f) return f;
    }
    return null;
}

function handleCastle(text) {
    const isQueenside = matchCommand(text, ML_COMMANDS.castleQueen);
    const isKingside = matchCommand(text, ML_COMMANDS.castleKing);

    const legalMoves = App.chess.moves({ verbose: true });

    if (isQueenside) {
        const move = legalMoves.find(m => m.flags.includes('q'));
        if (move) {
            const result = App.chess.move(move.san);
            if (result) { executeMove(result); return; }
        }
        showToast('ക്വീൻ സൈഡ് കോട്ട സാധ്യമല്ല', 'warning');
        return;
    }

    if (isKingside) {
        const move = legalMoves.find(m => m.flags.includes('k'));
        if (move) {
            const result = App.chess.move(move.san);
            if (result) { executeMove(result); return; }
        }
        showToast('കിങ് സൈഡ് കോട്ട സാധ്യമല്ല', 'warning');
        return;
    }

    // Generic castle — try kingside first, then queenside
    let castleMove = legalMoves.find(m => m.flags.includes('k'));
    if (!castleMove) castleMove = legalMoves.find(m => m.flags.includes('q'));

    if (castleMove) {
        const result = App.chess.move(castleMove.san);
        if (result) { executeMove(result); return; }
    }

    showToast('കോട്ട കെട്ടാൻ സാധ്യമല്ല — Cannot castle', 'warning');
    if (App.soundEnabled) speakML('കോട്ട കെട്ടാൻ സാധ്യമല്ല');
}


// ============================================================
// 10. TEXT-TO-SPEECH (Robust dual-language system)
// ============================================================

// Voice state
const TTS = {
    voices: [],
    malayalamVoice: null,
    englishVoice: null,
    hasMLVoice: false,
    ready: false,
    queue: [],
    speaking: false
};

// Initialize voices — they load asynchronously
function initTTS() {
    if (!('speechSynthesis' in window)) return;

    function loadVoices() {
        TTS.voices = window.speechSynthesis.getVoices();
        if (TTS.voices.length === 0) return;

        // Look for Malayalam voice
        TTS.malayalamVoice = TTS.voices.find(v => v.lang === 'ml-IN') ||
            TTS.voices.find(v => v.lang.startsWith('ml'));

        // Look for best English voice (prefer Indian English, then any English)
        TTS.englishVoice = TTS.voices.find(v => v.lang === 'en-IN') ||
            TTS.voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
            TTS.voices.find(v => v.lang === 'en-US') ||
            TTS.voices.find(v => v.lang.startsWith('en'));

        TTS.hasMLVoice = !!TTS.malayalamVoice;
        TTS.ready = true;

        console.log('TTS Ready. Malayalam voice:', TTS.hasMLVoice ? TTS.malayalamVoice.name : 'NONE');
        console.log('English voice:', TTS.englishVoice ? TTS.englishVoice.name : 'NONE');
    }

    // Voices may already be loaded or load later
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

// Call this early
initTTS();

/**
 * Speak text with proper language handling.
 * @param {string} mlText - Malayalam text (used if Malayalam voice is available)
 * @param {string} [enText] - English fallback text (used if no Malayalam voice)
 * If only mlText is provided and no ML voice exists, the function stays silent
 * to avoid garbled output.
 */
/**
 * Speak text with proper language handling and callback on completion.
 * @param {string} mlText - Malayalam text
 * @param {string} [enText] - English fallback text
 * @param {function} [onEndCallback] - Callback fired when speech completes
 */
function speakML(mlText, enText, onEndCallback) {
    if (!App.soundEnabled) {
        if (onEndCallback) onEndCallback();
        return;
    }
    if (!('speechSynthesis' in window)) {
        if (onEndCallback) onEndCallback();
        return;
    }

    // Cancel any ongoing speech to avoid overlap
    window.speechSynthesis.cancel();
    TTS.speaking = false;

    // If voices haven't loaded yet, retry after a short delay
    if (!TTS.ready) {
        setTimeout(() => speakML(mlText, enText, onEndCallback), 300);
        return;
    }

    let textToSpeak;
    let voice;

    if (TTS.hasMLVoice) {
        textToSpeak = mlText;
        voice = TTS.malayalamVoice;
    } else if (enText) {
        textToSpeak = enText;
        voice = TTS.englishVoice;
    } else {
        console.log('TTS skipped (no ML voice, no EN fallback):', mlText);
        if (onEndCallback) onEndCallback();
        return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
    }
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    TTS.speaking = true;
    utterance.onend = () => {
        TTS.speaking = false;
        if (onEndCallback) onEndCallback();
    };
    utterance.onerror = () => {
        TTS.speaking = false;
        if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
}



// ============================================================
// 11. GAME COMMANDS
// ============================================================

function handleUndo() {
    resetStagedMove();
    if (App.gameMode === 'bot') {
        // Undo both bot's move and player's move
        App.chess.undo();
        App.chess.undo();
    } else {
        App.chess.undo();
    }

    // Recalculate captured pieces
    recalculateCaptured();

    App.lastMoveFrom = null;
    App.lastMoveTo = null;

    renderBoard();
    updateStatusPanel();
    updateCapturedPieces();
    updateMoveHistory();
    clearHighlights();

    const msg = 'നീക്കം പിൻവലിച്ചു — Move undone';
    setCommandText('↩ ' + msg);
    showToast(msg, 'info');
    if (App.soundEnabled) speakML('നീക്കം പിൻവലിച്ചു', 'Move undone');
}

function handleResign() {
    resetStagedMove();
    const winner = App.chess.turn() === 'w' ? 'Black' : 'White';
    const winnerML = App.chess.turn() === 'w' ? 'കറുപ്പ്' : 'വെള്ള';
    showGameOverModal(`${winnerML} വിജയിച്ചു!`, `${winner} Wins by Resignation`, '🏳');
    if (App.soundEnabled) speakML(`കീഴടങ്ങി. ${winnerML} വിജയിച്ചു`, `Resigned. ${winner} wins.`);
}

function handleHelp() {
    resetStagedMove();
    openModal('modal-guide');
    if (App.soundEnabled) {
        speakML(
            'സഹായം തുറന്നു. കരുവിന്റെ പേരോ കളങ്ങളോ പറയുക. നീക്കം ചെയ്യാൻ ശരി എന്ന് പറയുക. അടയ്ക്കാൻ ക്ലോസ് അല്ലെങ്കിൽ ബാക്ക് എന്ന് പറയുക.',
            'Help guide opened. Say piece, from square, to square, and confirm with OK. Say close or back to exit.'
        );
    }
}

function recalculateCaptured() {
    // Reset and recalculate from move history
    App.capturedPieces = { w: [], b: [] };
    const history = App.chess.history({ verbose: true });
    history.forEach(move => {
        if (move.captured) {
            const capturedColor = move.color === 'w' ? 'b' : 'w';
            App.capturedPieces[capturedColor].push(move.captured);
        }
    });
}


// ============================================================
// 12. GAME OVER HANDLING
// ============================================================

function handleGameOver() {
    stopTimer();
    resetStagedMove();

    if (App.chess.in_checkmate()) {
        const winner = App.chess.turn() === 'w' ? 'Black' : 'White';
        const winnerML = App.chess.turn() === 'w' ? 'കറുപ്പ്' : 'വെള്ള';
        showGameOverModal(
            `ചെക്ക്‌മേറ്റ്! ${winnerML} വിജയിച്ചു!`,
            `Checkmate! ${winner} Wins!`,
            '👑'
        );
        if (App.soundEnabled) speakML(`ചെക്ക്‌മേറ്റ്! ${winnerML} വിജയിച്ചു!`, `Checkmate! ${winner} wins!`);
    } else if (App.chess.in_stalemate()) {
        showGameOverModal('സ്റ്റേൽമേറ്റ്!', 'Stalemate — Draw', '🤝');
        if (App.soundEnabled) speakML('സ്റ്റേൽമേറ്റ്! സമനില', 'Stalemate! Game is a draw.');
    } else if (App.chess.in_draw()) {
        showGameOverModal('സമനില!', 'Game Drawn', '🤝');
        if (App.soundEnabled) speakML('സമനില!', 'Game is a draw!');
    } else if (App.chess.in_threefold_repetition()) {
        showGameOverModal('ത്രീഫോൾഡ് ആവർത്തനം!', 'Draw by Repetition', '🔄');
        if (App.soundEnabled) speakML('ആവർത്തനം മൂലം സമനില', 'Draw by threefold repetition.');
    }
}

function showGameOverModal(mlText, enText, icon) {
    document.getElementById('result-icon').textContent = icon;
    document.getElementById('result-text').textContent = mlText;
    document.getElementById('result-detail').textContent = enText;
    openModal('modal-game-over');
}


// ============================================================
// 13. UI MANAGEMENT
// ============================================================

function initUI() {
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            closeModal(modal.id);
        });
    });

    // Click outside modal to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay && overlay.id !== 'modal-promotion') {
                closeModal(overlay.id);
            }
        });
    });

    // Toolbar buttons
    document.getElementById('btn-menu').addEventListener('click', () => openModal('modal-menu'));
    document.getElementById('btn-history').addEventListener('click', () => openModal('modal-history'));
    document.getElementById('btn-settings').addEventListener('click', () => openModal('modal-settings'));
    document.getElementById('btn-undo').addEventListener('click', handleUndo);
    document.getElementById('btn-resign').addEventListener('click', handleResign);
    document.getElementById('btn-guide').addEventListener('click', () => openModal('modal-guide'));

    // Menu modal buttons
    document.getElementById('menu-new-game').addEventListener('click', () => {
        closeModal('modal-menu');
        openModal('modal-new-game');
    });
    document.getElementById('menu-vs-friend').addEventListener('click', () => {
        closeModal('modal-menu');
        openModal('modal-friend-game');
    });
    document.getElementById('menu-guide').addEventListener('click', () => {
        closeModal('modal-menu');
        openModal('modal-guide');
    });
    document.getElementById('menu-settings').addEventListener('click', () => {
        closeModal('modal-menu');
        openModal('modal-settings');
    });

    // Difficulty selector
    document.querySelectorAll('#difficulty-selector .diff-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#difficulty-selector .diff-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            App.botDepth = parseInt(btn.dataset.depth);
        });
    });

    // Color selector
    document.querySelectorAll('#color-selector .color-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#color-selector .color-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Start bot game
    document.getElementById('start-bot-game').addEventListener('click', () => {
        const colorBtn = document.querySelector('#color-selector .color-option.selected');
        let color = colorBtn.dataset.color;
        if (color === 'random') color = Math.random() < 0.5 ? 'w' : 'b';

        App.playerColor = color;
        App.gameMode = 'bot';

        // Set player names
        const playerName = App.playerColor === 'w' ? 'white' : 'black';
        const botName = App.playerColor === 'w' ? 'black' : 'white';

        document.getElementById(`${playerName}-name`).textContent = 'You / നിങ്ങൾ';
        document.getElementById(`${playerName}-subtitle`).textContent = 'Player';
        document.getElementById(`${botName}-name`).textContent = 'Bot / ബോട്ട്';
        document.getElementById(`${botName}-subtitle`).textContent = getbotTitle();

        closeModal('modal-new-game');
        initGame();
        startTimer();
        startListening();

        // If player is black, bot moves first
        if (App.playerColor === 'b') {
            setTimeout(() => botMove(), 500);
        }

        showToast('കളി ആരംഭിച്ചു! — Game started!', 'success');
        if (App.soundEnabled) speakML('കളി ആരംഭിച്ചു. ശുഭം!');
    });

    // Start friend game
    document.getElementById('start-friend-game').addEventListener('click', () => {
        App.gameMode = 'friend';
        App.playerColor = 'w';

        document.getElementById('white-name').textContent = 'Player 1';
        document.getElementById('white-subtitle').textContent = 'White / വെള്ള';
        document.getElementById('black-name').textContent = 'Player 2';
        document.getElementById('black-subtitle').textContent = 'Black / കറുപ്പ്';

        closeModal('modal-friend-game');
        initGame();
        startTimer();
        startListening();

        showToast('സുഹൃത്ത് കളി ആരംഭിച്ചു! — Friend game started!', 'success');
        if (App.soundEnabled) speakML('സുഹൃത്തിനോടൊപ്പമുള്ള കളി ആരംഭിച്ചു');
    });

    // Language selector
    document.querySelectorAll('#lang-selector .diff-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#lang-selector .diff-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            App.voiceLang = btn.dataset.lang;
            if (App.recognition) {
                App.recognition.lang = App.voiceLang;
                if (App.isListening) {
                    stopListening();
                    setTimeout(() => startListening(), 300);
                }
            }
        });
    });

    // Sound selector
    document.querySelectorAll('#sound-selector .diff-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#sound-selector .diff-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            App.soundEnabled = btn.dataset.sound === 'on';
        });
    });

    // Custom Introduction Settings controls
    const introInput = document.getElementById('intro-text-input');
    if (introInput) {
        introInput.value = App.introTextML;
    }

    const btnTestIntro = document.getElementById('btn-test-intro');
    if (btnTestIntro) {
        btnTestIntro.addEventListener('click', () => {
            const text = introInput ? introInput.value.trim() : App.introTextML;
            if (text) {
                showToast('🔊 Playing custom intro...', 'info');
                speakML(text, App.introTextEN);
            }
        });
    }

    const btnSaveIntro = document.getElementById('btn-save-intro');
    if (btnSaveIntro) {
        btnSaveIntro.addEventListener('click', () => {
            if (introInput && introInput.value.trim()) {
                App.introTextML = introInput.value.trim();
                localStorage.setItem('chess_intro_ml', App.introTextML);
                showToast('💾 Custom intro saved! ആമുഖം സേവ് ചെയ്തു', 'success');
            }
        });
    }

    const btnResetIntro = document.getElementById('btn-reset-intro');
    if (btnResetIntro) {
        btnResetIntro.addEventListener('click', () => {
            App.introTextML = 'ചതുരംഗത്തിലേക്ക് സ്വാഗതം! കളി ആരംഭിക്കുന്നു. നിങ്ങൾ വെള്ള കരുക്കൾ ആണ്. കരുവിന്റെ പേരോ കളങ്ങളോ പറയുക.';
            localStorage.removeItem('chess_intro_ml');
            if (introInput) introInput.value = App.introTextML;
            showToast('🔄 Intro reset to default', 'info');
        });
    }

    // Promotion modal
    document.querySelectorAll('#promotion-options .promotion-piece').forEach(btn => {
        btn.addEventListener('click', () => {
            if (App.pendingPromotion) {
                closeModal('modal-promotion');
                tryMove(App.pendingPromotion.from, App.pendingPromotion.to, btn.dataset.piece);
                App.pendingPromotion = null;
            }
        });
    });

    // Game over modal
    document.getElementById('game-over-new').addEventListener('click', () => {
        closeModal('modal-game-over');
        openModal('modal-new-game');
    });
    document.getElementById('game-over-close').addEventListener('click', () => {
        closeModal('modal-game-over');
    });
}

function getbotTitle() {
    if (App.botDepth <= 2) return 'Beginner / തുടക്കക്കാരൻ';
    if (App.botDepth <= 4) return 'Intermediate / ഇടത്തരം';
    return 'Expert / വിദഗ്ധൻ';
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function showPromotionModal(color) {
    const pieces = document.querySelectorAll('#promotion-options .promotion-piece');
    const symbols = color === 'w'
        ? { q: '♕', r: '♖', b: '♗', n: '♘' }
        : { q: '♛', r: '♜', b: '♝', n: '♞' };

    pieces.forEach(btn => {
        btn.textContent = symbols[btn.dataset.piece];
    });

    openModal('modal-promotion');

    // Also listen for voice promotion
    if (App.soundEnabled) {
        speakML('ഏത് കരുവാക്കണം? മന്ത്രി, തേര്, ആന, അല്ലെങ്കിൽ കുതിര?');
    }
}

function updateStatusPanel() {
    const turn = App.chess.turn();
    document.getElementById('status-turn').textContent = turn === 'w' ? 'White' : 'Black';
    document.getElementById('status-move').textContent = Math.ceil(App.chess.history().length / 2) + 1;

    // Update player card active states
    document.getElementById('white-player-card').classList.toggle('active', turn === 'w');
    document.getElementById('black-player-card').classList.toggle('active', turn === 'b');
}

function updateCapturedPieces() {
    const whiteCapEl = document.getElementById('white-captured');
    const blackCapEl = document.getElementById('black-captured');

    whiteCapEl.textContent = App.capturedPieces.w
        .map(p => PIECE_UNICODE['w' + p.toUpperCase()])
        .join(' ');

    blackCapEl.textContent = App.capturedPieces.b
        .map(p => PIECE_UNICODE['b' + p.toUpperCase()])
        .join(' ');
}

function updateMoveHistory() {
    const historyEl = document.getElementById('move-history-list');
    const history = App.chess.history();

    if (history.length === 0) {
        historyEl.innerHTML = '<p style="text-align:center; color: var(--text-light-secondary); font-size: 0.85rem;">No moves yet</p>';
        return;
    }

    let html = '';
    for (let i = 0; i < history.length; i += 2) {
        const moveNum = Math.floor(i / 2) + 1;
        html += `<div class="move-row">
            <span class="move-number">${moveNum}.</span>
            <span class="move-white">${history[i] || ''}</span>
            <span class="move-black">${history[i + 1] || ''}</span>
        </div>`;
    }
    historyEl.innerHTML = html;
}

function setCommandText(text, isInterim) {
    const display = document.getElementById('command-display');
    if (!display) return;
    display.textContent = text;
    if (isInterim) {
        display.style.opacity = '0.6';
    } else {
        display.style.opacity = '1';
    }

    // Auto-restore banner to ready state after error/unknown command so it never stays stuck
    clearTimeout(App.bannerResetTimer);
    if (text.startsWith('❓') || text.startsWith('❌')) {
        App.bannerResetTimer = setTimeout(() => {
            if (App.chess && !App.chess.game_over() && !App.isIntroPlaying && !App.isBotThinking) {
                if (App.stagedMove && App.stagedMove.from) {
                    const pieceAtSq = App.chess.get(App.stagedMove.from);
                    const pieceName = pieceAtSq ? PIECE_NAMES_EN[pieceAtSq.type] : 'Piece';
                    display.textContent = `📍 ${pieceName} (${App.stagedMove.from}) selected. Say target square.`;
                } else if (App.stagedMove && App.stagedMove.piece) {
                    display.textContent = `♟️ ${PIECE_NAMES_EN[App.stagedMove.piece]} selected. Say square.`;
                } else {
                    display.textContent = '⚔ Ready — Say your move! (e.g. "e2 e4" or "കുതിര f3")';
                }
                display.style.opacity = '1';
            }
        }, 2000);
    }
}

function showHint(text) {
    document.getElementById('hint-text').textContent = text;
}

function showThinking(active) {
    const el = document.getElementById('thinking-indicator');
    el.classList.toggle('active', active);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


// ============================================================
// 14. TIMER
// ============================================================

function startTimer() {
    stopTimer();
    App.elapsedSeconds = 0;
    App.timer = setInterval(() => {
        App.elapsedSeconds++;
        const mins = Math.floor(App.elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = (App.elapsedSeconds % 60).toString().padStart(2, '0');
        document.getElementById('status-time').textContent = `${mins}:${secs}`;
    }, 1000);
}

function stopTimer() {
    if (App.timer) {
        clearInterval(App.timer);
        App.timer = null;
    }
}


// ============================================================
// 15. SOUND EFFECTS
// ============================================================

// ============================================================
// 15. SOUND EFFECTS (Web Audio API)
// ============================================================

function playGameStartSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.1);
            osc.stop(ctx.currentTime + idx * 0.1 + 0.35);
        });
        setTimeout(() => ctx.close(), 1000);
    } catch (e) {}
}

function playSelectionSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 520;
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
        setTimeout(() => ctx.close(), 100);
    } catch (e) {}
}

function playErrorSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = 160;
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
        setTimeout(() => ctx.close(), 150);
    } catch (e) {}
}

function playMoveSound(move) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        if (move.captured) {
            oscillator.frequency.value = 200;
            gainNode.gain.value = 0.15;
            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.15);
        } else if (App.chess.in_check()) {
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.12;
            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.12);
        } else {
            oscillator.frequency.value = 400;
            gainNode.gain.value = 0.08;
            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.06);
        }

        setTimeout(() => ctx.close(), 300);
    } catch (e) {}
}


// ============================================================
// 16. SCREEN WAKE LOCK
// ============================================================

async function initWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            await navigator.wakeLock.request('screen');
        } catch (e) {
            console.log('Wake Lock not available:', e);
        }
    }
}
