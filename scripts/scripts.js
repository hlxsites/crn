import {
  sampleRUM,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './lib-franklin.js';

const LCP_BLOCKS = ['newslist']; // add your LCP blocks to the list

/**
 * Gets details about pages that are indexed
 * @param {Array} pathnames list of pathnames
 */
export async function lookupPages(pathnames) {
  if (!window.pageIndex) {
    const resp = await fetch(`${window.hlx.codeBasePath}/query-index.json`);
    const json = await resp.json();
    const lookup = {};
    json.data.forEach((row) => {
      lookup[row.path] = row;
      if (!row.image.startsWith('/default-meta-image.png')) {
        row.image = `/${window.hlx.codeBasePath}${row.image}`;
      }
    });
    window.pageIndex = {
      data: json.data,
      lookup,
    };
  }
  return pathnames.map((path) => window.pageIndex.lookup[path]).filter((e) => e);
}

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const heroHtml = `
    <div class="hero-header">
      <div class="hero-header-image">
        <img src = '/images/hero-banner.jpeg'>
      </div>
      <div class="hero-container">
        <h1 class="hero-header-title">
          <a href="/" class="hero-header-title-link">IoT Integrator</a>
        </h1>
        <h2 class="hero-header-subtitle">Powering the business behind the Internet of Things</h2>
    </div>
  `;
  const section = document.createElement('div');
  section.innerHTML = heroHtml;
  main.prepend(section);
}

// Build Article Props
// Retreive metadata value based on the key
function getMetadata(key) {
  const metaElement = document.querySelector(`meta[name="${key}"]`);
  if (metaElement) {
    return metaElement.getAttribute('content');
  }
  return '';
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format the published date
function formatPublishedDate(rawDate) {
  const date = new Date(rawDate);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function createHeaderList(publishedDate, author) {
  const headerList = document.createElement('div');
  headerList.classList.add('header-list');
  headerList.innerHTML = `${publishedDate} / Author: ${author}`;
  return headerList;
}

function createListItem(key, value) {
  const listItem = document.createElement('li');
  listItem.classList.add('article-key-item');
  listItem.textContent = `${capitalizeFirstLetter(key)}: ${value}`;
  return listItem;
}

function createArticleKeyDiv(metadataKeys) {
  const articleKeyDiv = document.createElement('div');
  articleKeyDiv.classList.add('article-key');

  const articleKeyList = document.createElement('ul');
  articleKeyList.classList.add('article-key-list');

  metadataKeys.forEach((key) => {
    const value = getMetadata(key);
    if (value) {
      const listItem = createListItem(key, value);
      articleKeyList.appendChild(listItem);
    }
  });

  articleKeyDiv.appendChild(articleKeyList);
  return articleKeyDiv;
}

// Build the article properties block
function buildArticlePropsBlock(main) {
  const rawPublishedDate = getMetadata('publisheddate');
  const publishedDate = formatPublishedDate(rawPublishedDate);
  const author = getMetadata('author');
  const metadataKeys = ['vertical', 'application', 'featuredsis', 'featured-tech'];

  const headerList = createHeaderList(publishedDate, author);
  const articleKeyDiv = createArticleKeyDiv(metadataKeys);

  const hook = main.querySelector('picture');
  if (hook) {
    hook.parentElement.prepend(headerList);
    hook.parentElement.append(articleKeyDiv);
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */

function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
    buildArticlePropsBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Sets the content container based on the available elements, which is required for styling.
 * @param {Element} the main element
 */
function setContentContainer(main) {
  // this is the container that will hold the main page content and aside (which will be loaded in delayed)
  const container = document.querySelector('.newslist-container') || document.querySelector(".hero-header-container+div.section");
  if (container) {
    container.classList.add('content-container');
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);
  // set contnet container
  setContentContainer(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
