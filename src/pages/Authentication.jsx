import React from 'react'
import { Shield, Key, AlertTriangle, CheckCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const Authentication = () => {
  const securityTips = [
    'API anahtarınızı güvenli bir şekilde saklayın',
    'Prodüksiyon ortamında environment variables kullanın',
    'API anahtarınızı düzenli olarak rotasyona alın',
    'Rate limiting kurallarına dikkat edin',
    'HTTPS kullanarak güvenli bağlantı sağlayın'
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Kimlik Doğrulama</h1>
        <p className="text-xl text-gray-600">
          Cozmopol API güvenli Bearer token kimlik doğrulaması kullanır
        </p>
      </div>

      {/* Bearer Token Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Key className="w-6 h-6 text-cozmopol-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Bearer Token Kimlik Doğrulaması</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Cozmopol API, Bearer token tabanlı kimlik doğrulama kullanır. Tüm API isteklerinizde 
          Authorization header'ı kullanmanız gerekir.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Header Format:</h3>
          <code className="text-cozmopol-600 font-mono">Authorization: Bearer YOUR_API_KEY</code>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Örnek İstek</h3>
        <CodeBlock 
          code={`# Test endpoint'i (kimlik doğrulama gerektirmez)
curl -X GET \\
  https://api.cozmopol.com/api/test/ping

# Kimlik doğrulama gerektiren endpoint
curl -X GET \\
  https://api.cozmopol.com/v2/products \\
  -H 'Authorization: Bearer sk_live_1234567890abcdef' \\
  -H 'Content-Type: application/json'`}
          language="bash"
        />
      </div>

      {/* API Key Types */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">API Anahtarı Türleri</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Test Anahtarları</h3>
            <p className="text-yellow-700 text-sm mb-2">
              <code className="bg-yellow-100 px-2 py-1 rounded">sk_test_...</code>
            </p>
            <p className="text-yellow-700 text-sm">
              Geliştirme ve test ortamları için kullanılır. Gerçek işlemler yapılmaz.
            </p>
          </div>
          
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Canlı Anahtarlar</h3>
            <p className="text-green-700 text-sm mb-2">
              <code className="bg-green-100 px-2 py-1 rounded">sk_live_...</code>
            </p>
            <p className="text-green-700 text-sm">
              Prodüksiyon ortamı için kullanılır. Gerçek işlemler yapılır.
            </p>
          </div>
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Güvenlik Önerileri</h2>
        </div>
        
        <div className="space-y-4">
          {securityTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Limiting */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Rate Limiting</h2>
        </div>
        
        <p className="text-gray-600 mb-4">
          API'miz rate limiting kullanarak sistem performansını korur ve adil kullanım sağlar.
        </p>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-800 mb-2">Limitler</h3>
          <ul className="text-orange-700 text-sm space-y-1">
            <li>• <strong>Test Endpoint'leri:</strong> Dakikada 100 istek (kimlik doğrulama gerektirmez)</li>
            <li>• <strong>Test Anahtarları:</strong> Dakikada 100 istek</li>
            <li>• <strong>Canlı Anahtarlar:</strong> Dakikada 1000 istek</li>
            <li>• <strong>Burst Limit:</strong> 10 saniyede 50 istek</li>
          </ul>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Rate Limit Headers</h3>
        <CodeBlock 
          code={`HTTP/1.1 200 OK
RateLimit-Policy: 100;w=60
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 2
X-RateLimit-Retry-After: 60`}
          language="http"
        />
      </div>

      {/* Error Responses */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hata Yanıtları</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">401 Unauthorized</h3>
            <p className="text-gray-600 mb-4">Geçersiz veya eksik API anahtarı</p>
            <CodeBlock 
              code={`{
  "error": {
    "type": "authentication_error",
    "message": "Invalid API key provided",
    "code": "invalid_api_key"
  }
}`}
              language="json"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">429 Too Many Requests</h3>
            <p className="text-gray-600 mb-4">Rate limit aşıldı</p>
            <CodeBlock 
              code={`{
  "error": {
    "type": "rate_limit_error",
    "message": "Too many requests. Please try again later.",
    "code": "rate_limit_exceeded"
  }
}`}
              language="json"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication