import React from 'react'
import { BASE_URL } from '../config'
import { Download, ExternalLink, Play, FileText, Zap } from 'lucide-react'

const PostmanCollections = () => {
  const allEndpoints = [
    'GET /api/test/ping - API bağlantı testi',
    'GET /api/test/version - API versiyon bilgisi',
    'GET /api/health - Sistem sağlık kontrolü',
    'POST /api/test/webhook - Webhook test tetikleyicisi',
    'POST /api/auth/token - Vendor olarak giriş yap',
    'GET /api/products - Tüm ürünleri getir',
    'GET /api/products/{id} - Ürün detayı getir',
    'POST /v2/products - Yeni ürün oluştur',
    'GET /api/categories - Kategori listesi',
    'GET /api/brands - Marka listesi',
    'GET /api/orders - Tüm siparişleri getir',
    'GET /api/orders/{id} - Sipariş detayını getir',
    'GET /api/shipping - Kargo şirketlerini getir',
    'PUT /v2/inventory/{product_id} - Ürün stok güncelle',
    'GET /api/questions - Soru listesi',
    'PATCH /api/questions/{id}/answer - Soruya cevap ver'
  ]

  const handleRunInPostman = () => {
    window.open('https://www.postman.com/cozmopol/cozmopol-integration', '_blank')
  }

  const handleDownload = () => {
    console.log('Downloading Cozmopol Integration collection...')
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Postman Collection</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Cozmopol API'sini test etmek için hazırlanmış kapsamlı Postman collection'ı.
          Tüm endpoint'leri ve örnek istekleri tek collection'da bulabilirsiniz.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-blue-900">Hızlı Başlangıç</h2>
        </div>
        <p className="text-blue-800 mb-6">
          Postman collection'ını kullanmaya başlamak için aşağıdaki adımları takip edin:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
            <h3 className="font-semibold text-blue-900 mb-2">Collection'ı Aç</h3>
            <p className="text-blue-700 text-sm">Postman workspace'inde collection'ı açın</p>
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

      {/* Main Collection Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🚀</div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Cozmopol Integration</h3>
              <p className="text-gray-600">Tüm API endpoint'lerini içeren kapsamlı collection</p>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2 border border-blue-200">
                {allEndpoints.length} endpoint
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Bu collection, Cozmopol API'sinin tüm endpoint'lerini içerir. Test araçlarından ürün yönetimine,
          sipariş takibinden stok kontrolüne kadar tüm işlemleri tek yerden gerçekleştirebilirsiniz.
        </p>

        {/* Endpoints List */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">İçerdiği Endpoint'ler:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {allEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{endpoint}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleRunInPostman}
            className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>Postman'de Aç</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Collection İndir</span>
          </button>
        </div>
      </div>

      {/* Environment Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Environment Kurulumu</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Postman collection'ını kullanmak için aşağıdaki environment değişkenlerini ayarlamanız gerekir:
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Gerekli Değişkenler:</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">BASE_URL</code>
                <p className="text-sm text-gray-600 mt-1">API'nin base URL'i</p>
              </div>
              <code className="text-sm text-gray-700">{BASE_URL}</code>
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
          Collection, Cozmopol Integration workspace'inde organize edilmiştir.
          Workspace'e katılarak en güncel collection'a erişebilirsiniz.
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