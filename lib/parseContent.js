/**
 * Parse Elementor/WordPress HTML content and extract clean elements
 */

export function parseElementorContent(htmlString) {
  if (!htmlString) return null;

  // Create a simple HTML parser (server-side safe)
  const content = {
    images: [],
    headings: [],
    paragraphs: [],
    links: [],
    galleries: []
  };

  // Extract images
  const imgRegex = /<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"[^>]*>/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(htmlString)) !== null) {
    const src = imgMatch[1];
    const alt = imgMatch[2];

    // Skip Elementor placeholder images
    if (!src.includes('elementor-placeholder')) {
      content.images.push({ src, alt });
    }
  }

  // Extract headings (h1-h6)
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/g;
  let headingMatch;
  while ((headingMatch = headingRegex.exec(htmlString)) !== null) {
    const level = headingMatch[1];
    const text = headingMatch[2]
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();

    if (text) {
      content.headings.push({ level: parseInt(level), text });
    }
  }

  // Extract paragraphs
  const pRegex = /<p[^>]*>(.*?)<\/p>/g;
  let pMatch;
  while ((pMatch = pRegex.exec(htmlString)) !== null) {
    const text = pMatch[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();

    if (text && text.length > 10) {
      content.paragraphs.push(text);
    }
  }

  // Extract links
  const linkRegex = /<a[^>]+href="([^">]+)"[^>]*>(.*?)<\/a>/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(htmlString)) !== null) {
    const href = linkMatch[1];
    const text = linkMatch[2]
      .replace(/<[^>]+>/g, '')
      .trim();

    if (text && !href.includes('#elementor-action')) {
      content.links.push({ href, text });
    }
  }

  return content;
}

/**
 * Get clean text content from HTML
 */
export function stripHTML(html) {
  if (!html) return '';

  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract featured sections from Elementor content
 */
export function extractSections(htmlString) {
  if (!htmlString) return [];

  const sections = [];

  // Try to identify major sections by looking for containers
  const sectionRegex = /<div[^>]*class="[^"]*e-con[^"]*"[^>]*>(.*?)<\/div>/gs;
  let sectionMatch;
  let sectionIndex = 0;

  while ((sectionMatch = sectionRegex.exec(htmlString)) !== null && sectionIndex < 10) {
    const sectionHTML = sectionMatch[1];
    const parsed = parseElementorContent(sectionHTML);

    if (parsed.headings.length > 0 || parsed.images.length > 0 || parsed.paragraphs.length > 0) {
      sections.push({
        id: sectionIndex++,
        ...parsed
      });
    }
  }

  return sections;
}
