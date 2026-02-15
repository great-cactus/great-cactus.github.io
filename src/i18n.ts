export const defaultLang = 'ja';

export const languages = {
  ja: '日本語',
  en: 'English',
};

export const ui = {
  ja: {
    'nav.home': 'ホーム',
    'nav.research': '研究',
    'nav.achievements': '業績',
    'nav.publications': '論文',
    'nav.cv': '経歴',
    'nav.search': '検索',

    'search.subtitle': '論文・研究内容を検索します。',

    'hero.viewPubs': '業績を見る',

    'section.selectedPubs': '主な論文',
    'section.viewAll': 'すべて見る',
    'section.latestNews': '最新情報',

    'achievements.title': '業績',
    'achievements.subtitle': '学術論文および受賞歴。',
    'achievements.papers': '論文',
    'achievements.books': '著書',
    'achievements.honors': '受賞',
    'achievements.noPapers': '論文はまだありません。',
    'achievements.noBooks': '著書はまだありません。',
    'achievements.noHonors': '受賞歴はまだありません。',

    'research.subtitle': '燃焼の基礎的なダイナミクスを理論・数値計算・実験の各側面から研究しています。',
    'research.learnMore': '詳細',
    'research.noAreas': '研究分野は定義されていません。',

    'publications.journal': '査読付き学術論文',
    'publications.review': '解説・総説',
    'publications.conference-paper': '国際会議論文',
    'publications.invited': '招待講演',
    'publications.presentation': '学会発表',

    'cv.title': '経歴',
    'cv.education': '学歴',
    'cv.grants': '研究費・フェローシップ',
    'cv.projects': '研究プロジェクト',
    'cv.experience': 'その他の活動',

    'footer.rights': 'All rights reserved.',
    'footer.powered': 'Powered by',
  },
  en: {
    'nav.home': 'Home',
    'nav.research': 'Research',
    'nav.achievements': 'Achievements',
    'nav.publications': 'Publications',
    'nav.cv': 'CV',
    'nav.search': 'Search',

    'search.subtitle': 'Search through publications and research.',

    'hero.viewPubs': 'View Publications',

    'section.selectedPubs': 'Selected Publications',
    'section.viewAll': 'View all',
    'section.latestNews': 'Latest News',

    'achievements.title': 'Achievements',
    'achievements.subtitle': 'Academic publications and awards.',
    'achievements.papers': 'Papers',
    'achievements.books': 'Books',
    'achievements.honors': 'Awards',
    'achievements.noPapers': 'No papers listed yet.',
    'achievements.noBooks': 'No books listed yet.',
    'achievements.noHonors': 'No awards listed yet.',

    'research.subtitle': 'Research on fundamental dynamics of combustion and reactions from theoretical, computational, and experimental perspectives.',
    'research.learnMore': 'Learn More',
    'research.noAreas': 'No research areas defined.',

    'publications.journal': 'Peer-reviewed Journal Papers',
    'publications.review': 'Review Articles',
    'publications.conference-paper': 'Conference Papers',
    'publications.invited': 'Invited Presentations',
    'publications.presentation': 'Conference Presentations',

    'cv.title': 'CV',
    'cv.education': 'Education',
    'cv.grants': 'Grants and Fellowships',
    'cv.projects': 'Research Projects',
    'cv.experience': 'Experience',

    'footer.rights': 'All rights reserved.',
    'footer.powered': 'Powered by',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
