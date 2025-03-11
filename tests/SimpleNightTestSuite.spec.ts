import { test, expect } from '@playwright/test';
import { HotelSearchPage } from '../pages/HotelSearchPage';
import { SearchDestinationPage } from '../pages/SearchDestinationPage';
import searchDestinationData from '../data/searchDestinationData.json';
import { clearSiteData } from '../playwright.config';
import priceRangeData from '../data/priceRange.json';
import guestScoresData from '../data/guestScoresData.json';

const { min, max } = priceRangeData.priceRange;
const { VeryGood, Excellent } = guestScoresData.guestScores;
const { destination, checkInDate, checkOutDate, month } = searchDestinationData;

test.beforeEach(async ({ page }) => {
    await clearSiteData(page);
});

test('Booking Hotel', async ({ page }) => {
    // Go to the homepage https://app.simplenight.com/
    await page.goto('/');

    // Select Hotels category from the available navbar options and search with provided data
    const searchDestinationPage = new SearchDestinationPage(page, destination, checkInDate, checkOutDate, month);

    // Search hotel by name using destination from JSON file
    await searchDestinationPage.searchHotelByName(destination);

    // Select the check-in and check-out dates (read from JSON file)
    await searchDestinationPage.searchHotelByDates(checkInDate, checkOutDate, month);

    // Select guests: 1 Adult + 1 Child
    await searchDestinationPage.addChildGuest();

    // Click the search button
    await searchDestinationPage.clickSearchHotel();

    const hotelSearchPage = new HotelSearchPage(page);

    // Switch to Map view for search results
    await hotelSearchPage.changeViewToMap();

    // Filter by price range (100 - 1000)(read from JSON file)
    await hotelSearchPage.movePriceSlidersbyRanges(min, max);

    // Filter by guest score: Very Good
    await hotelSearchPage.selectGuestScoreVeryGood();

    // Zoom-in on map and select one hotel option
    const resultFromMap = await hotelSearchPage.zoomInMapSimulatingTouchFingers();
    if (!resultFromMap) throw new Error('Error retrieving hotel data from the map');

    // Retrieve data for assertions
    const mapPrice = resultFromMap.priceNumber;
    const ratingName = resultFromMap.ratingName;

    // Verify that rating score is within expected values (sometimes Excellent appears when filtering by VeryGood)
    expect([VeryGood, Excellent]).toContain(ratingName);

    // Verify that price is within the specified range
    expect(mapPrice).toBeGreaterThanOrEqual(min);
    expect(mapPrice).toBeLessThanOrEqual(max);
});
