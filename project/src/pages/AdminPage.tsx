import React, { useState } from 'react';
import { useCoins } from '../context/CoinContext';
import { useSeals } from '../context/SealContext';
import { useEmperors } from '../context/EmperorContext';
import { Coin, Seal, Emperor } from '../types';
import { Plus, Save, Trash2, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CoinForm from '../components/admin/CoinForm';
import SealForm from '../components/admin/SealForm';
import PublicationForm from '../components/admin/PublicationForm';
import { usePublications } from '../context/PublicationContext';

const AdminPage: React.FC = () => {
  const { coins, addCoin, deleteCoin } = useCoins();
  const { seals, addSeal, deleteSeal } = useSeals();
  const { emperors, addEmperor } = useEmperors();
  const { publications, deletePublication } = usePublications();
  const [isAddingCoin, setIsAddingCoin] = useState(false);
  const [isAddingSeal, setIsAddingSeal] = useState(false);
  const [isAddingEmperor, setIsAddingEmperor] = useState(false);
  const [newCoin, setNewCoin] = useState<Partial<Coin>>({
    name: '',
    period: '',
    year: '',
    description: '',
    imageUrl: '',
    location: {
      lat: 39.0,
      lng: 35.0,
      name: '',
    },
    mint: '',
    material: '',
    denomination: '',
    obverseDescription: '',
    reverseDescription: '',
  });
  const [newSeal, setNewSeal] = useState<Partial<Seal>>({
    name: '',
    period: '',
    year: '',
    description: '',
    imageUrl: '',
    location: {
      lat: 39.0,
      lng: 35.0,
      name: '',
    },
    material: '',
    type: '',
    owner: '',
    inscription: '',
    dimensions: {
      length: 0,
      width: 0,
      thickness: 0,
    },
  });
  const [newEmperor, setNewEmperor] = useState<Partial<Emperor>>({
    name: '',
    reignStart: '',
    reignEnd: '',
    dynasty: '',
    description: '',
    imageUrl: '',
    achievements: [''],
    notableEvents: [''],
  });
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'coins' | 'seals' | 'publications'>('coins');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleCoinInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setNewCoin(prev => ({
        ...prev,
        location: {
          ...prev.location as any,
          [locationField]: locationField === 'lat' || locationField === 'lng' 
            ? parseFloat(value) 
            : value
        }
      }));
    } else {
      setNewCoin(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSealInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setNewSeal(prev => ({
        ...prev,
        location: {
          ...prev.location as any,
          [locationField]: locationField === 'lat' || locationField === 'lng' 
            ? parseFloat(value) 
            : value
        }
      }));
    } else if (name.startsWith('dimensions.')) {
      const dimensionField = name.split('.')[1];
      setNewSeal(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions as any,
          [dimensionField]: parseFloat(value)
        }
      }));
    } else {
      setNewSeal(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEmperorInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('achievements.')) {
      const index = parseInt(name.split('.')[1]);
      setNewEmperor(prev => ({
        ...prev,
        achievements: prev.achievements?.map((achievement, i) => 
          i === index ? value : achievement
        ) || [value]
      }));
    } else if (name.startsWith('notableEvents.')) {
      const index = parseInt(name.split('.')[1]);
      setNewEmperor(prev => ({
        ...prev,
        notableEvents: prev.notableEvents?.map((event, i) => 
          i === index ? value : event
        ) || [value]
      }));
    } else {
      setNewEmperor(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCoin.name && newCoin.description && newCoin.location) {
      addCoin(newCoin as Coin);
      setNewCoin({
        name: '',
        period: '',
        year: '',
        description: '',
        imageUrl: '',
        location: {
          lat: 39.0,
          lng: 35.0,
          name: '',
        },
        mint: '',
        material: '',
        denomination: '',
        obverseDescription: '',
        reverseDescription: '',
      });
      setIsAddingCoin(false);
    }
  };

  const handleSealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSeal.name && newSeal.description && newSeal.location) {
      addSeal(newSeal as Seal);
      setNewSeal({
        name: '',
        period: '',
        year: '',
        description: '',
        imageUrl: '',
        location: {
          lat: 39.0,
          lng: 35.0,
          name: '',
        },
        material: '',
        type: '',
        owner: '',
        inscription: '',
        dimensions: {
          length: 0,
          width: 0,
          thickness: 0,
        },
      });
      setIsAddingSeal(false);
    }
  };

  const handleEmperorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmperor.name && newEmperor.description) {
      addEmperor(newEmperor as Emperor);
      setNewEmperor({
        name: '',
        reignStart: '',
        reignEnd: '',
        dynasty: '',
        description: '',
        imageUrl: '',
        achievements: [''],
        notableEvents: [''],
      });
      setIsAddingEmperor(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleClose = () => {
    setEditingItem(null);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        switch (activeTab) {
          case 'coins':
            await deleteCoin(id);
            break;
          case 'seals':
            await deleteSeal(id);
            break;
          case 'publications':
            await deletePublication(id);
            break;
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const renderList = () => {
    switch (activeTab) {
      case 'coins':
        return coins.map(coin => (
          <div key={coin.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{coin.name}</h3>
                <p className="text-sm text-gray-600">{coin.location.name} - {coin.year}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(coin)}
                  className="p-1 text-amber-600 hover:text-amber-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(coin.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ));
      case 'seals':
        return seals.map(seal => (
          <div key={seal.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{seal.name}</h3>
                <p className="text-sm text-gray-600">{seal.location.name} - {seal.year}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(seal)}
                  className="p-1 text-amber-600 hover:text-amber-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(seal.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ));
      case 'publications':
        return publications.map(publication => (
          <div key={publication.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{publication.title}</h3>
                <p className="text-sm text-gray-600">
                  {publication.authors.join(', ')} - {publication.year}
                </p>
                {publication.journal && (
                  <p className="text-sm text-gray-500">{publication.journal}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(publication)}
                  className="p-1 text-amber-600 hover:text-amber-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(publication.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ));
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'coins':
        return <CoinForm coin={editingItem} onClose={handleClose} />;
      case 'seals':
        return <SealForm seal={editingItem} onClose={handleClose} />;
      case 'publications':
        return <PublicationForm publication={editingItem} onClose={handleClose} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700"
            >
              {activeTab === 'coins' ? 'Para Ekle' : activeTab === 'seals' ? 'Mühür Ekle' : 'Yayın Ekle'}
            </button>
          )}
        </div>

        {!showForm && (
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('coins')}
                  className={`${
                    activeTab === 'coins'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Paralar
                </button>
                <button
                  onClick={() => setActiveTab('seals')}
                  className={`${
                    activeTab === 'seals'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Mühürler
                </button>
                <button
                  onClick={() => setActiveTab('publications')}
                  className={`${
                    activeTab === 'publications'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Yayınlar
                </button>
              </nav>
            </div>
          </div>
        )}

        {showForm ? (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {renderForm()}
          </div>
        ) : (
          <div className="grid gap-4">
            {renderList()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;