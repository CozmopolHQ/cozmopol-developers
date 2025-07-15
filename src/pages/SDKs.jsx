import React from 'react'
import { Download, ExternalLink, Code, Book } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const SDKs = () => {
  const sdks = [
    {
      name: 'Node.js',
      icon: '📱',
      description: 'JavaScript/TypeScript geliştiricileri için resmi SDK',
      version: 'v2.1.0',
      installation: 'npm install @cozmopol/api-sdk',
      example: `const Cozmopol = require('@cozmopol/api-sdk');

const client = new Cozmopol({
  apiKey: 'your_api_key',
  environment: 'production' // or 'sandbox'
});

// Ürün oluşturma
const product = await client.products.create({
  title: 'Premium Kulaklık',
  description: 'Yüksek kaliteli wireless kulaklık',
  price: 299.99,
  category_id: 15,
  stock_quantity: 50
});

console.log('Ürün oluşturuldu:', product.id);`,
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
      version: 'v2.1.0',
      installation: 'pip install cozmopol-api',
      example: `from cozmopol import CozmoPolAPI

client = CozmoPolAPI(
    api_key='your_api_key',
    environment='production'  # or 'sandbox'
)

# Ürün oluşturma
product = client.products.create(
    title='Premium Kulaklık',
    description='Yüksek kaliteli wireless kulaklık',
    price=299.99,
    category_id=15,
    stock_quantity=50
)

print(f'Ürün oluşturuldu: {product.id}')`,
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
      version: 'v2.1.0',
      installation: 'composer require cozmopol/api-sdk',
      example: `<?php
require_once 'vendor/autoload.php';

use Cozmopol\\ApiSdk\\CozmoPolClient;

$client = new CozmoPolClient([
    'api_key' => 'your_api_key',
    'environment' => 'production' // or 'sandbox'
]);

// Ürün oluşturma
$product = $client->products()->create([
    'title' => 'Premium Kulaklık',
    'description' => 'Yüksek kaliteli wireless kulaklık',
    'price' => 299.99,
    'category_id' => 15,
    'stock_quantity' => 50
]);

echo 'Ürün oluşturuldu: ' . $product->id;`,
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
      version: 'v2.1.0',
      installation: 'Maven: com.cozmopol:api-sdk:2.1.0',
      example: `import com.cozmopol.api.CozmoPolClient;
import com.cozmopol.api.models.Product;

CozmoPolClient client = CozmoPolClient.builder()
    .apiKey("your_api_key")
    .environment("production") // or "sandbox"
    .build();

// Ürün oluşturma
Product product = client.products().create(
    Product.builder()
        .title("Premium Kulaklık")
        .description("Yüksek kaliteli wireless kulaklık")
        .price(299.99)
        .categoryId(15)
        .stockQuantity(50)
        .build()
);

System.out.println("Ürün oluşturuldu: " + product.getId());`,
      features: [
        'Builder pattern',
        'Immutable models',
        'Spring Boot starter',
        'Reactive support',
        'JUnit test utilities'
      ]
    }
  ]

  const codeExamples = [
    {
      title: 'Sipariş Listesi',
      language: 'javascript',
      code: `// Siparişleri getir
const orders = await client.orders.list({
  status: 'confirmed',
  page: 1,
  limit: 20
});

orders.data.forEach(order => {
  console.log(\`Sipariş: \${order.order_number} - \${order.total_amount} TL\`);
});`
    },
    {
      title: 'Stok Güncelleme',
      language: 'python',
      code: `# Stok miktarını güncelle
inventory = client.inventory.update(
    product_id=12345,
    quantity=100,
    operation='set'
)

print(f'Stok güncellendi: {inventory.new_quantity}')`
    },
    {
      title: 'Webhook Doğrulama',
      language: 'php',
      code: `// Webhook imzasını doğrula
$isValid = $client->webhooks()->verifySignature(
    $payload,
    $signature,
    $secret
);

if ($isValid) {
    // Webhook işle
    $event = json_decode($payload, true);
    handleWebhookEvent($event);
}`
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SDK'lar ve Örnekler</h1>
        <p className="text-xl text-gray-600">
          Favori programlama dilinizde Cozmopol API'sini kullanın
        </p>
      </div>

      {/* SDK Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {sdks.map((sdk, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-4xl">{sdk.icon}</div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{sdk.name}</h3>
                <p className="text-gray-600">{sdk.description}</p>
                <span className="inline-block bg-cozmopol-100 text-cozmopol-800 px-2 py-1 rounded text-xs font-medium mt-2">
                  {sdk.version}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Kurulum</h4>
              <code className="bg-gray-100 text-gray-800 px-3 py-2 rounded block font-mono text-sm">
                {sdk.installation}
              </code>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Özellikler</h4>
              <ul className="space-y-2">
                {sdk.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-cozmopol-600 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Örnek Kullanım</h4>
              <CodeBlock code={sdk.example} language={sdk.name.toLowerCase()} />
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center space-x-2 bg-cozmopol-600 text-white px-4 py-2 rounded-lg hover:bg-cozmopol-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>İndir</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Book className="w-4 h-4" />
                <span>Dökümantasyon</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Code Examples */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Kod Örnekleri</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {codeExamples.map((example, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">{example.title}</h3>
              </div>
              <div className="p-4">
                <CodeBlock code={example.code} language={example.language} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REST API Alternative */}
      <section className="bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cozmopol-500 to-primary-600 rounded-lg mb-4">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">REST API</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SDK kullanmak istemiyorsanız, doğrudan REST API endpoint'lerini kullanabilirsiniz. 
            Herhangi bir programlama dili ile HTTP istekleri yaparak API'mizi kullanabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Avantajlar</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>Herhangi bir dil ile kullanım</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>Bağımlılık yok</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>Tam kontrol</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                <span>Özelleştirilebilir</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Örnek cURL İsteği</h3>
            <CodeBlock 
              code={`curl -X GET \\
  https://api.cozmopol.com/v2/products \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`}
              language="bash"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/endpoints"
            className="inline-flex items-center space-x-2 bg-cozmopol-600 text-white px-6 py-3 rounded-lg hover:bg-cozmopol-700 transition-colors"
          >
            <span>API Referansını İncele</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  )
}

export default SDKs