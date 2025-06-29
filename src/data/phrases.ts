
import { Phrase, VerbPhrase } from '@/types/phrase';

export const BASIC_NEEDS: Phrase[] = [
  { id: 'need-1', filipino: 'Gutom ako', english: 'I am hungry', category: 'needs', respectful: 'Gutom po ako', emoji: '🍽️' },
  { id: 'need-2', filipino: 'Uhaw ako', english: 'I am thirsty', category: 'needs', respectful: 'Uhaw po ako', emoji: '💧' },
  { id: 'need-3', filipino: 'Pagod ako', english: 'I am tired', category: 'needs', respectful: 'Pagod po ako', emoji: '😴' },
  { id: 'need-4', filipino: 'Kailangan ko umihi', english: 'I need to pee', category: 'needs', respectful: 'Kailangan ko pong umihi', emoji: '🚽' },
  { id: 'need-5', filipino: 'Masakit', english: 'It hurts', category: 'needs', respectful: 'Masakit po', emoji: '🤕' },
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
  { 
    id: 'food-1', 
    filipino: 'Kanin', 
    english: 'Rice', 
    category: 'food', 
    emoji: '🍚',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-2', 
    filipino: 'Tubig', 
    english: 'Water', 
    category: 'food', 
    emoji: '💧',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-3', 
    filipino: 'Adobo', 
    english: 'Adobo', 
    category: 'food', 
    emoji: '🍖',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-4', 
    filipino: 'Sinigang', 
    english: 'Sinigang', 
    category: 'food', 
    emoji: '🍲',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-5', 
    filipino: 'Taho', 
    english: 'Taho', 
    category: 'food', 
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-6', 
    filipino: 'Pancit', 
    english: 'Pancit', 
    category: 'food', 
    emoji: '🍜',
    image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-7', 
    filipino: 'Lechon', 
    english: 'Lechon', 
    category: 'food', 
    emoji: '🍖',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-8', 
    filipino: 'Halo-halo', 
    english: 'Halo-halo', 
    category: 'food', 
    emoji: '🍧',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-9', 
    filipino: 'Gatas', 
    english: 'Milk', 
    category: 'food', 
    emoji: '🥛',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-10', 
    filipino: 'Kape', 
    english: 'Coffee', 
    category: 'food', 
    emoji: '☕',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-11', 
    filipino: 'Saging', 
    english: 'Banana', 
    category: 'food', 
    emoji: '🍌',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop&crop=center'
  },
  { 
    id: 'food-12', 
    filipino: 'Mansanas', 
    english: 'Apple', 
    category: 'food', 
    emoji: '🍎',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop&crop=center'
  },
];

// Enhanced food-specific phrases with respectful versions
export const FOOD_REQUESTS: Phrase[] = [
  { id: 'food-req-1', filipino: 'Pwede po ba kumuha ng', english: 'May I please have', category: 'food', respectful: 'Pwede po ba kumuha ng', emoji: '🙏' },
  { id: 'food-req-2', filipino: 'Gusto ko po ng', english: 'I would like', category: 'food', respectful: 'Gusto ko po ng', emoji: '😊' },
  { id: 'food-req-3', filipino: 'Pwede po ba uminom ng', english: 'May I please drink', category: 'food', respectful: 'Pwede po ba uminom ng', emoji: '🥤' },
  { id: 'food-req-4', filipino: 'Kailangan ko po ng', english: 'I need', category: 'food', respectful: 'Kailangan ko po ng', emoji: '🍽️' },
];

export const FOOD_RESPONSES: Phrase[] = [
  { id: 'food-res-1', filipino: 'Salamat po', english: 'Thank you', category: 'food', respectful: 'Salamat po', emoji: '🙏' },
  { id: 'food-res-2', filipino: 'Masarap po', english: 'It\'s delicious', category: 'food', respectful: 'Masarap po', emoji: '😋' },
  { id: 'food-res-3', filipino: 'Busog na po ako', english: 'I\'m full now', category: 'food', respectful: 'Busog na po ako', emoji: '😌' },
  { id: 'food-res-4', filipino: 'Ayaw ko na po', english: 'I don\'t want anymore', category: 'food', respectful: 'Ayaw ko na po', emoji: '✋' },
  { id: 'food-res-5', filipino: 'Gusto ko pa po', english: 'I want more', category: 'food', respectful: 'Gusto ko pa po', emoji: '➕' },
];

export const POLITE_PHRASES: Phrase[] = [
  { id: 'polite-1', filipino: 'Salamat', english: 'Thank you', category: 'polite', respectful: 'Salamat po', emoji: '🙏' },
  { id: 'polite-2', filipino: 'Pasensya na', english: 'Sorry/Excuse me', category: 'polite', respectful: 'Pasensya na po', emoji: '🙏' },
  { id: 'polite-3', filipino: 'Pakisuyo', english: 'Please', category: 'polite', respectful: 'Pakisuyo po', emoji: '🙏' },
  { id: 'polite-4', filipino: 'Oo', english: 'Yes', category: 'polite', respectful: 'Opo', emoji: '✅' },
  { id: 'polite-5', filipino: 'Hindi', english: 'No', category: 'polite', respectful: 'Hindi po', emoji: '❌' },
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
