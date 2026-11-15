import fs from 'node:fs';
import path from 'node:path';

const checks = [
  {
    file: 'dist/index.html',
    title: 'Keep It Simpler | AI Budget and Nutrition Apps',
    snippets: [
      'Everyday tracking, made simpler with AI.',
      'Say what you spent, scan a receipt, or describe what you ate. Built-in AI gives you a draft to review before you save.',
      'No app account required. Your records stay on your phone.',
      'Explore the apps',
      'Get launch updates',
      'The Simpler Budget',
      'See where your money goes, plan spending with envelopes, and turn a voice note or receipt into a transaction you can review.',
      'The Simpler Nutrition Tracker',
      'Say what you ate, review an estimate of calories and macros, and get on with your day.',
      'A little AI. A lot less typing.',
      'On supported phones, the AI runs right on your device. That helps us keep costs down and design apps that stay affordable.',
      'Coming soon for Android',
      'App preview'
    ]
  },
  {
    file: 'dist/budget/index.html',
    title: 'The Simpler Budget | Android Envelope Budget App',
    snippets: [
      'Know where your money goes.',
      'Track income and expenses, set money aside with digital envelopes, and log purchases by voice or receipt. No bank connection required.',
      'Get budget app updates',
      'I’m interested in beta testing',
      'Coming soon for Android',
      'drafts transactions from voice or receipts',
      'Panera',
      'Dining Out',
      'Groceries',
      'Gas',
      'Free',
      'Plus',
      'Frequently Asked Questions',
      'Why doesn’t The Simpler Budget connect to my bank?',
      'Can I still enter transactions manually?',
      'leaving iPhone availability and timing open'
    ]
  },
  {
    file: 'dist/nutrition/index.html',
    title: 'The Simpler Nutrition Tracker | Android Voice Food Log',
    snippets: [
      'Log a meal by saying what you ate.',
      'Describe your meal, review an estimate of calories and macros, and adjust the details before you save.',
      'Get nutrition app updates',
      'I’m interested in beta testing',
      'Coming soon for Android',
      'estimates calories and macros from a meal description',
      'strip steak',
      'Review Meal Draft',
      'Sample estimates',
      'On-device meal history',
      'Frequently Asked Questions',
      'How does voice meal logging work?',
      'Can I edit the food items and macro estimates?',
      'leaving iPhone availability and timing open'
    ]
  },
  {
    file: 'dist/privacy/index.html',
    title: 'Privacy Notice | Keep It Simpler',
    snippets: [
      'Strict Separation of Website and App Data',
      'Website Prelaunch Signups',
      'How Our Android Apps Treat Your Records',
      'Data Retention and Export'
    ]
  }
];

let allPassed = true;
for (const check of checks) {
  if (!fs.existsSync(check.file)) {
    console.error('MISSING FILE:', check.file);
    allPassed = false;
    continue;
  }
  const content = fs.readFileSync(check.file, 'utf8');
  if (!content.includes(check.title)) {
    console.error(`MISSING TITLE in ${check.file}. Expected: "${check.title}"`);
    allPassed = false;
  }
  for (const snippet of check.snippets) {
    if (!content.includes(snippet)) {
      console.error(`MISSING SNIPPET in ${check.file}: "${snippet}"`);
      allPassed = false;
    }
  }
}

// Verify sitemap and robots
if (!fs.existsSync('dist/robots.txt')) {
  console.error('MISSING dist/robots.txt');
  allPassed = false;
}

if (!fs.existsSync('dist/sitemap-index.xml')) {
  console.error('MISSING dist/sitemap-index.xml');
  allPassed = false;
}

if (allPassed) {
  console.log('✅ ALL VERIFICATION CHECKS PASSED: Copy, SEO titles, routes, and metadata are intact!');
} else {
  process.exit(1);
}
