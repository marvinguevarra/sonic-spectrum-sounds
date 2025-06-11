
export interface CategoryItem {
  id: string;
  label: string;
  labelFilipino?: string;
  icon: string;
  soundFile?: string;
}

export interface Category {
  title: string;
  items: CategoryItem[];
}

export const categories: Category[] = [
  {
    title: 'Quick Phrases / Mga Mabilis na Pahayag',
    items: [
      { id: 'beach', label: 'I want to go to the beach', labelFilipino: 'Gusto kong pumunta sa dalampasigan', icon: '🏖️', soundFile: '/sounds/beach.mp3' },
      { id: 'graduation', label: 'Happy Graduation Angelo!', labelFilipino: 'Maligayang Pagtatapos Angelo!', icon: '🎓', soundFile: '/sounds/graduation.mp3' },
    ]
  },
  {
    title: 'Good Manners / Magagandang Asal',
    items: [
      { id: '40', label: 'Please', labelFilipino: 'Paki', icon: '🙏', soundFile: '/sounds/please.mp3' },
      { id: '41', label: 'Thank you', labelFilipino: 'Salamat', icon: '💖', soundFile: '/sounds/thank-you.mp3' },
      { id: '42', label: 'Excuse me', labelFilipino: 'Excuse me po', icon: '✋', soundFile: '/sounds/excuse-me.mp3' },
      { id: '43', label: 'Sorry', labelFilipino: 'Pasensya na po', icon: '😔', soundFile: '/sounds/sorry.mp3' },
      { id: '44', label: "You're welcome", labelFilipino: 'Walang anuman', icon: '😊', soundFile: '/sounds/youre-welcome.mp3' },
      { id: '45', label: 'Good morning', labelFilipino: 'Magandang umaga po', icon: '🌅', soundFile: '/sounds/good-morning.mp3' },
      { id: '46', label: 'Good night', labelFilipino: 'Magandang gabi po', icon: '🌙', soundFile: '/sounds/good-night.mp3' },
      { id: '47', label: 'May I', labelFilipino: 'Pwede po ba', icon: '🤲', soundFile: '/sounds/may-i.mp3' },
    ]
  },
  {
    title: 'Basic Needs',
    items: [
      { id: '1', label: 'I want', labelFilipino: 'Gusto ko', icon: '🙋', soundFile: '/sounds/i-want.mp3' },
      { id: '2', label: 'Help', labelFilipino: 'Tulong', icon: '🤝', soundFile: '/sounds/help.mp3' },
      { id: '3', label: 'More', labelFilipino: 'Dagdag pa', icon: '➕', soundFile: '/sounds/more.mp3' },
      { id: '4', label: 'Stop', labelFilipino: 'Tigil', icon: '✋', soundFile: '/sounds/stop.mp3' },
      { id: '38', label: 'Yes', labelFilipino: 'Oo', icon: '✅', soundFile: '/sounds/yes.mp3' },
      { id: '39', label: 'No', labelFilipino: 'Hindi', icon: '❌', soundFile: '/sounds/no.mp3' },
    ]
  },
  {
    title: 'Family / Pamilya',
    items: [
      { id: '25', label: 'Mom', labelFilipino: 'si Mama', icon: '👩', soundFile: '/sounds/mom.mp3' },
      { id: '26', label: 'Dad', labelFilipino: 'si Papa', icon: '👨', soundFile: '/sounds/dad.mp3' },
      { id: '27', label: 'Uncle', labelFilipino: 'si Tito', icon: '👨‍🦳', soundFile: '/sounds/tito.mp3' },
      { id: '28', label: 'Aunt', labelFilipino: 'si Tita', icon: '👩‍🦳', soundFile: '/sounds/tita.mp3' },
      { id: '29', label: 'Grandpa', labelFilipino: 'si Lolo', icon: '👴', soundFile: '/sounds/lolo.mp3' },
      { id: '30', label: 'Grandma', labelFilipino: 'si Lola', icon: '👵', soundFile: '/sounds/lola.mp3' },
    ]
  },
  {
    title: 'Feelings',
    items: [
      { id: '7', label: 'Happy', labelFilipino: 'masaya ako', icon: '😊', soundFile: '/sounds/happy.mp3' },
      { id: '8', label: 'Sad', labelFilipino: 'malungkot ako', icon: '😢', soundFile: '/sounds/sad.mp3' },
      { id: '9', label: 'Angry', labelFilipino: 'galit ako', icon: '😠', soundFile: '/sounds/angry.mp3' },
      { id: '10', label: 'Scared', labelFilipino: 'takot ako', icon: '😨', soundFile: '/sounds/scared.mp3' },
      { id: '11', label: 'Excited', labelFilipino: 'excited ako', icon: '🤗', soundFile: '/sounds/excited.mp3' },
      { id: '12', label: 'Tired', labelFilipino: 'pagod ako', icon: '😴', soundFile: '/sounds/tired.mp3' },
    ]
  },
  {
    title: 'Food & Drink / Pagkain at Inumin',
    items: [
      { id: '13', label: 'Water', labelFilipino: 'tubig', icon: '💧', soundFile: '/sounds/water.mp3' },
      { id: '14', label: 'Food', labelFilipino: 'pagkain', icon: '🍽️', soundFile: '/sounds/food.mp3' },
      { id: '15', label: 'Apple', labelFilipino: 'mansanas', icon: '🍎', soundFile: '/sounds/apple.mp3' },
      { id: '16', label: 'Milk', labelFilipino: 'gatas', icon: '🥛', soundFile: '/sounds/milk.mp3' },
      { id: '17', label: 'Cookie', labelFilipino: 'biskwit', icon: '🍪', soundFile: '/sounds/cookie.mp3' },
      { id: '18', label: 'Juice', labelFilipino: 'juice', icon: '🧃', soundFile: '/sounds/juice.mp3' },
      { id: '48', label: 'Mango', labelFilipino: 'mangga', icon: '🥭', soundFile: '/sounds/mango.mp3' },
      { id: '49', label: 'Banana', labelFilipino: 'saging', icon: '🍌', soundFile: '/sounds/banana.mp3' },
      { id: '50', label: 'Coconut', labelFilipino: 'buko', icon: '🥥', soundFile: '/sounds/coconut.mp3' },
      { id: '51', label: 'Pineapple', labelFilipino: 'pinya', icon: '🍍', soundFile: '/sounds/pineapple.mp3' },
    ]
  },
  {
    title: 'Filipino Food / Pagkaing Pilipino',
    items: [
      { id: '31', label: 'Kaldereta', labelFilipino: 'kaldereta', icon: '🍲', soundFile: '/sounds/kaldereta.mp3' },
      { id: '32', label: 'Halo Halo', labelFilipino: 'halo-halo', icon: '🍧', soundFile: '/sounds/halo-halo.mp3' },
      { id: '33', label: 'Pan De Sal', labelFilipino: 'pandesal', icon: '🥖', soundFile: '/sounds/pandesal.mp3' },
      { id: '34', label: 'Dinuguan', labelFilipino: 'dinuguan', icon: '🍜', soundFile: '/sounds/dinuguan.mp3' },
      { id: '35', label: 'Sorbetes', labelFilipino: 'sorbetes', icon: '🍦', soundFile: '/sounds/sorbetes.mp3' },
      { id: '36', label: 'Taho', labelFilipino: 'taho', icon: '🥤', soundFile: '/sounds/taho.mp3' },
      { id: '37', label: 'Sinigang', labelFilipino: 'sinigang', icon: '🍲', soundFile: '/sounds/sinigang.mp3' },
      { id: '52', label: 'Adobo', labelFilipino: 'adobo', icon: '🍖', soundFile: '/sounds/adobo.mp3' },
      { id: '53', label: 'Lechon', labelFilipino: 'lechon', icon: '🐷', soundFile: '/sounds/lechon.mp3' },
      { id: '54', label: 'Lumpia', labelFilipino: 'lumpia', icon: '🌯', soundFile: '/sounds/lumpia.mp3' },
    ]
  },
  {
    title: 'Activities / Mga Gawain',
    items: [
      { id: '19', label: 'Play', labelFilipino: 'maglaro', icon: '🎮', soundFile: '/sounds/play.mp3' },
      { id: '20', label: 'Read', labelFilipino: 'magbasa', icon: '📚', soundFile: '/sounds/read.mp3' },
      { id: '21', label: 'Music', labelFilipino: 'musika', icon: '🎵', soundFile: '/sounds/music.mp3' },
      { id: '22', label: 'Outside', labelFilipino: 'lumabas', icon: '🌳', soundFile: '/sounds/outside.mp3' },
      { id: '23', label: 'TV', labelFilipino: 'manood ng TV', icon: '📺', soundFile: '/sounds/tv.mp3' },
      { id: '24', label: 'Sleep', labelFilipino: 'matulog', icon: '🛏️', soundFile: '/sounds/sleep.mp3' },
      { id: '55', label: 'Swimming', labelFilipino: 'lumalangoy', icon: '🏊', soundFile: '/sounds/swimming.mp3' },
      { id: '56', label: 'Dancing', labelFilipino: 'sayaw', icon: '💃', soundFile: '/sounds/dancing.mp3' },
      { id: '57', label: 'Singing', labelFilipino: 'kumanta', icon: '🎤', soundFile: '/sounds/singing.mp3' },
      { id: '58', label: 'Drawing', labelFilipino: 'magkulay', icon: '🎨', soundFile: '/sounds/drawing.mp3' },
      { id: '59', label: 'Basketball', labelFilipino: 'basketball', icon: '⛹️', soundFile: '/sounds/basketball.mp3' },
      { id: '60', label: 'Karate', labelFilipino: 'karate', icon: '🥋', soundFile: '/sounds/karate.mp3' },
      { id: '61', label: 'Biking', labelFilipino: 'magbisikleta', icon: '🚴', soundFile: '/sounds/biking.mp3' },
      { id: '62', label: 'Festival', labelFilipino: 'pista', icon: '🎉', soundFile: '/sounds/festival.mp3' },
    ]
  }
];
