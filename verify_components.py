from playwright.sync_api import sync_playwright
import time
import os

os.makedirs('verification', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 800})

    print("Navigating to page...")
    page.goto('http://localhost:3003')
    page.wait_for_load_state('networkidle')

    # Scroll slowly to the bottom to trigger all IntersectionObservers
    print("Scrolling to trigger animations...")
    page.evaluate('''
        async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                let distance = 100;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if(totalHeight >= scrollHeight - window.innerHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        }
    ''')

    # Wait for Framer Motion animations to settle
    time.sleep(3)

    # Scroll back to the top
    page.evaluate('window.scrollTo(0, 0)')
    time.sleep(1)

    def capture_element(selector, name):
        print(f"Capturing {name}...")
        element = page.locator(selector).first
        if element.count() > 0:
            # Scroll element into view specifically before capture
            element.evaluate("el => el.scrollIntoView({ behavior: 'instant', block: 'center' })")
            time.sleep(2) # let animations settle again if needed
            element.screenshot(path=f'verification/{name}.png')
            print(f"Captured {name}")
        else:
            print(f"Element {selector} not found")

    capture_element('#testimonials', 'testimonials')
    capture_element('#speaking', 'speaking')
    capture_element('#vision', 'vision')

    browser.close()
