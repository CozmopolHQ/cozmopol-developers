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
      "status": "confirmed",
      "createdAt": "2024-01-15T10:30:00Z",
      "totalAmount": 299.99,
      "currency": "TRY",
      "customer": {
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "payment": {
        "paidPrice": 299.99,
        "currency": "TRY",
        "status": "SUCCESS"
      },
      "shipping": {
        "status": "shipped",
        "provider": "Aras Kargo",
        "trackingNumber": null
      },
      "items": [
        {
          "title": "Premium Kulaklık",
          "brand": "TechBrand",
          "quantity": 1,
          "price": 299.99,
          "total": 299.99,
          "image": "https://example.com/headphones.jpg",
          "variation": "Standart"
        }
      ]
    },
    {
      "id": "67d89e927ce36855bce105ce", 
      "status": "pending",
      "createdAt": "2024-01-14T15:20:00Z",
      "totalAmount": 149.99,
      "currency": "TRY",
      "customer": {
        "name": "Jane Smith",
        "email": "jane.smith@example.com"
      },
      "payment": {
        "paidPrice": 149.99,
        "currency": "TRY",
        "status": "SUCCESS"
      },
      "shipping": {
        "status": "awaiting_shipment",
        "provider": "Sürat Kargo",
        "trackingNumber": null
      },
      "items": [
        {
          "title": "Wireless Mouse",
          "brand": "TechBrand",
          "quantity": 1,
          "price": 149.99,
          "total": 149.99,
          "image": "https://example.com/mouse.jpg",
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
    "status": "confirmed",
    "createdAt": "2024-01-15T14:30:00Z",
    "totalAmount": 199.99,
    "currency": "TRY",
    "customer": {
      "name": "Michael Johnson",
      "email": "michael.johnson@example.com",
      "phone": "+90 555 123 4567"
    },
    "payment": {
      "paidPrice": 199.99,
      "currency": "TRY",
      "status": "SUCCESS"
    },
    "shipping": {
      "status": "shipped",
      "provider": "Aras Kargo",
      "trackingNumber": null,
      "deliveryAddressId": {
        "_id": "67d89a3f7ce36855bce10546", 
        "firstname": "Michael",
        "surname": "Johnson",
        "addressTitle": "Ev Adresi",
        "phoneNumber": "5551234567",
        "addressDetails": "Örnek Mahallesi, Örnek Sokak No:123 Kadıköy/İstanbul",
        "postalCode": "34710"
      }
    },
    "items": [
      {
        "title": "Gaming Keyboard",
        "brand": "TechBrand",
        "quantity": 1,
        "price": 199.99,
        "total": 199.99,
        "image": "https://example.com/keyboard.jpg",
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
      "question": "Bu ürünün garantisi var mı?",
      "answer": "Evet, bu ürün 2 yıl garantili olarak satılmaktadır.",
      "askedAt": "2024-01-10T10:30:00Z",
      "answeredAt": "2024-01-10T14:15:00Z",
      "isAnswered": true,
      "user": {
        "id": "67c01eef9d1c025922091bc2", 
        "name": "Alex Wilson",
        "username": "alexw",
        "profilePicture": "https://example.com/avatar1.jpg"
      },
      "product": {
        "id": "67c1bcbb3c56211e5c53289c", 
        "title": "Premium Kulaklık",
        "image": "https://example.com/headphones.jpg"
      }
    },
    {
      "id": "685ef564c5948b00b525bbd7", 
      "question": "Kargo ücreti ne kadar?",
      "answer": null,
      "askedAt": "2024-01-12T16:20:00Z",
      "answeredAt": null,
      "isAnswered": false,
      "user": {
        "id": "67c01eef9d1c025922091bc2", 
        "name": "Sarah Davis",
        "username": "sarahd",
        "profilePicture": "https://example.com/avatar2.jpg"
      },
      "product": {
        "id": "67c1bcbb3c56211e5c53289c", 
        "title": "Premium Kulaklık",
        "image": "https://example.com/headphones.jpg"
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
    "answer": "Ürün tamamen doğal içeriklerden üretilmiştir.",
    "answeredAt": "2024-01-15T09:30:00Z",
    "isAnswered": true
  }
}`,
      example: `curl -X PATCH \\
  https://api.cozmopol.com/api/questions/686295d1c5948b00b525bbd7/answer \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "answer": "Ürün tamamen doğal içeriklerden üretilmiştir."
  }'`
    }
  ]

  const returnEndpoints = [
    {
      method: 'GET',
      path: '/v2/returns',
      description: 'İade taleplerini listele',
      status: 'development',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'status', type: 'string', required: false, description: 'İade durumu (pending, approved, rejected, completed)' },
        { name: 'order_id', type: 'string', required: false, description: 'Sipariş ID\'sine göre filtrele' },
        { name: 'page', type: 'integer', required: false, description: 'Sayfa numarası' },
        { name: 'limit', type: 'integer', required: false, description: 'Sayfa başına öğe sayısı' }
      ],
      response: `{
  "data": [
    {
      "id": "67e1234567890abcdef12345",
      "order_id": "67d9250b98a026849af11ea5",
      "order_number": "ORD-2024-001",
      "status": "pending",
      "reason": "Ürün hasarlı geldi",
      "description": "Kutu açıldığında ürünün ekranında çizik vardı",
      "return_type": "refund",
      "requested_amount": 299.99,
      "approved_amount": null,
      "customer": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+90 555 123 4567"
      },
      "items": [
        {
          "product_id": "67c1bcbb3c56211e5c53289c",
          "title": "Premium Kulaklık",
          "quantity": 1,
          "unit_price": 299.99,
          "total_price": 299.99,
          "return_quantity": 1
        }
      ],
      "images": [
        "https://example.com/return-image1.jpg",
        "https://example.com/return-image2.jpg"
      ],
      "created_at": "2024-01-20T14:30:00Z",
      "updated_at": "2024-01-20T14:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "total_items": 25,
    "per_page": 10
  }
}`,
      example: `curl -X GET \\
  'https://api.cozmopol.com/v2/returns?status=pending&page=1&limit=10' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/v2/returns/{id}',
      description: 'İade talebi detayını getir',
      status: 'development',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'İade talebi ID\'si (MongoDB ObjectId)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "data": {
    "id": "67e1234567890abcdef12345",
    "order_id": "67d9250b98a026849af11ea5",
    "order_number": "ORD-2024-001",
    "status": "approved",
    "reason": "Ürün hasarlı geldi",
    "description": "Kutu açıldığında ürünün ekranında çizik vardı",
    "return_type": "refund",
    "requested_amount": 299.99,
    "approved_amount": 299.99,
    "refund_method": "original_payment",
    "tracking_number": "TR123456789",
    "customer": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+90 555 123 4567"
    },
    "items": [
      {
        "product_id": "67c1bcbb3c56211e5c53289c",
        "title": "Premium Kulaklık",
        "quantity": 1,
        "unit_price": 299.99,
        "total_price": 299.99,
        "return_quantity": 1,
        "condition": "damaged"
      }
    ],
    "images": [
      "https://example.com/return-image1.jpg",
      "https://example.com/return-image2.jpg"
    ],
    "timeline": [
      {
        "status": "pending",
        "timestamp": "2024-01-20T14:30:00Z",
        "note": "İade talebi oluşturuldu"
      },
      {
        "status": "approved",
        "timestamp": "2024-01-21T09:15:00Z",
        "note": "İade talebi onaylandı"
      }
    ],
    "created_at": "2024-01-20T14:30:00Z",
    "updated_at": "2024-01-21T09:15:00Z"
  }
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/v2/returns/67e1234567890abcdef12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'PATCH',
      path: '/v2/returns/{id}/status',
      description: 'İade talebi durumunu güncelle',
      status: 'development',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'İade talebi ID\'si (MongoDB ObjectId)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'status', type: 'string', required: true, description: 'Yeni durum (approved, rejected, completed)' },
        { name: 'approved_amount', type: 'number', required: false, description: 'Onaylanan iade tutarı' },
        { name: 'rejection_reason', type: 'string', required: false, description: 'Red nedeni (status=rejected ise zorunlu)' },
        { name: 'admin_note', type: 'string', required: false, description: 'Yönetici notu' }
      ],
      response: `{
  "success": true,
  "message": "Return status updated successfully",
  "data": {
    "id": "67e1234567890abcdef12345",
    "status": "approved",
    "approved_amount": 299.99,
    "admin_note": "Ürün hasarı doğrulandı, iade onaylandı",
    "updated_at": "2024-01-21T09:15:00Z"
  }
}`,
      example: `curl -X PATCH \\
  https://api.cozmopol.com/v2/returns/67e1234567890abcdef12345/status \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "status": "approved",
    "approved_amount": 299.99,
    "admin_note": "Ürün hasarı doğrulandı, iade onaylandı"
  }'`
    }
  ]

  const invoiceEndpoints = [
    {
      method: 'GET',
      path: '/v2/invoices',
      description: 'Fatura listesini getir',
      status: 'development',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'order_id', type: 'string', required: false, description: 'Sipariş ID\'sine göre filtrele' },
        { name: 'status', type: 'string', required: false, description: 'Fatura durumu (draft, sent, paid, overdue, cancelled)' },
        { name: 'start_date', type: 'string', required: false, description: 'Başlangıç tarihi (YYYY-MM-DD)' },
        { name: 'end_date', type: 'string', required: false, description: 'Bitiş tarihi (YYYY-MM-DD)' },
        { name: 'page', type: 'integer', required: false, description: 'Sayfa numarası' },
        { name: 'limit', type: 'integer', required: false, description: 'Sayfa başına öğe sayısı' }
      ],
      response: `{
  "data": [
    {
      "id": "67f1234567890abcdef12345",
      "invoice_number": "INV-2024-001",
      "order_id": "67d9250b98a026849af11ea5",
      "order_number": "ORD-2024-001",
      "status": "paid",
      "invoice_type": "sales",
      "issue_date": "2024-01-15T00:00:00Z",
      "due_date": "2024-01-30T00:00:00Z",
      "paid_date": "2024-01-18T14:30:00Z",
      "currency": "TRY",
      "subtotal": 254.23,
      "tax_amount": 45.76,
      "total_amount": 299.99,
      "customer": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "tax_number": "1234567890",
        "address": {
          "street": "Örnek Mahallesi, Örnek Sokak No:123",
          "city": "İstanbul",
          "postal_code": "34710",
          "country": "Turkey"
        }
      },
      "items": [
        {
          "product_id": "67c1bcbb3c56211e5c53289c",
          "title": "Premium Kulaklık",
          "quantity": 1,
          "unit_price": 254.23,
          "tax_rate": 18,
          "tax_amount": 45.76,
          "total": 299.99
        }
      ],
      "payment_info": {
        "method": "credit_card",
        "transaction_id": "TXN123456789",
        "paid_amount": 299.99
      },
      "pdf_url": "https://api.cozmopol.com/invoices/67f1234567890abcdef12345/pdf",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-18T14:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 48,
    "per_page": 10
  }
}`,
      example: `curl -X GET \\
  'https://api.cozmopol.com/v2/invoices?status=paid&start_date=2024-01-01&end_date=2024-01-31' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/v2/invoices/{id}',
      description: 'Fatura detayını getir',
      status: 'development',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Fatura ID\'si (MongoDB ObjectId)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "data": {
    "id": "67f1234567890abcdef12345",
    "invoice_number": "INV-2024-001",
    "order_id": "67d9250b98a026849af11ea5",
    "order_number": "ORD-2024-001",
    "status": "paid",
    "invoice_type": "sales",
    "issue_date": "2024-01-15T00:00:00Z",
    "due_date": "2024-01-30T00:00:00Z",
    "paid_date": "2024-01-18T14:30:00Z",
    "currency": "TRY",
    "subtotal": 254.23,
    "tax_amount": 45.76,
    "discount_amount": 0,
    "shipping_amount": 0,
    "total_amount": 299.99,
    "customer": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+90 555 123 4567",
      "tax_number": "1234567890",
      "tax_office": "Kadıköy Vergi Dairesi",
      "address": {
        "street": "Örnek Mahallesi, Örnek Sokak No:123",
        "district": "Kadıköy",
        "city": "İstanbul",
        "postal_code": "34710",
        "country": "Turkey"
      }
    },
    "vendor": {
      "company_name": "Cozmopol Pazaryeri",
      "tax_number": "9876543210",
      "tax_office": "Beşiktaş Vergi Dairesi",
      "address": {
        "street": "Vendor Mahallesi, Vendor Sokak No:456",
        "district": "Beşiktaş",
        "city": "İstanbul",
        "postal_code": "34349",
        "country": "Turkey"
      }
    },
    "items": [
      {
        "product_id": "67c1bcbb3c56211e5c53289c",
        "title": "Premium Kulaklık",
        "description": "Yüksek kaliteli wireless kulaklık",
        "quantity": 1,
        "unit_price": 254.23,
        "tax_rate": 18,
        "tax_amount": 45.76,
        "line_total": 299.99
      }
    ],
    "payment_info": {
      "method": "credit_card",
      "transaction_id": "TXN123456789",
      "paid_amount": 299.99,
      "payment_date": "2024-01-18T14:30:00Z"
    },
    "pdf_url": "https://api.cozmopol.com/invoices/67f1234567890abcdef12345/pdf",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-18T14:30:00Z"
  }
}`,
      example: `curl -X GET \\
  https://api.cozmopol.com/v2/invoices/67f1234567890abcdef12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/v2/invoices/{id}/pdf',
      description: 'Fatura PDF\'ini indir',
      status: 'development',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Fatura ID\'si (MongoDB ObjectId)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `Content-Type: application/pdf
