import React from 'react'
import { CheckCircle, AlertTriangle, Code, Zap, Shield, Clock } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import { BASE_URL } from '../config'

const IntegrationGuide = () => {
  const integrationSteps = [
    {
      title: 'Hesap Oluşturma ve API Anahtarı Alma',
      description: 'Cozmopol Partner Portal\'dan hesabınızı oluşturun ve API anahtarlarınızı alın',
      icon: Shield,
      steps: [
        'Cozmopol Partner Portal\'a kayıt olun',
        'Mağaza bilgilerinizi tamamlayın',
        'API anahtarlarınızı (API Key ve Secret Key) alın',
        'Test ve canlı ortam anahtarlarını not edin'
      ],
      code: `// API Anahtarları
const API_KEY = "259aa5b375e08fb26e6e0ebf3f0949ca"
const API_SECRET_KEY = "720f5664ee414a5047bb130144f1a29cba65130d4e7585f18992421a02e6f065"
const STORE_USER_ID = "67c1b95d3201a327160dbca2"`
    },
    {
      title: 'Kimlik Doğrulama Token\'ı Alma',
      description: 'API istekleri için gerekli olan Bearer token\'ı alın',
      icon: Code,
      steps: [
        'POST /api/auth/token endpoint\'ini kullanın',
        'Vendor bilgilerinizi gönderin',
        'Dönen token\'ı saklayın',
        'Token\'ı tüm API isteklerinde kullanın'
      ],
      code: `// Token alma
const getAuthToken = async () => {
  const response = await fetch(\`${BASE_URL}/auth/token\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      storeUserId: STORE_USER_ID,
      apiKey: API_KEY,
      apiSecretKey: API_SECRET_KEY
    })
  });
  
  const data = await response.json();
  return data.token;
};`
    },
    {
      title: 'İlk API Çağrısı - Bağlantı Testi',
      description: 'API bağlantınızı test edin ve sistem durumunu kontrol edin',
      icon: Zap,
      steps: [
        'GET /api/test/ping endpoint\'ini çağırın',
        'Bearer token\'ı header\'da gönderin',
        '"pong" yanıtını alın',
        'Bağlantınızın çalıştığını doğrulayın'
      ],
      code: `// Bağlantı testi
const testConnection = async (token) => {
  const response = await fetch(\`${BASE_URL}/test/ping\`, {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  console.log(data); // { "message": "pong" }
};`
    },
    {
      title: 'Kategori ve Marka Bilgilerini Alma',
      description: 'Ürün yüklemeden önce mevcut kategori ve markaları öğrenin',
      icon: CheckCircle,
      steps: [
        'GET /api/categories ile kategorileri alın',
        'GET /api/brands ile markaları alın',
        'Ürünleriniz için uygun kategori ID\'lerini belirleyin',
        'Marka bilgilerini eşleştirin'
      ],
      code: `// Kategori ve marka bilgilerini alma
const getCategories = async (token) => {
  const response = await fetch(\`${BASE_URL}/categories\`, {
    headers: { 'Authorization': \`Bearer \${token}\` }
  });
  return await response.json();
};

const getBrands = async (token) => {
  const response = await fetch(\`${BASE_URL}/brands\`, {
    headers: { 'Authorization': \`Bearer \${token}\` }
  });
  return await response.json();
};`
    },
    {
      title: 'İlk Ürün Yükleme',
      description: 'API üzerinden ilk ürününüzü sisteme yükleyin',
      icon: Clock,
      steps: [
        'Ürün bilgilerini hazırlayın',
        'POST /v2/products endpoint\'ini kullanın',
        'Zorunlu alanları doldurun',
        'Ürün ID\'sini saklayın'
      ],
      code: `// Ürün yükleme
const createProduct = async (token) => {
  const productData = {
    title: "Premium Kulaklık",
    description: "Yüksek kaliteli wireless kulaklık",
    price: 299.99,
    category_id: 15,
    stock_quantity: 50,
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    sku: "PRD-001",
    weight: 250
  };

  const response = await fetch(\`${BASE_URL}/products\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });
  
  return await response.json();
};`
    }
  ]

  const bestPractices = [
    {
      title: 'Güvenlik',
      items: [
        'API anahtarlarınızı güvenli saklayın',
        'Environment variables kullanın',
        'HTTPS bağlantısı kullanın',
        'Token\'ları düzenli olarak yenileyin'
      ]
    },
    {
      title: 'Performans',
      items: [
        'Rate limiting kurallarına uyun',
        'Batch işlemler için uygun endpoint\'leri kullanın',
        'Gereksiz API çağrılarından kaçının',
        'Response\'ları cache\'leyin'
      ]
    },
    {
      title: 'Hata Yönetimi',
      items: [
        'HTTP status kodlarını kontrol edin',
        'Retry mekanizması uygulayın',
        'Hata mesajlarını loglayin',
        'Fallback stratejileri hazırlayın'
      ]
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nasıl Entegrasyon Yaparım?</h1>
        <p className="text-xl text-gray-600">
          Cozmopol API ile entegrasyonunuzu adım adım tamamlayın
        </p>
      </div>

      {/* Integration Steps */}
      <div className="space-y-12 mb-16">
        {integrationSteps.map((step, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="flex items-start space-x-6">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <step.icon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">{step.title}</h2>
                </div>

                <p className="text-gray-600 mb-6">{step.description}</p>

                {/* Steps List */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Adımlar:</h3>
                  <ul className="space-y-2">
                    {step.steps.map((stepItem, stepIndex) => (
                      <li key={stepIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{stepItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Example */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Kod Örneği:</h3>
                  <CodeBlock code={step.code} language="javascript" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Complete Integration Example */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tam Entegrasyon Örneği</h2>
        <p className="text-gray-600 mb-6">
          Aşağıda tüm adımları içeren kapsamlı bir entegrasyon örneği bulabilirsiniz:
        </p>

        <CodeBlock
          code={`// Cozmopol API Entegrasyon Örneği
class CozmopolAPI {
  constructor(storeUserId, apiKey, apiSecretKey) {
    this.storeUserId = storeUserId;
    this.apiKey = apiKey;
    this.apiSecretKey = apiSecretKey;
    this.baseURL = BASE_URL;
    this.token = null;
  }

  // 1. Token alma
  async authenticate() {
    try {
      const response = await fetch(\`${this.baseURL}/auth/token\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeUserId: this.storeUserId,
          apiKey: this.apiKey,
          apiSecretKey: this.apiSecretKey
        })
      });

      const data = await response.json();
      this.token = data.token;
      return this.token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  // 2. API çağrısı helper
  async apiCall(endpoint, method = 'GET', body = null) {
    if (!this.token) {
      await this.authenticate();
    }

    const options = {
      method,
      headers: {
        'Authorization': \`Bearer \${this.token}\`,
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(\`${this.baseURL}\${endpoint}\`, options);
    
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status} - \${response.statusText}\`);
    }

    return await response.json();
  }

  // 3. Bağlantı testi
  async testConnection() {
    return await this.apiCall('/test/ping');
  }

  // 4. Kategorileri getir
  async getCategories() {
    return await this.apiCall('/categories');
  }

  // 5. Markaları getir
  async getBrands() {
    return await this.apiCall('/brands');
  }

  // 6. Ürün oluştur
  async createProduct(productData) {
    return await this.apiCall('/products', 'POST', productData);
  }

  // 7. Ürünleri listele
  async getProducts(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const endpoint = queryString ? \`/products?\${queryString}\` : '/products';
    return await this.apiCall(endpoint);
  }

  // 8. Siparişleri getir
  async getOrders() {
    return await this.apiCall('/orders');
  }
}

// Kullanım örneği
async function main() {
  const api = new CozmopolAPI(
    '67c1b95d3201a327160dbca2',
    '259aa5b375e08fb26e6e0ebf3f0949ca',
    '720f5664ee414a5047bb130144f1a29cba65130d4e7585f18992421a02e6f065'
  );

  try {
    // 1. Bağlantıyı test et
    console.log('Testing connection...');
    const pingResult = await api.testConnection();
    console.log('Connection test:', pingResult);

    // 2. Kategorileri al
    console.log('Getting categories...');
    const categories = await api.getCategories();
    console.log('Categories:', categories.length);

    // 3. İlk ürünü oluştur
    console.log('Creating product...');
    const newProduct = await api.createProduct({
      title: "Test Ürünü",
      description: "API ile oluşturulan test ürünü",
      price: 99.99,
      category_id: 1219,
      stock_quantity: 10
    });
    console.log('Product created:', newProduct);

    // 4. Ürünleri listele
    console.log('Getting products...');
    const products = await api.getProducts({ status: true });
    console.log('Products:', products.length);

  } catch (error) {
    console.error('Integration error:', error);
  }
}

// Entegrasyonu başlat
main();`}
          language="javascript"
        />
      </div>

      {/* Best Practices */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">En İyi Uygulamalar</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestPractices.map((practice, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{practice.title}</h3>
              <ul className="space-y-2">
                {practice.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Common Issues */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          <h2 className="text-2xl font-semibold text-yellow-800">Sık Karşılaşılan Sorunlar</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">401 Unauthorized Hatası</h3>
            <p className="text-yellow-700 text-sm">
              API anahtarınızı kontrol edin ve token'ın süresi dolmamış olduğundan emin olun.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">429 Rate Limit Hatası</h3>
            <p className="text-yellow-700 text-sm">
              Çok fazla istek gönderiyorsunuz. İstekler arasında bekleme süresi ekleyin.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Ürün Yükleme Hatası</h3>
            <p className="text-yellow-700 text-sm">
              Zorunlu alanların (title, description, price, category_id) dolu olduğundan emin olun.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntegrationGuide