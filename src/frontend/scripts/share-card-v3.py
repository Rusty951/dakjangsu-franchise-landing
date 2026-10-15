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

# Center the complete hat and keep the pointing hand above the copy.
actor = Image.open(root / 'public/rebrand/poses/recruitment-v1/05-point.webp').convert('RGBA')
actor = actor.resize((500 * scale, 531 * scale), Image.Resampling.LANCZOS)
image.paste(actor, (350 * scale, 76 * scale), actor)
# Fade the lower torso into the card without changing the source character.
fade_top, fade_bottom = 465 * scale, 505 * scale
for y in range(fade_top, 630 * scale):
    alpha = round(255 * min(1, (y - fade_top) / (fade_bottom - fade_top)))
    overlay = Image.new('RGBA', (1200 * scale, 1), (36, 31, 27, alpha))
    image.paste(overlay, (0, y), overlay)
draw.rectangle((0, 0, 2400, 132), fill=cream)
logo = Image.open(root / 'public/rebrand/bi-warm-ink.png').convert('RGBA')
logo.thumbnail((450, 94), Image.Resampling.LANCZOS)
image.paste(logo, ((1200 * scale - logo.width) // 2, (66 * scale - logo.height) // 2), logo)
heading_font = ImageFont.truetype(str(font_path), 42 * scale)
first = '닭장수가 '
second = '장사에 진심인'
first_width = draw.textlength(first, font=heading_font) / scale
second_width = draw.textlength(second, font=heading_font) / scale
heading_left = (1200 - first_width - second_width) / 2
text(heading_left, 513, first, 42)
text(heading_left + first_width, 513, second, 42, orange)
text(600, 568, '사장님을 원합니다.', 54, anchor='mt')
image = image.resize((1200, 630), Image.Resampling.LANCZOS)
output = Path(sys.argv[1])
output.parent.mkdir(parents=True, exist_ok=True)
image.save(output, optimize=True)
print(output)
