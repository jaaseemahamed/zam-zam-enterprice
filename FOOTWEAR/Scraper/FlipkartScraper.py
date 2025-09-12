import requests
from bs4 import BeautifulSoup
import os
import pandas as pd

def scrape_flipkart_shoes(pages: int = 2):
    products, prices, ratings = [], [], []

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/120.0.0.0 Safari/537.36"
    }

    for page in range(1, pages + 1):
        url = f"https://www.flipkart.com/search?q=shoes&page={page}"
        r = requests.get(url, headers=headers)
        soup = BeautifulSoup(r.text, "lxml")

        # Product names (Flipkart uses different classes for links)
        name_tags = soup.find_all("a", class_=["IRpwTa", "s1Q9rs", "_2WkVRV"])
        price_tags = soup.find_all("div", class_="_30jeq3")
        rating_tags = soup.find_all("div", class_="_3LWZlK")

        print(f"🔎 Page {page}: Found {len(name_tags)} names, {len(price_tags)} prices")

        for i in range(len(name_tags)):
            name = name_tags[i].get_text(strip=True)
            price = price_tags[i].get_text(strip=True) if i < len(price_tags) else "N/A"
            rating = rating_tags[i].get_text(strip=True) if i < len(rating_tags) else "N/A"

            products.append(name)
            prices.append(price)
            ratings.append(rating)

    df = pd.DataFrame({
        "product_id": range(1, len(products) + 1),
        "name": products,
        "price": prices,
        "rating": ratings
    })

    os.makedirs("data", exist_ok=True)
    df.to_csv("data/flipkart_shoes.csv", index=False)
    print(f"✅ Scraped {len(products)} shoes → saved to data/flipkart_shoes.csv")

if __name__ == "__main__":
    scrape_flipkart_shoes(2)
