import { Phrase } from '@/types/phrase';
import { BASIC_NEEDS, FAMILY_TERMS, COMMON_FOODS, POLITE_PHRASES } from './phrases';

// Activities/Actions phrases
const ACTIVITIES: Phrase[] = [
  { id: 'act-1', filipino: 'Maglaro', english: 'Play', category: 'activities', respectful: 'Maglaro po', emoji: '🎮' },
  { id: 'act-2', filipino: 'Magbasa', english: 'Read', category: 'activities', respectful: 'Magbasa po', emoji: '📚' },
  { id: 'act-3', filipino: 'Manood', english: 'Watch', category: 'activities', respectful: 'Manood po', emoji: '📺' },
  { id: 'act-4', filipino: 'Matulog', english: 'Sleep', category: 'activities', respectful: 'Matulog po', emoji: '🛏️' },
  { id: 'act-5', filipino: 'Kumanta', english: 'Sing', category: 'activities', respectful: 'Kumanta po', emoji: '🎤' },
  { id: 'act-6', filipino: 'Sayaw', english: 'Dance', category: 'activities', respectful: 'Sayaw po', emoji: '💃' },
  { id: 'act-7', filipino: 'Lumabas', english: 'Go outside', category: 'activities', respectful: 'Lumabas po', emoji: '🌳' },
  { id: 'act-8', filipino: 'Ligo', english: 'Take a bath', category: 'activities', respectful: 'Ligo po', emoji: '🛁' },
];

// Feelings phrases
const FEELINGS: Phrase[] = [
  { id: 'feel-1', filipino: 'Masaya ako', english: 'I am happy', category: 'feelings', respectful: 'Masaya po ako', emoji: '😊' },
  { id: 'feel-2', filipino: 'Malungkot ako', english: 'I am sad', category: 'feelings', respectful: 'Malungkot po ako', emoji: '😢' },
  { id: 'feel-3', filipino: 'Galit ako', english: 'I am angry', category: 'feelings', respectful: 'Galit po ako', emoji: '😠' },
  { id: 'feel-4', filipino: 'Takot ako', english: 'I am scared', category: 'feelings', respectful: 'Takot po ako', emoji: '😨' },
  { id: 'feel-5', filipino: 'Excited ako', english: 'I am excited', category: 'feelings', respectful: 'Excited po ako', emoji: '🤗' },
  { id: 'feel-6', filipino: 'Bored ako', english: 'I am bored', category: 'feelings', respectful: 'Bored po ako', emoji: '😑' },
  { id: 'feel-7', filipino: 'Proud ako', english: 'I am proud', category: 'feelings', respectful: 'Proud po ako', emoji: '😌' },
  { id: 'feel-8', filipino: 'Worried ako', english: 'I am worried', category: 'feelings', respectful: 'Worried po ako', emoji: '😟' },
];

// Combine all phrases
export const phrases: Phrase[] = [
  ...BASIC_NEEDS,
  ...FAMILY_TERMS,
  ...COMMON_FOODS,
  ...ACTIVITIES,
  ...FEELINGS,
  ...POLITE_PHRASES
];