/**
 * Scrape Warren Commission Report from Archives.gov
 * Run with: node scripts/scrape-warren-report.js
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase config - use service role for write access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://grdwmwhqzvvjkfpfeauh.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_URL = 'https://www.archives.gov';

// Define all sections to scrape
const SECTIONS = [
  // Foreword
  { type: 'foreword', number: null, title: 'Foreword', path: '/research/jfk/warren-commission-report/foreword.html', slug: 'foreword' },

  // Chapters 1-8
  { type: 'chapter', number: 1, title: 'Summary and Conclusions', path: '/research/jfk/warren-commission-report/chapter-1.html', slug: 'chapter-1' },
  { type: 'chapter', number: 2, title: 'The Assassination', path: '/research/jfk/warren-commission-report/chapter-2.html', slug: 'chapter-2' },
  { type: 'chapter', number: 3, title: 'The Shots from the Texas School Book Depository', path: '/research/jfk/warren-commission-report/chapter-3.html', slug: 'chapter-3' },
  { type: 'chapter', number: 4, title: 'The Assassin', path: '/research/jfk/warren-commission-report/chapter-4.html', slug: 'chapter-4' },
  { type: 'chapter', number: 5, title: 'Detention and Death of Oswald', path: '/research/jfk/warren-commission-report/chapter-5.html', slug: 'chapter-5' },
  { type: 'chapter', number: 6, title: 'Investigation of Possible Conspiracy', path: '/research/jfk/warren-commission-report/chapter-6.html', slug: 'chapter-6' },
  { type: 'chapter', number: 7, title: 'Lee Harvey Oswald: Background and Possible Motives', path: '/research/jfk/warren-commission-report/chapter-7.html', slug: 'chapter-7' },
  { type: 'chapter', number: 8, title: 'The Protection of the President', path: '/research/jfk/warren-commission-report/chapter-8.html', slug: 'chapter-8' },

  // Appendices 1-18 (note: inconsistent URL patterns on archives.gov)
  { type: 'appendix', number: 1, title: 'Press Release Announcing Appointment of Commission', path: '/research/jfk/warren-commission-report/appendix-01.html', slug: 'appendix-1' },
  { type: 'appendix', number: 2, title: 'Executive Order No. 11130', path: '/research/jfk/warren-commission-report/appendix2.html', slug: 'appendix-2' },
  { type: 'appendix', number: 3, title: 'Senate Joint Resolution 137 (Pub. Law 88-202)', path: '/research/jfk/warren-commission-report/appendix3.html', slug: 'appendix-3' },
  { type: 'appendix', number: 4, title: 'Biographical Information and Acknowledgments', path: '/research/jfk/warren-commission-report/appendix4.html', slug: 'appendix-4' },
  { type: 'appendix', number: 5, title: 'List of Witnesses', path: '/research/jfk/warren-commission-report/appendix5.html', slug: 'appendix-5' },
  { type: 'appendix', number: 6, title: 'Commission Procedures for the Taking of Testimony', path: '/research/jfk/warren-commission-report/appendix6.html', slug: 'appendix-6' },
  { type: 'appendix', number: 7, title: 'A Brief History of Presidential Protection', path: '/research/jfk/warren-commission-report/appendix7.html', slug: 'appendix-7' },
  { type: 'appendix', number: 8, title: 'Medical Reports from Doctors at Parkland Memorial Hospital', path: '/research/jfk/warren-commission-report/appendix8.html', slug: 'appendix-8' },
  { type: 'appendix', number: 9, title: 'Autopsy Report and Supplemental Report', path: '/research/jfk/warren-commission-report/appendix9.html', slug: 'appendix-9' },
  { type: 'appendix', number: 10, title: 'Expert Testimony', path: '/research/jfk/warren-commission-report/appendix-10.html', slug: 'appendix-10' },
  { type: 'appendix', number: 11, title: 'Reports Relating to the Interrogation of Lee Harvey Oswald', path: '/research/jfk/warren-commission-report/appendix-11.html', slug: 'appendix-11' },
  { type: 'appendix', number: 12, title: 'Speculations and Rumors', path: '/research/jfk/warren-commission-report/appendix-12.html', slug: 'appendix-12' },
  { type: 'appendix', number: 13, title: 'Biography of Lee Harvey Oswald', path: '/research/jfk/warren-commission-report/appendix-13.html', slug: 'appendix-13' },
  { type: 'appendix', number: 14, title: 'Analysis of Lee Harvey Oswald\'s Finances', path: '/research/jfk/warren-commission-report/appendix-14.html', slug: 'appendix-14' },
  { type: 'appendix', number: 15, title: 'Transactions between Lee Harvey Oswald and Marina Oswald', path: '/research/jfk/warren-commission-report/appendix-15.html', slug: 'appendix-15' },
  { type: 'appendix', number: 16, title: 'A Biography of Jack Ruby', path: '/research/jfk/warren-commission-report/appendix-16.html', slug: 'appendix-16' },
  { type: 'appendix', number: 17, title: 'Polygraph Examination of Jack Ruby', path: '/research/jfk/warren-commission-report/appendix-17.html', slug: 'appendix-17' },
  { type: 'appendix', number: 18, title: 'Footnotes', path: '/research/jfk/warren-commission-report/appendix-18.html', slug: 'appendix-18' },
];

/**
 * Fetch HTML content from a URL
 */
