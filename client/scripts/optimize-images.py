import os
from PIL import Image

# Automatically find the assets folder relative to this script's path
script_dir = os.path.dirname(os.path.abspath(__file__))
asset_dir = os.path.abspath(os.path.join(script_dir, "..", "public", "certificates-asset"))

target_width = 1200
quality = 80

print(f"Optimizing images in: {asset_dir}")
if not os.path.exists(asset_dir):
    print(f"Directory not found: {asset_dir}")
    exit(1)

files = os.listdir(asset_dir)
to_delete = []
total_orig_size = 0
total_new_size = 0
processed_count = 0

for file in files:
    ext = os.path.splitext(file)[1].lower()
    # Skip WebP files and other non-image formats
    if ext not in ['.jpg', '.jpeg', '.png']:
        continue
        
    file_path = os.path.join(asset_dir, file)
    orig_size = os.path.getsize(file_path)
    total_orig_size += orig_size
    
    # Define new webp file path
    webp_filename = os.path.splitext(file)[0] + ".webp"
    webp_path = os.path.join(asset_dir, webp_filename)
    
    print(f"\nProcessing {file} ({orig_size / 1024 / 1024:.2f} MB)...")
    
    try:
        with Image.open(file_path) as img:
            w, h = img.size
            if w > target_width:
                new_h = int(h * (target_width / w))
                img = img.resize((target_width, new_h), Image.Resampling.LANCZOS)
                print(f"  Resized from {w}x{h} to {target_width}x{new_h}")
            else:
                print(f"  No resize needed ({w}x{h})")
                
            img.save(webp_path, format="WEBP", quality=quality)
            
        new_size = os.path.getsize(webp_path)
        total_new_size += new_size
        reduction = (1 - (new_size / orig_size)) * 100
        print(f"  Saved as {webp_filename} ({new_size / 1024:.2f} KB) - Reduced by {reduction:.1f}%")
        
        # Track the original file for safe deletion after successful conversion
        to_delete.append(file_path)
        processed_count += 1
        
    except Exception as e:
        print(f"  Error processing {file}: {e}")

# Safe clean-up of original raw images
if to_delete:
    print("\nCleaning up original files...")
    for file_path in to_delete:
        try:
            os.remove(file_path)
            print(f"  Deleted: {os.path.basename(file_path)}")
        except Exception as e:
            print(f"  Failed to delete {os.path.basename(file_path)}: {e}")

print("\n" + "="*40)
print(f"Total new images optimized: {processed_count}")
if processed_count > 0:
    print(f"Original total size: {total_orig_size / 1024 / 1024:.2f} MB")
    print(f"Optimized WebP total size: {total_new_size / 1024 / 1024:.2f} MB")
    reduction_total = (1 - (total_new_size / total_orig_size)) * 100
    print(f"Total size reduction: {reduction_total:.1f}%")
else:
    print("No new raw images (.jpg, .jpeg, .png) to optimize.")
print("="*40)
