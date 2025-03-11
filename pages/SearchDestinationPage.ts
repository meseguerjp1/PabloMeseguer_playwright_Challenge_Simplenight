import { Page } from '@playwright/test';
import SearchDestinationLocators from '../pageFactory/SearchDestinationLocators';

export class SearchDestinationPage {
    private searchDestinationLocators: SearchDestinationLocators;
    private page: Page;
    private destination: string;
    private checkInDate: string;
    private checkOutDate: string;
    private month: string;

    constructor(page: Page, destination: string, checkInDate: string, checkOutDate: string, month: string) {
        this.page = page;
        this.destination = destination;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.month = month;
        this.searchDestinationLocators = new SearchDestinationLocators(page);
    }

     async clickSearchHotel() {
        await this.page.click(this.searchDestinationLocators.searchButton);
    }

     async addChildGuest() {
        await this.page.click(this.searchDestinationLocators.guestTrigger);
        await this.page.click(this.searchDestinationLocators.addChildButton);
    }

     async searchHotelByDates(checkInDate: string, checkOutDate: string, month: string) {
        await this.page.click(this.searchDestinationLocators.dateTrigger);
        await this.page.click(this.searchDestinationLocators.calendarHeader);
        await (await this.selectMonth(month)).click();
        await (await this.searchDestinationLocators.selectDate(checkOutDate)).click();
        await (await this.searchDestinationLocators.selectDate(checkInDate)).click();
        await (await this.searchDestinationLocators.selectDate(checkOutDate)).click();
        await this.page.click(this.searchDestinationLocators.applyDateButton);
    }

     async searchHotelByName(destination: string) {
        await this.page.waitForSelector('body');
        await this.page.click(this.searchDestinationLocators.categorySearchBarTab);
        await this.page.click(this.searchDestinationLocators.locationTrigger);
        await this.page.fill(this.searchDestinationLocators.locationInput, destination);
        await this.page.click(`text=${destination}`);
    }

   private async selectMonth(month: string) {
        const monthSelector = `${this.searchDestinationLocators.monthSelectorBase}("${month}")`;
        const monthLocator = this.page.locator(monthSelector);
        await monthLocator.waitFor({ state: 'visible' });
        return monthLocator;
    }
    
}
