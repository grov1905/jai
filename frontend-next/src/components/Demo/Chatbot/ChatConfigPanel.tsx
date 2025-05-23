// frontend-next/src/components/Demo/Chatbot/ChatConfigPanel.tsx
"use client";
import React, { useEffect, useState } from 'react';

interface ChatConfig {
  channel: string;
  externalId: string;
  title: string;
  color: string;
  icon: string;
  businessId: string;
  businessChanged?: boolean;
  businessName?: string;
}

interface Business {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

const PLATFORM_CONFIGS = {
  whatsapp: {
    externalId: '999999999',
    title: 'WhatsApp',
    color: '#25D366',
    icon: '🟢'
  },
  facebook: {
    externalId: 'psid_123456',
    title: 'Messenger',
    color: '#0084ff',
    icon: '📘'
  },
  instagram: {
    externalId: 'ig_abcdef',
    title: 'Instagram DM',
    color: '#e1306c',
    icon: '📸'
  },
  telegram: {
    externalId: 'chat_78910',
    title: 'Telegram',
    color: '#0088cc',
    icon: '✈️'
  }
};

export default function ChatConfigPanel({ config, setConfig }: { config: ChatConfig, setConfig: React.Dispatch<React.SetStateAction<ChatConfig>> }) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Fetch authentication token
  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_NEGOCIO}/api/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: process.env.NEXT_PUBLIC_URL_NEGOCIO_EMAIL,
            password: process.env.NEXT_PUBLIC_URL_NEGOCIO_PASSWORD
          })
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const { access } = await response.json();
        setAuthToken(access);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown authentication error');
        console.error('Authentication error:', err);
      }
    };

    authenticate();
  }, []);

  // Fetch businesses after authentication
  useEffect(() => {
    if (!authToken) return;

    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_NEGOCIO}/api/businesses/`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }

        const data = await response.json();
        setBusinesses(data.results);

        // Auto-select first business if none selected
        if (data.results.length > 0 && !config.businessId) {
          handleBusinessChange(data.results[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error fetching businesses');
        console.error('Business fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [authToken]);

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const platform = e.target.value as keyof typeof PLATFORM_CONFIGS;
    setConfig({
      ...config,
      channel: platform,
      ...PLATFORM_CONFIGS[platform],
      businessChanged: false // Reset change flag
    });
  };

// En el ChatConfigPanel.tsx
const handleBusinessChange = (businessId: string) => {
    const business = businesses.find(b => b.id === businessId) || null;
    setSelectedBusiness(business);
    
    setConfig({
      ...config,
      businessId,
      businessChanged: true,
      businessName: business?.name || ''  // Pasamos el nombre del negocio
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleBusinessChange(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Configuración del Chat</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plataforma
          </label>
          <select
            value={config.channel}
            onChange={handlePlatformChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="facebook">Facebook Messenger</option>
            <option value="instagram">Instagram DM</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Negocio
          </label>
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
              <span>Cargando negocios...</span>
            </div>
          ) : error ? (
            <div className="p-3 bg-red-50 text-red-600 rounded-md">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <select
              value={config.businessId}
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!authToken || businesses.length === 0}
            >
              <option value="">Seleccione un negocio</option>
              {businesses.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedBusiness && (
          <div className="p-4 bg-white rounded-md border border-gray-200 shadow-sm">
            <h3 className="font-medium text-lg mb-2 text-gray-800">{selectedBusiness.name}</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Descripción</h4>
                <p className="text-gray-700 mt-1">
                  {selectedBusiness.description || "No hay descripción disponible"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estado</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedBusiness.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedBusiness.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Actualizado</h4>
                  <p className="text-gray-700 text-sm">
                    {new Date(selectedBusiness.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">Configuración activa</h3>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{config.icon}</span>
            <span className="font-medium">{config.title}</span>
          </div>
          {selectedBusiness && (
            <p className="text-sm text-blue-700 mt-1">
              Chat conectado a: <span className="font-medium">{selectedBusiness.name}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}