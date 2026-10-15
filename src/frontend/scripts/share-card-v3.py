"""Render the approved pointing character and recruitment copy as a share card (Pillow)."""
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

# Reuse the exact logo and final pointing pose from the live first screen.
draw.rectangle((0, 0, 2400, 132), fill=cream)
logo = Image.open(root / 'public/rebrand/bi-warm-ink.png').convert('RGBA')
logo.thumbnail((450, 94), Image.Resampling.LANCZOS)
image.paste(logo, (64 * scale, (66 * scale - logo.height) // 2), logo)
actor = Image.open(root / 'public/rebrand/poses/recruitment-v1/05-point.webp').convert('RGBA')
actor = actor.resize((660 * scale, 700 * scale), Image.Resampling.LANCZOS)
image.paste(actor, (-50 * scale, 72 * scale), actor)
text(610, 205, '닭장수가', 76)
text(610, 310, '장사에 진심인', 70, orange)
text(610, 415, '사장님을 원합니다.', 61)
image = image.resize((1200, 630), Image.Resampling.LANCZOS)
output = Path(sys.argv[1])
output.parent.mkdir(parents=True, exist_ok=True)
image.save(output, optimize=True)
print(output)
