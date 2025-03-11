import { Page } from '@playwright/test';
import HotelSearchLocators from '../pageFactory/HotelSearchLocators';

export class HotelSearchPage {
    private page: Page;
    private hotelSearchLocators: HotelSearchLocators;

    constructor(page: Page) {
        this.page = page;
        this.hotelSearchLocators = new HotelSearchLocators(page);
    }

    async changeViewToMap() {
        await this.page.waitForSelector(this.hotelSearchLocators.selectPropertyTypeButton, { state: 'visible' });
        await this.page.click(this.hotelSearchLocators.selectPropertyTypeButton);
        await this.page.waitForSelector(this.hotelSearchLocators.propertyTypeMapOption, { state: 'visible' });
        await this.page.click(this.hotelSearchLocators.propertyTypeMapOption);
    }

    async movePriceSlidersbyRanges(minParam: number, maxParam: number) {
        //This wait is because after some time the real ranges of the slider are displayed
        await this.page.waitForTimeout(8000);
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector('body', { state: 'visible' });
        this.page.waitForSelector(this.hotelSearchLocators.map, { state: 'visible' });
        this.page.waitForSelector(this.hotelSearchLocators.sliders, { state: 'visible' });
        const sliders = this.page.locator(this.hotelSearchLocators.sliders);
        const locators = {
            valuenow: this.hotelSearchLocators.valuenow,
            valueMin: this.hotelSearchLocators.valueMin,
            valueMax: this.hotelSearchLocators.valueMax,
            sliderStep: this.hotelSearchLocators.sliderStep
        };
        const sliderValues = await sliders.evaluateAll(
            (elements, selectors) =>
                elements.map(el => ({
                    now: Number(el.getAttribute(selectors.valuenow)),
                    min: Number(el.getAttribute(selectors.valueMin)),
                    max: Number(el.getAttribute(selectors.valueMax)),
                    step: el.getAttribute(selectors.sliderStep) ? Number(el.getAttribute(selectors.sliderStep)) : 1,
                })),
            locators
        );
        const { min, max, step } = sliderValues[0];
        const values = [];
        for (let i = min; i <= max; i += step) values.push(i);
        const minSlider = sliders.nth(0);
        const maxSlider = sliders.nth(1);
        let minValue = sliderValues[0].now;
        let maxValue = sliderValues[1].now;
        const targetMinValue = minParam;
        let targetMaxValue = maxValue > maxParam ? maxParam : 999;
        if (Math.abs(minValue - targetMinValue) < Math.abs(maxValue - targetMaxValue)) {
            while (minValue < targetMinValue) {
                await minSlider.press('ArrowRight');
                //This is to show you how the slider change
                await this.page.waitForTimeout(1);
                minValue = parseInt(await minSlider.getAttribute(locators.valuenow) || '0');
            }
        }
        if (maxValue !== targetMaxValue) {
            const closestValue = values.filter(v => v <= targetMaxValue).pop() || targetMaxValue;
            while (maxValue > closestValue) {
                await maxSlider.focus();
                await maxSlider.press('ArrowLeft');
                //This is to show you how the slider change
                await this.page.waitForTimeout(1);
                maxValue = parseInt(await maxSlider.getAttribute(locators.valuenow) || '0');
            }
        }
        await minSlider.press('Enter');
        await maxSlider.press('Enter');
    }

    async selectGuestScoreVeryGood() {
        await this.page.waitForSelector(this.hotelSearchLocators.veryGoodScoreCheckbox, { state: 'visible' });
        await this.page.click(this.hotelSearchLocators.veryGoodScoreCheckbox);
        await this.page.focus(this.hotelSearchLocators.veryGoodScoreCheckbox);
        await this.page.keyboard.press('Enter');
    }

    async zoomInMapSimulatingTouchFingers() {
        const mapPositionLabels = this.page.locator(this.hotelSearchLocators.mapPositionLabels);
        const map = this.page.locator(this.hotelSearchLocators.map);
        const goToDetailsButton = this.page.locator(this.hotelSearchLocators.detailsButton);
        await map.waitFor({ state: 'visible' });
        await map.click({ force: true });
        const closeButton = this.page.locator(this.hotelSearchLocators.closeButton);
        while (await map.isVisible()) {
            const closeDialogButton = this.page.locator(this.hotelSearchLocators.closeDialogButton);
            if (await closeDialogButton.isVisible()) {
                await closeDialogButton.click();
            }
            //This wait is to show you how the map is simulating the zoom in
            await this.page.waitForTimeout(3000);
            await this.page.keyboard.press('+');
            const markerCount = await mapPositionLabels.count();
            if (markerCount > 0) {
                const priceTextElement = mapPositionLabels.first();
                const priceText = await priceTextElement.evaluate(el => el.textContent?.trim());
                if (priceText && priceText.includes('$')) {
                    //Click to the location pointer
                    await priceTextElement.click({ force: true });
                    const priceLocator = this.page.locator(this.hotelSearchLocators.priceLocator);
                    const finalPriceText = await priceLocator.textContent();
                    if (finalPriceText === null) return false;
                    //This wait is to show you the hotel card
                    await this.page.waitForTimeout(3000);
                    const cleanPriceText = finalPriceText.replace('$', '').trim();
                    const priceNumber = parseFloat(cleanPriceText);
                    const ratingName = await this.page.locator(this.hotelSearchLocators.hotelRatingName).innerText();
                    return { priceNumber, ratingName };
                }
            }
        }
        return null;
    }
}
