import { test, expect } from '@playwright/test';
import { withApiKeyQuery } from '../../../utils/apikey';
import dotenv from 'dotenv';

dotenv.config();

test('[Open Weather Map] Fetch current weather data for specific location', async ({ request }) => {
  const BASE_URL = process.env.OWM_BASE_URL ?? 'https://api.openweathermap.org/data/2.5/forecast';
  const LAT = process.env.OWM_lAT ?? '18.06';
  const LON = process.env.OWM_LON ?? '78.85';
  const API_KEY = process.env.OWM_API_KEY ?? 'default-api-key';
    // 1) Build URL with query parameters for location and API key
    const url = withApiKeyQuery(`${BASE_URL}?lat=${LAT}&lon=${LON}&units=metric`, { key: API_KEY, queryName: 'appid' });

    // 2) Send request
    const res = await request.get(url);

    // 3) Validate success
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    console.log('Full API response:', body);

    // Validate response contains expected fields
    expect(body).toHaveProperty('list');
    expect(Array.isArray(body.list)).toBe(true);
    expect(body.list.length).toBeGreaterThan(0);   
    const firstEntry = body.list[0];
    expect(firstEntry).toHaveProperty('main');
    expect(firstEntry.main).toHaveProperty('temp');
    expect(typeof firstEntry.main.temp).toBe('number');
    console.log('Successfully fetched weather data for location', { lat: LAT, lon: LON, temp: firstEntry.main.temp });


    

});