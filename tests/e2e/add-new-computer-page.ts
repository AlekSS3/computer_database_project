import { expect, Locator, Page } from '@playwright/test';
import * as fs from 'fs';

const computers = JSON.parse(fs.readFileSync('../playwright-tst/tests/fixtures/data/users.json', 'utf-8'));

export class AddNewComputerPage{
    readonly page: Page;
    readonly computerName: Locator;
    readonly introduced: Locator;
    readonly discontinued: Locator;
    readonly company: Locator;
    readonly buttonCreateComputer: Locator;

    constructor(page:Page){
        this.page=page;
        this.computerName = page.getByLabel(computers);
        this.introduced = page.getByLabel(computers);
        this.discontinued = page.getByLabel(computers);
        //this.company = page.getByLabel('Company').selectOption('1');
        this.company = page.getByLabel('Company');
        this.buttonCreateComputer = page.getByRole('button', { name: 'Create this computer' });
    }

    async goto(){
        await this.page.goto('/')
    }
    
    async typeComputerName(computers){
        await this.computerName.fill(computers);
    }

    async typeIntroduced(computers){
        await this.introduced.fill(computers);
    }

    async typeDiscontinued(computers){
        this.discontinued.fill(computers);
    }

    async chooseCompany(optionValue: string) {
        await this.company.selectOption(optionValue);
    }

    async createComputer(){
        await this.buttonCreateComputer.click();
    }






}




