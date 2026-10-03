# Black Han Sans / 검은고딕

Use this font for the 닭장수후라이드 landing site's strong display typography.

## Files

- `BlackHanSans-Regular.ttf`
- `BlackHanSans-Regular.otf`
- `OFL.txt`

Black Han Sans is distributed as a single regular display weight, not a multi-weight family.

The served TTF is version 1.200. On 2026-10-03 it was byte-for-byte verified
against the official repository's `BlackHanSans.ttf` (Git blob
`5908954af3795260fc921805be5861d8723f3b5b`). Its SHA-256 is
`e0a6efb36ee2b57c3d4bb8eb5b2c81b8806a92e156d1465a2c23cf1f5dd51b8c`.
The bundled `OFL.txt` also matches the official original. Use regular 400;
the display CSS falls back to Pretendard and the system sans-serif family.

## Source

- GitHub: https://github.com/zesstype/Black-Han-Sans
- Google Fonts: https://fonts.google.com/specimen/Black+Han+Sans

## License

SIL Open Font License 1.1. Commercial web use and embedding are allowed under the OFL terms.

Keep `OFL.txt` with redistributed font files. Do not sell the font files by themselves. If the font is modified, do not use the reserved font name without permission.

## CSS Example

```css
@font-face {
  font-family: "Black Han Sans";
  src: url("/fonts/black-han-sans/BlackHanSans-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```
