import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ExternalLink, Github, MessageCircle, ChevronDown } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDocsMenuOpen, setIsDocsMenuOpen] = useState(false)
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false)
  const location = useLocation()

  const mainNavigation = [
    { name: 'Ana Sayfa', href: '/', current: location.pathname === '/' },
    { name: 'Hızlı Başlangıç', href: '/quickstart', current: location.pathname === '/quickstart' },
  ]

  const docsNavigation = [
    { name: 'Kimlik Doğrulama', href: '/authentication', current: location.pathname === '/authentication' },
    { name: 'API Endpoints', href: '/endpoints', current: location.pathname === '/endpoints' },
    { name: 'Nasıl Entegrasyon Yaparım?', href: '/integration-guide', current: location.pathname === '/integration-guide' },
    { name: 'Hata Kodları', href: '/error-codes', current: location.pathname === '/error-codes' },
    { name: 'Webhooks', href: '/webhooks', current: location.pathname === '/webhooks' },
    { name: 'Postman Collections', href: '/postman', current: location.pathname === '/postman' },
    { name: 'SDK\'lar (Yakında)', href: '/sdks', current: location.pathname === '/sdks' },
  ]

  const statusNavigation = [
    { name: 'Health Check', href: '/health', current: location.pathname === '/health' },
    { name: 'Status', href: '/status', current: location.pathname === '/status' },
  ]

  const isDocsActive = docsNavigation.some(item => item.current)
  const isStatusActive = statusNavigation.some(item => item.current)

  const closeAllDropdowns = () => {
    setIsDocsMenuOpen(false)
    setIsStatusMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3" onClick={closeAllDropdowns}>
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Cozmopol API</h1>
                <span className="text-xs text-slate-500">v2.1</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeAllDropdowns}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? 'text-slate-900 bg-slate-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Docs Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsStatusMenuOpen(false)
                    setIsDocsMenuOpen(!isDocsMenuOpen)
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isDocsActive
                      ? 'text-slate-900 bg-slate-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Dökümantasyon</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isDocsMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDocsMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                    {docsNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          item.current
                            ? 'text-slate-900 bg-slate-100'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                        onClick={closeAllDropdowns}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsDocsMenuOpen(false)
                    setIsStatusMenuOpen(!isStatusMenuOpen)
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isStatusActive
                      ? 'text-slate-900 bg-slate-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Durum</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isStatusMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isStatusMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                    {statusNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          item.current
                            ? 'text-slate-900 bg-slate-100'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                        onClick={closeAllDropdowns}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <a
                href="#"
                className="text-slate-500 hover:text-slate-700 transition-colors p-2"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-700 transition-colors p-2"
                title="Discord"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="btn-primary flex items-center space-x-2 text-sm"
              >
                <span>Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                  closeAllDropdowns()
                }}
                className="text-slate-600 hover:text-slate-900 p-2"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    item.current
                      ? 'text-slate-900 bg-slate-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    closeAllDropdowns()
                  }}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-slate-200">
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Dökümantasyon
                </div>
                {docsNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      item.current
                        ? 'text-slate-900 bg-slate-100'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      closeAllDropdowns()
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Durum
                </div>
                {statusNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      item.current
                        ? 'text-slate-900 bg-slate-100'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      closeAllDropdowns()
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Tema</span>
                  <ThemeToggle />
                </div>
                <a
                  href="#"
                  className="block w-full text-center btn-primary"
                >
                  Portal
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Dropdown overlay */}
        {(isDocsMenuOpen || isStatusMenuOpen) && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={closeAllDropdowns}
          ></div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-sm">C</span>
                </div>
                <h3 className="text-lg font-semibold">Cozmopol API</h3>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Güçlü ve esnek e-ticaret API çözümleri ile pazaryeri entegrasyonunuzu kolaylaştırın.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Kaynaklar</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">API Referansı</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Örnekler</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Changelog</a></li>
                <li><Link to="/status" className="text-slate-400 hover:text-white transition-colors text-sm">Status Sayfası</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Destek</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Yardım Merkezi</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Canlı Destek</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">İletişim</a></li>
                <li>
                  <span className="text-slate-400 text-sm">developers@cozmopol.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p className="text-sm">&copy; 2024 Cozmopol. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout