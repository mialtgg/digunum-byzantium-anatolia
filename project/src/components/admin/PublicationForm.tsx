import React, { useState } from 'react';
import { usePublications } from '../../context/PublicationContext';
import { Publication } from '../../types/Publication';
import { useTranslation } from 'react-i18next';

interface PublicationFormProps {
  publication?: Publication;
  onClose: () => void;
}

const PublicationForm: React.FC<PublicationFormProps> = ({ publication, onClose }) => {
  const { addPublication, updatePublication } = usePublications();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Publication>>(
    publication || {
      title: '',
      authors: [''],
      year: new Date().getFullYear(),
      journal: '',
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      abstract: '',
      keywords: [''],
      pdfUrl: ''
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (publication) {
        await updatePublication(publication.id, formData);
      } else {
        await addPublication(formData as Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>);
      }
      onClose();
    } catch (error) {
      console.error('Error saving publication:', error);
    }
  };

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...(formData.authors || [])];
    newAuthors[index] = value;
    setFormData({ ...formData, authors: newAuthors });
  };

  const addAuthor = () => {
    setFormData({
      ...formData,
      authors: [...(formData.authors || []), '']
    });
  };

  const removeAuthor = (index: number) => {
    const newAuthors = [...(formData.authors || [])];
    newAuthors.splice(index, 1);
    setFormData({ ...formData, authors: newAuthors });
  };

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...(formData.keywords || [])];
    newKeywords[index] = value;
    setFormData({ ...formData, keywords: newKeywords });
  };

  const addKeyword = () => {
    setFormData({
      ...formData,
      keywords: [...(formData.keywords || []), '']
    });
  };

  const removeKeyword = (index: number) => {
    const newKeywords = [...(formData.keywords || [])];
    newKeywords.splice(index, 1);
    setFormData({ ...formData, keywords: newKeywords });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Başlık</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Yazarlar</label>
        <div className="space-y-2">
          {formData.authors.map((author, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={author}
                onChange={(e) => handleAuthorChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => removeAuthor(index)}
                className="mt-1 px-2 py-1 text-sm text-red-600 hover:text-red-800"
              >
                {t('common.remove')}
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAuthor}
            className="text-sm text-orange-500 hover:text-orange-500"
          >
            + {t('publication.addAuthor')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Yıl</label>
          <input
            type="number"
            required
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dergi</label>
          <input
            type="text"
            required
            value={formData.journal}
            onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cilt</label>
          <input
            type="text"
            value={formData.volume}
            onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sayı</label>
          <input
            type="text"
            value={formData.issue}
            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sayfalar</label>
          <input
            type="text"
            value={formData.pages}
            onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">DOI</label>
        <input
          type="text"
          value={formData.doi}
          onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Özet</label>
        <textarea
          value={formData.abstract}
          onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Anahtar Kelimeler</label>
        <div className="space-y-2">
          {formData.keywords.map((keyword, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => handleKeywordChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="mt-1 px-2 py-1 text-sm text-red-600 hover:text-red-800"
              >
                {t('common.remove')}
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addKeyword}
            className="text-sm text-orange-500 hover:text-orange-500"
          >
            + {t('publication.addKeyword')}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">PDF URL</label>
        <input
          type="url"
          value={formData.pdfUrl}
          onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
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
          className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-500"
        >
          {publication ? 'Güncelle' : 'Ekle'}
        </button>
      </div>
    </form>
  );
};

export default PublicationForm; 