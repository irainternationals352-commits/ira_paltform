import os
from PIL import Image

logo_path = r"C:\Users\satis\Downloads\ira_logo.jpeg"
output_path = r"c:\Users\satis\OneDrive\Desktop\Raju\study_abord\frontend\public\ira_logo_clean.png"

img = Image.open(logo_path)
img = img.convert("RGBA")

datas = img.getdata()

newData = []
for item in datas:
    # Any light color (above 210 threshold) is made fully transparent
    r, g, b, a = item
    if r > 210 and g > 210 and b > 210:
        newData.append((255, 255, 255, 0))
    else:
        newData.append((r, g, b, a))

img.putdata(newData)

# Crop to non-transparent bounding box
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

# Add small clean 8px padding
padding = 8
width, height = img.size
new_img = Image.new("RGBA", (width + 2*padding, height + 2*padding), (255, 255, 255, 0))
new_img.paste(img, (padding, padding))

new_img.save(output_path, "PNG")
print("SUCCESS")
