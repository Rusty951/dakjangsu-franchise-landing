"""Render the approved first-screen offer as a 1200x630 share card (Pillow)."""
from pathlib import Path
import sys
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
font_path = root / 'public/fonts/black-han-sans/BlackHanSans-Regular.ttf'
scale = 2
image = Image.new('RGB', (1200 * scale, 630 * scale), '#241f1b')
draw = ImageDraw.Draw(image)
cream, orange = '#f7efe4', '#d86535'

def text(x, y, value, size, color=cream, anchor='lt', stroke=0):
    font = ImageFont.truetype(str(font_path), size * scale)
    draw.text((x * scale, y * scale), value, font=font, fill=color,
              anchor=anchor, stroke_width=round(stroke * scale), stroke_fill=color)

# Preserve the page's brand strip, then adapt the same two stacked offers to a wide card.
draw.rectangle((0, 0, 2400, 132), fill=cream)
logo = Image.open(root / 'public/rebrand/bi-warm-ink.png').convert('RGBA')
logo.thumbnail((450, 94), Image.Resampling.LANCZOS)
image.paste(logo, (64 * scale, (66 * scale - logo.height) // 2), logo)
text(600, 94, '2,800', 205, anchor='mt', stroke=2)
text(935, 226, '만원', 54)
text(600, 312, '조건 충족 가정, 2년 합산 계산 예시', 22, anchor='mt')
draw.rectangle((64 * scale, 363 * scale, 1136 * scale, 365 * scale), fill=orange)
text(160, 414, '가맹비, 교육비', 38)
text(160, 463, '첫 2년 로열티', 38)
text(160, 531, '조건 충족 시 면제', 22)
text(800, 389, '0', 205, orange, stroke=2)
text(946, 543, '원', 52, orange)
image = image.resize((1200, 630), Image.Resampling.LANCZOS)
output = Path(sys.argv[1])
output.parent.mkdir(parents=True, exist_ok=True)
image.save(output, optimize=True)
print(output)
