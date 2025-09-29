#!/usr/bin/env python3

import re
import os
import sys
import shutil

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 setup-figma.py <path-to-figma> <path-to-project>")
        print("Example: python3 setup-figma.py /home/ubuntu/upload/figma/{fileId}/{frameId}/content/ /home/ubuntu/elearning-site/")
        sys.exit(1)
    
    figma_content_path = sys.argv[1]
    project_path = sys.argv[2]
    
    # Construct figma paths
    code_file = os.path.join(figma_content_path, 'code.jsx')
    
    # Construct paths
    output_file = os.path.join(project_path, 'src', 'App.jsx')
    project_assets_dir = os.path.join(project_path, 'src', 'assets')
    
    # Check if output file exists
    if not os.path.exists(output_file):
        print(f"Error: Output file does not exist! Make sure you have ran manus-create-react-app and the folder name is correct.")
        print(f"Missing file: {output_file}")
        sys.exit(1)
    
    # Read the original code
    try:
        with open(code_file, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: File {code_file} not found")
        sys.exit(1)
    
    # Construct figma assets directory path
    figma_assets_dir = os.path.join(figma_content_path, 'assets')
    
    # Check if figma assets directory exists
    if not os.path.exists(figma_assets_dir):
        print(f"Warning: Figma assets directory {figma_assets_dir} not found")
        print("Available assets will be skipped")
        figma_available_assets = []
    else:
        figma_available_assets = os.listdir(figma_assets_dir)
    
    # Ensure project assets directory exists
    if not os.path.exists(project_assets_dir):
        os.makedirs(project_assets_dir, exist_ok=True)
        print(f"Created project assets directory: {project_assets_dir}")
    
    # Create mapping from placeholder URL to asset file
    url_to_asset = {}
    import_statements = []
    import_counter = 1
    
    # Asset mapping based on the extracted assets
    asset_map = {
        "15:2": "15-2.webp",
        "33:3": "33-3.webp",
        "43:67": "43-67.webp",
        "43:99": "43-99.webp",
        "54:281": "54-281.webp",
        "54:370": "54-370.webp",
        "54:487": "54-487.webp",
        "54:485": "54-485.webp",
        "54:484": "54-484.webp",
        "54:489": "54-489.webp",
        "54:490": "54-490.webp",
        "66:7": "66-7.webp",
        "66:23": "66-23.webp",
        "67:127": "67-127.webp",
        "21:60": "21-60.webp",
        "21:61": "21-61.webp",
        "21:59": "21-59.webp",
        "21:58": "21-58.webp",
        "129:416": "129-416.webp",
        "74:6": "74-6.webp",
        "74:11": "74-11.webp",
        "74:7": "74-7.webp",
        "74:9": "74-9.webp",
        "67:199": "67-199.webp",
        "67:206": "67-206.webp",
        "67:204": "67-204.webp",
        "67:202": "67-202.webp",
        "67:201": "67-201.webp",
        "67:200": "67-200.webp",
        "67:208": "67-208.webp",
        "67:207": "67-207.webp",
        "67:198": "67-198.webp",
        "67:209": "67-209.webp",
        "67:203": "67-203.webp",
        "67:205": "67-205.webp",
        "54:326": "54-326.webp",
        "54:327": "54-327.webp",
        "54:328": "54-328.webp",
        "54:329": "54-329.webp",
        "54:330": "54-330.webp",
        "54:331": "54-331.webp",
        "54:332": "54-332.webp",
        "54:351": "54-351.webp",
        "67:193": "67-193.webp",
        "67:194": "67-194.webp",
        "67:196": "67-196.webp",
        "34:7": "34-7.webp",
        "232:403": "232-403.webp",
        "159:653": "159-653.webp",
        "238:405": "238-405.webp",
        "238:406": "238-406.webp",
        "238:408": "238-408.webp",
        "238:410": "238-410.webp",
        "238:412": "238-412.webp",
        "1:16": "1-16.webp",
        "1:17": "1-17.webp",
        "1:26": "1-26.webp",
        "1:22": "1-22.webp",
        "1:24": "1-24.webp",
        "9:25": "9-25.webp",
        "10:31": "10-31.webp",
        "33:4": "33-4.webp",
        "43:69": "43-69.webp",
        "54:255": "54-255.webp",
        "54:256": "54-256.webp",
        "54:264": "54-264.webp",
        "54:298": "54-298.webp",
        "54:299": "54-299.webp",
        "54:300": "54-300.webp",
        "54:301": "54-301.webp",
        "54:302": "54-302.webp",
        "54:303": "54-303.webp",
        "54:304": "54-304.webp",
        "54:322": "54-322.webp",
        "57:3": "57-3.webp",
        "57:5": "57-5.webp",
        "57:11": "57-11.webp",
        "57:7": "57-7.webp",
        "57:9": "57-9.webp",
        "70:53": "70-53.webp",
        "70:61": "70-61.webp",
        "70:63": "70-63.webp",
        "70:69": "70-69.webp",
        "70:66": "70-66.webp",
        "70:166": "70-166.webp",
        "70:168": "70-168.webp",
        "70:169": "70-169.webp",
        "70:170": "70-170.webp",
        "70:171": "70-171.webp",
        "70:172": "70-172.webp",
        "70:188": "70-188.webp",
        "70:190": "70-190.webp",
        "70:191": "70-191.webp",
        "70:192": "70-192.webp",
        "70:193": "70-193.webp",
        "70:194": "70-194.webp",
        "70:176": "70-176.webp",
        "70:178": "70-178.webp",
        "70:179": "70-179.webp",
        "70:180": "70-180.webp",
        "70:181": "70-181.webp",
        "70:182": "70-182.webp",
        "70:164": "70-164.webp",
        "147:1282": "147-1282.webp",
        "147:1283": "147-1283.webp",
        "147:1284": "147-1284.webp",
        "147:1285": "147-1285.webp",
        "147:1286": "147-1286.webp",
        "147:1292": "147-1292.webp",
        "147:1293": "147-1293.webp",
        "147:1295": "147-1295.webp",
        "147:1296": "147-1296.webp",
        "147:1298": "147-1298.webp",
        "147:1299": "147-1299.webp",
        "147:1307": "147-1307.webp",
        "147:1335": "147-1335.webp",
        "147:1336": "147-1336.webp",
        "147:1337": "147-1337.webp",
        "147:1338": "147-1338.webp",
        "147:1339": "147-1339.webp",
        "147:1348": "147-1348.webp",
        "152:517": "152-517.webp",
        "155:540": "155-540.webp",
        "155:550": "155-550.webp",
        "155:560": "155-560.webp",
        "155:571": "155-571.webp",
        "155:582": "155-582.webp",
        "41:26": "41-26.webp",
        "41:46": "41-46.webp",
        "41:55": "41-55.webp",
        "41:52": "41-52.webp",
        "41:61": "41-61.webp",
        "53:210": "53-210.webp",
        "53:216": "53-216.webp",
        "53:214": "53-214.webp",
        "53:215": "53-215.webp",
        "53:212": "53-212.webp",
        "53:211": "53-211.webp",
        "53:213": "53-213.webp",
        "54:270": "54-270.webp",
        "54:271": "54-271.webp",
        "54:279": "54-279.webp",
        "53:220": "53-220.webp",
        "99:61": "99-61.webp",
        "99:62": "99-62.webp",
        "99:70": "99-70.webp",
        "99:33": "99-33.webp",
        "99:34": "99-34.webp",
        "99:35": "99-35.webp",
        "99:36": "99-36.webp",
        "99:37": "99-37.webp",
        "99:38": "99-38.webp",
        "99:39": "99-39.webp",
        "99:58": "99-58.webp",
        "124:394": "124-394.webp",
        "155:598": "155-598.webp",
        "155:599": "155-599.webp",
        "155:607": "155-607.webp",
        "165:657": "165-657.webp",
        "165:670": "165-670.webp",
        "165:680": "165-680.webp",
        "165:713": "165-713.webp",
        "165:781": "165-781.webp",
        "165:784": "165-784.webp",
        "165:804": "165-804.webp",
        "165:833": "165-833.webp",
        "155:610": "155-610.webp",
        "155:611": "155-611.webp",
        "155:612": "155-612.webp",
        "155:613": "155-613.webp",
        "155:614": "155-614.webp",
        "155:615": "155-615.webp",
        "155:616": "155-616.webp",
        "155:635": "155-635.webp",
        "243:403": "243-403.webp",
        "243:406": "243-406.webp",
        "134:489": "134-489.webp",
        "122:355": "122-355.webp",
        "122:356": "122-356.webp",
        "122:364": "122-364.webp",
        "122:367": "122-367.webp",
        "122:368": "122-368.webp",
        "122:369": "122-369.webp",
        "122:370": "122-370.webp",
        "122:371": "122-371.webp",
        "122:372": "122-372.webp",
        "122:373": "122-373.webp",
        "122:392": "122-392.webp",
        "134:487": "134-487.webp",
        "134:431": "134-431.webp",
        "134:432": "134-432.webp",
        "134:440": "134-440.webp",
        "134:443": "134-443.webp",
        "134:444": "134-444.webp",
        "134:445": "134-445.webp",
        "134:446": "134-446.webp",
        "134:447": "134-447.webp",
        "134:448": "134-448.webp",
        "134:449": "134-449.webp",
        "134:468": "134-468.webp",
        "134:551": "134-551.webp",
        "I134:952;67:205": "I134-952;67-205.webp",
        "I134:953;67:209": "I134-953;67-209.webp",
        "I134:954;67:201": "I134-954;67-201.webp",
        "I134:928;67:205": "I134-928;67-205.webp",
        "I134:929;67:209": "I134-929;67-209.webp",
        "I134:930;67:201": "I134-930;67-201.webp",
        "I134:931;67:198": "I134-931;67-198.webp",
        "I134:932;67:207": "I134-932;67-207.webp",
        "I134:933;67:202": "I134-933;67-202.webp",
        "I134:937;67:206": "I134-937;67-206.webp",
        "I134:938;67:199": "I134-938;67-199.webp",
        "I134:939;67:203": "I134-939;67-203.webp",
        "I134:940;67:205": "I134-940;67-205.webp",
        "I134:941;67:209": "I134-941;67-209.webp",
        "I134:942;67:201": "I134-942;67-201.webp",
        "I134:946;67:208": "I134-946;67-208.webp",
        "I134:947;67:200": "I134-947;67-200.webp",
        "I134:948;67:204": "I134-948;67-204.webp",
        "I134:949;67:206": "I134-949;67-206.webp",
        "I134:950;67:199": "I134-950;67-199.webp",
        "I134:951;67:203": "I134-951;67-203.webp",
        "165:841": "165-841.webp",
        "165:845": "165-845.webp",
        "165:856": "165-856.webp",
        "134:502": "134-502.webp",
        "134:503": "134-503.webp",
        "134:511": "134-511.webp",
        "134:514": "134-514.webp",
        "134:515": "134-515.webp",
        "134:516": "134-516.webp",
        "134:517": "134-517.webp",
        "134:518": "134-518.webp",
        "134:519": "134-519.webp",
        "134:520": "134-520.webp",
        "134:539": "134-539.webp",
        "134:499": "134-499.webp",
        "I165:861;67:205": "I165-861;67-205.webp",
        "I165:862;67:209": "I165-862;67-209.webp",
        "I165:863;67:201": "I165-863;67-201.webp",
        "I165:864;67:205": "I165-864;67-205.webp",
        "I165:865;67:209": "I165-865;67-209.webp",
        "I165:866;67:201": "I165-866;67-201.webp",
        "I165:867;67:198": "I165-867;67-198.webp",
        "I165:868;67:207": "I165-868;67-207.webp",
        "I165:869;67:202": "I165-869;67-202.webp",
        "I165:870;67:206": "I165-870;67-206.webp",
        "I165:871;67:199": "I165-871;67-199.webp",
        "I165:872;67:203": "I165-872;67-203.webp",
        "I165:873;67:205": "I165-873;67-205.webp",
        "I165:874;67:209": "I165-874;67-209.webp",
        "I165:875;67:201": "I165-875;67-201.webp",
        "I165:876;67:208": "I165-876;67-208.webp",
        "I165:877;67:200": "I165-877;67-200.webp",
        "I165:878;67:204": "I165-878;67-204.webp",
        "I165:879;67:206": "I165-879;67-206.webp",
        "I165:880;67:199": "I165-880;67-199.webp",
        "I165:881;67:203": "I165-881;67-203.webp",
        "165:882": "165-882.webp",
        "165:891": "165-891.webp",
        "165:894": "165-894.webp",
        "100:61": "100-61.webp",
        "100:70": "100-70.webp",
        "100:73": "100-73.webp",
        "100:147": "100-147.webp",
        "100:148": "100-148.webp",
        "100:149": "100-149.webp",
        "100:55": "100-55.webp",
        "100:54": "100-54.webp",
        "100:419": "100-419.webp",
        "100:402": "100-402.webp",
        "100:427": "100-427.webp",
        "100:457": "100-457.webp",
        "100:468": "100-468.webp",
        "100:390": "100-390.webp",
        "100:482": "100-482.webp",
        "100:483": "100-483.webp",
        "110:154": "110-154.webp",
        "110:166": "110-166.webp",
        "110:176": "110-176.webp",
        "110:188": "110-188.webp",
        "100:99": "100-99.webp",
        "100:83": "100-83.webp",
        "110:205": "110-205.webp",
        "110:207": "110-207.webp",
        "110:209": "110-209.webp",
        "110:211": "110-211.webp",
        "110:231": "110-231.webp",
        "110:292": "110-292.webp",
        "110:313": "110-313.webp",
        "110:222": "110-222.webp",
        "110:335": "110-335.webp",
        "110:241": "110-241.webp",
        "110:262": "110-262.webp",
        "110:272": "110-272.webp",
        "110:283": "110-283.webp",
        "110:301": "110-301.webp",
        "110:251": "110-251.webp",
        "110:325": "110-325.webp",
        "100:114": "100-114.webp",
        "100:115": "100-115.webp",
        "100:116": "100-116.webp",
        "100:117": "100-117.webp",
        "100:118": "100-118.webp",
        "100:119": "100-119.webp",
        "100:120": "100-120.webp",
        "100:139": "100-139.webp",
        "100:142": "100-142.webp",
        "100:143": "100-143.webp",
        "100:145": "100-145.webp",
        "100:93": "100-93.svg",
        "100:94": "100-94.svg",
        "1:3": "1-3.svg",
        "41:28": "41-28.svg",
        "155:596": "155-596.svg",
        "165:807": "165-807.svg",
        "100:52": "100-52.svg"
    }
    
    # Process each known asset
    for node_id, expected_filename in asset_map.items():
        placeholder_url = f"https://placehold.com/{node_id}"
        
        # Check if the asset file exists in figma assets directory
        figma_asset_path = os.path.join(figma_assets_dir, expected_filename)
        project_asset_path = os.path.join(project_assets_dir, expected_filename)
        
        if os.path.exists(figma_asset_path):
            # Only copy if asset does not already exist in project
            if not os.path.exists(project_asset_path):
                shutil.copy2(figma_asset_path, project_asset_path)
                print(f"✓ Copied asset: {expected_filename}")
            else:
                print(f"→ Asset exists: {expected_filename}")
            
            import_name = f'asset{import_counter}'
            url_to_asset[placeholder_url] = import_name
            import_statements.append(f"import {import_name} from './assets/{expected_filename}'")
            import_counter += 1
        else:
            print(f"⚠ Missing asset: {expected_filename}")
    
    # Replace placeholder URLs in content
    replacements_made = 0
    for url, import_name in url_to_asset.items():
        old_pattern = f'src="{url}"'
        new_pattern = f'src={{{import_name}}}' 
        if old_pattern in content:
            content = content.replace(old_pattern, new_pattern)
            replacements_made += 1
    
    # Create the complete React component
    if import_statements:
        react_component = f'''import './App.css'
{chr(10).join(import_statements)}

function App() {{
  return (
    {content}
  )
}}

export default App
'''
    else:
        # No assets to import, just wrap the content
        react_component = f'''import './App.css'

function App() {{
  return (
    {content}
  )
}}

export default App
'''
    
    # Write to specified output file
    with open(output_file, 'w') as f:
        f.write(react_component)
    
    print(f"\n🎉 Asset replacement completed!")
    print(f"   - Processed {len(asset_map)} potential assets")
    print(f"   - Found {len(url_to_asset)} available assets")
    print(f"   - Made {replacements_made} replacements")
    print(f"   - Generated {len(import_statements)} import statements")
    print(f"   - Created: {output_file}")
    
    if replacements_made < len(asset_map):
        missing_count = len(asset_map) - len(url_to_asset)
        print(f"\n⚠ Note: {missing_count} assets were not found in the figma assets directory")

if __name__ == "__main__":
    main()
