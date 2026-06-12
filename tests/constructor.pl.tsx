import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.routeFromHAR('tests/hars/ingredients.har', {
    url: '**/api/ingredients',
    update: false
  });

  await page.goto('/');
});

test('добавление ингредиента в конструктор', async ({ page }) => {
  const addButtons = page.getByRole('button', { name: 'Добавить' });

  await addButtons.first().click();

  await expect(page.getByText('Выберите булки')).toHaveCount(0);
});

test('открытие модального окна ингредиента', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Краторная булка N-200i').first().click();

  await expect(page.getByText('Калории, ккал')).toBeVisible();
});

test('закрытие модального окна по крестику', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Краторная булка N-200i').first().click();

  await expect(page.getByText('Калории, ккал')).toBeVisible();

  await page.locator('#modals button').first().click();

  await expect(page.getByText('Калории, ккал')).not.toBeVisible();
});

test('закрытие модального окна по Escape', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Краторная булка N-200i').first().click();

  await expect(page.getByText('Калории, ккал')).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(page.getByText('Калории, ккал')).not.toBeVisible();
});

test('создание заказа', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('refreshToken', 'test-refresh-token');
    document.cookie = 'accessToken=test-access-token';
  });

  await page.route('**/api/auth/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        user: {
          email: 'test@test.ru',
          name: 'Тест'
        }
      })
    });
  });

  await page.route('**/api/orders', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          name: 'Тестовый бургер',
          order: {
            _id: '1',
            status: 'done',
            name: 'Тестовый бургер',
            createdAt: '2025-01-01',
            updatedAt: '2025-01-01',
            number: 12345,
            ingredients: []
          }
        })
      });
      return;
    }

    await route.fallback();
  });

  await page.goto('/');

  await page
    .locator('li')
    .filter({ hasText: 'Краторная булка N-200i' })
    .getByRole('button', { name: 'Добавить' })
    .click();

  await page
    .locator('li')
    .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
    .getByRole('button', { name: 'Добавить' })
    .click();

  await page.getByRole('button', { name: 'Оформить заказ' }).click();

  await expect(page.getByText('12345')).toBeVisible();

  await expect(page.getByText('Выберите булки')).toHaveCount(2);
  await expect(page.getByText('Выберите начинку')).toHaveCount(1);

  await page.locator('#modals button').first().click();

  await expect(page.getByText('12345')).not.toBeVisible();
});
