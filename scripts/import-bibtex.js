
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bibtexParse from 'bibtex-parse-js';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BIB_FILE = path.join(process.cwd(), 'citations.bib');
const PUBLICATIONS_DIR = path.join(process.cwd(), 'src', 'content', 'publications');
const BOOKS_DIR = path.join(process.cwd(), 'src', 'content', 'books');

if (!fs.existsSync(PUBLICATIONS_DIR)) {
  fs.mkdirSync(PUBLICATIONS_DIR, { recursive: true });
}
if (!fs.existsSync(BOOKS_DIR)) {
  fs.mkdirSync(BOOKS_DIR, { recursive: true });
}

function cleanString(str) {
  if (!str) return '';
  return str.replace(/[{}]/g, '').replace(/\\\&/g, '&').trim();
}

function parseAuthors(authorStr) {
  if (!authorStr) return [];
  return authorStr.split(' and ').map(name => {
    const cleanName = cleanString(name);
    if (cleanName.includes(',')) {
      const parts = cleanName.split(',').map(p => p.trim());
      return `${parts[1]} ${parts[0]}`;
    }
    return cleanName;
  });
}

const VALID_CATEGORIES = ['journal', 'review', 'conference-paper', 'invited', 'presentation'];

function importBibtex() {
  if (!fs.existsSync(BIB_FILE)) {
    console.error(`Error: BibTeX file not found at ${BIB_FILE}`);
    process.exit(1);
  }

  const bibContent = fs.readFileSync(BIB_FILE, 'utf-8');
  const parsed = bibtexParse.toJSON(bibContent);

  console.log(`Found ${parsed.length} entries. Processing...`);

  let count = 0;
  parsed.forEach(entry => {
    const tags = entry.entryTags;

    if (!tags.title || !tags.year) {
      console.warn(`Skipping entry ${entry.citationKey}: Missing title or year.`);
      return;
    }

    const entryType = (entry.entryType || '').toLowerCase();
    const isBook = entryType === 'book';
    const OUTPUT_DIR = isBook ? BOOKS_DIR : PUBLICATIONS_DIR;

    let type = isBook ? 'book' : 'paper';

    // Extract category from keywords field
    const keywordsRaw = cleanString(tags.keywords || '');
    let category = 'journal'; // default
    if (keywordsRaw && VALID_CATEGORIES.includes(keywordsRaw)) {
      category = keywordsRaw;
    }

    const title = cleanString(tags.title);
    const year = parseInt(tags.year, 10);
    const authors = parseAuthors(tags.author);
    const venue = cleanString(
      tags.booktitle || tags.journal || tags.school || tags.publisher ||
      tags.howpublished || tags.organization || tags.institution || 'Unknown Venue'
    );

    // Cover image (optional)
    let cover = cleanString(tags.cover || tags.image || '');
    if (cover) {
      const relativeToRoot = cover.replace('../../', 'src/');
      const absolutePath = path.join(process.cwd(), relativeToRoot);
      if (!fs.existsSync(absolutePath)) {
        cover = '';
      }
    }

    // Links
    const pdf = cleanString(tags.pdf || tags.url || '');
    const code = cleanString(tags.code || tags.github || '');
    const website = cleanString(tags.website || tags.project || '');
    const slides = cleanString(tags.slides || '');
    const video = cleanString(tags.video || '');
    const demo = cleanString(tags.demo || '');
    const doi = cleanString(tags.doi || '');

    // Badges
    const badges = [];
    const award = cleanString(tags.award || '');
    if (award) {
      badges.push({ text: award, type: 'gold' });
    }

    const note = cleanString(tags.note || '');
    if (note.toLowerCase().includes('best paper')) {
      badges.push({ text: 'Best Paper', type: 'gold' });
    }
    if (note.toLowerCase().includes('invited')) {
      badges.push({ text: 'Invited', type: 'blue' });
    }
    if (note.toLowerCase().includes('reviewed')) {
      badges.push({ text: 'Reviewed', type: 'green' });
    }

    // Filename: use citation key for uniqueness
    const citationKey = entry.citationKey || `${year}-unknown`;
    const filename = `${citationKey}.md`;
    const filePath = path.join(OUTPUT_DIR, filename);

    // Featured
    let isFeatured = tags.featured === 'true';

    // Build frontmatter
    const lines = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `authors: [${authors.map(a => `"${a}"`).join(', ')}]`,
      `year: ${year}`,
      `venue: "${venue.replace(/"/g, '\\"')}"`,
    ];

    if (!isBook) {
      lines.push(`type: "${type}"`);
      lines.push(`category: "${category}"`);
    }

    if (cover) {
      lines.push(`cover: "${cover}"`);
    }

    // Links (only if any exist)
    const hasLinks = pdf || code || website || demo || slides || video;
    if (hasLinks) {
      lines.push('links:');
      if (pdf) lines.push(`  pdf: "${pdf}"`);
      if (code) lines.push(`  code: "${code}"`);
      if (website) lines.push(`  website: "${website}"`);
      if (demo) lines.push(`  demo: "${demo}"`);
      if (slides) lines.push(`  slides: "${slides}"`);
      if (video) lines.push(`  video: "${video}"`);
    }

    if (doi) lines.push(`doi: "${doi}"`);
    if (award) lines.push(`award: "${award.replace(/"/g, '\\"')}"`);

    if (badges.length > 0) {
      lines.push('badges:');
      badges.forEach(b => lines.push(`  - { text: "${b.text}", type: "${b.type}" }`));
    }

    if (!isBook) {
      lines.push(`featured: ${isFeatured}`);
    }

    lines.push('---');

    fs.writeFileSync(filePath, lines.join('\n') + '\n');
    console.log(`Generated: ${filename} (${category})`);
    count++;
  });

  console.log(`\nSuccessfully imported ${count} entries.`);
}

importBibtex();
