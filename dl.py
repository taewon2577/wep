import urllib.request
import re
import os
import time

base_dir = r'c:\Users\4-410-28\Desktop\wep'
img_dir = os.path.join(base_dir, 'images')
if not os.path.exists(img_dir):
    os.makedirs(img_dir)

files_to_process = [os.path.join(base_dir, 'js', 'api.js'), os.path.join(base_dir, 'reviews.html')]

for filepath in files_to_process:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all loremflickr urls
    urls = re.findall(r'https://loremflickr\.com/\d+/\d+/([^ \'\"]+)', content)
    urls = list(set(urls)) # unique
    
    for keyword in urls:
        clean_name = keyword.replace(',', '_') + '.jpg'
        save_path = os.path.join(img_dir, clean_name)
        if not os.path.exists(save_path):
            print('Downloading', keyword)
            dl_url = f'https://loremflickr.com/800/600/{keyword}'
            try:
                # Add headers to avoid 403
                req = urllib.request.Request(dl_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=5) as response, open(save_path, 'wb') as out_file:
                    out_file.write(response.read())
            except Exception as e:
                print('Failed', keyword, e)
                import shutil
                import random
                # Fallback to local artifacts
                artifact_paths = [
                    r'C:\Users\4-410-28\.gemini\antigravity\brain\752e83a6-8fa2-4d33-8020-14a3d16f2aad\dest_bali_1778723474484.png',
                    r'C:\Users\4-410-28\.gemini\antigravity\brain\752e83a6-8fa2-4d33-8020-14a3d16f2aad\dest_paris_1778723457588.png',
                    r'C:\Users\4-410-28\.gemini\antigravity\brain\752e83a6-8fa2-4d33-8020-14a3d16f2aad\dest_tokyo_1778723594437.png'
                ]
                try:
                    shutil.copy(random.choice(artifact_paths), save_path)
                except:
                    pass
            time.sleep(0.5)

    # Now replace in file
    new_content = re.sub(r'https://loremflickr\.com/\d+/\d+/([^ \'\"]+)', lambda m: 'images/' + m.group(1).replace(',', '_') + '.jpg', content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print('Done!')