async function fetchPage(url) {
  console.log(`  Fetching: ${url}`);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'JFK Primary Sources Research App (educational)'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.text();
}

/**
 * Extract main content from Archives.gov HTML
 * The content is typically in a <main> tag or specific content div
 */
function extractContent(html) {
  // Try to find the main content area
  // Archives.gov typically uses <main> or <div class="main-content">

  // Method 1: Look for <main> tag content
  let mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    return cleanHtml(mainMatch[1]);
  }

  // Method 2: Look for content div
  let contentMatch = html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i);
  if (contentMatch) {
    return cleanHtml(contentMatch[1]);
  }

  // Method 3: Look for article tag
  let articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    return cleanHtml(articleMatch[1]);
  }

  // Fallback: extract body content
  let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    return cleanHtml(bodyMatch[1]);
  }

  return cleanHtml(html);
}

/**
 * Clean HTML content - remove scripts, navigation, etc.
 */
function cleanHtml(html) {
  return html
    // Remove script tags
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    // Remove style tags
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Remove navigation elements
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    // Remove header elements (site headers, not content headers)
    .replace(/<header[^>]*class="[^"]*site[^"]*"[^>]*>[\s\S]*?<\/header>/gi, '')
    // Remove footer elements
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    // Remove aside elements
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Clean up excessive whitespace
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

/**
 * Count words in HTML content
 */
function countWords(html) {
  // Strip HTML tags and count words
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(w => w.length > 0).length;
}

/**
 * Insert or update a section in the database
 */
async function upsertSection(section, content) {
  const wordCount = countWords(content);

  const { data, error } = await supabase
    .from('warren_report_sections')
    .upsert({
      type: section.type,
      number: section.number,
      title: section.title,
      slug: section.slug,
      content: content,
      word_count: wordCount,
      source_url: BASE_URL + section.path,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'slug'
    });

  if (error) {
    throw error;
  }

  return wordCount;
}

/**
 * Main scraper function
 */
async function scrapeWarrenReport() {
  console.log('=== Warren Commission Report Scraper ===\n');
  console.log(`Scraping ${SECTIONS.length} sections from Archives.gov\n`);

  let totalWords = 0;
  let successful = 0;
  let failed = 0;

  for (const section of SECTIONS) {
    const label = section.type === 'chapter'
      ? `Chapter ${section.number}: ${section.title}`
      : section.type === 'appendix'
        ? `Appendix ${section.number}: ${section.title}`
        : section.title;

    console.log(`Processing: ${label}`);

    try {
      const url = BASE_URL + section.path;
      const html = await fetchPage(url);
      const content = extractContent(html);
      const wordCount = await upsertSection(section, content);

      totalWords += wordCount;
      successful++;
      console.log(`  ✓ Saved (${wordCount.toLocaleString()} words)\n`);

      // Be nice to the server - small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      failed++;
      console.error(`  ✗ Error: ${error.message}\n`);
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Successful: ${successful}/${SECTIONS.length}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total words: ${totalWords.toLocaleString()}`);
}

// Run the scraper
scrapeWarrenReport()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
