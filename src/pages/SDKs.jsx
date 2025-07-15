import React from 'react'
import { Code, Calendar, Bell, CheckCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const SDKs = () => {
  const plannedSDKs = [
    {
      name: 'Node.js',
      icon: '📱',
      description: 'JavaScript/TypeScript geliştiricileri için resmi SDK',
      status: 'Planlanan',
      features: [
        'TypeScript desteği',
        'Promise tabanlı API',
        'Otomatik retry mekanizması',
        'Built-in validation',
        'Webhook helpers'
      ]
    },
    {
      name: 'Python',
      icon: '🐍',
      description: 'Python geliştiricileri için resmi SDK',
      status: 'Planlanan',
      features: [
        'Type hints desteği',
        'Async/await desteği',
        'Pydantic modelleri',
        'Otomatik pagination',
        'Exception handling'
      ]
    },
    {
      name: 'PHP',
      icon: '🐘',
      description: 'PHP geliştiricileri için resmi SDK',
      status: 'Planlanan',
      features: [
        'PSR-4 autoloading',
        'Guzzle HTTP client',
        'Laravel integration',
        'Symfony bundle',
        'PHPUnit test helpers'
      ]
    },
    {
      name: 'Java',
      icon: '☕',
      description: 'Java geliştiricileri için resmi SDK',
      status: 'Planlanan',
      features: [
        'Builder pattern',
        'Immutable models',
        'Spring Boot starter',
        'Reactive support',
        'JUnit test utilities'
      ]
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SDK'lar ve Örnekler</h1>
        <p className="text-xl text-gray-600">
          Favori programlama dilinizde Cozmopol API'sini kullanmak için SDK'lar yakında geliyor
        </p>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">SDK'lar Yakında Geliyor!</h2>
        <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
          Şu anda API'mizi REST endpoint'leri üzerinden kullanabilirsiniz. 
          Popüler programlama dilleri için resmi SDK'lar aktif olarak geliştirilmekte ve yakında yayınlanacak.
        </p>
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <Bell className="w-4 h-4" />
          <span className="text-sm font-medium">SDK'lar hazır olduğunda bildirim almak için bizi takip edin</span>
        </div>
      </div>

      {/* Planned SDKs */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Planlanan SDK'lar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plannedSDKs.map((sdk, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow opacity-75">
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl">{sdk.icon}</div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{sdk.name}</h3>
                  <p className="text-gray-600">{sdk.description}</p>
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mt-2">
                    {sdk.status}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Planlanan Özellikler</h4>
                <ul className="space-y-2">
                  {sdk.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                  Yakında Geliyor
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Current Alternative */}
      <section className="bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mb-4">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Şu An İçin: REST API</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SDK'lar hazırlanırken, doğrudan REST API endpoint'lerini kullanabilirsiniz. 
            Herhangi bir programlama dili ile HTTP istekleri yaparak API'mizi kullanabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Avantajlar</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Herhangi bir dil ile kullanım</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Bağımlılık yok</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Tam kontrol</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Hemen kullanıma hazır</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Örnek cURL İsteği</h3>
            <CodeBlock 
              code={`# Token alma
curl -X POST \\
  https://api.cozmopol.com/api/auth/token \\
  -H 'Content-Type: application/json' \\
  -d '{
    "storeUserId": "YOUR_STORE_USER_ID",
    "apiKey": "YOUR_API_KEY",
    "apiSecretKey": "YOUR_API_SECRET_KEY"
  }'

# API kullanımı
curl -X GET \\
  https://api.cozmopol.com/api/test/ping \\
  -H 'Authorization: Bearer YOUR_TOKEN'`}
              language="bash"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/endpoints"
            className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>API Referansını İncele</span>
            <Code className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-blue-900 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">SDK'lar Hazır Olduğunda Haberdar Olun</h2>
        <p className="text-blue-200 mb-6">
          SDK'lar yayınlandığında ilk siz haberdar olun. E-posta adresinizi bırakın, 
          size haber verelim.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="E-posta adresiniz"
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors">
            Bildirim Al
          </button>
        </div>
      </div>
    </div>
  )
}

export default SDKs