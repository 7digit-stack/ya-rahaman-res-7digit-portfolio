import re

with open('D:\\yarahman porfiolio\\foodie\\menu.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all card-price spans
pattern = r'(card-price">)([^<]+)(</span>)'

count = 0
def replace_price(m):
    global count
    prefix = m.group(1)
    content = m.group(2)
    suffix = m.group(3)
    
    # Skip if already has del tag
    if '<del>' in content:
        return m.group(0)
    
    # Extract price number
    price_match = re.match(r'₹(\d+)', content)
    if not price_match:
        return m.group(0)
    
    price = int(price_match.group(1))
    
    # Calculate original price
    if price <= 50:
        orig = price + 10
    elif price <= 100:
        orig = price + 20
    elif price <= 200:
        orig = price + 40
    elif price <= 300:
        orig = price + 50
    else:
        orig = price + 70
    
    count += 1
    print(f"  {count}. ₹{price} -> ₹{price} <del>₹{orig}</del>")
    return f'{prefix}₹{price} <del>₹{orig}</del>{suffix}'

text = re.sub(pattern, replace_price, text)
print(f"\nUpdated {count} items with crossed pricing")

with open('D:\\yarahman porfiolio\\foodie\\menu.html', 'w', encoding='utf-8') as f:
    f.write(text)
print("Done!")
