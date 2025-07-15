import React from 'react'
import EndpointCard from '../components/EndpointCard'

const Endpoints = () => {
  const testEndpoints = [
    {
      method: 'GET',
      path: '/api/test/ping',
      description: 'API bağlantısını test et',
      parameters: [],
      response: `{
  "message": "pong"
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/api/test/ping \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/api/test/version',
      description: 'API versiyonunu getir',
      parameters: [],
      response: `{
  "version": "1.0.0"
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/api/test/version \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/api/health',
      description: 'Sistem sağlık durumunu kontrol et',
      parameters: [],
      response: `{
  "status": "ok",
  "services": {
    "database": {
      "status": "connected",
      "ping": 80,
      "pingError": null
    },
    "redis": "unknown",
    "queue": "unknown",
    "mail": "unknown"
  }
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/api/health \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'POST',
      path: '/api/test/webhook',
      description: 'Webhook test tetikleyicisi',
      parameters: [
        { name: 'event', type: 'string', required: false, description: 'Test edilecek webhook event türü' },
        { name: 'data', type: 'object', required: false, description: 'Test verisi' }
      ],
      response: `{
  "success": true,
  "message": "Test webhook triggered successfully"
}`,
      example: `curl -X POST \\
  https://api.cozmopol.com/api/test/webhook \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "event": "order.created",
    "data": {
      "order_id": 12345
    }
  }'`
    }
  ]

  const productEndpoints = [
    {
      method: 'POST',
      path: '/v2/products',
      description: 'Yeni ürün oluştur',
      parameters: [
        { name: 'title', type: 'string', required: true, description: 'Ürün başlığı' },
        { name: 'description', type: 'string', required: true, description: 'Ürün açıklaması' },
        { name: 'price', type: 'number', required: true, description: 'Ürün fiyatı (TL)' },
        { name: 'category_id', type: 'integer', required: true, description: 'Kategori ID\'si' },
        { name: 'stock_quantity', type: 'integer', required: true, description: 'Stok miktarı' },
        { name: 'images', type: 'array', required: false, description: 'Ürün görselleri URL\'leri' },
        { name: 'sku', type: 'string', required: false, description: 'Stok kodu' },
        { name: 'weight', type: 'number', required: false, description: 'Ürün ağırlığı (gram)' },
        { name: 'dimensions', type: 'object', required: false, description: 'Ürün boyutları (cm)' }
      ],
      response: `{
  "success": true,
  "data": {
    "id": 12345,
    "title": "Premium Kulaklık",
    "description": "Yüksek kaliteli wireless kulaklık",
    "price": 299.99,
    "category_id": 15,
    "stock_quantity": 50,
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}`,
      example: `curl -X POST \\
  https://api.cozmopol.com/v2/products \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "title": "Premium Kulaklık",
    "description": "Yüksek kaliteli wireless kulaklık",
    "price": 299.99,
    "category_id": 15,
    "stock_quantity": 50,
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ]
  }'`
    },
    {
      method: 'GET',
      path: '/v2/products',
      description: 'Ürün listesini getir',
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Sayfa numarası (varsayılan: 1)' },
        { name: 'limit', type: 'integer', required: false, description: 'Sayfa başına öğe sayısı (varsayılan: 20, maksimum: 100)' },
        { name: 'category_id', type: 'integer', required: false, description: 'Kategoriye göre filtrele' },
        { name: 'status', type: 'string', required: false, description: 'Duruma göre filtrele (active, inactive, draft)' },
        { name: 'search', type: 'string', required: false, description: 'Ürün başlığında arama' }
      ],
      response: `{
  "success": true,
  "data": [
    {
      "id": 12345,
      "title": "Premium Kulaklık",
      "price": 299.99,
      "stock_quantity": 50,
      "status": "active"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "total_items": 200,
    "per_page": 20
  }
}`,
      example: `curl -X GET \\
  'https://api.cozmopol.com/v2/products?page=1&limit=20&category_id=15' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/v2/products/{id}',
      description: 'Ürün detayını getir',
      parameters: [
        { name: 'id', type: 'integer', required: true, description: 'Ürün ID\'si' }
      ],
      response: `{
  "success": true,
  "data": {
    "id": 12345,
    "title": "Premium Kulaklık",
    "description": "Yüksek kaliteli wireless kulaklık",
    "price": 299.99,
    "category_id": 15,
    "stock_quantity": 50,
    "images": ["https://example.com/image1.jpg"],
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/v2/products/12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'PUT',
      path: '/v2/products/{id}',
      description: 'Ürün güncelle',
      parameters: [
        { name: 'id', type: 'integer', required: true, description: 'Ürün ID\'si' },
        { name: 'title', type: 'string', required: false, description: 'Ürün başlığı' },
        { name: 'description', type: 'string', required: false, description: 'Ürün açıklaması' },
        { name: 'price', type: 'number', required: false, description: 'Ürün fiyatı (TL)' },
        { name: 'stock_quantity', type: 'integer', required: false, description: 'Stok miktarı' }
      ],
      response: `{
  "success": true,
  "data": {
    "id": 12345,
    "title": "Premium Kulaklık - Güncellenmiş",
    "price": 279.99,
    "updated_at": "2024-01-15T11:30:00Z"
  }
}`,
      example: `curl -X PUT \\
  https://api.cozmopol.com/v2/products/12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "title": "Premium Kulaklık - Güncellenmiş",
    "price": 279.99
  }'`
    },
    {
      method: 'DELETE',
      path: '/v2/products/{id}',
      description: 'Ürün sil',
      parameters: [
        { name: 'id', type: 'integer', required: true, description: 'Ürün ID\'si' }
      ],
      response: `{
  "success": true,
  "message": "Product deleted successfully"
}`,
      example: `curl -X DELETE \\
  https://api.cozmopol.com/v2/products/12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  ]

  const orderEndpoints = [
    {
      method: 'GET',
      path: '/v2/orders',
      description: 'Sipariş listesini getir',
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Sayfa numarası' },
        { name: 'limit', type: 'integer', required: false, description: 'Sayfa başına öğe sayısı' },
        { name: 'status', type: 'string', required: false, description: 'Sipariş durumu (pending, confirmed, shipped, delivered, cancelled)' },
        { name: 'date_from', type: 'string', required: false, description: 'Başlangıç tarihi (YYYY-MM-DD)' },
        { name: 'date_to', type: 'string', required: false, description: 'Bitiş tarihi (YYYY-MM-DD)' }
      ],
      response: `{
  "success": true,
  "data": [
    {
      "id": 67890,
      "order_number": "ORD-2024-001",
      "status": "confirmed",
      "total_amount": 599.98,
      "customer": {
        "name": "Ahmet Yılmaz",
        "email": "ahmet@example.com"
      },
      "created_at": "2024-01-15T09:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 100
  }
}`,
      example: `curl -X GET \\
  'https://api.cozmopol.com/v2/orders?status=confirmed&page=1' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/v2/orders/{id}',
      description: 'Sipariş detayını getir',
      parameters: [
        { name: 'id', type: 'integer', required: true, description: 'Sipariş ID\'si' }
      ],
      response: `{
  "success": true,
  "data": {
    "id": 67890,
    "order_number": "ORD-2024-001",
    "status": "confirmed",
    "total_amount": 599.98,
    "customer": {
      "name": "Ahmet Yılmaz",
      "email": "ahmet@example.com",
      "phone": "+90 555 123 4567"
    },
    "shipping_address": {
      "street": "Atatürk Cad. No:123",
      "city": "İstanbul",
      "postal_code": "34000",
      "country": "TR"
    },
    "items": [
      {
        "product_id": 12345,
        "title": "Premium Kulaklık",
        "quantity": 2,
        "unit_price": 299.99,
        "total_price": 599.98
      }
    ],
    "created_at": "2024-01-15T09:00:00Z"
  }
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/v2/orders/67890 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'PUT',
      path: '/v2/orders/{id}/status',
      description: 'Sipariş durumunu güncelle',
      parameters: [
        { name: 'id', type: 'integer', required: true, description: 'Sipariş ID\'si' },
        { name: 'status', type: 'string', required: true, description: 'Yeni durum (confirmed, shipped, delivered, cancelled)' },
        { name: 'tracking_number', type: 'string', required: false, description: 'Kargo takip numarası (shipped durumu için)' },
        { name: 'notes', type: 'string', required: false, description: 'Durum değişikliği notları' }
      ],
      response: `{
  "success": true,
  "data": {
    "id": 67890,
    "status": "shipped",
    "tracking_number": "TRK123456789",
    "updated_at": "2024-01-15T14:30:00Z"
  }
}`,
      example: `curl -X PUT \\
  https://api.cozmopol.com/v2/orders/67890/status \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "status": "shipped",
    "tracking_number": "TRK123456789",
    "notes": "Kargo MNG ile gönderildi"
  }'`
    }
  ]

  const inventoryEndpoints = [
    {
      method: 'PUT',
      path: '/v2/inventory/{product_id}',
      description: 'Stok miktarını güncelle',
      parameters: [
        { name: 'product_id', type: 'integer', required: true, description: 'Ürün ID\'si' },
        { name: 'quantity', type: 'integer', required: true, description: 'Yeni stok miktarı' },
        { name: 'operation', type: 'string', required: false, description: 'İşlem türü (set, add, subtract) - varsayılan: set' }
      ],
      response: `{
  "success": true,
  "data": {
    "product_id": 12345,
    "previous_quantity": 50,
    "new_quantity": 75,
    "updated_at": "2024-01-15T15:00:00Z"
  }
}`,
      example: `curl -X PUT \\
  https://api.cozmopol.com/v2/inventory/12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "quantity": 75,
    "operation": "set"
  }'`
    },
    {
      method: 'GET',
      path: '/v2/inventory/low-stock',
      description: 'Düşük stoklu ürünleri getir',
      parameters: [
        { name: 'threshold', type: 'integer', required: false, description: 'Stok eşik değeri (varsayılan: 10)' },
        { name: 'page', type: 'integer', required: false, description: 'Sayfa numarası' },
        { name: 'limit', type: 'integer', required: false, description: 'Sayfa başına öğe sayısı' }
      ],
      response: `{
  "success": true,
  "data": [
    {
      "product_id": 12345,
      "title": "Premium Kulaklık",
      "current_stock": 5,
      "threshold": 10,
      "status": "low_stock"
    },
    {
      "product_id": 12346,
      "title": "Wireless Mouse",
      "current_stock": 0,
      "threshold": 10,
      "status": "out_of_stock"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 2,
    "total_items": 15
  }
}`,
      example: `curl -X GET \\
  'https://api.cozmopol.com/v2/inventory/low-stock?threshold=10' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Endpoints</h1>
        <p className="text-xl text-gray-600">
          Cozmopol API'nin tüm endpoint'leri ve kullanım örnekleri
        </p>
      </div>

      {/* Test & Tools Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-600 pb-2">
          🧪 Test & Araçlar
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>Not:</strong> Bu endpoint'ler kimlik doğrulama gerektirmez ve API bağlantınızı test etmek için kullanılabilir.
          </p>
        </div>
        <div className="space-y-4">
          {testEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-cozmopol-600 pb-2">
          Ürün Yönetimi
        </h2>
        <div className="space-y-4">
          {productEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Orders Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-cozmopol-600 pb-2">
          Sipariş Yönetimi
        </h2>
        <div className="space-y-4">
          {orderEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Inventory Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-cozmopol-600 pb-2">
          Stok Yönetimi
        </h2>
        <div className="space-y-4">
          {inventoryEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Base URL Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Base URL</h3>
        <code className="text-blue-700 font-mono bg-blue-100 px-3 py-2 rounded">
          https://api.cozmopol.com
        </code>
        <p className="text-blue-700 mt-4 text-sm">
          Tüm API endpoint'leri bu base URL ile başlar. Test ortamı için 
          <code className="bg-blue-100 px-2 py-1 rounded mx-1">https://api-test.cozmopol.com</code> 
          kullanabilirsiniz.
        </p>
      </div>
    </div>
  )
}

export default Endpoints