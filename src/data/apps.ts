export interface AppFeature {
  title: string;
  description: string;
  badge?: string;
}

export interface AppFaqItem {
  question: string;
  answer: string;
}

export interface AppTier {
  name: string;
  badge?: string;
  features: string[];
  note: string;
}

export interface AppProduct {
  id: 'budget' | 'nutrition';
  name: string;
  shortName: string;
  slug: string;
  href: string;
  tagline: string;
  homepageCardCopy: string;
  headline: string;
  supportingCopy: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  accentColor: string;
  accentClass: {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    ring: string;
    button: string;
    buttonHover: string;
  };
  availability: string;
  features: AppFeature[];
  tiers?: AppTier[];
  faq: AppFaqItem[];
}

export const APPS: AppProduct[] = [
  {
    id: 'budget',
    name: 'The Simpler Budget',
    shortName: 'Budget',
    slug: 'budget',
    href: '/budget',
    tagline: 'Envelope budget app with built-in AI — Coming soon for Android',
    homepageCardCopy: 'See where your money goes, plan spending with envelopes, and turn a voice note or receipt into a transaction you can review.',
    headline: 'Know where your money goes.',
    supportingCopy: 'Track income and expenses, set money aside with digital envelopes, and log purchases by voice or receipt. No bank connection required.',
    primaryCtaText: 'Get budget app updates',
    secondaryCtaText: 'I’m interested in beta testing',
    accentColor: '#2D6A4F',
    accentClass: {
      bg: 'bg-emerald-900',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-800',
      ring: 'focus-visible:ring-emerald-700',
      button: 'bg-emerald-800 hover:bg-emerald-900 text-white',
      buttonHover: 'hover:bg-emerald-800',
    },
    availability: 'Coming soon for Android',
    features: [
      {
        title: 'Voice purchase drafting',
        description: 'Speak naturally: "I spent $12.50 on lunch at Panera." Built-in AI drafts the transaction from your voice for quick confirmation.',
      },
      {
        title: 'Receipt scan review',
        description: 'Snap a receipt photo. Built-in AI drafts the merchant, line items, and total so you can verify before saving.',
      },
      {
        title: 'Digital envelope planning',
        description: 'Allocate your cash into practical envelopes like Groceries, Dining Out, and Gas to keep monthly spending intentional.',
      },
      {
        title: 'Private & local records',
        description: 'No bank credentials or third-party server sync. All transactions and budget categories remain securely on your phone.',
      },
      {
        title: 'Direct manual entry',
        description: 'Prefer typing? Fast manual entry with smart defaults is always one tap away without needing the AI assistant.',
      },
      {
        title: 'Local export & backup',
        description: 'Confirmed for launch: export your data to standard CSV or backup locally to keep full custody of your finances.',
      },
    ],
    tiers: [
      {
        name: 'Free',
        badge: 'Planned',
        features: [
          'Full digital envelope budgeting',
          'Manual transaction logging',
          'Single voice entry at a time',
          'Single receipt scan at a time',
          '100% on-device data storage',
          'Supported by non-intrusive ads',
        ],
        note: 'Pricing and ad format details will be finalized prior to public launch.',
      },
      {
        name: 'Plus',
        badge: 'Planned upgrade',
        features: [
          'Everything in Free',
          'Ad-free experience',
          'Batch voice note processing',
          'Multi-receipt continuous capture',
          'Priority local model updates',
          'Flexible local export options',
        ],
        note: 'Subscription pricing and free trial lengths will be announced closer to release.',
      },
    ],
    faq: [
      {
        question: 'Why doesn’t The Simpler Budget connect to my bank?',
        answer: 'We deliberately designed the app without bank account linking (no Plaid, no third-party aggregators, and no bank logins). This ensures complete financial privacy, avoids broken bank connections, and puts you in active control of your money rather than relying on delayed automated bank feeds.',
      },
      {
        question: 'Can I still enter transactions manually?',
        answer: 'Yes, absolutely. Manual entry is a core feature with a quick keypad, recent merchant auto-complete, and instant envelope assignment. The built-in AI voice and receipt drafting tools are optional shortcuts designed to speed up entry.',
      },
      {
        question: 'How does reviewing and editing AI drafts work?',
        answer: 'The Simpler Budget drafts transactions from voice or receipts, but never saves a transaction directly into your ledger without your approval. When you speak or scan a receipt, the app generates a draft showing the proposed amount, merchant, date, and envelope. You can tap any field to adjust it, tap to approve, or discard it entirely.',
      },
      {
        question: 'What devices are supported, and will there be an iPhone version?',
        answer: 'Android is our first planned launch, targeting modern Android smartphones running Android 11 and above where built-in AI can run on supported phones. We are building the Keep It Simpler family so it can grow across mobile platforms over time, leaving iPhone availability and timing open as we focus on delivering a great Android experience first.',
      },
    ],
  },
  {
    id: 'nutrition',
    name: 'The Simpler Nutrition Tracker',
    shortName: 'Nutrition',
    slug: 'nutrition',
    href: '/nutrition',
    tagline: 'Voice food log and macro tracker with built-in AI — Coming soon for Android',
    homepageCardCopy: 'Say what you ate, review an estimate of calories and macros, and get on with your day.',
    headline: 'Log a meal by saying what you ate.',
    supportingCopy: 'Describe your meal, review an estimate of calories and macros, and adjust the details before you save.',
    primaryCtaText: 'Get nutrition app updates',
    secondaryCtaText: 'I’m interested in beta testing',
    accentColor: '#D96528',
    accentClass: {
      bg: 'bg-amber-900',
      text: 'text-amber-800',
      border: 'border-amber-200',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-900',
      ring: 'focus-visible:ring-amber-700',
      button: 'bg-amber-800 hover:bg-amber-900 text-white',
      buttonHover: 'hover:bg-amber-800',
    },
    availability: 'Coming soon for Android',
    features: [
      {
        title: 'Voice meal description',
        description: 'Simply say: "Three eggs, a New York strip steak, and two slices of sourdough." Built-in AI estimates calories and macros from your meal description.',
      },
      {
        title: 'Editable food estimates',
        description: 'View estimated calories, protein, carbohydrates, and fats for each ingredient with editable quantities before saving.',
      },
      {
        title: 'Instant review or draft for later',
        description: 'Confirm meal nutrition immediately, or capture quick voice notes while eating and review the breakdown later when convenient.',
      },
      {
        title: 'On-device meal history',
        description: 'Track your daily intake patterns with private meal logs that live directly on your phone storage.',
      },
      {
        title: 'No manual database hunting',
        description: 'Skip typing barcodes or scrolling through hundreds of identical crowdsourced entries. Speak your plate naturally.',
      },
      {
        title: 'Zero mandatory cloud account',
        description: 'Your dietary data, meal logs, and calorie counts belong to you. No personal health records are sent to ad brokers.',
      },
    ],
    faq: [
      {
        question: 'How does voice meal logging work?',
        answer: 'You tap the microphone and describe what you ate in your own words (e.g., "Two scrambled eggs with cheddar and a slice of whole wheat toast"). Built-in AI parses your phrase into distinct food items and estimates calories and macros from the meal description.',
      },
      {
        question: 'Can I edit the food items and macro estimates?',
        answer: 'Yes. Every generated number is clearly labeled as an estimate. Before saving to your daily log, you can adjust portions, swap ingredients, modify calories or grams of protein, carbs, and fats, or add additional foods.',
      },
      {
        question: 'Where are my meal records and nutrition data kept?',
        answer: 'All meal entries and nutritional logs are stored locally on your device. We believe personal nutrition habits should remain private, so no external health profile or cloud account is required.',
      },
      {
        question: 'Which phones support on-device meal estimation, and is an iOS version planned?',
        answer: 'Our first planned launch targets Android (Android 11+), where built-in AI runs on supported phones for private, rapid estimations. We design our apps so the brand can grow across mobile platforms, leaving iPhone availability and timing open as we focus on the upcoming Android release.',
      },
    ],
  },
];

export function getAppById(id: string): AppProduct | undefined {
  return APPS.find((app) => app.id === id);
}
