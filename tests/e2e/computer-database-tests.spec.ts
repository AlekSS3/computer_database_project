import { test, expect } from '@playwright/test';
import * as fs from 'fs';
const data = JSON.parse(fs.readFileSync('../DIMITAR01/tests/fixtures/computers.json', "utf-8"));

test.describe('Test suite for computer database webpage', () =>{
    test('Test for verifying webpage title', async ({ page }) => {
        await page.goto("/");
        await page.getByRole('link', { name: 'Computer database' }).click();
        await page.getByRole('heading', { name: 'computers found' }).click();

        //Assertion
        await expect(page.getByRole('link', { name: 'Computer database' })).toHaveText('Computer database');
        await expect(page.getByRole('link', { name: 'Computer database' })).toHaveText('Computer database');

    });

    test('Test for searching computers on website', async ({ page }) => {
        await page.goto('/');
        await page.getByPlaceholder('Filter by computer name...').click();
        await page.getByPlaceholder('Filter by computer name...').fill('ACE');
        await page.getByRole('button', { name: 'Filter by name' }).click();
        const labelText = await page.locator('h1:has-text("computers found")').textContent();

        const rowCount = await page.locator('tbody tr').count();
        expect(labelText).toContain(`${rowCount} computers found`);
        expect(rowCount).toBe(6);

        //Assertions
       //await expect(page.getByRole('heading', {name: 'computers found'}));
       await expect(page.getByText('Displaying 1 to 6 of')).toBeVisible();
       await expect(page.getByRole('heading', { name: 'computers found' })).toContainText('computers found');   
        
    });

    test('Test to add a new computer', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: 'Add a new computer' }).click();
        await page.getByLabel('Computer name').click();
        await page.getByLabel('Computer name').fill('DIMI01');
        await page.getByLabel('Introduced').click();
        await page.getByLabel('Introduced').fill('2024-01-01');
        await page.getByLabel('Discontinued').click();
        await page.getByLabel('Discontinued').fill('2026-01-01');
        await page.getByLabel('Company').selectOption('1');
        await page.getByRole('button', { name: 'Create this computer' }).click()

        //Assertion
        await expect(page.getByText('has been created')).toBeVisible();
        const alertMessage = await page.locator('.alert-message');
        await expect(alertMessage).toContainText('has been created');
    
    });


    data.forEach((computer) => {
        test(`Test to add 5 computers: ${computer.computerName} to a webpage`, async ({ page }) => {
            await page.goto('/');
            await page.getByRole('link', { name: 'Add a new computer' }).click();
            await page.getByLabel('Computer name').click();
            await page.getByLabel('Computer name').fill(computer.computerName);
            await page.getByLabel('Introduced').click();
            await page.getByLabel('Introduced').fill(computer.introduced);
            await page.getByLabel('Discontinued').click();
            await page.getByLabel('Discontinued').fill(computer.discontinued);
            await page.getByLabel('Company').selectOption(computer.company);
            await page.getByRole('button', { name: 'Create this computer' }).click();
    
            // Assertions for each computer
            await expect(page.getByText('has been created')).toBeVisible();
            await expect(page.getByText('has been created')).toContainText(computer.computerName);
    
        });
    });
    
        
        



    




});