// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const globby = require('globby');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettier = require('prettier');

const PAGES_DIR_PREFIX = 'src/pages';

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    `${PAGES_DIR_PREFIX}/**/*{.js,.mdx,.tsx}`,
    `!${PAGES_DIR_PREFIX}/_*.js`,
    `!${PAGES_DIR_PREFIX}/_*.ts`,
    `!${PAGES_DIR_PREFIX}/_*.tsx`,
    `!${PAGES_DIR_PREFIX}/api`,
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace(PAGES_DIR_PREFIX, '')
                  .replace('.js', '')
                  .replace('.mdx', '')
                  .replace('.jsx', '')
                  .replace('.tsx', '')
                  .replace('.ts', '');
                const route = path === '/index' ? '' : path;

                return `
                        <url>
                            <loc>${`https://hackerstats.io${route}`}</loc>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `;

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
