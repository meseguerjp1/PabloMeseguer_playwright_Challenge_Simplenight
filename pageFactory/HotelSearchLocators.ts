import { Page } from '@playwright/test';

class HotelSearchLocators {
    veryGoodScoreCheckbox = "input.mantine-Checkbox-input[value='7+']";
    propertyTypeMapOption = 'div.mantine-Combobox-option:has-text("Map")';
    mapPositionLabels = '[data-testid="map"] .yNHHyP-marker-view';
    detailsButton = '[aria-label="Go to hotel details"]';
    mapPoints = '[style="pointer-events: none"]';
    map = '[aria-label="Map"]';
    sliders = '.mantine-Slider-thumb';
    selectPropertyTypeButton = 'button.mantine-Button-root[data-variant="transparent"][aria-haspopup="listbox"]';
    valuenow = 'aria-valuenow';
    valueMin = 'aria-valuemin';
    valueMax = 'aria-valuemax';
    sliderStep = 'aria-step';
    closeButton = 'button[aria-label="Close"]';
    closeDialogButton = 'div[role="dialog"] button[aria-label="Close"]';
    hotelNameLabel = '.font-semibold.text-\\[22px\\]/\\[26px\\]';
    hotelRatingName = 'div.text-\\[13px\\]\\/\\[18px\\].font-semibold.\\[grid-area\\:rating-label\\]';
    priceLocator = '[class="text-[22px]/6 font-bold"]';

    constructor(private page: Page) {}
}

export default HotelSearchLocators;
