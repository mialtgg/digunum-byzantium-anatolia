import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Emperor } from '../types';

const initialEmperors: Emperor[] = [
  {
    id: "1",
    name: "Justinian I",
    reignStart: "527",
    reignEnd: "565",
    dynasty: "Justinian",
    description: "One of the most important Byzantine emperors, known for his ambitious building program and the codification of Roman law.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Justinian_mosaic.jpg/800px-Justinian_mosaic.jpg",
    achievements: [
      "Codification of Roman law (Corpus Juris Civilis)",
      "Reconquest of lost territories in the West",
      "Construction of the Hagia Sophia",
      "Reorganization of the Byzantine military"
    ],
    notableEvents: [
      "Nika Riots (532)",
      "Plague of Justinian (541-542)",
      "Reconquest of North Africa from the Vandals",
      "Reconquest of Italy from the Ostrogoths"
    ]
  },
  {
    id: "2",
    name: "Constantine I",
    reignStart: "306",
    reignEnd: "337",
    dynasty: "Constantinian",
    description: "First Christian Roman emperor, founder of Constantinople, and the first emperor of the Byzantine Empire.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Constantine_I_Hermitage.jpg/800px-Constantine_I_Hermitage.jpg",
    achievements: [
      "Foundation of Constantinople",
      "Legalization of Christianity",
      "Reorganization of the Roman Empire",
      "Introduction of the gold solidus"
    ],
    notableEvents: [
      "Battle of Milvian Bridge (312)",
      "Edict of Milan (313)",
      "First Council of Nicaea (325)",
      "Foundation of Constantinople (330)"
    ]
  },
  {
    id: "3",
    name: "Basil II",
    reignStart: "976",
    reignEnd: "1025",
    dynasty: "Macedonian",
    description: "Known as 'Bulgar-slayer', he expanded the empire to its greatest territorial extent since Justinian.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Basil_II.jpg/800px-Basil_II.jpg",
    achievements: [
      "Conquest of Bulgaria",
      "Expansion into the Caucasus",
      "Reform of the military",
      "Strengthening of the Byzantine economy"
    ],
    notableEvents: [
      "Battle of Kleidion (1014)",
      "Annexation of Bulgaria (1018)",
      "Conquest of Georgia",
      "Victory over the Fatimids"
    ]
  },
  {
    id: "4",
    name: "Theodora",
    reignStart: "527",
    reignEnd: "548",
    dynasty: "Justinian",
    description: "Wife of Justinian I, known for her intelligence and political influence. She helped shape Byzantine policy and championed women's rights.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Theodora_mosaic.jpg/800px-Theodora_mosaic.jpg",
    achievements: [
      "Influence on Justinian's policies",
      "Advocacy for women's rights",
      "Support for Monophysite Christians",
      "Role in suppressing the Nika Riots"
    ],
    notableEvents: [
      "Marriage to Justinian (525)",
      "Coronation as Augusta (527)",
      "Role in the Nika Riots (532)",
      "Influence on religious policy"
    ]
  },
  {
    id: "5",
    name: "Alexios I Komnenos",
    reignStart: "1081",
    reignEnd: "1118",
    dynasty: "Komnenos",
    description: "Founder of the Komnenian dynasty, he restored the empire's fortunes after the Battle of Manzikert and initiated the First Crusade.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Alexios_I_Komnenos.jpg/800px-Alexios_I_Komnenos.jpg",
    achievements: [
      "Reorganization of the Byzantine military",
      "Recovery of lost territories",
      "Reform of the Byzantine economy",
      "Alliance with the First Crusade"
    ],
    notableEvents: [
      "Battle of Dyrrhachium (1081)",
      "First Crusade (1096-1099)",
      "Recovery of western Anatolia",
      "Reform of the Byzantine administration"
    ]
  }
];

interface EmperorContextType {
  emperors: Emperor[];
  addEmperor: (emperor: Emperor) => void;
  selectedEmperor: Emperor | null;
  setSelectedEmperor: (emperor: Emperor | null) => void;
}

const EmperorContext = createContext<EmperorContextType | undefined>(undefined);

export const EmperorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or initial emperors
  const [emperors, setEmperors] = useState<Emperor[]>(() => {
    const savedEmperors = localStorage.getItem('byzantineEmperors');
    if (savedEmperors) {
      return JSON.parse(savedEmperors);
    }
    // If no saved emperors, initialize with dummy data
    localStorage.setItem('byzantineEmperors', JSON.stringify(initialEmperors));
    return initialEmperors;
  });
  const [selectedEmperor, setSelectedEmperor] = useState<Emperor | null>(null);

  // Save emperors to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('byzantineEmperors', JSON.stringify(emperors));
  }, [emperors]);

  const addEmperor = (emperor: Emperor) => {
    setEmperors(prevEmperors => [...prevEmperors, { ...emperor, id: String(prevEmperors.length + 1) }]);
  };

  return (
    <EmperorContext.Provider value={{ emperors, addEmperor, selectedEmperor, setSelectedEmperor }}>
      {children}
    </EmperorContext.Provider>
  );
};

export const useEmperors = () => {
  const context = useContext(EmperorContext);
  if (context === undefined) {
    throw new Error('useEmperors must be used within an EmperorProvider');
  }
  return context;
}; 