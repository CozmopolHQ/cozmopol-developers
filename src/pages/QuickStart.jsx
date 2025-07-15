import React from 'react'
import { CheckCircle, Copy, ExternalLink } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const QuickStart = () => {
  const steps = [
    {
      title: 'API Anahtarı Alın',
      description: 'Cozmopol Partner Portal\'dan API anahtarınızı ve vendor bilgilerinizi alın',
      action: 'Partner Portal\'a Git',
      link: '#'
    },
    {
      title: 'Token Alın (Opsiyonel)',
      description: 'Vendor bilgileriniz ile authentication token alın',
      code: `curl -X POST \\
  https://api.cozmopol.com/api/auth/token \\
  -H 'Content-Type: application/json' \\
  -d '{
    "storeUserId": "YOUR_STORE_USER_ID",
    "apiKey": "YOUR_API_KEY",
    "apiSecretKey": "YOUR_API_SECRET_KEY"
  }'`
    },
    {
      title: 'İlk API Çağrısı',
      description: 'Test endpoint\'i kullanarak bağlantınızı doğrulayın',
        code: `curl -X GET \\
  https://api.cozmopol.com/api/test/ping \\
  -H 'Authorization: Bearer YOUR_TOKEN_OR_API_KEY' \\
  -H 'Content-Type: application/json'`
    },
    {
      title: 'Ürün Yükleme',
      description: 'İlk ürünlerinizi API üzerinden yükleyin',
      code: `curl -X POST \\
  https://api.cozmopol.com/v2/products \\
  -H 'Authorization: Bearer YOUR_TOKEN_OR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "title": "Premium Kulaklık",
    "description": "Yüksek kaliteli wireless kulaklık",
    "price": 299.99,
    "category_id": 15,
    "stock_quantity": 50
  }'`
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hızlı Başlangıç</h1>
        <p className="text-xl text-gray-600">
          Cozmopol API ile entegrasyonunuzu 3 basit adımda tamamlayın
        </p>
      </div>

      <div className="space-y-12">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Step indicator line */}
            {index < steps.length - 1 && (
              <div className="absolute left-4 top-12 w-0.5 h-24 bg-gray-200"></div>
            )}
            
            <div className="flex items-start space-x-6">
              {/* Step number */}
              <div className="flex-shrink-0 w-8 h-8 bg-cozmopol-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              
              {/* Step content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                
                {step.action && (
                  <a
                    href={step.link}
                    className="inline-flex items-center space-x-2 bg-cozmopol-600 text-white px-4 py-2 rounded-lg hover:bg-cozmopol-700 transition-colors"
                  >
                    <span>{step.action}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                
                {step.code && (
                  <CodeBlock code={step.code} language="bash" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Success Response Example */}
      <div className="mt-16 bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-green-800">✅ Stable - Test API Başarılı Yanıt</h3>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-green-800 mb-2">Token Yanıtı</h4>
          <CodeBlock 
            code={`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
            language="json"
          />
        </div>
        
        <CodeBlock 
          code={`{
  "message": "pong"
}`}
          language="json"
        />
        
        <div className="mt-6">
          <h4 className="font-semibold text-green-800 mb-2">Diğer Test Endpoint'leri</h4>
          <div className="bg-green-100 border border-green-300 rounded p-2 mb-2">
            <p className="text-green-800 text-xs">
              <strong>✅ Stable:</strong> Aşağıdaki endpoint'ler production'da kullanıma hazırdır.
            </p>
          </div>
          <div className="bg-orange-100 border border-orange-300 rounded p-2 mb-3">
            <p className="text-orange-800 text-xs">
              <strong>🔧 Geliştiriliyor:</strong> Webhook test endpoint'i henüz geliştirme aşamasındadır.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <code className="bg-green-100 px-2 py-1 rounded">POST /api/auth/token</code>
              <span className="text-green-700 ml-2">Vendor token alma</span>
            </div>
            <div>
              <code className="bg-green-100 px-2 py-1 rounded">GET /api/test/version</code>
              <span className="text-green-700 ml-2">API versiyonunu döner</span>
            </div>
            <div>
              <code className="bg-green-100 px-2 py-1 rounded">GET /api/health</code>
              <span className="text-green-700 ml-2">Sistem sağlık durumunu kontrol eder</span>
            </div>
            <div>
              <code className="bg-orange-100 px-2 py-1 rounded">POST /api/test/webhook</code>
              <span className="text-orange-700 ml-2">Webhook test tetikleyicisi (geliştiriliyor)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Sonraki Adımlar</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Kimlik doğrulama detaylarını öğrenin</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Tüm API endpoint'lerini keşfedin</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Webhook'ları yapılandırın</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>SDK'ları kullanarak geliştirme sürecinizi hızlandırın</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default QuickStart