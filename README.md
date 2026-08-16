Malayalam Voice-Controlled Chess Game — "ചതുരംഗം" (Chathurangam)
A fully voice-controlled, Malayalam-first chess web application for a handicapped user who cannot interact with a traditional chess board but can speak. The app features a medieval/fantasy themed UI inspired by the reference image, with bot play (Stockfish), learning tips, and friend play support.

Background
The target user:

Cannot use mouse/keyboard/touchscreen to play chess
Can speak fluently in Malayalam
Wants to learn chess (tips, tricks, blunder warnings)
Wants to play against bots at various difficulty levels
Wants to play with friends
Proposed Changes
Technology Stack
Layer	Technology	Why
UI	Vanilla HTML/CSS/JS (single-page app)	No build tools needed, instant deployment
Chess Logic	chess.js (CDN)	Move validation, game state, PGN/FEN support
Chess Board	Custom CSS/SVG board	Medieval theme matching reference image
Chess Engine	stockfish.js single-thread WASM (CDN)	Bot opponent, move evaluation, no server needed
Voice Input	Web Speech API (ml-IN)	Free Malayalam speech-to-text, works in Chrome
Voice Output	Web Speech Synthesis API	Free Malayalam TTS for speaking moves/hints
Wake Lock	Screen Wake Lock API	Keeps screen on during hands-free play
App Structure — Single HTML + CSS + JS Files
[NEW] index.html
The main HTML file containing:

Medieval/fantasy-themed layout matching the reference image
Player info panels (Black & White with names/ratings)
Game Status panel (Turn, Move #, Time)
Voice Control panel with animated microphone indicator
Hints panel for tips and learning
Bottom scroll bar showing the last spoken command
Bottom toolbar: Menu, History, Settings, Undo, Resign, Guide
Loading screen with app intro
[NEW] styles.css
Complete medieval/fantasy styling:

Dark textured backgrounds with parchment-style panels
Gold/bronze ornamental borders and decorative elements
Custom chess board with dark/light square colors matching the theme
Animated microphone indicator (pulsing glow when listening)
Piece highlight/selection animations (golden glow like reference)
Move animation trails
Responsive layout for mobile (Android) use
Google Fonts for medieval typography (Cinzel, MedievalSharp)
[NEW] app.js
The complete application logic:

1. Chess Engine Integration

Initialize chess.js for game state management
Initialize Stockfish.js via Web Worker for bot play
Configurable difficulty (depth 1-20, mapped to beginner/intermediate/advanced)
Move evaluation for blunder detection
2. Malayalam Voice Command System Complete Malayalam-to-chess-notation parser supporting:

Malayalam Command	English Equivalent	Action
"കാലാൾ ഇ ഫോറിലേക്ക്"	"Pawn to e4"	Move pawn to e4
"കുതിര എഫ് മൂന്നിലേക്ക്"	"Knight to f3"	Move knight to f3
"ആന സി ഫോറിലേക്ക്"	"Bishop to c4"	Move bishop to c4
"തേര് ഡി വണ്ണിലേക്ക്"	"Rook to d1"	Move rook to d1
"മന്ത്രി ഡി ഫൈവിലേക്ക്"	"Queen to d5"	Move queen to d5
"രാജാവ് ജി വണ്ണിലേക്ക്"	"King to g1"	Move king to g1
"ക്യാസിൽ" / "കോട്ട കെട്ടുക"	"Castle"	Castling (kingside/queenside)
"പിൻവലിക്കുക"	"Undo"	Undo last move
"കീഴടങ്ങുക"	"Resign"	Resign game
"സഹായം"	"Help"	Read available commands
"പുതിയ കളി"	"New game"	Start new game
"സൂചന" / "ഹിന്റ്"	"Hint"	Get best move suggestion
Also supports number-based coordinate system as fallback:

User says "ഇ രണ്ട് ഇ നാല്" (E2 E4) → moves piece from e2 to e4
Simpler, more reliable for speech recognition
3. Voice Feedback (TTS)

Announces opponent moves in Malayalam
Reads hints and tips aloud
Blunder warnings: "അത് നല്ല നീക്കമല്ല! നിങ്ങളുടെ [piece] നഷ്ടപ്പെടും"
Game state announcements: check, checkmate, stalemate
4. Learning/Coach Mode

Blunder detection: Stockfish evaluates user's move; if evaluation drops significantly, warns user
Hint system: Shows/speaks the best move when asked
Contextual tips panel showing chess tips in Malayalam
Move history with evaluation bars
5. Game Modes

vs Bot: Play against Stockfish at adjustable difficulty
vs Friend (Local): Two players on same device, voice-controlled
Analysis Mode: Free-form board setup with evaluation
6. UI Panels (matching reference image)

Top: Black player info (left) — White player info (right)
Left Sidebar: Game Status (Turn, Move #, Timer)
Center: Chess board with coordinate labels (a-h, 1-8)
Right Sidebar: Voice Control indicator + Hints panel
Bottom Banner: Scroll/parchment showing last voice command
Bottom Toolbar: Menu, History, Settings, Undo, Resign, Guide buttons
[NEW] pieces/ (directory)
SVG chess piece images styled to match the medieval theme (we'll use standard Unicode chess symbols styled with CSS, or generate custom piece graphics).

Voice Command Flow
Yes
No
Yes
No
Yes
No
🎤 User speaks Malayalam
Web Speech API (ml-IN)
Raw Malayalam text
Malayalam Parser
Valid chess move?
chess.js validates move
🔊 TTS: 'മനസ്സിലായില്ല, വീണ്ടും പറയൂ'
Legal move?
Update board + animate
🔊 TTS: 'ആ നീക്കം സാധ്യമല്ല'
Stockfish evaluates
Blunder?
🔊 TTS: Warning in Malayalam
Bot calculates response
🔊 TTS: Announce bot's move
Key Accessibility Features
Continuous Listening: Mic stays on with auto-restart on silence timeout
Screen Wake Lock: Screen never dims during a game
Full Audio Feedback: Every action is spoken aloud in Malayalam
High Contrast Board: Clear visual distinction between pieces and squares
Large Piece Sizes: Easy to see on mobile screens
No Touch Required: 100% voice-operated (with optional touch fallback)
Error Recovery: If voice isn't understood, gently asks user to repeat
User Review Required
IMPORTANT

Browser Requirement: This app uses the Web Speech API which works best in Google Chrome / Chromium browsers on Android. Firefox and Safari have limited Malayalam speech recognition support.

IMPORTANT

Internet Required for Voice: The Web Speech API in Chrome sends audio to Google's servers for processing. An internet connection is required for voice commands to work.

Open Questions
IMPORTANT

Friend Play: For the initial version, should I implement:

Local 2-player (both players use voice on the same device), or
Online multiplayer via Lichess Board API (requires Lichess account)? I'll start with local 2-player and can add Lichess integration later.
NOTE

Difficulty Levels: I plan to create 3 bot difficulty levels:

🟢 തുടക്കക്കാരൻ (Beginner) — Stockfish depth 1-3
🟡 ഇടത്തരം (Intermediate) — Stockfish depth 5-8
🔴 വിദഗ്ധൻ (Expert) — Stockfish depth 12-15
Verification Plan
Manual Verification
Open in Chrome on desktop — test all voice commands in Malayalam
Open in Chrome on Android phone — verify responsive layout and voice
Test all game states: check, checkmate, stalemate, castling, en passant, promotion
Verify Stockfish bot responds correctly at each difficulty level
Test blunder detection and hint system
Verify TTS speaks moves correctly in Malayalam
Test wake lock keeps screen on
Test continuous listening with auto-restart
