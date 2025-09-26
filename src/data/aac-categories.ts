export interface AACCategory {
  id: string;
  name: string;
  nameFilipino?: string;
  emoji: string;
}

export const categories: AACCategory[] = [
  {
    id: 'needs',
    name: 'Basic Needs',
    nameFilipino: 'Pangangailangan',
    emoji: '🍽️'
  },
  {
    id: 'family',
    name: 'Family',
    nameFilipino: 'Pamilya',
    emoji: '👨‍👩‍👧‍👦'
  },
  {
    id: 'food',
    name: 'Food & Drink',
    nameFilipino: 'Pagkain at Inumin',
    emoji: '🍚'
  },
  {
    id: 'feelings',
    name: 'Feelings',
    nameFilipino: 'Damdamin',
    emoji: '😊'
  },
  {
    id: 'activities',
    name: 'Activities',
    nameFilipino: 'Mga Gawain',
    emoji: '🎮'
  },
  {
    id: 'polite',
    name: 'Good Manners',
    nameFilipino: 'Magagandang Asal',
    emoji: '🙏'
  }
];