import React from 'react'
import { Download, ExternalLink, Play, FileText, Zap } from 'lucide-react'

const PostmanCollections = () => {
  const collections = [
    {
      id: 'qa',
      name: '💬 Q&A',
      description: 'Müşteri sorularını yönetme ve cevaplama işlemleri',
      icon: '💬',
      color: 'bg-indigo-50 border-indigo-200',
      textColor: 'text-indigo-800',
      endpoints: [
        'GET /api/questions - Soru listesi',
        'PATCH /api/questions/{id}/answer - Soruya cevap ver'
      ],
      postmanId: '89962312-201d-47d0-8ab6-1673324804e9',
      link: 'https://www.postman.com/cozmopol/cozmopol-integration/collection/31351468-89962312-201d-47d0-8ab6-1673324804e9?action=share&source=collection_link&creator=31351468'
    },
    {
      id: 'orders',
      name: '📋 Orders',
      description: 'Sipariş listeleme, detay görüntüleme ve durum takibi',
      icon: '📋',
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-800',
      endpoints: [
        'GET /api/orders - Tüm siparişleri getir',
        'GET /api/orders/{id} - Sipariş detayını getir'
      ],
      postmanId: 'orders-collection',
      link: '#'
    },
    {
      id: 'inventory',
      name: '📊 Inventory',
      description: 'Stok takibi, güncelleme ve ürün stok yönetimi',
      icon: '📊',
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-800',
      endpoints: [
        'GET /v2/inventory/{product_id} - Ürün stok güncelle'
      ],
      postmanId: 'inventory-collection',
      link: '#'
    },
    {
      id: 'shipments',
      name: '🚚 Shipments',
      description: 'Kargo şirketleri, gönderi oluşturma ve takip işlemleri',
      icon: '🚚',
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-800',
      endpoints: [
        'GET /api/shipping - Kargo şirketlerini getir'
      ],
      postmanId: 'f3f970d2-ac54-4a3f-9618-128137613086',
      link: 'https://www.postman.com/cozmopol/workspace/cozmopol-integration/collection/31351468-f3f970d2-ac54-4a3f-9618-128137613086?action=share&source=collection_link&creator=31351468'
    },
    {
      id: 'auth',
      name: '🔐 Auth',
      description: 'Kimlik doğrulama ve vendor giriş işlemleri',
      icon: '🔐',
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      endpoints: [
        'POST /api/auth/token - Vendor olarak giriş yap'
      ],
      postmanId: 'auth-collection',
      link: '#'
    },
    {
      id: 'products',
      name: '📦 Products',
      description: 'Ürün oluşturma, listeleme, güncelleme ve kategori yönetimi',
      icon: '📦',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      endpoints: [
        'GET /api/products/{id} - Ürün detayı getir',
        'POST /v2/products - Yeni ürün oluştur',
        'GET /api/products - Tüm ürünleri getir',
        'GET /api/categories - Kategori listesi',
        'GET /api/brands - Marka listesi'
      ],
      postmanId: 'products-collection',
      link: '#'
    },
    {
      id: 'test-tools',
      name: '🧪 Test & Tools',
      description: 'API bağlantı testleri, sağlık kontrolleri ve geliştirici araçları',
      icon: '🧪',
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      endpoints: [
        'GET /api/test/ping - API bağlantı testi',
        'GET /api/test/version - API versiyon bilgisi',
        'GET /api/health - Sistem sağlık kontrolü',
        'POST /api/test/webhook - Webhook test tetikleyicisi'
      ],
      postmanId: 'test-tools-collection',
      link: '#'
    }
  ]

  const handleDownload = (collection) => {
    // Postman collection download logic
    console.log(`Downloading collection: ${collection.name}`)
  }

  const handleRunInPostman = (collection) => {
    if (collection.link !== '#') {
      window.open(collection.link, '_blank')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Postman Collections</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Cozmopol API'sini test etmek için hazırlanmış Postman collection'ları. 
          Her collection, ilgili endpoint'leri ve örnek istekleri içerir.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-blue-900">Hızlı Başlangıç</h2>
        </div>
        <p className="text-blue-800 mb-6">
          Postman collection'larını kullanmaya başlamak için aşağıdaki adımları takip edin:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
            <h3 className="font-semibold text-blue-900 mb-2">Collection'ı İndir</h3>
            <p className="text-blue-700 text-sm">İstediğiniz collection'ı indirin veya Postman'de açın</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
            <h3 className="font-semibold text-blue-900 mb-2">Environment Ayarla</h3>
            <p className="text-blue-700 text-sm">BASE_URL ve ACCESS_TOKEN değişkenlerini ayarlayın</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
            <h3 className="font-semibold text-blue-900 mb-2">Test Etmeye Başla</h3>
            <p className="text-blue-700 text-sm">API endpoint'lerini test etmeye başlayın</p>
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{collection.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{collection.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${collection.color} ${collection.textColor}`}>
                    {collection.endpoints.length} endpoint
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{collection.description}</p>

            {/* Endpoints List */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">İçerdiği Endpoint'ler:</h4>
              <ul className="space-y-2">
                {collection.endpoints.map((endpoint, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{endpoint}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleRunInPostman(collection)}
                disabled={collection.link === '#'}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  collection.link !== '#'
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Play className="w-4 h-4" />
                <span>Postman'de Aç</span>
                {collection.link !== '#' && <ExternalLink className="w-3 h-3" />}
              </button>
              
              <button
                onClick={() => handleDownload(collection)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>İndir</span>
              </button>
            </div>

            {collection.link === '#' && (
              <p className="text-xs text-gray-500 mt-3">
                * Bu collection yakında yayınlanacak
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Environment Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Environment Kurulumu</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Postman collection'larını kullanmak için aşağıdaki environment değişkenlerini ayarlamanız gerekir:
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Gerekli Değişkenler:</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">BASE_URL</code>
                <p className="text-sm text-gray-600 mt-1">API'nin base URL'i</p>
              </div>
              <code className="text-sm text-gray-700">https://backend-integration-mauve.vercel.app</code>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">ACCESS_TOKEN</code>
                <p className="text-sm text-gray-600 mt-1">Bearer token (auth/token endpoint'inden alınır)</p>
              </div>
              <code className="text-sm text-gray-700">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">API_KEY</code>
                <p className="text-sm text-gray-600 mt-1">Partner Portal'dan alınan API anahtarı</p>
              </div>
              <code className="text-sm text-gray-700">259aa5b375e08fb26e6e0ebf3f0949ca</code>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Info */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-purple-900 mb-4">Cozmopol Integration Workspace</h2>
        <p className="text-purple-800 mb-6">
          Tüm collection'lar Cozmopol Integration workspace'inde organize edilmiştir. 
          Workspace'e katılarak en güncel collection'lara erişebilirsiniz.
        </p>
        
        <div className="flex items-center space-x-4">
          <a
            href="https://www.postman.com/cozmopol/cozmopol-integration"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            <span>Workspace'i Ziyaret Et</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          
          <div className="text-sm text-purple-700">
            <p><strong>Workspace:</strong> Cozmopol Integration</p>
            <p><strong>Organizasyon:</strong> Cozmopol</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostmanCollections