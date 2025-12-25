'use client'

import { useState, useEffect } from 'react';
import { Link2, Save, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { getSettingsByCategory, updateSetting } from '@/lib/settings-actions';

interface CtaButton {
  key: string;
  label: string;
  description: string;
  locations: string[];
}

const CTA_BUTTONS: CtaButton[] = [
  {
    key: 'cta_get_quote_url',
    label: 'Get Quote',
    description: 'Header navigation button',
    locations: ['Header (all pages)']
  },
  {
    key: 'cta_get_my_free_quote_url',
    label: 'Get My Free Quote',
    description: 'Homepage hero section button',
    locations: ['Homepage Hero Section']
  },
  {
    key: 'cta_get_your_free_quote_url',
    label: 'Get Your Free Quote Now',
    description: 'Final CTA button on homepage and location pages',
    locations: ['Homepage Final CTA', 'Location Page Final CTA']
  },
  {
    key: 'cta_compare_rates_url',
    label: 'Compare Rates Now',
    description: 'Location page quote form button',
    locations: ['Location Page Quote Form']
  },
  {
    key: 'cta_learn_more_url',
    label: 'Learn More',
    description: 'Secondary button on blog and location pages',
    locations: ['Blog Post Pages', 'Location Pages']
  }
];

export default function AdminSettingsPage() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await getSettingsByCategory('cta_buttons');
      const urlMap: Record<string, string> = {};
      
      settings.forEach((setting: any) => {
        urlMap[setting.key] = setting.value;
      });
      
      // Set defaults for any missing keys
      CTA_BUTTONS.forEach(button => {
        if (!urlMap[button.key]) {
          urlMap[button.key] = button.key === 'cta_learn_more_url' ? '/' : '#quote';
        }
      });
      
      setUrls(urlMap);
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      // Update all CTA button URLs
      const updatePromises = CTA_BUTTONS.map(button =>
        updateSetting(button.key, urls[button.key] || '#quote')
      );

      const results = await Promise.all(updatePromises);
      
      const failed = results.filter(r => !r.success);
      if (failed.length > 0) {
        throw new Error('Some settings failed to update');
      }

      setMessage({ type: 'success', text: '✅ Settings saved successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleUrlChange = (key: string, value: string) => {
    setUrls(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
          <Link2 className="w-10 h-10 text-orange-600 mr-3" />
          Site Settings
        </h1>
        <p className="text-gray-600">Configure CTA button URLs and other site-wide settings</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* CTA Buttons Configuration */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="mr-2">🔗</span>
            CTA Button URLs
          </h2>
          <p className="text-orange-100 mt-1">Configure where your call-to-action buttons link to</p>
        </div>

        <div className="p-8">
          {/* Info Box */}
          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">URL Configuration Tips</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use <code className="bg-blue-100 px-2 py-0.5 rounded">#quote</code> for page anchors (scrolls to element with id="quote")</li>
                  <li>• Use <code className="bg-blue-100 px-2 py-0.5 rounded">/path</code> for internal pages</li>
                  <li>• Use <code className="bg-blue-100 px-2 py-0.5 rounded">https://...</code> for external links</li>
                  <li>• Changes apply site-wide immediately after saving</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Button Forms */}
          <div className="space-y-8">
            {CTA_BUTTONS.map((button, index) => (
              <div key={button.key} className="pb-8 border-b border-gray-200 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {index + 1}. {button.label}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{button.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {button.locations.map(location => (
                        <span key={location} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor={button.key} className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      id={button.key}
                      type="text"
                      value={urls[button.key] || ''}
                      onChange={(e) => handleUrlChange(button.key, e.target.value)}
                      placeholder="e.g., #quote or https://example.com"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                    />
                    {urls[button.key] && !urls[button.key].startsWith('#') && (
                      <a
                        href={urls[button.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-gray-500 hover:text-orange-600 transition-colors"
                        title="Preview link"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Current: <code className="bg-gray-100 px-2 py-0.5 rounded">{urls[button.key] || 'Not set'}</code>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Changes will be applied immediately across all pages
              </p>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Future Settings Placeholder */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-600">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">🎨 Branding</h3>
            <p className="text-sm">Logo, colors, and site identity</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">🔍 SEO</h3>
            <p className="text-sm">Meta tags, analytics, and tracking</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">📧 Email</h3>
            <p className="text-sm">SMTP settings and templates</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">🔐 Security</h3>
            <p className="text-sm">User management and permissions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
