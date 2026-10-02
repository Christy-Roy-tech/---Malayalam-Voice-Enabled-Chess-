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
    voiceLang: 'auto',
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
    initDiagnostics();
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
    VOICE.confirm = null;
    VOICE.pendingChoice = null;
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
        clearTimeout(App.botTimer);
        App.botTimer = setTimeout(() => botMove(), 500);
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
// 8. VOICE ENGINE  (Malayalam + English, legality-constrained)
// ------------------------------------------------------------
// Design notes
//  * The browser's recogniser (esp. ml-IN) often reports confidence = 0,
//    so confidence is only a *soft weight*. Accuracy comes from matching
//    every alternative against the LEGAL moves of the current position
//    (there are only ~20-40 of them), tolerating known sound-alikes
//    (b/d/e/c/g, a/h, 2/3, 7/8 ...) and asking when two moves tie.
//  * Each utterance is acted on exactly once (no interim/final repeats).
//  * "Not understood" is silent (no beep) so nothing blocks the next word.
//  * Auto mode listens with ml-IN and en-IN sessions at the same time.
// ============================================================

const VOICE = {
    lang: 'ml-IN',          // language currently used by the recogniser
    auto: true,             // auto-switch ml-IN <-> en-IN after repeated misses
    handled: new Set(),     // result indexes already acted on in this session
    stableTimer: null,
    stableText: '',
    failStreak: 0,
    restartTimer: null,
    restartDelay: 60,
    lastKey: '',
    lastAt: 0,
    pendingChoice: null,
    lastNetToast: 0
};

// ---------- extra vocabulary (merged into the original dictionaries) ----------
ML_COMMANDS.castle.push('കാസ്ലിംഗ്', 'കാസ്റ്റ്ലിംഗ്', 'കാസ്റ്റിൽ', 'കാസിൽ', 'കോട്ട കെട്ട', 'കാസ്ലിങ്');
ML_COMMANDS.undo.push('പിൻവലി', 'പിന്‍വലി', 'അണ്ടു', 'take back');
ML_COMMANDS.resign.push('കീഴടങ്ങ', 'give up');
ML_COMMANDS.help.push('ഹെൽപ്പ്', 'സഹായം');
ML_COMMANDS.settings.push('സെറ്റിംഗ്', 'സെറ്റിങ്', 'സെറ്റിങ്സ്', 'ക്രമീകരണ', 'setting');
ML_COMMANDS.flip.push('തിരിക്ക', 'ഫ്ലിപ്പ്');
ML_COMMANDS.newGame.push('പുതിയകളി', 'ന്യൂഗെയിം', 'പുതിയ ഗെയിം', 'new match');
ML_COMMANDS.stopListening.push('mic off', 'മൈക്ക് ഓഫ്');
ML_COMMANDS.startListening.push('mic on');
ML_COMMANDS.hint.push('suggest');

// ---------- 8.1 text normalisation ----------
const CHILLU = { 'ൻ': 'ന്', 'ർ': 'ര്', 'ൽ': 'ല്', 'ൾ': 'ള്', 'ൺ': 'ണ്', 'ൿ': 'ക്' };
const HAS_ML = /[\u0d00-\u0d7f]/;

function normText(s) {
    return String(s || '').toLowerCase()
        .replace(/[\u200c\u200d]/g, '')
        .replace(/[ൻർൽൾൺൿ]/g, ch => CHILLU[ch])
        .replace(/[\u0d66-\u0d6f]/g, ch => String(ch.charCodeAt(0) - 0x0d66));
}

// Dictionary key: normalised, and for Malayalam words the final virama / "u"
// is dropped so ഒന്ന് / ഒന്നു / ഒന്ന all collapse to one key.
function vkey(tok) {
    let t = normText(tok).trim();
    if (HAS_ML.test(t)) t = t.replace(/[്ു]$/, '');
    return t;
}

const V = { file: new Map(), rank: new Map(), piece: new Map() };
function fillMap(map, obj) {
    for (const k in obj) {
        const key = vkey(k);
        if (key && !map.has(key)) map.set(key, obj[k]);
    }
}
fillMap(V.file, ML_FILE_MAP);
fillMap(V.rank, ML_RANK_MAP);
fillMap(V.piece, ML_PIECE_MAP);

fillMap(V.file, {
    'ay': 'a', 'hey': 'a', 'ഏയ്': 'a',
    'cee': 'c', 'si': 'c', 'സീ': 'c',
    'de': 'd', 'di': 'd', 'ഡെ': 'd',
    'ge': 'g', 'ji': 'g', 'ജെ': 'g', 'gee': 'g',
    'ഹെച്ച്': 'h', 'etch': 'h', 'ഐച്ച്': 'h', 'ഏയ്ച്': 'h'
});
fillMap(V.rank, {
    'ടൂ': '2', 'ട്ടു': '2', 'റ്റു': '2', 'too': '2', 'to': '2', 'tu': '2',
    'ത്രി': '3', 'tree': '3',
    'for': '4', 'fore': '4', 'ഫോ': '4',
    'ഫൈവ': '5', 'sicks': '6', 'സെവെൻ': '7',
    'എയിറ്റ്': '8', 'ഏറ്റ്': '8', 'ate': '8', 'ഏട്ട്': '8',
    'വാൺ': '1', 'wan': '1', 'ഒൺ': '1', 'oan': '1'
});
fillMap(V.piece, {
    'night': 'n', 'nite': 'n', 'knights': 'n', 'ഹോഴ്സ്': 'n',
    'rock': 'r', 'rok': 'r', 'brook': 'r', 'rooks': 'r', 'രഥം': 'r', 'തേരിനെ': 'r',
    'pon': 'p', 'paun': 'p', 'pone': 'p', 'pawns': 'p', 'ഭടൻ': 'p', 'ഭടനെ': 'p',
    'bishup': 'b', 'bishap': 'b', 'ഒട്ടകം': 'b',
    'kwin': 'q', 'quin': 'q', 'ക്വീൻ': 'q',
    'kin': 'k'
});

// (learned aliases are applied after dictionaries are built, see applyLearned)
const SUFFIX_RE = /(ിലേക്ക|ലേക്ക|യില|ില|യെ|ിനെ|നെ|ത്തെ|ുടെ)$/;

function vlookup(map, tok) {
    const k = vkey(tok);
    if (map.has(k)) return map.get(k);
    const s = k.replace(SUFFIX_RE, '');
    if (s && s !== k && map.has(s)) return map.get(s);
    return undefined;
}

function lev(a, b) {
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > 1) return 2;
    const d = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
}

function pieceCands(tok) {
    const exact = vlookup(V.piece, tok);
    if (exact) return [{ v: exact, w: 1 }];
    const k = vkey(tok);
    if (k.length >= (HAS_ML.test(k) ? 4 : 4)) {
        for (const [word, type] of V.piece) {
            if (word.length >= 4 && lev(k, word) <= 1) return [{ v: type, w: 0.6 }];
        }
    }
    return null;
}

// Sound-alike groups (weights are deliberately low: they only win when the
// literal reading is not a legal move).
const FILE_SIB = {
    b: [['d', .45], ['c', .45], ['e', .45], ['g', .45]],
    c: [['b', .45], ['d', .45], ['e', .45], ['g', .45]],
    d: [['b', .45], ['c', .45], ['e', .45], ['g', .45]],
    e: [['b', .45], ['c', .45], ['d', .45], ['g', .45]],
    g: [['b', .45], ['c', .45], ['d', .45], ['e', .45]],
    a: [['h', .4]], h: [['a', .4]]
};
const RANK_SIB = {};   // digits are recognised reliably; never guess a different rank

function fileCands(tok) {
    const f = /^[a-h]$/.test(tok) ? tok : vlookup(V.file, tok);
    if (!f) return null;
    return [{ v: f, w: 1 }].concat((FILE_SIB[f] || []).map(([v, w]) => ({ v, w })));
}
function rankCands(tok) {
    const r = /^[1-8]$/.test(tok) ? tok : vlookup(V.rank, tok);
    if (!r) return null;
    return [{ v: r, w: 1 }].concat((RANK_SIB[r] || []).map(([v, w]) => ({ v, w })));
}

function isKnownWord(w) {
    return /^[a-h][1-8]$/.test(w) || vlookup(V.file, w) !== undefined || vlookup(V.rank, w) !== undefined || vlookup(V.piece, w) !== undefined;
}

function splitCompound(w) {
    for (let p = 1; p < w.length; p++) {
        const l = w.slice(0, p), r = w.slice(p);
        if (vlookup(V.file, l) !== undefined && vlookup(V.rank, r) !== undefined) return [l, r];
    }
    return null;
}

