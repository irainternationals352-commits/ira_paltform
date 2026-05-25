import os
from PIL import Image

logo_path = r"C:\Users\satis\Downloads\ira_logo-removebg-preview.png"
output_path = r"c:\Users\satis\OneDrive\Desktop\Raju\study_abord\frontend\public\ira_logo_clean.png"

img = Image.open(logo_path)
img = img.convert("RGBA")

# Crop to non-transparent bounding box
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

# Add small clean 4px padding
padding = 4
width, height = img.size
new_img = Image.new("RGBA", (width + 2*padding, height + 2*padding), (255, 255, 255, 0))
new_img.paste(img, (padding, padding))

new_img.save(output_path, "PNG")
print("SUCCESS")
