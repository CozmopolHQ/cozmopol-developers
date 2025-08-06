import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'

const DocLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    'getting-started': true,
    'api-reference': true,
    'advanced': true
  })
  const location = useLocation()

  const navigation = [
    {
      id: 'getting-started',
      title: 'Başlangıç',
      items: [
        { name: 'Hızlı Başlangıç', href: '/quickstart', icon: '🚀' },
        { name: 'Kimlik Doğrulama', href: '/authentication', icon: '🔐' },
        { name: 'Nasıl Entegrasyon Yaparım?', href: '/integration-guide', icon: '🔧' },
        { name: 'Hata Kodları', href: '/error-codes', icon: '⚠️' },
        { name: 'Postman Collections', href: '/postman', icon: '📮' },
      ]
    },
    {
      id: 'api-reference',
      title: 'API Referansı',
      items: [
        { 
          name: 'Endpoints', 
          href: '/endpoints', 
          icon: '📚',
          subItems: [
            { name: 'Test & Araçlar', href: '/endpoints#test-tools', icon: '🧪' },
            { name: 'Ürün Yönetimi', href: '/endpoints#products', icon: '📦' },
            { name: 'Sipariş Yönetimi', href: '/endpoints#orders', icon: '📋' },
            { name: 'Kargo Yönetimi', href: '/endpoints#shipping', icon: '🚚' },
            { name: 'Stok Yönetimi', href: '/endpoints#inventory', icon: '📊' },
            { name: 'Soru & Cevap', href: '/endpoints#qa', icon: '💬' }
          ]
        },
        { name: 'Webhooks', href: '/webhooks', icon: '🔗' },
        { name: 'SDK\'lar (Yakında)', href: '/sdks', icon: '📦' },
      ]
    },
    {
      id: 'advanced',
      title: 'Sistem Durumu',
      items: [
        { name: 'Health Check', href: '/health', icon: '💚' },
        { name: 'Status', href: '/status', icon: '📊' },
      ]
    }
  ]

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const isCurrentPage = (href) => location.pathname === href

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Dökümantasyon</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-6">
            {navigation.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
                >
                  <span>{section.title}</span>
                  {expandedSections[section.id] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {expandedSections[section.id] && (
                  <div className="mt-2 space-y-1">
                    {section.items.map((item) => (
                      <div key={item.href}>
                        <Link
                          to={item.href}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-md transition-colors ${
                            isCurrentPage(item.href)
                              ? 'bg-slate-900 text-white'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                        
                        {/* Sub items for Endpoints */}
                        {item.subItems && isCurrentPage(item.href) && (
                          <div className="ml-6 mt-2 space-y-1">
                            {item.subItems.map((subItem) => (
                              <a
                                key={subItem.href}
                                href={subItem.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const elementId = subItem.href.split('#')[1];
                                  const element = document.getElementById(elementId);
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                  }
                                  setIsSidebarOpen(false);
                                }}
                                className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md transition-colors text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                              >
                                <span className="text-sm">{subItem.icon}</span>
                                <span>{subItem.name}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Hızlı Bağlantılar
            </h3>
            <div className="mt-3 space-y-1">
              <a
                href="#"
                className="flex items-center px-2 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                <span className="mr-3">🌐</span>
                Partner Portal
              </a>
              <a
                href="#"
                className="flex items-center px-2 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                <span className="mr-3">💬</span>
                Discord Destek
              </a>
              <a
                href="#"
                className="flex items-center px-2 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                <span className="mr-3">📧</span>
                E-posta Destek
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:pl-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-slate-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">Dökümantasyon</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DocLayout