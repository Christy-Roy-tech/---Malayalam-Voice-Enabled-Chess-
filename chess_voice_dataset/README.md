# Voice Dataset

Raw voice recordings are intentionally kept out of GitHub for privacy and repository-size reasons.

Expected local structure:

```text
chess_voice_dataset/
├── english/
│   ├── files/   # a.wav through h.wav, or equivalent recordings
│   └── ranks/   # 1.wav through 8.wav, or equivalent recordings
└── malayalam/
    ├── files/
    └── ranks/
```

Place the recordings here locally when testing or training the voice recognizer. Obtain consent from speakers before sharing recordings, and use Git LFS or external storage if the dataset is intentionally published.
