class SearchDestinationLocators {
    categorySearchBarTab = '[data-testid="category-search-bar-tab(static:hotels)"]';
    locationTrigger = '[data-testid^="category(static:hotels)_search-form_location_trigger"]';
    locationInput = '[data-testid^="category(static:hotels)_search-form_location_input"]';
    locationButton = 'button';
    dateTrigger = '[data-testid="category(static:hotels)_search-form_dates_trigger"]';
    calendarHeader = '.mantine-DatePicker-calendarHeaderLevel';
    applyDateButton = 'button[data-testid="category(static:hotels)_search-form_dates_apply-button"]';
    guestTrigger = '[data-testid^="category(static:hotels)_search-form_guests_trigger"]';
    addChildButton = '[data-testid="category(static:hotels)_search-form_guests_room(1)_age(children)_add-button"]';
    searchButton = '[data-testid^="category(static:hotels)_search-form_search-button"]';
    monthSelectorBase = 'button.mantine-DatePicker-monthsListControl:has-text';
    

    //This method is here because
    // CSS selectors can't be built by concatenating strings with dynamic parts outside runtime,
    // as variables don't exist at class definition time.
     async selectDate(checkInDate: string) {
        const dateSelector = `[data-testid="category(static:hotels)_search-form_dates_calendar_day(${checkInDate})"]`;
        const dateLocator = this.page.locator(dateSelector);
        await dateLocator.waitFor({ state: 'visible' });
        return dateLocator;
    }

    constructor(private page: any) { }



 
}

export default SearchDestinationLocators;
