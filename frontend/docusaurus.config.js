const { themes: prismThemes } = require('prism-react-renderer');

const config = {
  title: 'Physical AI and Humanoid Robotics',
  tagline: 'A book on Physical AI and Humanoid Robotics',
  favicon: 'img/favicon.ico',
  url: 'https://zakheerali.github.io',
  baseUrl: '/Physical-AI-and-Humanoid-Robotics-Textbook/',
  organizationName: 'ZakheerAli',
  projectName: 'Physical-AI-and-Humanoid-Robotics-Textbook',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-AwFNzM2rZNfmlQJKZQjpfNkbTMVBHNBqHBlxXoPmmjCAHhS0KgNNc/sU/dlQy6/z',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          remarkPlugins: [[require('remark-math').default, {}]],
          rehypePlugins: [[require('rehype-katex').default, {}]],
          editUrl: 'https://github.com/ZakheerAli/Physical-AI-and-Humanoid-Robotics-Textbook/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Physical AI and Humanoid Robotics',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'physicalAiModules',
          position: 'left',
          label: 'Textbook',
        },
        {
          href: 'https://github.com/ZakheerAli/Physical-AI-and-Humanoid-Robotics-Textbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            { label: 'Introduction', to: '/docs/introduction' },
            { label: 'Conclusion', to: '/docs/conclusion' },
            { label: 'Appendices', to: '/docs/appendices' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ZakheerAli/Physical-AI-and-Humanoid-Robotics-Textbook',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI and Humanoid Robotics. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

module.exports = config;
