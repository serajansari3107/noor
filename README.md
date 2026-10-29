# Noor — Islamic Website (Tafsir update)

## Run locally
1. Extract the ZIP.
2. Open the folder in VS Code and start it with Live Server.
3. Quran/Hadith data are local. Prayer time and online fonts may require internet.

## Tafsir update
- `data/tafsir/002-al-baqarah.js` now contains **286 individual ayah entries** (one section per ayah), with original Hinglish explanation, contextual note, and verse-specific Ibn Kathir reference.
- Existing Quran Arabic, English and Roman Urdu text continues to come from `data/quran/surahs/002-al-baqarah.js`; Quran data has not been duplicated or rewritten.
- These are original study explanations informed by the ayah text and surah context, not a verbatim translation of the entire Tafsir Ibn Kathir. References point to the classical commentary for deeper checking.
- Religious content should be reviewed by a qualified scholar before being presented as authoritative. Some legal passages require detailed fiqh context; this file explicitly advises that rather than issuing modern rulings.

## Validation
- Archive file count and ZIP CRC tested.
- The tafsir JavaScript file was parsed as JSON payload and checked for 286 sequential, individual ayah entries.
- No browser-based visual test is claimed.


Step 18: Surah Aal-e-Imran tafsir data is stored in `data/tafsir/003-aal-e-imran.js` with 200 individual ayah entries. These are concise original Hinglish summaries informed by classical tafsir, not a verbatim translation; knowledgeable review is recommended before public religious use.
