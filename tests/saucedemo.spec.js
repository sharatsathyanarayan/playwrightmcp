import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import LoginPage from '../src/pages/LoginPage.js';
import InventoryPage from '../src/pages/InventoryPage.js';
import CartPage from '../src/pages/CartPage.js';

test('add all items to cart and verify cart contents', async ({ page }) => {
    // Allure metadata
    allure.epic('SauceDemo');
    allure.feature('Shopping Cart');
    allure.story('Add all inventory items to cart and verify contents');
    allure.severity('critical');
    allure.label('owner', 'sharats');

    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    const inventory = new InventoryPage(page);
    const addedTitles = await inventory.addAllToCart();

    // go to cart
    await inventory.gotoCart();

    const cart = new CartPage(page);

    // Use Playwright async matcher to verify count
    await expect(cart.items).toHaveCount(addedTitles.length);

    // verify same set of titles (order may differ) using Playwright's polling to allow retries
    const sortedAdded = [...addedTitles].sort();
    await expect.poll(async () => {
        const cartTitles = await cart.getCartItemTitles();
        return [...cartTitles].sort();
    }, { timeout: 5000 }).toEqual(sortedAdded);
});