function tokenizeSpeech(text) {
    let t = normText(text).replace(/[,.;:!?()\[\]"'“”‘’\-_/\\]+/g, ' ');
    t = t.replace(/([^\d\s])(\d)/g, '$1 $2').replace(/(\d)([^\d\s])/g, '$1 $2');
    const out = [];
    for (const w of t.split(/\s+/).filter(Boolean)) {
        if (isKnownWord(w)) { out.push(w); continue; }
        const sp = splitCompound(w);
        if (sp) out.push(...sp); else out.push(w);
    }
    return out;
}

function slotFrom(fc, rc) {
    const out = [];
    for (const f of fc) for (const r of rc) out.push({ sq: f.v + r.v, w: f.w * r.w });
    return out;
}

function extractSlots(tokens) {
    const slots = [];
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (/^[a-h][1-8]$/.test(t)) { slots.push(slotFrom(fileCands(t[0]), rankCands(t[1]))); continue; }
        const fc = fileCands(t);
        if (fc && i + 1 < tokens.length) {
            const rc = rankCands(tokens[i + 1]);
            if (rc) { slots.push(slotFrom(fc, rc)); i++; }
        }
    }
    return slots;
}

function parseMoveSpeech(text) {
    const tokens = tokenizeSpeech(text);
    let piece = null;
    for (const t of tokens) {
        const pc = pieceCands(t);
        if (pc && (!piece || pc[0].w > piece[0].w)) piece = pc;
        if (piece && piece[0].w === 1) break;
    }
    return {
        tokens,
        slots: extractSlots(tokens),
        piece,
        compact: String(text || '').toLowerCase().replace(/[^a-z0-9=\-+#]/g, '')
    };
}


// ---------- 8.0 state "wash-out": nothing stale survives a bad input ----------
const READY_TEXT = '⚔ Ready — Say your move! (e.g. "e2 e4" or "കുതിര f3")';
const YES_WORDS = ['ശരി', 'ശെരി', 'അതെ', 'ഓകെ', 'ഓക്കെ', 'യെസ്', 'സമ്മതം', 'yes', 'ok', 'okay', 'correct', 'confirm', 'right', 'yeah'];

function restoreBanner() {
    const d = document.getElementById('command-display');
    if (!d || !App.chess || App.isIntroPlaying || App.isBotThinking) return;
    const st = App.stagedMove || {};
    if (VOICE.confirm || VOICE.pendingChoice) return;
    if (st.from) d.textContent = `📍 ${PIECE_NAMES_EN[(App.chess.get(st.from) || {}).type] || 'Piece'} (${st.from}) selected. Say target square.`;
    else if (st.piece) d.textContent = `♟️ ${PIECE_NAMES_EN[st.piece]} selected. Say square.`;
    else d.textContent = READY_TEXT;
    d.style.opacity = '1';
}

function clearConfirm() {
    VOICE.confirm = null;
    clearHighlights();
}

function washStale() {
    if (!App.chess) return;
    const now = Date.now();
    const st = App.stagedMove || {};
    const sig = (st.piece || '') + (st.from || '') + (st.to || '');
    if (sig !== VOICE.stagedSig) { VOICE.stagedSig = sig; VOICE.stagedAt = now; }
    else if (sig && now - VOICE.stagedAt > 10000) {          // half-finished selection: forget it
        resetStagedMove(); VOICE.stagedSig = ''; restoreBanner();
    }
    if (VOICE.pendingChoice && now > VOICE.pendingChoice.until) { VOICE.pendingChoice = null; clearHighlights(); restoreBanner(); }
    if (VOICE.confirm && now > VOICE.confirm.until) { clearConfirm(); restoreBanner(); }
    // "🎤 …" interim text that never turned into an action
    const d = document.getElementById('command-display');
    if (d && now - (VOICE.lastResultAt || 0) > 2500 && /^🎤/.test(d.textContent || '')) restoreBanner();
}
setInterval(washStale, 400);

// ---------- 8.0b learning your pronunciation ----------
// When you confirm a move that needed a sound-alike guess, remember which
// spoken word meant which letter/number. Applied after 2 consistent
// observations; stored only in this browser (localStorage).
const LEARN_KEY = 'chess_voice_aliases_v1';
let LEARNED = { file: {}, rank: {} };
try { LEARNED = JSON.parse(localStorage.getItem(LEARN_KEY)) || LEARNED; } catch (e) { }
function applyLearned() {
    for (const kind of ['file', 'rank']) {
        for (const k in (LEARNED[kind] || {})) {
            const e = LEARNED[kind][k];
            if (e && e.n >= 2) V[kind].set(k, e.v);
        }
    }
}
function learnFrom(heard, from, to, stagedFrom) {
    try {
        if (!heard) return;
        const toks = tokenizeSpeech(heard), pairs = [];
        for (let i = 0; i + 1 < toks.length; i++) {
            if (/^[a-h][1-8]$/.test(toks[i])) { pairs.push([null, null, toks[i]]); continue; }
            if (fileCands(toks[i]) && rankCands(toks[i + 1])) { pairs.push([toks[i], toks[i + 1], null]); i++; }
        }
        const targets = pairs.length >= 2 ? [from, to] : pairs.length === 1 ? [stagedFrom ? from : to] : [];
        pairs.slice(0, targets.length).forEach((p, idx) => {
            const sq = targets[idx];
            const lit = [[p[0], 'file', sq[0]], [p[1], 'rank', sq[1]]];
            for (const [tok, kind, want] of lit) {
                if (!tok || tok.length < (kind === 'file' ? 2 : 1) || /^[a-z]$/i.test(tok) || /^\d$/.test(tok)) continue;
                const key = vkey(tok);
                if (vlookup(V[kind], tok) === want) continue;       // already understood correctly
                const e = LEARNED[kind][key];
                if (e && e.v === want) e.n++; else LEARNED[kind][key] = { v: want, n: 1 };
            }
        });
        localStorage.setItem(LEARN_KEY, JSON.stringify(LEARNED));
        applyLearned();
    } catch (e) { }
}
function resetVoiceLearning() {
    LEARNED = { file: {}, rank: {} };
    try { localStorage.removeItem(LEARN_KEY); } catch (e) { }
    showToast('Voice learning cleared', 'info');
    setTimeout(() => location.reload(), 600);
}

// ---------- 8.2 matching speech against legal moves ----------
function altWeight(a, idx) {
    const c = a.conf > 0 ? 0.7 + 0.3 * a.conf : 0.9;
    return Math.max(0.5, 1 - 0.08 * idx) * c;
}

function genCandidates(p, legal, staged) {
    const moves = [], selects = [];
    let pieceOnly = null;
    const sl = p.slots;
    const pieceMatchW = type => (!p.piece ? 1 : (p.piece.find(x => x.v === type) || { w: 0 }).w);
    const turn = App.chess.turn();

    if (sl.length >= 2) {
        for (const a of sl[0]) for (const b of sl[1]) {
            const m = legal.find(x => x.from === a.sq && x.to === b.sq);
            if (!m) continue;
            const pw = p.piece ? Math.max(0.55, pieceMatchW(m.piece)) : 1;
            moves.push({ m, score: a.w * b.w * pw, fuzzy: a.w * b.w < 1 });
        }
    } else if (sl.length === 1) {
        for (const a of sl[0]) {
            const fz = a.w < 1;
            if (staged.from) {
                legal.filter(x => x.from === staged.from && x.to === a.sq)
                    .forEach(m => moves.push({ m, score: a.w * 1.15, fuzzy: fz }));
            }
            const spokenPiece = !!p.piece;
            const wantPiece = p.piece || (staged.piece ? [{ v: staged.piece, w: 1 }] : null);
            const before = moves.length;
            if (wantPiece) {
                for (const pc of wantPiece) {
                    legal.filter(x => x.piece === pc.v && x.to === a.sq)
                        .forEach(m => moves.push({ m, score: a.w * pc.w, fuzzy: fz || pc.w < 1 }));
                }
            }
            if (!wantPiece || (!spokenPiece && moves.length === before)) {
                const pawn = legal.filter(x => x.piece === 'p' && x.to === a.sq);
                if (pawn.length) pawn.forEach(m => moves.push({ m, score: a.w, fuzzy: fz }));
                else legal.filter(x => x.to === a.sq).forEach(m => moves.push({ m, score: a.w * 0.85, fuzzy: true }));
            }
            // selecting one of our own pieces by its square
            const pc = App.chess.get(a.sq);
            if (pc && pc.color === turn && legal.some(x => x.from === a.sq)) {
                const okPiece = !p.piece || p.piece.some(x => x.v === pc.type);
                if (okPiece) selects.push({ sq: a.sq, piece: pc.type, score: a.w, fuzzy: fz });
            }
        }
    } else if (p.piece) {
        pieceOnly = p.piece[0];
    }

    // Direct SAN fallback: "nf3", "bc4", "o-o", "exd5"
    if (!moves.length && !selects.length && p.compact.length >= 2 &&
        /^([a-h]?[nbrqk]?x?[a-h][1-8](=[qrbn])?|o-o(-o)?)$/.test(p.compact)) {
        const variants = [
            p.compact.replace(/^([nbrqk])(?=[a-h]|x)/, m => m.toUpperCase()),
            p.compact.replace(/^o-o(-o)?$/, s => s.toUpperCase()),
            p.compact
        ];
        for (const v of variants) {
            try {
                const r = new Chess(App.chess.fen()).move(v, { sloppy: true });
                const m = r && legal.find(x => x.from === r.from && x.to === r.to);
                if (m) { moves.push({ m, score: 0.9, fuzzy: false }); break; }
            } catch (e) { }
        }
    }
    return { moves, selects, pieceOnly };
}

function detectCommand(text) {
    const modalOpen = !!document.querySelector('.modal-overlay.active');
    if (modalOpen && (matchCommand(text, ML_COMMANDS.close) || matchCommand(text, ML_COMMANDS.cancel))) return 'close';
    if (App.pendingPromotion) return null;
    const order = ['cancel', 'help', 'undo', 'resign', 'hint', 'settings', 'history', 'flip', 'castle',
        'newGame', 'friendGame', 'easy', 'medium', 'hard', 'stopListening', 'startListening', 'soundToggle'];
    for (const n of order) if (matchCommand(text, ML_COMMANDS[n])) return n;
    if (modalOpen && matchCommand(text, ML_COMMANDS.startGame)) return 'startGame';
    return null;
}

function matchCommand(text, commands) {
    const t = ' ' + normText(text).replace(/[.,!?;:]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
    const squeezed = t.replace(/ /g, '');
    return commands.some(cmd => {
        const c = normText(cmd).trim();
        if (!c) return false;
        if (/^[a-z0-9 ]+$/.test(c)) return t.includes(' ' + c + ' ');
        return t.includes(c) || squeezed.includes(c.replace(/ /g, ''));
    });
}

// Pure function: no side effects, safe to call on every interim result.
function interpretUtterance(alts) {
    if (!alts.length) return { kind: 'none' };

    // Promotion prompt: only a piece name makes sense
    if (App.pendingPromotion) {
        for (const a of alts) {
            for (const t of tokenizeSpeech(a.text)) {
                const pc = pieceCands(t);
                if (pc && 'qrbn'.includes(pc[0].v)) return { kind: 'promotion', piece: pc[0].v };
            }
        }
        return { kind: 'promotion', piece: null };
    }

    // Confirmation pending ("e2 → e4 ?  say ശരി / വേണ്ട")
    const cf = VOICE.confirm;
    if (cf && Date.now() < cf.until) {
        for (const a of alts) {
            if (matchCommand(a.text, YES_WORDS)) return { kind: 'confirm-yes' };
        }
        for (const a of alts) {
            if (matchCommand(a.text, ML_COMMANDS.cancel) || matchCommand(a.text, ['തെറ്റ്', 'തെറ്റാണ്', 'wrong'])) return { kind: 'confirm-no' };
        }
    }

    // Choice pending ("1 or 2?")
    const pc = VOICE.pendingChoice;
    if (pc && Date.now() < pc.until) {
        for (const a of alts) {
            const toks = tokenizeSpeech(a.text);
            const ranks = toks.map(t => rankCands(t)).filter(Boolean);
            const hasOther = toks.some(t => fileCands(t) || pieceCands(t));
            if (ranks.length && !hasOther) {
                const idx = parseInt(ranks[0][0].v, 10) - 1;
                if (pc.options[idx]) return { kind: 'move', ...pc.options[idx], certain: true, fromChoice: true, heard: pc.heard };
            }
        }
    }

    const staged = App.stagedMove || {};
    const legal = App.chess.moves({ verbose: true });

    const c0 = detectCommand(alts[0].text);
    if (c0) return { kind: 'command', name: c0, text: alts[0].text };

    const parses = alts.map((a, i) => ({ w: altWeight(a, i), p: parseMoveSpeech(a.text) }));
    const agg = new Map(), sel = new Map();
    let pieceOnly = null;

    for (const { w, p } of parses) {
        const g = genCandidates(p, legal, staged);
        for (const c of g.moves) {
            const key = c.m.from + c.m.to;
            let s = c.score * w;
            if (pc && Date.now() < pc.until && pc.options.some(o => o.from + o.to === key)) s *= 1.3;
            const e = agg.get(key);
            if (!e) agg.set(key, { from: c.m.from, to: c.m.to, piece: c.m.piece, score: s, support: 1, fuzzy: c.fuzzy });
            else { e.score = Math.max(e.score, s); e.support++; e.fuzzy = e.fuzzy && c.fuzzy; }
        }
        for (const s of g.selects) {
            const e = sel.get(s.sq);
            const sc = s.score * w;
            if (!e || sc > e.score) sel.set(s.sq, { sq: s.sq, piece: s.piece, score: sc });
        }
        if (g.pieceOnly && (!pieceOnly || g.pieceOnly.w > pieceOnly.w)) pieceOnly = g.pieceOnly;
    }

    const list = [...agg.values()]
        .map(e => ({ ...e, score: e.score + 0.08 * (e.support - 1) }))
        .sort((a, b) => b.score - a.score);
    const bestSel = [...sel.values()].sort((a, b) => b.score - a.score)[0];

    // A literal "select my piece on this square" beats a fuzzy guess
    if (bestSel && bestSel.score >= 0.9 && (!list.length || list[0].score < 0.7)) {
        return { kind: 'select', sq: bestSel.sq, piece: bestSel.piece };
    }

    if (list.length && list[0].score >= 0.22) {
        const best = list[0], second = list[1];
        // Two literal readings: trust the recogniser's own ranking/confidence.
        // Anything involving a sound-alike guess needs a clearer lead.
        const need = (best.fuzzy || (second && second.fuzzy)) ? 1.35 : 1.05;
        if (!second || best.score >= second.score * need) {
            return { kind: 'move', ...best, certain: !best.fuzzy && best.score >= 0.7, single: parses[0].p.slots.length === 1 };
        }
        return { kind: 'choose', options: list.filter(e => e.score >= best.score * 0.5).slice(0, 3) };
    }
    if (bestSel) return { kind: 'select', sq: bestSel.sq, piece: bestSel.piece };
    if (pieceOnly) return { kind: 'piece', piece: pieceOnly.v };

    // Commands heard only in lower-ranked alternatives
    for (let i = 1; i < alts.length; i++) {
        const c = detectCommand(alts[i].text);
        if (c) return { kind: 'command', name: c, text: alts[i].text };
    }

    // Clear-but-illegal move (reported explicitly, not as "not understood")
    const p0 = parses[0].p;
    if (p0.slots.length >= 2) return { kind: 'illegal', from: p0.slots[0][0].sq, to: p0.slots[1][0].sq };
    if (p0.slots.length === 1) return { kind: 'illegal', to: p0.slots[0][0].sq, piece: p0.piece ? p0.piece[0].v : null };
    return { kind: 'none' };
}

// ---------- 8.3 acting on a decision ----------
function playerCanMove() {
    if (App.isBotThinking) { showToast('ദയവായി കാത്തിരിക്കുക — Please wait', 'info'); return false; }
    if (App.gameMode === 'bot' && App.chess.turn() !== App.playerColor) { showToast('ബോട്ടിന്റെ ഊഴം — Bot\'s turn', 'info'); return false; }
    return true;
}

function describeOption(o) {
    return `${PIECE_NAMES_EN[o.piece] || ''} ${o.from}→${o.to}`.trim();
}

function showChoice(options, heard) {
    VOICE.confirm = null;
    VOICE.pendingChoice = { options, heard, until: Date.now() + 9000 };
    clearHighlights();
    options.forEach(o => {
        const f = document.getElementById('sq-' + o.from), t = document.getElementById('sq-' + o.to);
        if (f) f.classList.add('candidate-piece');
        if (t) t.classList.add('legal-move');
    });
    const txt = options.map((o, i) => `${i + 1}) ${describeOption(o)}`).join('   ');
    setCommandText(`🔀 ഏത്? Which one? ${txt} — "ഒന്ന് / രണ്ട്" (1 / 2)`);
    playSelectionSound();
}

function applyOutcome(out, alts, isFinal) {
    const heard = alts[0].text;

    // While our own voice is talking, only accept things that clearly parse
    if (TTS.speaking) {
        if (out.kind === 'none' || out.kind === 'illegal') return;
        window.speechSynthesis.cancel();
        TTS.speaking = false;
    }

    switch (out.kind) {
        case 'command':
            VOICE.failStreak = 0;
            markDone(heard);
            dispatchCommand(out.name, out.text);
            return;

        case 'promotion': {
            if (!out.piece) {
                speakML('ഏത് കരുവാക്കണം? മന്ത്രി, തേര്, ആന, അല്ലെങ്കിൽ കുതിര?', 'Choose Queen, Rook, Bishop, or Knight');
                setCommandText('♛ Promote to: Queen / Rook / Bishop / Knight — മന്ത്രി / തേര് / ആന / കുതിര');
                return;
            }
            const pp = App.pendingPromotion;
            closeModal('modal-promotion');
            App.pendingPromotion = null;
            VOICE.failStreak = 0;
            tryMove(pp.from, pp.to, out.piece);
            return;
        }

        case 'move':
            if (!playerCanMove()) return;
            VOICE.failStreak = 0;
            // Not 100% sure what was said -> show the move and ask, instead of guessing
            if (!out.certain) {
                VOICE.pendingChoice = null;
                VOICE.confirm = { from: out.from, to: out.to, piece: out.piece, heard, until: Date.now() + 7000 };
                clearHighlights();
                const f = document.getElementById('sq-' + out.from), t = document.getElementById('sq-' + out.to);
                if (f) f.classList.add('staged-from');
                if (t) t.classList.add('staged-to');
                setCommandText(`🤔 ${describeOption(out)} ? — "ശരി" (yes) / "വേണ്ട" (no)`);
                playSelectionSound();
                return;
            }
            VOICE.pendingChoice = null;
            VOICE.confirm = null;
            markDone(heard);
            if (out.fromChoice) learnFrom(out.heard, out.from, out.to, false);
            tryMove(out.from, out.to);
            return;

        case 'confirm-yes': {
            const c = VOICE.confirm;
            VOICE.confirm = null;
            if (!c) return;
            VOICE.failStreak = 0;
            markDone(heard);
            learnFrom(c.heard, c.from, c.to, false);
            tryMove(c.from, c.to);
            return;
        }

        case 'confirm-no':
            clearConfirm();
            resetStagedMove();
            setCommandText('❌ റദ്ദാക്കി — Cancelled. Say your move again.');
            return;

        case 'choose':
            if (!playerCanMove()) return;
            showChoice(out.options, heard);
            speakML('ഏതാണ്? ഒന്നോ രണ്ടോ പറയൂ', 'Which one? Say one or two.');
            return;

        case 'select': {
            if (!playerCanMove()) return;
            VOICE.failStreak = 0;
            highlightLegalMoves(out.sq);
            App.stagedMove = { piece: out.piece, from: out.sq, to: null, awaitingConfirmation: false, moveObj: null };
            setCommandText(`📍 ${PIECE_NAMES_EN[out.piece]} (${out.sq}) selected. Say target square.`);
            playSelectionSound();
            return;
        }

        case 'piece': {
            if (!playerCanMove()) return;
            VOICE.failStreak = 0;
            const legal = App.chess.moves({ verbose: true }).filter(m => m.piece === out.piece);
            const froms = [...new Set(legal.map(m => m.from))];
            const nameEN = PIECE_NAMES_EN[out.piece];
            if (!froms.length) {
                setCommandText(`❌ No legal moves for ${nameEN}`);
                return;
            }
            if (froms.length === 1) {
                highlightLegalMoves(froms[0]);
                App.stagedMove = { piece: out.piece, from: froms[0], to: null, awaitingConfirmation: false, moveObj: null };
                setCommandText(`📍 ${nameEN} (${froms[0]}) selected. Say target square.`);
            } else {
                clearHighlights();
                froms.forEach(sq => { const el = document.getElementById('sq-' + sq); if (el) el.classList.add('candidate-piece'); });
                App.stagedMove = { piece: out.piece, from: null, to: null, awaitingConfirmation: false, moveObj: null };
                setCommandText(`♟️ ${nameEN} selected. Say from-square (${froms.join(', ')}).`);
            }
            playSelectionSound();
            return;
        }

        case 'illegal':
            if (!isFinal || !playerCanMove()) return;
            // Silent: no sound. Everything half-selected is cleared so the next
            // command starts from a clean board.
            resetStagedMove(); VOICE.confirm = null; VOICE.pendingChoice = null;
            setCommandText(out.from
                ? `❌ തെറ്റായ നീക്കം: ${out.from} → ${out.to} സാധ്യമല്ല (Illegal Move)`
                : `❌ ${out.to} ലേക്ക് നീക്കം സാധ്യമല്ല (Illegal)`);
            return;

        default:
            if (!isFinal) return;
            noteMiss(heard);
    }
}

function markDone(text) {
    VOICE.lastKey = normText(text);
    VOICE.lastAt = Date.now();
}

function noteMiss(heard) {
    VOICE.failStreak++;
    setCommandText(`❓ കേട്ടത്: “${heard}” — വീണ്ടും പറയൂ. Try: "e2 e4" / "കുതിര f3"`);
}

function switchRecognitionLang() {
    // Auto mode listens in both languages; it no longer swaps one language for the other.
    setRecognitionMode('auto');
}

function setRecognitionMode(lang) {
    if (lang === 'auto') {
        VOICE.auto = true;
        VOICE.lang = 'ml-IN';
    } else {
        VOICE.auto = false;
        VOICE.lang = lang;
    }
    App.voiceLang = lang;
    VOICE.failStreak = 0;
    stopRecognitionSessions();
    if (App.isListening) startRecognitionSessions();
}

// ---------- 8.4 command dispatcher ----------
function dispatchCommand(name, text) {
    setCommandText('🎤 "' + text + '"');
    switch (name) {
        case 'close':
            closeAllModals();
            speakML('അടച്ചു. കളി തുടരാം.', 'Closed. Let us continue the game.');
            setCommandText('⚔ Ready — Say your move! / നീക്കം പറയൂ!');
            return;
        case 'cancel':
            resetStagedMove();
            VOICE.pendingChoice = null;
            setCommandText('❌ Selection cleared. Say piece or square.');
            showToast('Cleared / റദ്ദാക്കി', 'info');
            return;
        case 'help': handleHelp(); return;
        case 'undo': handleUndo(); return;
        case 'resign': handleResign(); return;
        case 'hint': showHintToUser(); return;
        case 'settings':
            closeAllModals(); openModal('modal-settings');
            showToast('⚙ Settings opened / സെറ്റിംഗ്സ്', 'info'); return;
        case 'history':
            closeAllModals(); openModal('modal-history');
            showToast('📜 Move history / നീക്കങ്ങൾ', 'info'); return;
        case 'flip':
            App.isBoardFlipped = !App.isBoardFlipped;
            document.getElementById('chess-board').classList.toggle('flipped', App.isBoardFlipped);
            showToast('🔄 Board flipped / ബോർഡ് തിരിച്ചു', 'info'); return;
        case 'castle': handleCastle(text); return;
        case 'newGame':
            closeAllModals();
            App.gameMode = 'bot'; App.playerColor = 'w';
            document.getElementById('white-name').textContent = 'You / നിങ്ങൾ';
            document.getElementById('white-subtitle').textContent = 'Player';
            document.getElementById('black-name').textContent = 'Bot / ബോട്ട്';
            document.getElementById('black-subtitle').textContent = getbotTitle();
            initGame(); startTimer();
            showToast('⚔ New game started!', 'success');
            speakML('പുതിയ കളി ആരംഭിച്ചു. നിങ്ങളുടെ ഊഴം.', 'New game started. Your turn.');
            return;
        case 'friendGame':
            App.gameMode = 'friend'; App.playerColor = 'w';
            document.getElementById('white-name').textContent = 'Player 1';
            document.getElementById('white-subtitle').textContent = 'White / വെള്ള';
            document.getElementById('black-name').textContent = 'Player 2';
            document.getElementById('black-subtitle').textContent = 'Black / കറുപ്പ്';
            closeAllModals(); initGame(); startTimer();
            showToast('👥 Friend game started!', 'success');
            speakML('സുഹൃത്തിനോടൊപ്പമുള്ള കളി ആരംഭിച്ചു. വെള്ളയുടെ ഊഴം.', 'Friend game started. White turn.');
            return;
        case 'easy':
            App.botDepth = 2;
            showToast('🟢 Easy mode / എളുപ്പം', 'info');
            speakML('എളുപ്പം മോഡ് സെറ്റ് ചെയ്തു', 'Easy mode set.');
            document.getElementById('black-subtitle').textContent = 'Beginner / തുടക്കക്കാരൻ'; return;
        case 'medium':
            App.botDepth = 4;
            showToast('🟡 Medium mode / ഇടത്തരം', 'info');
            speakML('ഇടത്തരം മോഡ് സെറ്റ് ചെയ്തു', 'Medium mode set.');
            document.getElementById('black-subtitle').textContent = 'Intermediate / ഇടത്തരം'; return;
        case 'hard':
            App.botDepth = 6;
            showToast('🔴 Hard mode / കഠിനം', 'info');
            speakML('കഠിനം മോഡ് സെറ്റ് ചെയ്തു', 'Hard mode set.');
            document.getElementById('black-subtitle').textContent = 'Expert / വിദഗ്ധൻ'; return;
        case 'stopListening':
            speakML('മൈക്ക് ഓഫ് ചെയ്യുന്നു', 'Microphone stopping.');
            setTimeout(() => stopListening(), 1500); return;
        case 'startListening':
            startListening();
            speakML('കേൾക്കുന്നു', 'Listening started');
            showToast('🎤 Microphone active / മൈക്ക് ഓൺ', 'info'); return;
        case 'soundToggle': {
            App.soundEnabled = !App.soundEnabled;
            document.querySelectorAll('#sound-selector .diff-option').forEach(b => {
                b.classList.toggle('selected', (b.dataset.sound === 'on') === App.soundEnabled);
            });
            showToast(App.soundEnabled ? '🔊 Sound enabled / ശബ്ദം ഓൺ' : '🔇 Sound muted / ശബ്ദം ഓഫ്', 'info');
            if (App.soundEnabled) speakML('ശബ്ദം ഓൺ ചെയ്തു', 'Sound turned on');
            return;
        }
        case 'startGame': {
            const ng = document.getElementById('modal-new-game'), fg = document.getElementById('modal-friend-game');
            if (ng && ng.classList.contains('active')) document.getElementById('start-bot-game').click();
            else if (fg && fg.classList.contains('active')) document.getElementById('start-friend-game').click();
            return;
        }
    }
}

function handleCastle(text) {
    const wantQ = matchCommand(text, ML_COMMANDS.castleQueen);
    const wantK = matchCommand(text, ML_COMMANDS.castleKing);
    if (!playerCanMove()) return;
    const legal = App.chess.moves({ verbose: true });
    const k = legal.find(m => m.flags.includes('k'));
    const q = legal.find(m => m.flags.includes('q'));
    let pick = wantQ ? q : wantK ? k : null;
    if (!pick && !wantQ && !wantK) {
        if (k && q) { showChoice([k, q]); return; }
        pick = k || q;
    }
    if (pick) { tryMove(pick.from, pick.to); return; }
    showToast('കോട്ട കെട്ടാൻ സാധ്യമല്ല — Cannot castle', 'warning');
    setCommandText('❌ കോട്ട കെട്ടാൻ സാധ്യമല്ല (Cannot castle)');
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
}

// ---------- 8.5 recogniser lifecycle ----------
function collectAlts(res) {
    const out = [];
    for (let j = 0; j < res.length; j++) {
        const t = (res[j].transcript || '').trim();
        if (t && !out.some(o => o.text === t)) out.push({ text: t, conf: res[j].confidence || 0 });
    }
    return out;
}


// Android Chrome (continuous mode) re-sends everything said so far in every
// result ("e2 e4 e7 e5 ..."). Remove the part we already handled.
function stripAccumulated(alts, previousFinal = '') {
    const prev = previousFinal;
    if (!prev) return alts;
    return alts.map(a => {
        const low = a.text.toLowerCase();
        if (low.length > prev.length && low.startsWith(prev)) return { text: a.text.slice(prev.length).trim() || a.text, conf: a.conf, raw: a.text };
        return { text: a.text, conf: a.conf, raw: a.text };
    });
}

function restartRecognition() {
    if (!App.isListening || App.isIntroPlaying) return;
    startRecognitionSessions();
}

function initVoice() {
    applyLearned();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showToast('Speech recognition not supported. Use Chrome.', 'error');
        document.getElementById('mic-status').textContent = 'Not supported';
        return;
    }

    App.voiceLang = 'auto';
    VOICE.auto = true;
    VOICE.lang = 'ml-IN';
    App.recognitions = {};
    App.recognition = null;
    App.recognitionRunning = false;

    const handleResult = (language, event) => {
        if (App.isIntroPlaying) return;
        VOICE.restartDelay = 60;
        VOICE.lastResultAt = Date.now();
        const session = App.recognitions[language];
        if (!session) return;

        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (session.handled.has(i)) continue;
            const res = event.results[i];
            const alts = stripAccumulated(collectAlts(res), session.prevFinal);
            if (!alts.length) continue;
            DIAG.counts.result++;

            if (res.isFinal) {
                clearTimeout(VOICE.stableTimer);
                VOICE.stableText = '';
                session.handled.add(i);
                session.prevFinal = (alts[0].raw || alts[0].text).toLowerCase();
                // Same words just executed (Android re-emits results)? ignore.
                const finalKey = normText(alts[0].text);
                if (finalKey === VOICE.lastKey && Date.now() - VOICE.lastAt < 1200) { restoreBanner(); continue; }
                if (session.lastFinalKey === finalKey && Date.now() - session.lastFinalAt < 1200) continue;
                session.lastFinalKey = finalKey;
                session.lastFinalAt = Date.now();
                setCommandText('🎤 "' + alts[0].text + '"');
                const out = interpretUtterance(alts);
                console.debug('[voice:' + language + '] final', alts, out);
                diagLog(alts, out, true, language);
                applyOutcome(out, alts, true);
            } else {
                setCommandText('🎤 ' + alts[0].text, true);
                scheduleInterim(language + ':' + i, alts);
            }
        }
    };

    const createRecognition = language => {
        const recognition = new SpeechRecognition();
        const session = { recognition, language, handled: new Set(), prevFinal: '', running: false, failed: false, lastFinalKey: '', lastFinalAt: 0 };
        recognition.lang = language;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 5;
        recognition.onaudiostart = () => { DIAG.counts.audio++; };
        recognition.onsoundstart = () => { DIAG.counts.sound++; };
        recognition.onspeechstart = () => { DIAG.counts.speech++; };
        recognition.onnomatch = () => { DIAG.counts.nomatch++; };
        recognition.onstart = () => {
            DIAG.counts.start++;
            session.prevFinal = '';
            session.handled.clear();
            session.running = true;
            session.failed = false;
            App.recognitionRunning = Object.values(App.recognitions).some(s => s.running);
            updateMicUI(true);
        };
        recognition.onend = () => {
            DIAG.counts.end++;
            session.running = false;
            App.recognitionRunning = Object.values(App.recognitions).some(s => s.running);
            clearTimeout(VOICE.stableTimer);
            if (!App.isListening) { updateMicUI(false); return; }
            recoverRecognitionIfNeeded();
            clearTimeout(session.restartTimer);
            session.restartTimer = setTimeout(restartRecognition, VOICE.restartDelay);
        };
        recognition.onerror = event => {
            console.warn('Speech error (' + language + '):', event.error);
            if (event.error !== 'no-speech' && event.error !== 'aborted') {
                DIAG.err = language + ': ' + event.error + ' @ ' + new Date().toLocaleTimeString();
                if (event.error !== 'language-not-supported') showToast('🎙 Speech error: ' + event.error, 'warning');
            }
            if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                session.failed = true;
                session.running = false;
                App.recognitionRunning = Object.values(App.recognitions).some(s => s.running);
                if (!App.recognitionRunning) {
                    showToast('Microphone access denied. Please allow microphone.', 'error');
                    App.isListening = false;
                    updateMicUI(false);
                }
            } else if (event.error === 'network' || event.error === 'audio-capture') {
                session.failed = true;
                VOICE.restartDelay = 1500;
                if (Date.now() - VOICE.lastNetToast > 10000) {
                    VOICE.lastNetToast = Date.now();
                    showToast(event.error === 'network' ? 'Speech service needs internet — reconnecting…' : 'Microphone not available — reconnecting…', 'warning');
                }
            }
        };
        recognition.onresult = event => handleResult(language, event);
        App.recognitions[language] = session;
        return session;
    };

    createRecognition('ml-IN');
    createRecognition('en-IN');
    App.recognition = App.recognitions['ml-IN'].recognition;
    document.getElementById('mic-button').addEventListener('click', toggleListening);
    startListening();
}

function startRecognitionSessions() {
    const languages = [VOICE.auto ? 'ml-IN' : VOICE.lang];
    for (const language of languages) {
        const session = App.recognitions && App.recognitions[language];
        if (!session || session.running) continue;
        try { session.recognition.start(); } catch (e) { /* already starting */ }
    }
    App.recognitionRunning = languages.some(language => App.recognitions[language] && App.recognitions[language].running);
}

function recoverRecognitionIfNeeded() {
    const sessions = Object.values(App.recognitions || {});
    if (!App.isListening || !VOICE.auto || !sessions.length || sessions.some(session => session.running) || !sessions.every(session => session.failed)) return;
    const fallback = App.recognitions['ml-IN'] || sessions[0];
    fallback.failed = false;
    VOICE.auto = false;
    VOICE.lang = fallback.language;
    App.voiceLang = fallback.language;
    showToast('Parallel voice mode unavailable; using ' + fallback.language, 'warning');
    startRecognitionSessions();
}

function stopRecognitionSessions() {
    clearTimeout(VOICE.restartTimer);
    for (const session of Object.values(App.recognitions || {})) {
        clearTimeout(session.restartTimer);
        session.running = false;
        try { session.recognition.stop(); } catch (e) { }
    }
    App.recognitionRunning = false;
}

// Interim results: act only on a COMPLETE, literal, legal move that has
// stayed unchanged for a moment (so half-spoken words are never executed).
function scheduleInterim(i, alts) {
    const out = interpretUtterance(alts);
    const quick = (out.kind === 'move' && out.certain) || out.kind === 'confirm-yes' || out.kind === 'confirm-no' ||
        (out.kind === 'command' && ['undo', 'hint', 'help', 'cancel', 'close', 'resign', 'newGame'].includes(out.name));
    if (!quick) {
        clearTimeout(VOICE.stableTimer);
        VOICE.stableText = '';
        return;
    }
    const key = alts[0].text;
    if (VOICE.stableText === key) return;           // already waiting on this exact text
    clearTimeout(VOICE.stableTimer);
    VOICE.stableText = key;
    VOICE.stableTimer = setTimeout(() => {
        if (VOICE.handled.has(i)) return;
        VOICE.handled.add(i);
        VOICE.stableText = '';
        const fresh = interpretUtterance(alts);     // state may have changed
        console.debug('[voice] interim', alts, fresh);
        diagLog(alts, fresh, false);
        applyOutcome(fresh, alts, false);
    }, out.kind === 'move' && out.single ? 450 : 260);
}


// ---------- 8.6 live diagnostics (tap the 🐞 button, bottom-left) ----------
const DIAG = { rows: [], err: '-', counts: { audio: 0, sound: 0, speech: 0, result: 0, nomatch: 0, start: 0, end: 0 }, panel: null, box: null };

function diagLog(alts, out, isFinal, language = VOICE.lang) {
    const d = out ? (out.kind === 'move' ? `MOVE ${out.from}${out.to}` : out.kind === 'command' ? `CMD ${out.name}` :
        out.kind === 'select' ? `SELECT ${out.sq}` : out.kind === 'piece' ? `PIECE ${out.piece}` :
        out.kind === 'choose' ? 'ASK ' + out.options.map(o => o.from + o.to).join('/') : out.kind.toUpperCase()) : '-';
    DIAG.rows.unshift(`${isFinal ? 'FINAL' : 'interim'} [${language}] → ${d}\n   ` +
        alts.map(a => `"${a.text}" (${a.conf.toFixed(2)})`).join(' | '));
    DIAG.rows.length = Math.min(DIAG.rows.length, 25);
    diagRender();
}

function diagRender() {
    if (!DIAG.box) return;
    const c = DIAG.counts;
    DIAG.box.textContent =
        `page: ${location.protocol}//${location.host || '(file)'}\n` +
        `lang: ${VOICE.auto ? 'ml-IN (stable)' : VOICE.lang}  listening: ${App.isListening}  running: ${App.recognitionRunning}\n` +
        `mic events → start:${c.start} audio:${c.audio} sound:${c.sound} speech:${c.speech} result:${c.result} nomatch:${c.nomatch} end:${c.end}\n` +
        `last error: ${DIAG.err}\n` +
        `------------------------------\n` + (DIAG.rows.join('\n') || 'Speak a move… nothing heard yet');
}

function initDiagnostics() {
    const btn = document.createElement('button');
    btn.textContent = '🐞';
    btn.title = 'Voice diagnostics';
    btn.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:99999;width:38px;height:38px;border-radius:50%;border:1px solid #d4af37;background:#1a1208;color:#fff;font-size:18px;cursor:pointer;opacity:.85';
    const panel = document.createElement('div');
    panel.style.cssText = 'position:fixed;left:8px;bottom:54px;z-index:99999;width:min(440px,94vw);max-height:55vh;overflow:auto;display:none;background:#0d0a06ee;color:#fff5be;border:1px solid #d4af37;border-radius:8px;padding:8px;font:12px/1.35 monospace;white-space:pre-wrap';
    const box = document.createElement('div');
    const copy = document.createElement('button');
    copy.textContent = 'Copy log';
    copy.style.cssText = 'margin-bottom:6px;padding:3px 10px;cursor:pointer';
    copy.onclick = () => { try { navigator.clipboard.writeText(box.textContent); copy.textContent = 'Copied ✔'; } catch (e) { } };
    const rl = document.createElement('button');
    rl.textContent = 'Reset learning';
    rl.style.cssText = 'margin:0 0 6px 6px;padding:3px 10px;cursor:pointer';
    rl.onclick = () => { if (confirm('Forget learned pronunciations?')) resetVoiceLearning(); };
    panel.appendChild(copy); panel.appendChild(rl); panel.appendChild(box);
    document.body.appendChild(btn); document.body.appendChild(panel);
    DIAG.panel = panel; DIAG.box = box;
    btn.onclick = () => { panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; diagRender(); };
    setInterval(() => { if (panel.style.display !== 'none') diagRender(); }, 1000);

    if (location.protocol === 'file:') {
        showToast('⚠ Page opened as a file. Run "python -m http.server 8000" and open http://localhost:8000 — voice is unreliable from file://', 'error');
        DIAG.err = 'file:// page – Chrome re-asks / blocks the microphone. Use http://localhost';
    }
}

function toggleListening() {
    if (App.isListening) stopListening(); else startListening();
}

function startListening() {
    if (!App.recognitions || !Object.keys(App.recognitions).length) {
        showToast('Speech recognition not available', 'error');
        return;
    }
    App.isListening = true;
    const languages = VOICE.auto ? ['ml-IN', 'en-IN'] : [VOICE.lang];
    languages.forEach(language => {
        if (App.recognitions[language]) App.recognitions[language].failed = false;
    });
    startRecognitionSessions();
    updateMicUI(true);
}

function stopListening() {
    App.isListening = false;
    stopRecognitionSessions();
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
    clearTimeout(App.botTimer);                 // bot reply not played yet? cancel it
    VOICE.pendingChoice = null;
    VOICE.confirm = null;
    const hist = App.chess.history().length;
    if (hist === 0) {
        setCommandText('↩ പിൻവലിക്കാൻ നീക്കങ്ങളില്ല — Nothing to undo');
        return;
    }
    if (App.gameMode === 'bot') {
        // It is the player's turn -> take back bot reply AND own move; otherwise only own move
        const n = (App.chess.turn() === App.playerColor) ? Math.min(2, hist) : 1;
        for (let i = 0; i < n; i++) App.chess.undo();
    } else {
        App.chess.undo();
    }
    App.isBotThinking = false;
    showThinking(false);

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

    if (App.gameMode === 'bot' && !App.chess.game_over() && App.chess.turn() !== App.playerColor) {
        App.botTimer = setTimeout(() => botMove(), 500);
    }
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

    // Language selector (auto | ml-IN | en-IN)
    document.querySelectorAll('#lang-selector .diff-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#lang-selector .diff-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            setRecognitionMode(btn.dataset.lang);
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

    // Coach Mode selector
    document.querySelectorAll('#coach-selector .diff-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#coach-selector .diff-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            App.coachMode = btn.dataset.coach === 'on';
            showToast(App.coachMode ? '🎓 Coach Mode ON / കോച്ച് സജീവം' : '⚡ Coach Mode OFF / കോച്ച് ഓഫാക്കി', 'info');
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

    // Fast auto-restore banner to ready state after error/fault move so user can move instantly
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
        }, 1500);
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

// One shared AudioContext: creating/closing a context per sound is slow and
// makes the browser re-route audio, which disturbs the open microphone.
let _audioCtx = null;
function getAudioCtx() {
    try {
        if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (_audioCtx.state === 'suspended') _audioCtx.resume();
        return _audioCtx;
    } catch (e) { return null; }
}

function playGameStartSound() {
    try {
        const ctx = getAudioCtx();
        if (!ctx) return;
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
    } catch (e) {}
}

function playSelectionSound() {
    try {
        const ctx = getAudioCtx();
        if (!ctx) return;
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
    } catch (e) {}
}

function playErrorSound() {
    try {
        const ctx = getAudioCtx();
        if (!ctx) return;
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
    } catch (e) {}
}

function playMoveSound(move) {
    try {
        const ctx = getAudioCtx();
        if (!ctx) return;
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
    } catch (e) {}
}


// ============================================================
// 16. SCREEN WAKE LOCK
// ============================================================

async function initWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            App.wakeLock = await navigator.wakeLock.request('screen');
        } catch (e) {
            console.log('Wake Lock not available:', e);
        }
    }
}

document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && 'wakeLock' in navigator) {
        try {
            App.wakeLock = await navigator.wakeLock.request('screen');
        } catch (e) {}
    }
});