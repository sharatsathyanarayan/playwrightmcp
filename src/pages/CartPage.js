// Page object for the Sauce Demo cart page
export default class CartPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.items = page.locator('.cart_item');
    }

    async getCartItemTitles() {
        const titles = [];
        const count = await this.items.count();
        for (let i = 0; i < count; i++) {
            const item = this.items.nth(i);
            const title = (await item.locator('.inventory_item_name').innerText()).trim();
            titles.push(title);
        }
        return titles;
    }
}
