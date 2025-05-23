import React, { useState } from 'react';
import { useCoins } from '../../context/CoinContext';
import { Coin } from '../../types';
import { useTranslation } from 'react-i18next';

interface CoinFormProps {
  coin?: Coin;
  onClose: () => void;
}

const CoinForm: React.FC<CoinFormProps> = ({ coin, onClose }) => {
  const { addCoin, updateCoin } = useCoins();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Coin>>(
    coin || {
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
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (coin) {
        await updateCoin(coin.id, formData);
      } else {
        await addCoin(formData as Coin);
      }
      onClose();
    } catch (error) {
      console.error('Error saving coin:', error);
    }
  };

  const handleLocationChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location!,
        [field]: field === 'lat' || field === 'lng' ? Number(value) : value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">İsim</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dönem</label>
          <input
            type="text"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Yıl</label>
          <input
            type="text"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Açıklama</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Görsel URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Enlem</label>
          <input
            type="number"
            step="any"
            value={formData.location?.lat}
            onChange={(e) => handleLocationChange('lat', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Boylam</label>
          <input
            type="number"
            step="any"
            value={formData.location?.lng}
            onChange={(e) => handleLocationChange('lng', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Konum Adı</label>
          <input
            type="text"
            value={formData.location?.name}
            onChange={(e) => handleLocationChange('name', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Darphane</label>
          <input
            type="text"
            value={formData.mint}
            onChange={(e) => setFormData({ ...formData, mint: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Malzeme</label>
          <input
            type="text"
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nominal Değer</label>
          <input
            type="text"
            value={formData.denomination}
            onChange={(e) => setFormData({ ...formData, denomination: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ön Yüz Açıklaması</label>
        <textarea
          value={formData.obverseDescription}
          onChange={(e) => setFormData({ ...formData, obverseDescription: e.target.value })}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Arka Yüz Açıklaması</label>
        <textarea
          value={formData.reverseDescription}
          onChange={(e) => setFormData({ ...formData, reverseDescription: e.target.value })}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-transparent rounded-md hover:bg-amber-700"
        >
          {coin ? 'Güncelle' : 'Ekle'}
        </button>
      </div>
    </form>
  );
};

export default CoinForm; 