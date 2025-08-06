import React from 'react'
import EndpointCard from '../components/EndpointCard'

const Endpoints = () => {
  const testEndpoints = [
    {
      method: 'GET',
      path: '/api/test/ping',
      description: 'API bağlantısını test et',
      status: 'stable',
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
      status: 'stable',
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
      status: 'stable',
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
      status: 'development',
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
    },
    {
      method: 'POST',
      path: '/api/auth/token',
      description: 'Vendor olarak giriş yap ve token al',
      status: 'stable',
      parameters: [
        { name: 'storeUserId', type: 'string', required: true, description: 'Mağaza kullanıcı ID\'si' },
        { name: 'apiKey', type: 'string', required: true, description: 'API anahtarı' },
        { name: 'apiSecretKey', type: 'string', required: true, description: 'API gizli anahtarı' }
      ],
      response: `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`,
      example: `curl -X POST \\
  https://api.cozmopol.com/api/auth/token \\
  -H 'Content-Type: application/json' \\
  -d '{
    "storeUserId": "67c1b95d3201a327160dbca2",
    "apiKey": "259aa5b375e08fb26e6e0ebf3f0949ca",
    "apiSecretKey": "720f5664ee414a5047bb130144f1a29cba65130d4e7585f18992421a02e6f065"
  }'`
    }
  ]

  const productEndpoints = [
    {
      method: 'POST',
      path: '/v2/products',
      description: 'Yeni ürün oluştur',
      status: 'development',
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
      path: '/api/products',
      description: 'Tüm ürünleri listele',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'search', type: 'string', required: false, description: 'Ürün başlığında arama yapar' },
        { name: 'brand', type: 'string', required: false, description: 'Marka adına göre filtreler' },
        { name: 'category', type: 'integer', required: false, description: 'Ana kategori ID\'sine göre filtreler' },
        { name: 'subcategory', type: 'integer', required: false, description: 'Alt kategori ID\'sine göre filtreler' },
        { name: 'currency', type: 'string', required: false, description: 'Para birimi (TRY, USD, EUR)' },
        { name: 'status', type: 'boolean', required: false, description: 'Ürün durumu (true: aktif, false: pasif)' },
        { name: 'isVariantProduct', type: 'boolean', required: false, description: 'Varyasyonlu ürün filtresi' },
        { name: 'minPrice', type: 'number', required: false, description: 'Minimum fiyat filtresi' },
        { name: 'maxPrice', type: 'number', required: false, description: 'Maksimum fiyat filtresi' }
      ],
      response: `{
  [
    {
      "id": "67c1bcbb3c56211e5c53289c",
      "title": "Organik Keçiboynuzu Özü 315 gr BABY MG",
      "description": "Keçiboynuzu özü, lif, potasyum, kalsiyum...",
      "brand": "Yeni Marka Adı",
      "currency": "TRY",
      "basePrice": 140,
      "status": true,
      "category": {
        "category": 1219,
        "categoryName": "Süpermarket",
        "subcategoryNames": ["Gıda & İçecek"]
      },
      "variations": [
        {
          "color": "Standart",
          "size": "Standart",
          "stock": 10,
          "price": 150,
          "currency": "TRY",
          "sku": "24343432",
          "barcode": "3432434"
        }
      ],
      "images": [
        {
          "color": "Standart",
          "variationImages": [
            {
              "imageUrl": "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/..."
            }
          ]
        }
      ]
    }
  ]
}`,
      example: `curl -X GET \\
  'https://api.cozmopol.com/api/products?search=keçiboynuzu&brand=Yeni Marka Adı&category=1219&subcategory=1385&currency=TRY&status=true&isVariantProduct=false&minPrice=140&maxPrice=150' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/api/products/{id}',
      description: 'Ürün detayını getir',
      status: 'stable',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Ürün ID\'si (MongoDB ObjectId)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "id": "67c1bcbb3c56211e5c53289c",
  "title": "Organik Keçiboynuzu Özü 315 gr BABY MG",
  "description": "Keçiboynuzu özü, lif, potasyum, kalsiyum, magnezyum ve demir gibi mineraller açısından zengindir...",
  "brand": "Yeni Marka Adı",
  "currency": "TRY",
  "basePrice": 140,
  "status": true,
  "category": {
    "category": 1219,
    "subcategories": [1385, 1408],
    "categoryName": null,
    "subcategoryNames": []
  },
  "availability": {
    "twoDimension": true,
    "threeDimension": false,
    "isInternational": false
  },
  "storeUser": {
    "_id": "67c1b95d3201a327160dbca2",
    "storeUserInformationId": {
      "_id": "67c1b95d3201a327160dbca4",
      "companyName": "Memleket Gurmesi"
    }
  },
  "isVariantProduct": false,
  "variations": [
    {
      "color": "Standart",
      "size": "Standart", 
      "stock": 10,
      "price": 150,
      "discountPrice": null,
      "currency": "TRY",
      "taxRate": 1,
      "sku": "24343432",
      "barcode": "3432434",
      "enabled": true
    }
  ],
  "images": [
    {
      "color": "Standart",
      "variationImages": [
        {
          "imageUrl": "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/67c1bcbb3c56211e5c53289c/1740750012081-image0.jpg"
        }
      ]
    }
  ],
  "metaData": {
    "metaTitle": "Organik Keçiboynuzu Özü 315 gr BABY MG - calvinklein",
    "metaDescription": "Keçiboynuzu özü, lif, potasyum, kalsiyum...",
    "metaUrlSlug": "organik-keiboynuzu-z-315-gr-baby-mg"
  }
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/api/products/67c1bcbb3c56211e5c53289c \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/api/categories',
      description: 'Kategori listesini getir',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  [
    {
      "_id": "67ad9f2b37a30e14e93d7a6b",
      "id": 368,
      "name": "Aksesuar",
      "parentId": null,
      "subCategories": [
        {
          "_id": "6880a6a32113cecfb91c6089",
          "id": 369,
          "name": "Çanta",
          "parentId": 368,
          "subCategories": [
            {
              "id": 370,
              "name": "Kadın Çanta",
              "parentId": 369,
              "subCategories": []
            }
          ]
        }
      ]
    }
  ]
}`,
      example: `curl -X PUT \\
  https://api.cozmopol.com/api/categories \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/api/brands',
      description: 'Marka listesini getir',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: false, description: 'Bearer token (Header) - Opsiyonel' }
      ],
      response: `{
  [
    {
      "_id": "67c06206c03d6bf6a0fbeedb",
      "value": "adidas",
      "label": "Adidas"
    },
    {
      "_id": "67c06206c03d6bf6a0fbeedc", 
      "value": "apple",
      "label": "Apple"
    },
    {
      "_id": "67c06206c03d6bf6a0fbeedd",
      "value": "armani", 
      "label": "Armani"
    }
  ]
}`,
      example: `curl -X DELETE \\
  https://api.cozmopol.com/api/brands`
    }
  ]

  const orderEndpoints = [
    {
      method: 'GET',
      path: '/api/orders',
      description: 'Tüm siparişleri listele',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "data": [
    {
      "id": "67d9250b98a026849af11ea5",
      "status": "webservice_shipment_delivered",
      "createdAt": "2025-03-18T07:47:23.564Z",
      "totalAmount": 170,
      "currency": "TRY",
      "customer": {
        "name": "Sinem Gül Bildik",
        "email": "sinemglbldk54@gmail.com"
      },
      "payment": {
        "paidPrice": 244.99,
        "currency": "TRY",
        "status": "SUCCESS"
      },
      "shipping": {
        "status": "awaiting_shipment",
        "provider": "Kargonomi",
        "trackingNumber": null
      },
      "items": [
        {
          "title": "Gül Reçeli 400 gr MG",
          "brand": "beymen",
          "quantity": 1,
          "price": 170,
          "total": 170,
          "image": "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/67c4be986714469751c60332/1740947096467-image0.jpg",
          "variation": "Standart"
        }
      ]
    },
    {
      "id": "67d89e927ce36855bce105ce",
      "status": "cancelled",
      "createdAt": "2025-03-17T22:13:38.852Z",
      "totalAmount": 60,
      "currency": "TRY",
      "customer": {
        "name": "Bilal Burnaz",
        "email": "burnaz.bilal42@gmail.com"
      },
      "payment": {
        "paidPrice": 134.99,
        "currency": "TRY",
        "status": "SUCCESS"
      },
      "shipping": {
        "status": "awaiting_shipment",
        "provider": "Kargonomi",
        "trackingNumber": null
      },
      "items": [
        {
          "title": "Buğra Peynir Helvası 200 gr",
          "brand": "beymen",
          "quantity": 1,
          "price": 60,
          "total": 60,
          "image": "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/67c4c1386714469751c6036b/1740947769110-image0.jpg",
          "variation": "Standart"
        }
      ]
    }
  ]
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/api/orders \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/api/orders/{id}',
      description: 'Sipariş detayını getir',
      status: 'stable',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Sipariş ID\'si (MongoDB ObjectId)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "data": {
    "id": "67d89c727ce36855bce10598",
    "status": "cancelled",
    "createdAt": "2025-03-17T22:04:34.223Z",
    "totalAmount": 60,
    "currency": "TRY",
    "customer": {
      "name": "Muhammed Enes Kurt",
      "email": "eneskurt5469@gmail.com",
      "phone": ""
    },
    "payment": {
      "paidPrice": 134.99,
      "currency": "TRY",
      "status": "SUCCESS"
    },
    "shipping": {
      "status": "awaiting_shipment",
      "provider": "Kargonomi",
      "trackingNumber": null,
      "deliveryAddressId": {
        "_id": "67d89a3f7ce36855bce10546",
        "firstname": "enes",
        "surname": "kurt",
        "addressTitle": "sakarya arifiye",
        "phoneNumber": "5539488719",
        "addressDetails": "neviye mah melek sk no 4A arifiye sakarya",
        "postalCode": "54540"
      }
    },
    "items": [
      {
        "title": "Buğra Peynir Helvası 200 gr",
        "brand": "beymen",
        "quantity": 1,
        "price": 60,
        "total": 60,
        "image": "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/67c4c1386714469751c6036b/1740947769110-image0.jpg",
        "variation": "Standart"
      }
    ]
  }
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/api/orders/67d89c727ce36855bce10598 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  ]

  const shippingEndpoints = [
    {
      method: 'GET',
      path: '/api/shipping',
      description: 'Kargo şirketlerini listele (Güncellenmiş)',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "data": [
    {
      "id": "67bc84d61c46630458270fdf",
      "name": "Aras Kargo",
      "slug": "aras",
      "kargonomiId": 4
    },
    {
      "id": "67bc84d61c46630458270fe0",
      "name": "Sürat Kargo",
      "slug": "surat",
      "kargonomiId": 5
    },
    {
      "id": "67bc84d61c46630458270fde",
      "name": "Kolay Gelsin",
      "slug": "sendeo",
      "kargonomiId": 3
    },
    {
      "id": "67bc84d61c46630458270fe1",
      "name": "PTT Kargo",
      "slug": "ptt",
      "kargonomiId": 7
    }
  ]
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/api/shipping \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  ]

  const inventoryEndpoints = [
    {
      method: 'PUT',
      path: '/v2/inventory/{product_id}',
      description: 'Stok miktarını güncelle',
      status: 'development',
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
      status: 'development',
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

  const qaEndpoints = [
    {
      method: 'GET',
      path: '/api/questions',
      description: 'Ürünlere gelen soruları listele',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "data": [
    {
      "id": "686295d1c5948b00b525bbd7",
      "question": "selamlar 5 kuruş kaç kuruş",
      "answer": "Thank you for your question! This product comes with a 2-year warranty.",
      "askedAt": "2025-06-30T13:49:05.875Z",
      "answeredAt": "2025-07-22T11:52:02.779Z",
      "isAnswered": true,
      "user": {
        "id": "67c01eef9d1c025922091bc2",
        "name": "Sinan Karataş",
        "username": "stone",
        "profilePicture": "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/profile-pictures/67c01eef9d1c025922091bc2/1750163700328_67c01eef9d1c025922091bc2"
      },
      "product": {
        "id": "67c1bcbb3c56211e5c53289c",
        "title": "Organik Keçiboynuzu Özü 315 gr BABY MG",
        "image": "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/67c1bcbb3c56211e5c53289c/1740750012081-image0.jpg"
      }
    },
    {
      "id": "685ef564c5948b00b525bbd7",
      "question": "asdasfsdgdfhdfh",
      "answer": null,
      "askedAt": "2025-06-27T19:47:48.769Z",
      "answeredAt": null,
      "isAnswered": false,
      "user": {
        "id": "67c01eef9d1c025922091bc2",
        "name": "Sinan Karataş",
        "username": "stone",
        "profilePicture": "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/profile-pictures/67c01eef9d1c025922091bc2/1750163700328_67c01eef9d1c025922091bc2"
      },
      "product": {
        "id": "67c1bcbb3c56211e5c53289c",
        "title": "Organik Keçiboynuzu Özü 315 gr BABY MG",
        "image": "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/67c1bcbb3c56211e5c53289c/1740750012081-image0.jpg"
      }
    }
  ],
  "meta": {
    "totalCount": 9
  }
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/api/questions \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'PATCH',
      path: '/api/questions/{id}/answer',
      description: 'Soruya cevap ver',
      status: 'stable',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Soru ID\'si (MongoDB ObjectId)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'answer', type: 'string', required: true, description: 'Cevap metni' }
      ],
      response: `{
  "message": "Answer saved successfully",
  "data": {
    "id": "686295d1c5948b00b525bbd7",
    "answer": "Evet, ürünün içeriğinde katkı maddesi bulunmamaktadır.",
    "answeredAt": "2025-08-06T15:06:31.777Z",
    "isAnswered": true
  }
}`,
      example: `curl -X PATCH \\
  https://api.cozmopol.com/api/questions/686295d1c5948b00b525bbd7/answer \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "answer": "Evet, ürünün içeriğinde katkı maddesi bulunmamaktadır."
  }'`
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
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>✅ Stable:</strong> Bu endpoint'ler tamamen geliştirilmiş ve production'da kullanıma hazırdır. Kimlik doğrulama gerektirmez.
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
          📦 Ürün Yönetimi
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Bu endpoint'ler production'da kullanıma hazırdır. Güvenle kullanabilirsiniz.
          </p>
        </div>
        <div className="space-y-4">
          {productEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Orders Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-cozmopol-600 pb-2">
          📋 Sipariş Yönetimi
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Bu endpoint'ler production'da kullanıma hazırdır. Güvenle kullanabilirsiniz.
          </p>
        </div>
        <div className="space-y-4">
          {orderEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Shipping Management Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-cozmopol-600 pb-2">
          🚚 Kargo Yönetimi
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Bu endpoint'ler production'da kullanıma hazırdır. Güvenle kullanabilirsiniz.
          </p>
        </div>
        <div className="space-y-4">
          {shippingEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Inventory Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-cozmopol-600 pb-2">
          📊 Stok Yönetimi
        </h2>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <p className="text-orange-800 text-sm">
            <strong>🔧 Geliştiriliyor:</strong> Bu endpoint'ler aktif geliştirme aşamasındadır. Değişiklikler olabilir.
          </p>
        </div>
        <div className="space-y-4">
          {inventoryEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Q&A Management Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-cozmopol-600 pb-2">
          💬 Soru & Cevap Yönetimi
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Bu endpoint'ler production'da kullanıma hazırdır. Güvenle kullanabilirsiniz.
          </p>
        </div>
        <div className="space-y-4">
          {qaEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Base URL Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <code className="text-blue-700 font-mono bg-blue-100 px-3 py-2 rounded">
          https://backend-integration-mauve.vercel.app
        </code>
        <p className="text-blue-700 mt-4 text-sm">
          <code className="bg-blue-100 px-2 py-1 rounded mx-1">https://backend-integration-mauve.vercel.app</code> 
          kullanabilirsiniz.
        </p>
      </div>
    </div>
  )
}

export default Endpoints