Content-Disposition: attachment; filename="INV-2024-001.pdf"

[PDF Binary Content]`,
      example: `curl -X GET \\
  https://api.cozmopol.com/v2/invoices/67f1234567890abcdef12345/pdf \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -o invoice.pdf`
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
      <section id="test-tools" className="mb-16">
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
      <section id="products" className="mb-16">
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
      <section id="orders" className="mb-16">
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
      <section id="shipping" className="mb-16">
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
      <section id="inventory" className="mb-16">
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
      <section id="qa" className="mb-16">
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

      {/* Returns Management Section */}
      <section id="returns" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-cozmopol-600 pb-2">
          🔄 İade Talepleri
        </h2>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <p className="text-orange-800 text-sm">
            <strong>🔧 Geliştiriliyor:</strong> Bu endpoint'ler aktif geliştirme aşamasındadır. Değişiklikler olabilir.
          </p>
        </div>
        <div className="space-y-4">
          {returnEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Invoice Management Section */}
      <section id="invoices" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-cozmopol-600 pb-2">
          🧾 Fatura Yönetimi
        </h2>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <p className="text-orange-800 text-sm">
            <strong>🔧 Geliştiriliyor:</strong> Bu endpoint'ler aktif geliştirme aşamasındadır. Değişiklikler olabilir.
          </p>
        </div>
        <div className="space-y-4">
          {invoiceEndpoints.map((endpoint, index) => (
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