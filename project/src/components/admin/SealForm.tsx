import React, { useState } from 'react';
import { useSeals } from '../../context/SealContext';
import { Seal } from '../../types';
import { useTranslation } from 'react-i18next';

interface SealFormProps {
  seal?: Seal;
  onClose: () => void;
}

const SealForm: React.FC<SealFormProps> = ({ seal, onClose }) => {
  const { addSeal, updateSeal } = useSeals();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Seal>>(
    seal || {
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
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (seal) {
        await updateSeal(seal.id, formData);
      } else {
        await addSeal(formData as Seal);
      }
      onClose();
    } catch (error) {
      console.error('Error saving seal:', error);
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

  const handleDimensionChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions!,
        [field]: Number(value)
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dönem</label>
          <input
            type="text"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Yıl</label>
          <input
            type="text"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Açıklama</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Görsel URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Boylam</label>
          <input
            type="number"
            step="any"
            value={formData.location?.lng}
            onChange={(e) => handleLocationChange('lng', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Konum Adı</label>
          <input
            type="text"
            value={formData.location?.name}
            onChange={(e) => handleLocationChange('name', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Malzeme</label>
          <input
            type="text"
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tür</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sahibi</label>
          <input
            type="text"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Yazıt</label>
        <textarea
          value={formData.inscription}
          onChange={(e) => setFormData({ ...formData, inscription: e.target.value })}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Uzunluk (mm)</label>
          <input
            type="number"
            step="0.1"
            value={formData.dimensions?.length}
            onChange={(e) => handleDimensionChange('length', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Genişlik (mm)</label>
          <input
            type="number"
            step="0.1"
            value={formData.dimensions?.width}
            onChange={(e) => handleDimensionChange('width', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Kalınlık (mm)</label>
          <input
            type="number"
            step="0.1"
            value={formData.dimensions?.thickness}
            onChange={(e) => handleDimensionChange('thickness', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
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
          className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-500"
        >
          {seal ? 'Güncelle' : 'Ekle'}
        </button>
      </div>
    </form>
  );
};

export default SealForm; 