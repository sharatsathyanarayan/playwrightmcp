// Page object for the Sauce Demo inventory page
export default class InventoryPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.items = page.locator('.inventory_item');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    // Adds every visible item on the inventory page to the cart and returns an array of titles added
    async addAllToCart() {
        const titles = [];
        const count = await this.items.count();
        for (let i = 0; i < count; i++) {
            const item = this.items.nth(i);
            const title = (await item.locator('.inventory_item_name').innerText()).trim();
            titles.push(title);
            // click the Add to cart button inside this item
            const addBtn = item.locator('button:has-text("Add to cart")');
            await addBtn.click();
        }
        return titles;
    }

    async gotoCart() {
        await this.cartLink.click();
        await this.page.waitForURL('**/cart.html');
    }
}
