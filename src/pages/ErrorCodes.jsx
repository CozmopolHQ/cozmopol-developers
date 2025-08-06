import React, { useState } from 'react'
import { AlertTriangle, Search, Info, XCircle, AlertCircle, CheckCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const ErrorCodes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const errorCategories = [
    { id: 'all', name: 'Tüm Hatalar', color: 'gray' },
    { id: 'authentication', name: 'Kimlik Doğrulama', color: 'red' },
    { id: 'validation', name: 'Doğrulama', color: 'yellow' },
    { id: 'rate_limit', name: 'Rate Limiting', color: 'orange' },
    { id: 'server', name: 'Sunucu', color: 'purple' },
    { id: 'not_found', name: 'Bulunamadı', color: 'blue' }
  ]

  const errorCodes = [
    {
      code: 400,
      type: 'validation',
      title: 'Bad Request',
      description: 'İstek formatı hatalı veya gerekli parametreler eksik',
      causes: [
        'JSON formatı hatalı',
        'Zorunlu alanlar eksik',
        'Geçersiz parametre değerleri',
        'Content-Type header\'ı eksik'
      ],
      solutions: [
        'JSON formatını kontrol edin',
        'Zorunlu alanları doldurun',
        'Parametre değerlerini doğrulayın',
        'Content-Type: application/json header\'ını ekleyin'
      ],
      example: `{
  "error": {
    "type": "validation_error",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      },
      {
        "field": "price",
        "message": "Price must be a positive number"
      }
    ]
  }
}`
    },
    {
      code: 401,
      type: 'authentication',
      title: 'Unauthorized',
      description: 'Kimlik doğrulama başarısız veya token geçersiz',
      causes: [
        'API anahtarı eksik veya hatalı',
        'Bearer token eksik',
        'Token süresi dolmuş',
        'Authorization header formatı hatalı'
      ],
      solutions: [
        'API anahtarınızı kontrol edin',
        'Yeni token alın',
        'Authorization header formatını kontrol edin: "Bearer YOUR_TOKEN"',
        'Token\'ın süresi dolmamış olduğundan emin olun'
      ],
      example: `{
  "error": {
    "type": "authentication_error",
    "message": "Invalid API key provided",
    "code": "invalid_api_key"
  }
}`
    },
    {
      code: 403,
      type: 'authentication',
      title: 'Forbidden',
      description: 'Bu kaynağa erişim izniniz yok',
      causes: [
        'Yetersiz izinler',
        'Hesap durumu aktif değil',
        'API anahtarı kısıtlı',
        'Kaynak erişimi engellenmiş'
      ],
      solutions: [
        'Hesap durumunuzu kontrol edin',
        'API izinlerinizi gözden geçirin',
        'Partner Portal\'dan destek alın',
        'Farklı bir API anahtarı deneyin'
      ],
      example: `{
  "error": {
    "type": "permission_error",
    "message": "Insufficient permissions to access this resource",
    "code": "access_denied"
  }
}`
    },
    {
      code: 404,
      type: 'not_found',
      title: 'Not Found',
      description: 'İstenen kaynak bulunamadı',
      causes: [
        'Endpoint URL\'i hatalı',
        'Kaynak ID\'si geçersiz',
        'Kaynak silinmiş',
        'API versiyonu hatalı'
      ],
      solutions: [
        'URL\'i kontrol edin',
        'Kaynak ID\'sinin doğru olduğundan emin olun',
        'API dökümantasyonunu kontrol edin',
        'Kaynağın var olduğunu doğrulayın'
      ],
      example: `{
  "error": {
    "type": "not_found_error",
    "message": "Product not found",
    "code": "product_not_found",
    "resource_id": "67c1bcbb3c56211e5c53289c"
  }
}`
    },
    {
      code: 422,
      type: 'validation',
      title: 'Unprocessable Entity',
      description: 'İstek formatı doğru ancak veriler işlenemiyor',
      causes: [
        'İş kuralları ihlali',
        'Veri tutarsızlığı',
        'Referans hatası',
        'Duplicate kayıt'
      ],
      solutions: [
        'Veri tutarlılığını kontrol edin',
        'İş kurallarını gözden geçirin',
        'Referans verilerini doğrulayın',
        'Duplicate kontrolleri yapın'
      ],
      example: `{
  "error": {
    "type": "business_rule_error",
    "message": "Product with this SKU already exists",
    "code": "duplicate_sku",
    "details": {
      "sku": "PRD-001",
      "existing_product_id": "67c1bcbb3c56211e5c53289c"
    }
  }
}`
    },
    {
      code: 429,
      type: 'rate_limit',
      title: 'Too Many Requests',
      description: 'Rate limit aşıldı, çok fazla istek gönderildi',
      causes: [
        'Dakikada 100 isteği aştınız',
        'Burst limit aşıldı (10 saniyede 50 istek)',
        'Concurrent request limiti aşıldı'
      ],
      solutions: [
        'İstekler arasında bekleme süresi ekleyin',
        'Exponential backoff uygulayın',
        'Rate limit header\'larını takip edin',
        'Batch işlemler kullanın'
      ],
      example: `{
  "error": {
    "type": "rate_limit_error",
    "message": "Too many requests. Please try again later.",
    "code": "rate_limit_exceeded",
    "retry_after": 60
  }
}`
    },
    {
      code: 500,
      type: 'server',
      title: 'Internal Server Error',
      description: 'Sunucu tarafında beklenmeyen bir hata oluştu',
      causes: [
        'Sunucu hatası',
        'Veritabanı bağlantı sorunu',
        'Servis geçici olarak kullanılamıyor',
        'Beklenmeyen sistem hatası'
      ],
      solutions: [
        'İsteği tekrar deneyin',
        'Birkaç dakika bekleyip tekrar deneyin',
        'Status sayfasını kontrol edin',
        'Destek ekibi ile iletişime geçin'
      ],
      example: `{
  "error": {
    "type": "internal_server_error",
    "message": "An unexpected error occurred",
    "code": "internal_error",
    "request_id": "req_1234567890"
  }
}`
    },
    {
      code: 502,
      type: 'server',
      title: 'Bad Gateway',
      description: 'Gateway hatası, upstream servis yanıt vermiyor',
      causes: [
        'Upstream servis çalışmıyor',
        'Network bağlantı sorunu',
        'Load balancer hatası',
        'Servis bakımda'
      ],
      solutions: [
        'Birkaç dakika bekleyip tekrar deneyin',
        'Status sayfasını kontrol edin',
        'Farklı endpoint deneyin',
        'Destek ekibi ile iletişime geçin'
      ],
      example: `{
  "error": {
    "type": "gateway_error",
    "message": "Service temporarily unavailable",
    "code": "bad_gateway"
  }
}`
    },
    {
      code: 503,
      type: 'server',
      title: 'Service Unavailable',
      description: 'Servis geçici olarak kullanılamıyor',
      causes: [
        'Planlı bakım',
        'Sistem yoğunluğu',
        'Servis yeniden başlatılıyor',
        'Kaynak yetersizliği'
      ],
      solutions: [
        'Retry-After header\'ını kontrol edin',
        'Belirtilen süre kadar bekleyin',
        'Status sayfasını takip edin',
        'Exponential backoff uygulayın'
      ],
      example: `{
  "error": {
    "type": "service_unavailable",
    "message": "Service is temporarily unavailable",
    "code": "service_unavailable",
    "retry_after": 300
  }
}`
    }
  ]

  const getStatusIcon = (code) => {
    if (code >= 200 && code < 300) return <CheckCircle className="w-5 h-5 text-green-600" />
    if (code >= 400 && code < 500) return <AlertCircle className="w-5 h-5 text-yellow-600" />
    if (code >= 500) return <XCircle className="w-5 h-5 text-red-600" />
    return <Info className="w-5 h-5 text-blue-600" />
  }

  const getStatusColor = (code) => {
    if (code >= 200 && code < 300) return 'bg-green-50 border-green-200 text-green-800'
    if (code >= 400 && code < 500) return 'bg-yellow-50 border-yellow-200 text-yellow-800'
    if (code >= 500) return 'bg-red-50 border-red-200 text-red-800'
    return 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const getCategoryColor = (category) => {
    const colors = {
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category] || colors.gray
  }

  const filteredErrors = errorCodes.filter(error => {
    const matchesSearch = error.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.code.toString().includes(searchTerm)
    const matchesCategory = selectedCategory === 'all' || error.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hata Kodları</h1>
        <p className="text-xl text-gray-600">
          Cozmopol API hata kodları, nedenleri ve çözüm önerileri
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Hata kodu veya açıklama ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {errorCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  selectedCategory === category.id
                    ? getCategoryColor(category.color)
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Codes List */}
      <div className="space-y-6">
        {filteredErrors.map((error, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                {getStatusIcon(error.code)}
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-lg text-lg font-bold border ${getStatusColor(error.code)}`}>
                      {error.code}
                    </span>
                    <h2 className="text-2xl font-semibold text-gray-900">{error.title}</h2>
                  </div>
                  <p className="text-gray-600">{error.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(errorCategories.find(cat => cat.id === error.type)?.color || 'gray')}`}>
                {errorCategories.find(cat => cat.id === error.type)?.name}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              {/* Causes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                  Olası Nedenler
                </h3>
                <ul className="space-y-2">
                  {error.causes.map((cause, causeIndex) => (
                    <li key={causeIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Çözüm Önerileri
                </h3>
                <ul className="space-y-2">
                  {error.solutions.map((solution, solutionIndex) => (
                    <li key={solutionIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Example Response */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Örnek Hata Yanıtı</h3>
              <CodeBlock code={error.example} language="json" />
            </div>
          </div>
        ))}
      </div>

      {filteredErrors.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Hata bulunamadı</h3>
          <p className="text-gray-600">Arama kriterlerinize uygun hata kodu bulunamadı.</p>
        </div>
      )}

      {/* General Error Handling Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-12">
        <div className="flex items-center space-x-3 mb-6">
          <Info className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-blue-800">Genel Hata Yönetimi İpuçları</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-800 mb-3">Retry Stratejisi</h3>
            <CodeBlock 
              code={`// Exponential backoff ile retry
async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return await response.json();
      }
      
      // 5xx hatalarında retry yap
      if (response.status >= 500 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}`}
              language="javascript"
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-blue-800 mb-3">Hata Loglama</h3>
            <CodeBlock 
              code={`// Kapsamlı hata loglama
function logError(error, context) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      status: error.status,
      code: error.code
    },
    context: {
      endpoint: context.endpoint,
      method: context.method,
      requestId: context.requestId
    },
    stack: error.stack
  };
  
  console.error('API Error:', JSON.stringify(errorLog, null, 2));
  
  // Error tracking servisine gönder
  // sendToErrorTracking(errorLog);
}`}
              language="javascript"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorCodes