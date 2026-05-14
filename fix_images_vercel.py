import re

# High-quality Unsplash Photo IDs mapping
UNSPLASH_MAP = {
    'paris': '1502602898657-3e91760cbb34',
    'bali': '1537996194471-e657df975ab4',
    'kyoto': '1493976040374-85c8e92ca5bd',
    'tokyo': '1540959733332-e9466adad61f',
    'maldives': '1514282401047-d79a71a590e8',
    'hawaii': '1507525428034-b723cf961d3e',
    'interlaken': '1530122037265-a5f1f91d7b82',
    'swiss': '1530122037265-a5f1f91d7b82',
    'london': '1513635269975-59663e0ac1ad',
    'venice': '1514890547357-a9ee288728e0',
    'santorini': '1570077188670-e3a8d69ac5ff',
    'newyork': '1496442226666-8d4d0e62e6e9',
    'barcelona': '1583422409516-2895a77efded',
    'iceland': '1476610182048-b716b8518aae',
    'norway': '1531366930003-fb739b969f19',
    'egypt': '1503177119275-0aa32b3a9368',
    'singapore': '1529761430580-30239b4d4a6b',
    'dubai': '1512453979798-5ea566f830a8',
    'phuket': '1589394815804-964ed9be2deb',
    'nhatrang': '1528127269322-539801943592',
    'halongbay': '1552084117-56a987666449',
    'jeju': '1596395817032-47b29307779d',
    'guam': '1524311583145-d5593bd35028',
    'mauritius': '1580237750193-4e868739665b',
    'mallorca': '1512753360425-06813bc3f18d',
    'cancun': '1506461883276-594a12b11ba2',
    'venice': '1514890547357-a9ee288728e0',
    'machupicchu': '1500076656116-558758c991c1',
    'peru': '1500076656116-558758c991c1',
    'serengeti': '1516426122078-c23e76319801',
    'tanzenia': '1516426122078-c23e76319801',
    'australia': '1506901437232-ece67af50599',
    'grandcanyon': '1473116763249-3dfeaf81bc17',
    'rockymountains': '1464817732615-2ef9d4750171',
    'canada': '1464817732615-2ef9d4750171',
    'hero': '1502602898657-3e91760cbb34',
    'louvre': '1559113511-10519395295c',
    'seine': '1490212006371-d41c888d363d',
    'eiffel': '1543349689-53fe3047fc3f'
}

FALLBACK_IDS = [
    '1507525428034-b723cf961d3e',
    '1469041469552-04870a55bd30',
    '1523906834647-25092fd70b8a',
    '1533105079020-02e4d3aae8ef'
]

def get_unsplash_url(keyword):
    clean = keyword.lower().split(',')[0].replace(' ', '')
    photo_id = UNSPLASH_MAP.get(clean)
    if not photo_id:
        # try second part if comma exists
        if ',' in keyword:
            clean2 = keyword.lower().split(',')[1].replace(' ', '')
            photo_id = UNSPLASH_MAP.get(clean2)
    
    if not photo_id:
        # deterministic hash for fallback
        h = sum(ord(c) for c in keyword) % len(FALLBACK_IDS)
        photo_id = FALLBACK_IDS[h]
    
    return f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w=800&q=80"

# 1. Update api.js
with open('js/api.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace ./assets/images/xxx.jpg with Unsplash URLs
def replacer(m):
    filename = m.group(1)
    keyword = filename.replace('.jpg', '').replace('_', ',')
    return get_unsplash_url(keyword)

new_content = re.sub(r'\./assets/images/([^\'\"\s]+\.jpg)', replacer, content)

with open('js/api.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

# 2. Update reviews.html
with open('reviews.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(r'\./assets/images/([^\'\"\s]+\.jpg)', replacer, content)

with open('reviews.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

# 3. Update index.html (hero)
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Specifically fix the hero image back to a working URL
hero_url = get_unsplash_url('paris,eiffel')
new_content = re.sub(r'\./assets/images/hero\.png', hero_url, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Images replaced with high-quality Unsplash URLs")
