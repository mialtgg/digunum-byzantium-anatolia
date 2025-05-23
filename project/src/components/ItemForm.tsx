import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ItemFormData {
  employee: string;
  observe: string;
  reverse: string;
  reference: string;
  location: string;
  picture: FileList;
}

interface ItemFormProps {
  onSubmit: (data: ItemFormData) => void;
  type: 'coin' | 'seal';
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, type }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ItemFormData>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFormSubmit = async (data: ItemFormData) => {
    const formData = new FormData();
    formData.append('employee', data.employee);
    formData.append('observe', data.observe);
    formData.append('reverse', data.reverse);
    formData.append('reference', data.reference);
    formData.append('location', data.location);
    if (data.picture[0]) {
      formData.append('picture', data.picture[0]);
    }
    
    onSubmit(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
            Employee Name
          </label>
          <input
            type="text"
            id="employee"
            {...register('employee', { required: 'Employee name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.employee && (
            <p className="mt-1 text-sm text-red-600">{errors.employee.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="observe" className="block text-sm font-medium text-gray-700">
            Obverse Description
          </label>
          <textarea
            id="observe"
            {...register('observe', { required: 'Obverse description is required' })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.observe && (
            <p className="mt-1 text-sm text-red-600">{errors.observe.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="reverse" className="block text-sm font-medium text-gray-700">
            Reverse Description
          </label>
          <textarea
            id="reverse"
            {...register('reverse', { required: 'Reverse description is required' })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.reverse && (
            <p className="mt-1 text-sm text-red-600">{errors.reverse.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
            Reference Number
          </label>
          <input
            type="text"
            id="reference"
            {...register('reference', { required: 'Reference number is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.reference && (
            <p className="mt-1 text-sm text-red-600">{errors.reference.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Storage Location
          </label>
          <input
            type="text"
            id="location"
            {...register('location', { required: 'Storage location is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
            {type === 'coin' ? 'Coin Image' : 'Seal Image'}
          </label>
          <input
            type="file"
            id="picture"
            accept="image/*"
            {...register('picture', { required: 'Image is required' })}
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {errors.picture && (
            <p className="mt-1 text-sm text-red-600">{errors.picture.message}</p>
          )}
          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-xs rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save {type === 'coin' ? 'Coin' : 'Seal'}
        </button>
      </div>
    </form>
  );
};

export default ItemForm; 