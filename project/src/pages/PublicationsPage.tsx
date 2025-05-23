import React from 'react';
import { usePublications } from '../context/PublicationContext';
import { ExternalLink } from 'lucide-react';

const PublicationsPage: React.FC = () => {
  const { publications, loading, error } = usePublications();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading publications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">Error loading publications: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Publications</h1>
        
        <div className="grid gap-6">
          {publications.map(publication => (
            <div key={publication.id} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                {publication.title}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {publication.authors.join(', ')} ({publication.year})
              </p>

              {publication.journal && (
                <p className="text-gray-600 mb-2">
                  {publication.journal}
                  {publication.volume && `, Vol. ${publication.volume}`}
                  {publication.issue && `, No. ${publication.issue}`}
                  {publication.pages && `, pp. ${publication.pages}`}
                </p>
              )}

              {publication.doi && (
                <p className="text-gray-600 mb-4">
                  DOI: {publication.doi}
                </p>
              )}

              {publication.abstract && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Abstract</h3>
                  <p className="text-gray-600 text-sm">{publication.abstract}</p>
                </div>
              )}

              {publication.keywords && publication.keywords.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {publication.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-500"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {publication.pdfUrl && (
                <a
                  href={publication.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-500 hover:text-orange-500"
                >
                  <span>View PDF</span>
                  <ExternalLink className="ml-1 w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage; 