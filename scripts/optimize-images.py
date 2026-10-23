"""Download (Pexels CDN, original-quality) + optimise licensed stock images. Sources are recorded in docs/IMAGE_REGISTER.md."""
import io, os, sys, urllib.request
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, OUT = os.path.join(ROOT, 'assets-src'), os.path.join(ROOT, 'public', 'img')
# name -> (pexels id, optional crop box as fractions l,t,r,b)
IMAGES = {
  'hero-robotics': (32778341, None), 'factory-corridor': (34718930, None), 'pharma-line': (37650270, None),
  'water-treatment': (24802113, None), 'solder-bench': (3912983, None), 'solder-board': (37426135, (0, .5, 1, 1)),
  'code-screen': (6424584, None), 'ai-network': (8386437, None), 'datacentre-aisle': (4508751, None),
  'fibre-patch': (4373998, None), 'substation': (25537595, None), 'solar-farm': (35105444, None),
  'vitals-monitor': (28782186, None), 'lab-porthole': (37839843, None),
}
WIDTHS = [480, 720, 960, 1600]
for name, (pid, crop) in IMAGES.items():
    p = os.path.join(SRC, f'pexels-{pid}.jpg')
    if not os.path.exists(p):
        req = urllib.request.Request(f'https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=2400', headers={'User-Agent': 'Mozilla/5.0'})
        open(p, 'wb').write(urllib.request.urlopen(req, timeout=60).read())
    im = Image.open(p).convert('RGB')
    if crop:
        w, h = im.size; im = im.crop((int(crop[0]*w), int(crop[1]*h), int(crop[2]*w), int(crop[3]*h)))
    for w in WIDTHS:
        if im.width < w and w != WIDTHS[0]: continue
        t = im.copy(); t.thumbnail((w, 4000), Image.LANCZOS)
        t.save(os.path.join(OUT, f'{name}-{w}.webp'), 'WEBP', quality=72, method=6)
    print(name, im.size, [os.path.getsize(os.path.join(OUT, f'{name}-{w}.webp'))//1024 for w in WIDTHS if os.path.exists(os.path.join(OUT, f'{name}-{w}.webp'))], 'KB')
