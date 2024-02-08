// lib/scraper.ts

import axios from 'axios';
import cheerio from 'cheerio';

export async function getHtml(url: string): Promise<string> {
  const { data: html } = await axios.get(url);
  return html;
}

export const getTwitterFollowers = (html: string): number | null => {
    const $ = cheerio.load(html);
    const span = $('[data-nav="followers"] .ProfileNav-value');
    const count = span.data('count');
    return typeof count === 'number' ? count : null;
  };

export async function getTwitterData(html: string): Promise<string | null> {
try {
    const $ = cheerio.load(html);

    // Replace this selector with the one suitable for extracting Twitter data you need
    const tweetText = $('.tweet-text').text();

    return tweetText !== undefined ? tweetText.trim() : null;
} catch (error) {
    console.error('Error extracting tweet data:', error);
    return null;
}
}