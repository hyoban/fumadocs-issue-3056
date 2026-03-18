import { type Config, defineConfig } from 'waku/config';
import mdx from 'fumadocs-mdx/vite';
import * as MdxConfig from './source.config.js';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { UserConfig } from 'vite';

export default defineConfig({
  vite: {
    // we do this to avoid Vite from bundling React contexts and cause duplicated contexts conflicts.
    optimizeDeps: {
      exclude: ['fumadocs-ui', 'fumadocs-core'],
      include: [
        'fumadocs-ui > debug',
        'fumadocs-core > extend',
        'fumadocs-mdx > extend',
        'fumadocs-core > style-to-js',
        'fumadocs-mdx > style-to-js',
      ],
    },
    ssr: {
      external: ['@takumi-rs/image-response'],
    },

    plugins: [tailwindcss(), mdx(MdxConfig), tsconfigPaths()],
  } satisfies UserConfig as Config['vite'],
});
