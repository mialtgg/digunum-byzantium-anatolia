import { Coin } from '../types';

// Sample data based on Byzantine coins from Anatolia
export const sampleCoins: Coin[] = [
  {
    id: '1',
    name: 'Justinian I Follis',
    period: 'Byzantine Empire',
    year: '527-565 CE',
    description: 'Bronze follis of Justinian I, minted in Constantinople. Features the emperor\'s bust on the obverse and a large M (40 nummi) on the reverse.',
    imageUrl: 'https://images.pexels.com/photos/3954326/pexels-photo-3954326.jpeg',
    location: {
      lat: 41.0082,
      lng: 28.9784,
      name: 'Constantinople (Istanbul)'
    },
    mint: 'Constantinople',
    material: 'Bronze',
    denomination: 'Follis',
    obverseDescription: 'Bust of Justinian I facing right, wearing diadem and cuirass',
    reverseDescription: 'Large M (40 nummi) between year dates, mint mark below'
  },
  {
    id: '2',
    name: 'Heraclius Hexagram',
    period: 'Byzantine Empire',
    year: '610-641 CE',
    description: 'Silver hexagram of Heraclius, showing the emperor and his sons. This coin was part of Heraclius\' monetary reform.',
    imageUrl: 'https://images.pexels.com/photos/6347720/pexels-photo-6347720.jpeg',
    location: {
      lat: 37.8719,
      lng: 32.4843,
      name: 'Iconium (Konya)'
    },
    mint: 'Constantinople',
    material: 'Silver',
    denomination: 'Hexagram',
    obverseDescription: 'Heraclius and Heraclius Constantine seated facing, holding globus cruciger',
    reverseDescription: 'Cross potent on three steps'
  },
  {
    id: '3',
    name: 'Constantine VII Solidus',
    period: 'Byzantine Empire',
    year: '913-959 CE',
    description: 'Gold solidus of Constantine VII Porphyrogenitus. The coin represents the pinnacle of Byzantine numismatic art.',
    imageUrl: 'https://images.pexels.com/photos/2166456/pexels-photo-2166456.jpeg',
    location: {
      lat: 38.422,
      lng: 27.1384,
      name: 'Smyrna (Izmir)'
    },
    mint: 'Constantinople',
    material: 'Gold',
    denomination: 'Solidus',
    obverseDescription: 'Bust of Christ facing, raising hand in benediction',
    reverseDescription: 'Bust of Constantine VII facing, wearing crown and loros'
  },
  {
    id: '4',
    name: 'Basil II Tetarteron',
    period: 'Byzantine Empire',
    year: '976-1025 CE',
    description: 'Bronze tetarteron of Basil II, known as "The Bulgar-Slayer". This coin was minted during a time of military expansion.',
    imageUrl: 'https://images.pexels.com/photos/6348104/pexels-photo-6348104.jpeg',
    location: {
      lat: 39.9334,
      lng: 32.8597,
      name: 'Ancyra (Ankara)'
    },
    mint: 'Constantinople',
    material: 'Bronze',
    denomination: 'Tetarteron',
    obverseDescription: 'Bust of Christ facing, holding Gospel book',
    reverseDescription: 'Inscription in four lines'
  },
  {
    id: '5',
    name: 'Alexius I Hyperpyron',
    period: 'Byzantine Empire',
    year: '1081-1118 CE',
    description: 'Gold hyperpyron of Alexius I Comnenus. Part of Alexius\' coinage reform that established the hyperpyron as the main gold coin.',
    imageUrl: 'https://images.pexels.com/photos/4389947/pexels-photo-4389947.jpeg',
    location: {
      lat: 38.7312,
      lng: 35.4784,
      name: 'Caesarea (Kayseri)'
    },
    mint: 'Constantinople',
    material: 'Gold',
    denomination: 'Hyperpyron',
    obverseDescription: 'Christ seated on throne',
    reverseDescription: 'Alexius standing, holding labarum and globus cruciger'
  }
];