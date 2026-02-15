export const SITE = {
  website: 'https://great-cactus.github.io/',
  author: 'Akira Tsunoda',
  description: '角田 陽の個人研究者ページ。燃焼・反応の基礎的なダイナミクスに関する研究。',
  title: '角田 陽 | Akira Tsunoda',
  ogImage: 'astropaper-og.jpg',

  labName: '角田 陽',
  university: '東北大学 工学研究科 機械機能創成専攻',
  email: 'tsunoda@edyn.ifs.tohoku.ac.jp',

  nav: [
    { text: 'ホーム', link: '/', key: 'home' },
    { text: '研究', link: '/research', key: 'research' },
    { text: '業績', link: '/achievements', key: 'achievements' },
    { text: '経歴', link: '/cv', key: 'cv' },
  ],

  i18n: {
    enabled: true,
    defaultLocale: 'ja' as const,
  },
};

export const LOCALE = {
  lang: 'ja',
  langTag: ['ja-JP'],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: false,
  width: 216,
  height: 46,
};

export const SOCIALS = [
  {
    link: 'https://github.com/great-cactus',
    active: true,
  },
];
