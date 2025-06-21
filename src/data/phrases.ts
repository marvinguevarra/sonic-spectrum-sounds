
import { Phrase, VerbPhrase } from '@/types/phrase';

export const BASIC_NEEDS: Phrase[] = [
  { id: 'need-1', filipino: 'Gutom ako', english: 'I am hungry', category: 'needs', respectful: 'Gutom po ako', emoji: '🍽️' },
  { id: 'need-2', filipino: 'Uhaw ako', english: 'I am thirsty', category: 'needs', respectful: 'Uhaw po ako', emoji: '💧' },
  { id: 'need-3', filipino: 'Pagod ako', english: 'I am tired', category: 'needs', respectful: 'Pagod po ako', emoji: '😴' },
  { id: 'need-4', filipino: 'Ihi ako', english: 'I need to pee', category: 'needs', respectful: 'Ihi po ako', emoji: '🚽' },
  { id: 'need-5', filipino: 'Sakit', english: 'It hurts', category: 'needs', respectful: 'Masakit po', emoji: '🤕' },
  { id: 'need-6', filipino: 'Lamig ako', english: 'I am cold', category: 'needs', respectful: 'Lamig po ako', emoji: '🥶' },
  { id: 'need-7', filipino: 'Init ako', english: 'I am hot', category: 'needs', respectful: 'Init po ako', emoji: '🥵' },
];

export const FAMILY_TERMS: Phrase[] = [
  { id: 'fam-1', filipino: 'Nanay', english: 'Mom', category: 'family', emoji: '👩' },
  { id: 'fam-2', filipino: 'Tatay', english: 'Dad', category: 'family', emoji: '👨' },
  { id: 'fam-3', filipino: 'Ate', english: 'Older sister', category: 'family', emoji: '👧' },
  { id: 'fam-4', filipino: 'Kuya', english: 'Older brother', category: 'family', emoji: '👦' },
  { id: 'fam-5', filipino: 'Lola', english: 'Grandma', category: 'family', emoji: '👵' },
  { id: 'fam-6', filipino: 'Lolo', english: 'Grandpa', category: 'family', emoji: '👴' },
  { id: 'fam-7', filipino: 'Tita', english: 'Aunt', category: 'family', emoji: '👩‍🦱' },
  { id: 'fam-8', filipino: 'Tito', english: 'Uncle', category: 'family', emoji: '👨‍🦱' },
  { id: 'fam-9', filipino: 'Pinsan', english: 'Cousin', category: 'family', emoji: '👶' },
  { id: 'fam-10', filipino: 'Kapatid', english: 'Sibling', category: 'family', emoji: '👫' },
];

export const COMMON_FOODS: Phrase[] = [
  { id: 'food-1', filipino: 'Kanin', english: 'Rice', category: 'food', emoji: '🍚' },
  { id: 'food-2', filipino: 'Tubig', english: 'Water', category: 'food', emoji: '💧' },
  { id: 'food-3', filipino: 'Adobo', english: 'Adobo', category: 'food', emoji: '🍖' },
  { id: 'food-4', filipino: 'Sinigang', english: 'Sinigang', category: 'food', emoji: '🍲' },
  { id: 'food-5', filipino: 'Taho', english: 'Taho', category: 'food', emoji: '🥤' },
  { id: 'food-6', filipino: 'Pancit', english: 'Pancit', category: 'food', emoji: '🍜' },
  { id: 'food-7', filipino: 'Lechon', english: 'Lechon', category: 'food', emoji: '🍖' },
  { id: 'food-8', filipino: 'Halo-halo', english: 'Halo-halo', category: 'food', emoji: '🍧' },
];

export const POLITE_PHRASES: Phrase[] = [
  { id: 'polite-1', filipino: 'Salamat', english: 'Thank you', category: 'polite', respectful: 'Salamat po', emoji: '🙏' },
  { id: 'polite-2', filipino: 'Pasensya', english: 'Sorry', category: 'polite', respectful: 'Pasensya po', emoji: '🙏' },
  { id: 'polite-3', filipino: 'Pakiusap', english: 'Please', category: 'polite', respectful: 'Pakiusap po', emoji: '🙏' },
  { id: 'polite-4', filipino: 'Opo', english: 'Yes (respectful)', category: 'polite', emoji: '✅' },
  { id: 'polite-5', filipino: 'Hindi po', english: 'No (respectful)', category: 'polite', emoji: '❌' },
];

export const COMMON_VERBS: VerbPhrase[] = [
  {
    root: 'kain',
    aspects: {
      completed: { filipino: 'Kumain ako', english: 'I ate' },
      ongoing: { filipino: 'Kumakain ako', english: 'I am eating' },
      contemplated: { filipino: 'Kakain ako', english: 'I will eat' }
    }
  },
  {
    root: 'inom',
    aspects: {
      completed: { filipino: 'Uminom ako', english: 'I drank' },
      ongoing: { filipino: 'Umiinom ako', english: 'I am drinking' },
      contemplated: { filipino: 'Iinom ako', english: 'I will drink' }
    }
  },
  {
    root: 'tulog',
    aspects: {
      completed: { filipino: 'Natulog ako', english: 'I slept' },
      ongoing: { filipino: 'Natutulog ako', english: 'I am sleeping' },
      contemplated: { filipino: 'Matutulog ako', english: 'I will sleep' }
    }
  }
];
