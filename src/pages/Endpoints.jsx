import React from 'react'
import EndpointCard from '../components/EndpointCard'
import { BASE_URL } from '../config'

const Endpoints = () => {
  const testEndpoints = [
    {
      method: 'GET',
      path: '/test/ping',
      description: 'API bağlantısını test et',
      status: 'stable',
      parameters: [],
      response: `{
  "message": "pong"
}`,
      example: `curl -X GET \\
  ${BASE_URL}/test/ping \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/test/version',
      description: 'API versiyonunu getir',
      status: 'stable',
      parameters: [],
      response: `{
  "version": "1.0.0"
}`,
      example: `curl -X GET \\
  ${BASE_URL}/test/version \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/health',
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
  ${BASE_URL}/health \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'POST',
      path: '/test/webhook',
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
  ${BASE_URL}/test/webhook \\
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
      path: '/auth/token',
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
  ${BASE_URL}/auth/token \\
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
      path: '/products',
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
  ${BASE_URL}/products \\
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
      path: '/products',
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
  '${BASE_URL}/products?search=keçiboynuzu&brand=Yeni Marka Adı&category=1219&subcategory=1385&currency=TRY&status=true&isVariantProduct=false&minPrice=140&maxPrice=150' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/products/{id}',
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
  ${BASE_URL}/products/67c1bcbb3c56211e5c53289c \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/categories',
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
  ${BASE_URL}/categories \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/brands',
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
  ${BASE_URL}/brands`
    }
  ]

  const orderEndpoints = [
    {
      method: 'GET',
      path: '/orders',
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
  ${BASE_URL}/orders \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/orders/{id}',
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
  ${BASE_URL}/orders/67d89c727ce36855bce10598 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  ]

  const shippingEndpoints = [
    {
      method: 'GET',
      path: '/shipping',
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
  ${BASE_URL}/shipping \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  ]

  const inventoryEndpoints = [
    {
      method: 'PUT',
      path: '/inventory/{product_id}',
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
  ${BASE_URL}/inventory/12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "quantity": 75,
    "operation": "set"
  }'`
    },
    {
      method: 'GET',
      path: '/inventory/low-stock',
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
  '${BASE_URL}/inventory/low-stock?threshold=10' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    }
  ]

  const qaEndpoints = [
    {
      method: 'GET',
      path: '/questions',
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
  ${BASE_URL}/questions \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'PATCH',
      path: '/questions/{id}/answer',
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
  ${BASE_URL}/questions/686295d1c5948b00b525bbd7/answer \\
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
      path: '/user/returns',
      description: 'İade taleplerini listele',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'status', type: 'string', required: false, description: 'İade durumu (pending, approved, rejected, completed)' },
        { name: 'orderId', type: 'string', required: false, description: 'Sipariş ID\'sine göre filtrele' },
        { name: 'limit', type: 'integer', required: false, description: 'Sayfa başına öğe sayısı (varsayılan: 10)' },
        { name: 'skip', type: 'integer', required: false, description: 'Atlanacak öğe sayısı (varsayılan: 0)' }
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
  '${BASE_URL}/user/returns?status=pending&limit=10&skip=0' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/user/returns/:id',
      description: 'İade talebi detayını getir',
      status: 'stable',
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
  ${BASE_URL}/user/returns/67e1234567890abcdef12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'PATCH',
      path: '/user/returns/:id/status',
      description: 'İade talebi durumunu güncelle',
      status: 'stable',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'İade talebi ID\'si (MongoDB ObjectId)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'status', type: 'string', required: true, description: 'Yeni durum (approved)' },
        { name: 'note', type: 'string', required: false, description: 'İade notu' }
      ],
      response: `{
  "success": true,
  "message": "Return status updated successfully",
  "data": {
    "id": "67e1234567890abcdef12345",
    "status": "approved",
    "note": "Return accepted",
    "updated_at": "2024-01-21T09:15:00Z"
  }
}`,
      example: `curl -X PATCH \\
  ${BASE_URL}/user/returns/67e1234567890abcdef12345/status \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "status": "approved",
    "note": "Return accepted"
  }'`
    }
  ]

  const integrationAuthEndpoints = [
    {
      method: 'POST',
      path: '/integration/auth/login',
      description: 'Get Access Key',
      status: 'stable',
      parameters: [
        { name: 'sellerId', type: 'string', required: true, description: 'Satıcı ID' },
        { name: 'apiKey', type: 'string', required: true, description: 'API Anahtarı' },
        { name: 'apiSecretKey', type: 'string', required: true, description: 'API Gizli Anahtarı' }
      ],
      response: `{
    "success": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTY4YzllMzIyY2VlYTI0Y2I5Y2MwNDQiLCJnIjoic2VsbGVyIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc2ODgyMDY1NSwiZXhwIjoxNzcxNDEyNjU1fQ.8LjIbwRZClxw3uUb1ahicQzYlBDt-1u6VVm1oEJvZlY",
    "tokenType": "Bearer",
    "expiresIn": "30d"
}`,
      example: `curl -X POST \\
  ${BASE_URL}/integration/auth/login \\
  -H 'Content-Type: application/json' \\
  -d '{
    "sellerId": "6968c77222ceea24cb9cbfec",
    "apiKey": "7b8c71c09ee28e389091e288633c2085",
    "apiSecretKey": "814327462ce242265a16e064ede7458477f0acecf41f60805af5855d427d440b"
  }'`
    }
  ]

  const categoryBrandEndpoints = [
    {
      method: 'GET',
      path: '/store/brands',
      description: 'Tüm markaları listele (Integration API)',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `[
  {
    "_id": "0000000000000000000f4404",
    "value": "7artisans",
    "label": "7Artisans"
  },
  {
    "_id": "0000000000000000000f4315",
    "value": "akg",
    "label": "AKG"
  },
  {
    "_id": "0000000000000000000f424c",
    "value": "amd",
    "label": "AMD"
  },
  {
    "_id": "0000000000000000000f4398",
    "value": "aorus",
    "label": "AORUS"
  },
  {
    "_id": "0000000000000000000f4390",
    "value": "asrock",
    "label": "ASRock"
  },
  {
    "_id": "0000000000000000000f4383",
    "value": "asusrog",
    "label": "ASUS ROG"
  },
  {
    "_id": "0000000000000000000f4397",
    "value": "asustuf",
    "label": "ASUS TUF"
  }
]`,
      example: `curl -X GET \\
  ${BASE_URL}/store/brands \\
  -H 'Authorization: Bearer YOUR_TOKEN'`
    },
    {
      method: 'GET',
      path: '/common/product-categories',
      description: 'Ürün kategorilerini listele',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": 368,
      "name": "Aksesuar",
      "parentId": null,
      "isLeaf": false,
      "path": [368],
      "fullPathName": "Aksesuar",
      "isActive": true,
      "commission": 0,
      "vatRate": 0,
      "isReturnable": true
    }
  ]
}`,
      example: `curl -X GET \\
  ${BASE_URL}/common/product-categories \\
  -H 'Authorization: Bearer YOUR_TOKEN'`
    },
    {
      method: 'GET',
      path: '/common/product-categories/:categoryId/attributes',
      description: 'Kategori özelliklerini getir',
      status: 'stable',
      parameters: [
        { name: 'categoryId', type: 'integer', required: true, description: 'Kategori ID\'si' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "success": true,
  "data": {
    "slicerAttributes": [
      {
        "attributeId": 249,
        "attributeName": "SSD Kapasitesi",
        "required": true,
        "allowCustom": false,
        "values": [
          {
            "id": 3379,
            "name": "512 GB"
          }
        ]
      }
    ],
    "commonAttributes": [
      {
        "attributeId": 131,
        "attributeName": "Ekran Kartı Hafızası",
        "required": false,
        "allowCustom": false,
        "values": [
          {
            "id": 10576991,
            "name": "48 GB"
          }
        ]
      }
    ]
  }
}`,
      example: `curl -X GET \\
  ${BASE_URL}/common/product-categories/1583/attributes \\
  -H 'Authorization: Bearer YOUR_TOKEN'`
    }
  ]

  const productManagementEndpoints = [
    {
      method: 'POST',
      path: '/store/productsV2/product/bulk',
      description: 'Toplu ürün oluştur',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'products', type: 'array', required: true, description: 'Ürün listesi' }
      ],
      response: `{
    "success": true,
    "batchRequestId": "09b3ff84-5993-4946-b1ec-2a4a9d8820f5"
}`,
      example: `curl -X POST \\
  ${BASE_URL}/store/productsV2/product/bulk \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '[
    {
        "categoryId": 1583,
        "brandId": "6943bbfd7c5c681734bec174",
        "brandName": "Apple",
        "description": "MBA 15 SKY/10C GPU/16GB/256GB-TUR",
        "modelCode": "test-test123-12366",
        "commonAttributes": [
            {
                "attributeId": 131,
                "attributeName": "Ekran Kartı Hafızası",
                "valueId": 10576991,
                "valueName": "48 GB"
            },
            {
                "attributeId": 210,
                "attributeName": "Dokunmatik Ekran",
                "valueId": 22196,
                "valueName": "Yok"
            },
            {
                "attributeId": 83,
                "attributeName": "Bağlantılar",
                "valueId": 1220630,
                "valueName": "USB-C"
            },
            {
                "attributeId": 23,
                "attributeName": "Ekran Boyutu",
                "valueId": 1194094,
                "valueName": "14,5 inç"
            },
            {
                "attributeId": 426,
                "attributeName": "İşlemci Modeli",
                "valueId": 10623885,
                "valueName": "225"
            },
            {
                "attributeId": 290,
                "attributeName": "Garanti Tipi",
                "valueId": 10623885,
                "valueName": "225"
            },
            {
                "attributeId": 168,
                "attributeName": "İşlemci Tipi",
                "valueId": 10646403,
                "valueName": "Apple M5 Pro"
            },
            {
                "attributeId": 315,
                "attributeName": "Çözünürlük Standartı",
                "valueId": 1223796,
                "valueName": "2.5K"
            },
            {
                "attributeId": 103,
                "attributeName": "Cihaz Ağırlığı",
                "valueId": 1612,
                "valueName": "2 - 4 kg"
            },
            {
                "attributeId": 433,
                "attributeName": "Garanti Süresi",
                "valueId": 352824,
                "valueName": "4 Ay"
            },
            {
                "attributeId": 354,
                "attributeName": "Klavye",
                "valueId": 1211140,
                "valueName": "Q Türkçe (Aydınlatmasız)"
            },
            {
                "attributeId": 306,
                "attributeName": "Ekran Kartı Bellek Tipi",
                "valueId": 3094,
                "valueName": "DDR5"
            },
            {
                "attributeId": 859,
                "attributeName": "Maksimum İşlemci Hızı (GHz)",
                "valueId": 4182,
                "valueName": "İthalatçı Garantili"
            },
            {
                "attributeId": 47,
                "attributeName": "Renk",
                "valueId": 10620526,
                "valueName": "Bej"
            },
            {
                "attributeId": 110,
                "attributeName": "Çözünürlük",
                "valueId": 10626851,
                "valueName": "2880 x 1864"
            },
            {
                "attributeId": 28,
                "attributeName": "İşletim Sistemi",
                "valueId": 831,
                "valueName": "Mac Os"
            },
     
        ],
        "contents": [
            {
                "slicerAttribute": [
                    {
                        "attributeId": 249,
                        "attributeName": "SSD Kapasitesi",
                        "valueId": 1183806,
                        "valueName": "960 GB"
                    },
                    {
                        "attributeId": 232,
                        "attributeName": "Ram (Sistem Belleği)",
                        "valueId": 4016,
                        "valueName": "64 GB"
                    }
                ],
                "title": "MacBook Air: Apple M4 chip with 10-core CPU and 10-core GPU 960GB SSD-64GB RAM",
                "images": [
                    {
                        "url": "data:image/webp;base64,UklGRqoBAQBXRUJQVlA4IJ4BAQCQ8ASdASqwBAgHPlEokUajorIwIZM5CkAKCWdu/6Q4rip..."
                    }
                ],
                "variants": [
                    {
                        "sku": "test-sku-1235666",
                        "barcode": "8682458451266",
                        "varianterAttribute": {},
                        "price": 60.499,
                        "quantity": 100
                    }
                ]
            },
            {
                "slicerAttribute": [
                    {
                        "attributeId": 249,
                        "attributeName": "SSD Kapasitesi",
                        "valueId": 3379,
                        "valueName": "512 GB"
                    },
                    {
                        "attributeId": 232,
                        "attributeName": "Ram (Sistem Belleği)",
                        "valueId": 4014,
                        "valueName": "32 GB"
                    }
                ],
                "title": "MacBook Air: Apple M4 chip with 10-core CPU and 10-core GPU 512GB SSD-32GB RAM",
                "images": [
                    {
                        "url": "data:image/webp;base64,UklGRqoBAQBXRUJQVlA4IJ4BAQCQ8ASdASqwBAgHPlEokUajorIwIZM5CkAKCWdu/6Q4ripHHitplvA7z0/K8N9rv8VxkkjeaymSd9eu0r4G/MD1LuILc49EH8+/y3QzY52+AU0/+9ur7H+tyK3mHxqz7+Fv/F2TdueYk+B/2P2793/8q/4vsDfs96pf+3+6XwH/d71Rf2H/a/ul70H/V/dj3of5X/lfuH8DP9w/3H/69vP/ff///6fDL+0H///7vwi/rB////L7u3/T/ej/x/Lv+5n70fEJ/Rv8///v+1///gA/f/s3+wk/+Pnb+b/4f/H8O/S582+lv+t8b/8Pn3+J/0fNX+fflj+H/lPbZ/l/+X/O+Tfzc/3P9B+UvyI/ln9R/1v99/dX/G/ux9ssWfUT/1f6/2GvgT7V/vP8J/oP2q+Uf9X/tejn8z/uf+9/mPxx+wX+8/37/k+Wd4dvqX7W/AR/Uv79/4v8p7v/9n/7P9X/uv3c96P6z/m//T/l/9f8kf9I/vX/P/w3+a98b7//qT+5X/j94X9mP+5+f4fhA+a+G3Vj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdP+IbYaAsv781pNx3Ph/w2OyaaTmjUqqVSqVSqVSqVSqVSqVSqVSqVSqVSqVSqVSqVSqVSqVSqUOuliJw6lFo6lY92IdSse7EOpQF8etJ/8nsdSGpC+RHcnKUq0Eaj9F4JwusZzRbNPKybiWafXYwp/X9OtSSonBvf47S6aZwcp5GLdV0NiBWc5mjL/JGrnV0y3nQ/y7KkU7i35TZGcM++tvmUXnm+Kva6SQJt2CitegGDq3P7p6WoDBTbuIWHAKVuKPQT43udGi4l92EtjgOHQm+yPOwyWHuJj0ua+G3Vj3Yh1KwrSKTwwGM35+vi4J3xdo9rCJJW5VoxFnQmOmu6UhqBv2LTci0CWQPo3mSvf4/MxdDDA0YzTram4XyyUS+7QXgEcDARGxpr/3iCDMMHHYHbWiE1OBrgMPAFed8eX/kgBIRhjXHYA8jqgCh3pF4qLWGdzQTkkHmyBm8PfYJSF1L+dkqbLWrBxZJgjCW2ogGorAzSKqzVdMISsNwVk84GkpJn4UAQmvht1Y92IdSse6U5X05myVIZfQTT5s1J/tCD77YXLIdo0cbLm1nATTA6JfVY9+GoGAjQox5q2FMmCRDz8vE93FVCOTfpRjBSsEecxoZuUzqBhfpfpxZMVgfeehCUH84xZMDxUZHTDpv+jIO+LXNcaxM4Z3ax3TyLJn6+SRFgfWLqJ9n0SSJ+Hf2dOVOCjDDu1gSenHYYQ5a8AVREY3HCEpDZzJlxO1c46GbF/yDugc1ZHltpgu0kDTdt7nqTnUrHuxDqVj3Yh1GonT3idhZYcS+jDQbS6ehlgT8uQbv+tUsfsQ/qWgPnT2Jqkzn3gAooAE9RKIOqut7gkr/QS/rhElTseQatbeCytthgaDY7UNJmOpRc9a3h6jKb+BbuVzW4nCyDnYRqC0vxRfNhAo8zXhe01GYEnsxi6xlrf7q8izmhsIEzeRFMaQN5asXbENy0zdAx9xGOJbi6seMn/gxBHF9dmaxLD7IWGjo0BpBB+UeWEdLHKoSPfC7mjYhMEOY7bX35NqWt8V+KcYG6vp2LvV3GPdiHUrHuxDqVlCWpSzc0FMZUyI5cWW6oqT+z7ppptUmE4gT9gA//8V7KCuq+FkMNnx9JRbQsbVKc9dQqpYe6VdC1umk3rARTMXDIeGqb95LTB6XrelOFjz0GFznPj0FsPjI+nE4yiPHEGNCyMr2zRIq7iOLlsRV9vcY7iCUGYJL7xRl5yZb9RJMKCJj4pZd7kPABnfigY75g9OSbac1Jpd+LVVBIaDtc/G+g/Yco1YFRT564Qx7fM6QMZOHSvXkfmTATWpWPdiHUrHuxDq94/nT8CQrxT+L5O9sDdjShgn4BZqgiCCmvVkij/2LnUcUVNRKQFcLjhc7Oy/WQFnv1bQxgt9+w65CiJNYz+tgxc921jp6EEW6olnCIa+X5XIU57dIPJXAtESu0Bs4ImUwO/Skw73pd9mMhRIGyJ9RQCghvqNUFVSfoKjR1kB40f4ErDFn+LbWMlwbYX/CVqIyodhQB+/7DfcrSgJwXV32uTWYR2dCkMnRI6buo4YMBmej8uQJt9ywo1i71dxj3Yh1Kx7sQ6lZQk8lsw1xtwv94XOYgubYTx9bYUFDqGSwvU97FxpbWW1HcqZz6wscj/ubIO4RZwYZ+2uyhOAOEO/GxCjSybyp+kAHP4bdlDLyoOrtnS4hR+u7k+Xe0RarqHpDXhwuBLObWjKbKU8I0Xn8XggVDbTuOgCyvuZsetGQNWDBQK5jezwbV9ahkSE4IGPtWxMWOAQPGJymL4K7XymcQ1q/l0cGUEd6ryDdJ4iniO/aRtOBhODd8iP4Ym1cSPlm+RLoVXUwoWUJJZ6I4WUzpj5r4bdWPdiHUrH53aBvV5Kr0QEW7Fev4UVbwSWIJIA0sdGA85tzIgux3+Ar98amPA3W0xZXTX+bS8A0xlaTZqmroOpi9JuSDhN8LMToAMUalgYJ0SJhhww4ND//r3wBh4i4gfmrokmckdEr7IF2ut+Iqr8tV2Za0G0pe8aXlaZDna9ywptrr+fpBOPdplEWRd4oYlaNanVWkOMxA8ATnAGpiJYj3A/DvKdAcnho+FyqPFqXseB37SzEkLevZBtnT2GD76Cq9U+nuxDqVj3Yh1Kx+e14vJmOZO0Wvfk0Q064qKrE1V/FA5I2mp6x656bdg6AcRS00kSOGDyLDpalEY8Bg7CSQIv4EfrGtZtOucIqzveRFV06XQUI+lDci4wPUXjVA4r+FrPaaFD5426ZMXZM9zf734P1v7xdo453LcrGIVo0AbuBCkivtHHdpNRvxouaP8Wodynr7okThIDVCH1maa6kzAN/zgFAijxFFtumkOEBQnBwU/ZGPKen2HOYFTqJjeW1mrsoPBWVFh1dxj3Yh1Kx7sQ6lZP9L09kfCIT6OnpnNqxBkydt69xw4OujC2mznxNcMJMgmRFfbzQb++XtFdJG2K/2mCDT1OhkuMK9Y1SmFSlyHruvJcH+QIoGePkj/90VNFfky/6C9vbQRx2yLYDOyP1gfXnLuiUN+FSZvobYklBVpLSPTizkLPhWCOGECPumBWVDYsjtNx9Ra2BjKklX4LQjRUAeDmNFkF4WL/K5HXftmRoklsDrFxTvxMHDcloQAcnklLJ3tPeBKcQxY7L4FBsB0CLUTEMTbaIdSse7EOpWPdh1HbZNkVSYS5KwWeLc/OuzJlfENsTy0ZpOwT3tFA9x/NkhcsU/vPEVcLdNyGkU6RfMz4r0z9+IH6uPbTKYS9rpn0+ZeRNRVH/UsxlRdU82tv27jRHNftO41u7KxX97oHYkLpZ56sSGINNgDnDKF+/c5l8uqsyk3q/nXPAYOOpnc8Nj8klOuPopTluZW6v/t/RHd64bFyMf1U6rthHlaf5bB2VnGvR8dNYv1IQRjbMxfo4PceJ37ioPk/9s9CffqWn3teY9Lmvht1Y92IdSsoS5kCv4PDXiQ0Upj+AFWGvm8MHKQZobuSBcrHK+XLpaQ0NRtvTAPHGt20q7JZsoEBXXHhKidJ3FEbuYvUKFy5ABAm5i8or3EzapfAPH2nYOSGFv08hC8LhQscoXJNdme6xGya7CmYQbsXDp3MWRGxHfhZTfphaAlGJzfg2IjQUYieqzOX9RLXVFkFFiJahpEdorb+nMWCt+EDWwRJ6J5InoWhJg2thlH5sCPvZJAM8zzZfpwyPo4tmofV150N+fXb5pv/l/76oNDq7jHuxDqVj3Yh1KyfqFR33zgQeE7Sw1CSZ6JAx6QBBBCg7gDk6OLEpw7/FCCD2entPWgMQMEu6YcxigxlFQPI1YQar9v6UL2MBtlASwaoj509dw4IB5sZhihlKadVg4QYNk+CS0w+XjsdLeX17YDRJsSy+9DcXcFCFuENrt/8uzVg1D4KP9qCuoT3+PiD2OrvpTQhBHxjtGX+K2TvZIqZ1Icr40uj7fSP1WZKIMd3h6dT0zX2ywuL7YQ++eZjT7VmhIQfx90+5zvuTn/k8kcgeHjxUHSr1uEJrq4q2kYaslAMkut6yNVa3dEk9hnA7rlzLFIdSse7EOpWPdiHkrLGN9qN6rzshjpThGEuBFxYMVRoa1MtjVG+SVd5xZ/WYAuajj9ZizEmygLhxzvXddRuCLYLRsNtlnWWOsfOzhWr3/AZVAey1PsjjNgkZmgxZ3UcuZTA3U/STzsBTgdZ/mukv/PHMF6i69IgiPpY3+ghr7rACJR/LbzQX66JdLWeYbMc74bRTWlNVrNkIHyFQpIbq2sOsN1Oczu8HO5tW8Np9QTuJuqJV7wMnHSK9mxpaM7QraLl3mHnr3bRkMQXzGyjyHXZ9CW5mMqfMyppO7EOpWPdiHUrlICm7gEc+yxciILhcpSRetiCzy8hdX3gNHe6MxlTnEysTLeyDoQgSBvFuAZOD71gxqDQowQ5TPJwnekX0UjYkDBUd7doDm0IFGqxfPJwmLbHkV4/MBwFV5mMmgR/pnNAfd6BLHcsJsyUTqjlrJFXWpVVEF8B4RAaOwRlfDmb54GDa+y5zJq5v40HZqacurWYxbGdEH4mE4ORYOwz5L4RiDhhUmNo8UCoEubcN5CRZER8w7s1egWJmsw70V9Zh3QIedcS5hrBMPf9h692IdSse7EOpWPz/DL6L2k4QDV9CDnk9xJCGpn/MVl1szbs+ltfuH0P6z0eddLY74Bd34U4G0EWXqsWsSjfd+9QDDc5buVLXnRAq9GTzn2QxJhalDM9+qUcvDBQi/t4i7/WEFarKs3WctDz+Jw0y4AAHjKcAojL2sskIHwSychrsT6WuI31ZAAjjFsIjCY0z138px89hMUGRL2cXg0PpIiELJ2Jr8hU2zV6DoGGYp0NjkycsL5AirgGA6lJ/a/gfaxP6dnJBRJhKFOJqGvq/9l540jE2NBjJ8s/Y2qtBMxYOJvhA4E1qVj3Yh1Kx7sQ6vH2G6Fax/NTUOeZPjxNZxlG1xUqOMSlxgLwDvKsg4ZKjMGPVavsPtTcIikzZOYwfeCnjbZPUqwQvxi344eJQFbiMRsNReD3SFaNqqOBIlRYvZh4EdFgByTVMR6F1kbMkHn4kQ6uJQ64+bIrLSInyMIi3BVdkDNC2wSCM1dNBspiGPYxMnwMoq9OZF2cIa/p1JQvx5ZJ1YSXXiXUwNItf9rBgfsa2wi5GQGzlJ/RfytFH2Uw+gLGr7iF5mJuGIIVrWRuGH08pJRUPwdhwAWLYvDgVfIrc20J/uxDqVj3Yh1Kx7tUoyaRzPVXBLb9SBTlAa3EBN3hHsWAknZgvrL0UkWzm4cHW86kPBZwAUZ4r7um5ib5gT74zafk95vQ4cDrrwwakWMsaVTfF2qBVXthI84pANeO2LGGJSOnIxUaMpT1fEntkkJ/GUuj7tBURa1iMP6hibTFutwv7R7Mws5dZ+fe4qBMF/WPnZuHfr/k5Fr+2va1WmgzBPljypmb+xf+Hh2MalbGAYr6wcGW8TnG1GeBrIPr3VoFf8IOHDJZ3Yc9z/OvsiJ9d18YxgVS7sJYwx3CkU/DSNIf/sPXuxDqVj3Yh1Kx+fBjHhn8arfCGYQr+t8qCfe8jPto0oY6S7ZRchOX1EM3Kpmq3DfHyYToCz6rurmOJstgUnNRDfYKPNHD7WMdKWbiz3F+iikMAhQp9bLmt/pKfS6F4TMXbDjaY50OS2tl6WIVZ2fjfKky7bgPzxrLvNQAoKgSi2R2JrQRB47kR6TWy6vZb4Q4FpaHknmBCleEYdnTWBfJ3A1LPaA47AcAo1EdwDPZdGdghxUrbxNwMXvlZCSsHDV+YmK1Pb9l6KGf85WAe5xVUlO7f29Fr4V8NurHuxDqVj31EQIe5YykK1zc0ZmzfeH7uJstVF9QZ4IGUY9ZqYOrruQl+P44ZSjRzjxrzhA719gcYktGq5nxxKtBxRLBMmAOQwPlYXPLG5xxMDMWEzaIoA3dYIEO4CVUYiMzCAm5Puh00ieCSTfaJ+8TAq7wHSk7v1EtwyFdT1wnx5GJpRycwEvHqzlQT27scePjgqWyYkzEx7IxzFwxbtrqlZ5gB1YLrUVq2RleQgAOysobbINBGVeoghx0d1pAf0STioKdPWK7lwiZvCX3qRjDnUrHuxDqVj3Yh1MP4ihDj0GO3rYW+wlI8lJ0EuI22+WETXIET88aC8t294/HBzUl6TJDp2V41aF4b5D1RFJLDdh2rxc8NqGvemMRs+a4v6n7h/D3QFSEo47WjRMzLlEGnD8GQxbW83K0BXtlDDc846sdw4RCoWghEmoKT8ZGSduW7ncXOkbSkX7cqGUxAE6WPKOJqbBPyp5SWd9X8kNNzlLmvXr1q8Gulke5Se8WNXpJRNvXwgEZZeZUCeHoMOUS9QNiW5bfe5bkAEP3LeoD9XIQmc974pDqVj3Yh1Kx7sQ8py6vaY9vqyxm7unL1B685I6uo8fS7f2NY4sg6TTVxY23a/WpZbeOIItTMSBD+NC4ZB5JbJRo+VZBs6I9VPYZ0O/+rmR4w10h6SHeHrhYndwfOnHKPKcVVdHAmNP6ym7Y88l9iIjrNkLwQCyo6ZC+dQdnIo6XmaqdhAK7MGdbfxTLAT0OEH/+GLxKkclsemZVRyPuxYOCFD92569mHFW1OjVn0++sJDSvWByHalw91nNjB49Igfteo2NGYTaNnbU6WsW+zZ/Hb7NCfTRizLHaNOsSZw8/N07rxqhOAiED5r4bdWPdiHUxPJ24nl54yQM0tJBMIQCSlVfhzOBVLYcMubHG41kE1T1JlpKxeTvv3MJjjJ31mYkQ+XgdxWQ7FbBMBWyt4RfqnmKMiEpWI6mDax5dsrqp3prWTSZzXhGr058SzL5if8MSi/iiNgKiJjlwwq+FixPM9+MwYwSxm8wZQzDDXgJcLAfQrA8EJLjpNs4z+eNq0KalcLzLnax9WeNvzB7TrrJDvU4Z3bOpZo+kOlhP5OpAPg2K5VqDMTA6V00yrcocXeCB355IqB6hQbqepzQJrUrHuxDqVj3Yh1e8B7+DSku7AxXEdwW5WgCZoq+veyJHBRCxwiFb39aU7+zVdoUDaxa55ifTWxE9GgrXw/l33ocTqdux/mMLNfhJZ/lhGDw4V2/8w53/j2E6vZF5psPm7fOEFYZCAGDXRrtvrq+VKl4XABs5Z3iocVdOlwFRgKyZ45mky0xNGmfY4gDpZhLtq9emrKX25OF+62uAJS0iSC7ngdsWLN/yVAcus/3+YCb379qAq1DcsCmOOZb1wdMOdvVhbNHpBP92IdSse7EOpWPdq4G9aR9gPRl9/eIRuiUSRpG0ob+ixx1BMupmZozNEpU8LdTzYWh99w0niX0NBCVlOBCIkN+n0FpT5K0QQyjwzjjkuJyfiwvQuukZ/dZ9nTZR6aTZiK/tIzlePXc63YhEyzpK6bVUYeT2gzF3ycXXwsgL8HEBD7yMrsDI06aH6SgmfmIIODgTTh3U5aAsunekeZfafCcVdqirnsq8WpS7Y5mBnlfcnY3VKU8jng//bjcLYKeHc2ECa1Kx7sQ6lY92IdXiDWExQyyb+1JhNCVSS2uPctVZhwPVmVGXx3cGvzJdUBMlayZAUF8FlIo07XIuYnBQCI9f//z9iEM31HREUb6f6qrJ7m+QxtiTz4g+gS8Dn93IJHtBYi0zofbwFJgKartAdpJBN0Y7T6XV6V3NAOWAwBiTt8dUVBpewVX9c3HPk5GiVENj0ForPFXiVoqmRmrmtUGToAHTZ2evH8mqvK/jU7KJc/wMEPyyV7U9BZKamWKTgsBUl0AGHWNM6WLf7spE+71BuRv024mJsH4+VHxE0jpZpkdSse7EOpWPdiHkmgE8fsm5948K5xmFzOXVtsMDVDmhLvnzzuFH3h0dgVsrkgADXi6i0SM1RJ2hJkB+QLwXYFOmOwx2FkjKVOBW5kYZPe5SHyhei4Cbqyo18y4/iyjKYdKPocL2uSNLAoyMUUpFc6HitgjHJmEbwCnmNiP6oTSWButkDvkrrDlCxx8EGFyNNhewOooaZu2negAzl/dJ/YRg057Ad4C2eKCyl7YD214lQ7UT7/Hg/UaabQhJxj6u2QaPVnohQUMLzZPDr7a4ztINUV+aKuFhFy10/Cp1p0l1ojCxxt68ydsIEPtyKpQVgbttEOpWPdiHUrHuxFVplqa5CMo/KOvVG+okPD/EajfRkmv4PauCRO59uocaXFob1bgeK6Obd+sTOQGN0bXNA54a7j6SnqnR2HnerD4WqmBh9vz8anHX57gxEsO0rOW57AfUFG7wjohLAYOai6TQsuRihyKLBcGIx733l/r3PP0dO2a2hBjJTSJuodca5I6Lr0tG0P+tUfSp7Vk/aOLoOViQprCvxAM1A8Yt85VVRMQhi+lYv3fGwhqx2L19Yq2zWPsOxgCxVQOxP9H9uPN1oSfw26se7EOpWPdh1hig0dflWqCrMWedzhdT0gm6qs0vWKwO9ikHOeUH1BUiXZ9kMUtQTy5jx71mP0XH48PbNrma2hSBxz3OINXF1xdePCRuYcrh9HQvmc9boz5p8VsX4OtCRsUK5AHPe5BR1UB0TcNBe/g2ftWIauYECpQs0BoqffGV2mtao1vSU9hfUlkqzSicp1pkWmRC7zw259KYTLYBlNC6pxXFyClxQNxXRxM6ZViERtXng8TC2eqJenNyXW3bLb7kORNUYFT6e7EOpWPdiHUrH6VP19Kqh7Uo4n4LMzxtcOefANi7pXB3rYVrhpHKf3KG6BjwZaCNRO+2UGiAKyons8q47hW1LeNy7ZqIfWqpVgnCQNhj6EuIsSdzyqfpdTTBxXIgVVGSw3RWKRLtbQWjaVF4eFYW5VdPg7xl5JudrZJGvWeU1xUD/4z/U1Snzc4CXbdx4V9XdaBTGA9ScuG9NreI0m5DR02ayKr8HSIsKvAtTwvtKRPNi4knKAsqXLITmcPTZc6J9gA/LXungkRj0ua+G3Vj3Yh1KuvpuVOUqXhoSyySJ/xE7MGTtAzk4Mx1KbUu5bwQoSkVFpxtWJsKIqxS+9OhW+GIsvDJrpDgOH9trfN7H5LvvunYA/Q27yR55BFQ4q6/Lk4g5NwKrOaxRLpwTXRK7zXTSZZ1XrN+AoyHALrD/gk1kVnkNLzx6Dh3ITu8SX43cBJoV4O2PAm3CGN5N1Pqk2MMuRHHlCKDKNJXA94kXj9eu0EFGBI/lKW1bXfFIdSse7EOpWPdiHkivvW+214BSt6MFnAmYhDMXIg/MS7Sp9h9+CoVSR1KL9+i7+hjKFsWIgmVtf8M5Ovw10V9gIWKZF/LsRhGxeahZGlKjtUl3iC5wGhhCHc4k/QoIklH79oVv5zLOZdUls+AL1bbLBVetDq1cwcxZpwwt6WmPef3LB2fu3skdWbSzjkun+h0GHv/qui0YBeK/GJ0BOY2CyZrcQAWTnuiHUrHuxDqVj3XleegYKfrw0g+3te9LReRQdASGgNhFAj1jgnLwTl4Jy8EWfTFcV9NBGFvgnIROLSZjhoI2Y3pLwTl4JyzRgSrnLFBp/26se7EOpWPddmilx+w3p8XCHBps/zKDkdUiQQNST5EkZb/3xzXfm9ZMIEzUMjogXygkeVSqUq0Gkvh8dRnvzUkWyY/Fqw+B6shs6uNGnY5fABOIobf0sEokM+kpS+saVye/8Id0wo0+nVVOPYEJR2TTLT+alVMeVMdi2TH4tWJEPmMouwh36ICjsmk/Tj1SEtqcGjNqyHkJhfNvgwhTq53pFenzozWfoYhA+a+G3UAPxDiM2iVdv00rT6O4MTjvMR1558VciTa8lCCbJRWXN5kmC0/lBIvt6vZPxdVcLmmC0/lBI7HY7HY7HY7HY7HY7HlTHY8qlTHlUpIF9E/wbF1VwuTk0hT+J9l8ZwaIl8QZXgXdzf+Ytaaf2Frq6zi4v3kBD02OFfDbqx7sQ6nTXP1FYhA+a+G3Vj3Yh1Kx7sQ6lY92IddZmRlfDbqx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHuxDqVj3Yh1Kx7sQ6lY92IdSse7EOpWPdiHUrHux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",
                        "alt": "Macbook 1"
                    },
                    {
                        "url": "data:image/webp;base64,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Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4Ut4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",
                        "alt": "Macbook 2"
                    },
                    {
                        "url": "data:image/webp;base64,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LUckW+d360jwDhw3zBe9q5sVH3442yk64rl0so79IZAHRF+oxkINcdkPP6k9G/VRHxPvSAy89fLTumMxawkLiE5qixYuTcxTIP2HNyRR4mdXdDQ9TUBMrbTO6moCZXB1qyI26wDgRvkfIe+LeOyS8znBBWa2SZuelQkagArGEpWaBAufgXN023c2fEmpRyhiOIAe38IcCuiXAuUmFoNtHCYS8wAihME0Ai5kqpGapLYMDgUWR+Axf/2OgGwXFVZBntMSXlZi8hiGKby7y7y7y2v4K+jSK4FOVDxT3uYuN9TUBMrbTO6moDocQwVH93Wg+cXDefhv1P8vE/SISKJHrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQD9/reyXWjruQnm9y/iW34IxRZvTzkO8tCylkBNkj+S60ddyE83uX8S2/BGKLN6ech3loWUsgJskfyXWjruQnm9y/iW34IxRZvTzkO8tCylkBNkj+S60ddyE83uX8S2/BGKLN6ech3loWUsgJskfyXWjruQnm9zKRaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7qagJlbaZ3U1ATK20zupqAmVtpndTUBMrbTO6moCZW2md1NQEyttM7q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",
                        "alt": "Macbook 3"
                    }
                ],
                "variants": [
                    {
                        "barcode": "8682458451277",
                        "varianterAttribute": {},
                        "sellerId": "6931907b7105876b577dff55",
                        "price": 52.499,
                        "quantity": 70
                    }
                ]
            }
        ]
    }
        
    .....
    
    ]`
    },
    {
      method: 'GET',
      path: '/store/productsV2/product/v2',
      description: 'Ürünleri listele (V2)',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'page', type: 'integer', required: false, description: 'Sayfa numarası' },
        { name: 'limit', type: 'integer', required: false, description: 'Sayfa başına öğe sayısı' },
        { name: 'status', type: 'string', required: false, description: 'Ürün durumu (active, inactive)' },
        { name: 'barcode', type: 'string', required: false, description: 'Barkod numarasına göre filtrele' }
      ],
      response: `{
  "success": true,
  "data": {
    "data": [
      {
        "barcode": "8682458451244",
        "modelCode": "test-model-3456",
        "slicerAttribute": [
          {
            "attributeId": 249,
            "attributeName": "SSD Kapasitesi",
            "valueId": 3379,
            "valueName": "512 GB"
          }
        ],
        "price": 1500,
        "quantity": 50
      }
    ],
    "totalPages": 1,
    "currentPage": 1,
    "totalItems": 1
  }
}`,
      example: `curl -X GET \\
  '${BASE_URL}/store/productsV2/product/v2?page=1&limit=50&status=active&barcode=8682458451225' \\
  -H 'Authorization: Bearer YOUR_TOKEN'`
    },
    {
      method: 'PUT',
      path: '/store/productsV2/product/:barcode',
      description: 'Ürün güncelle',
      status: 'stable',
      parameters: [
        { name: 'barcode', type: 'string', required: true, description: 'Ürün barkodu' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'description', type: 'string', required: false, description: 'Ürün açıklaması' },
        { name: 'price', type: 'number', required: false, description: 'Ürün fiyatı' },
        { name: 'quantity', type: 'integer', required: false, description: 'Stok miktarı' }
      ],
      response: `{
    "success": true,
    "data": {
        "barcode": "8682458451223",
        "sku": "test-sku-123",
        "modelCode": "test-test123-12347",
        "slicerAttribute": [
            {
                "attributeId": 249,
                "attributeName": "SSD Kapasitesi",
                "valueId": 1183806,
                "valueName": "960 GB"
            },
            {
                "attributeId": 232,
                "attributeName": "Ram (Sistem Belleği)",
                "valueId": 4016,
                "valueName": "64 GB"
            }
        ],
        "varianterAttribute": null,
        "commonAttributes": [
            {
                "attributeId": 131,
                "attributeName": "Ekran Kartı Hafızası",
                "valueId": 10576991,
                "valueName": "48 GB"
            },
            {
                "attributeId": 210,
                "attributeName": "Dokunmatik Ekran",
                "valueId": 22196,
                "valueName": "Yok"
            },
            {
                "attributeId": 83,
                "attributeName": "Bağlantılar",
                "valueId": 1220630,
                "valueName": "USB-C"
            },
            {
                "attributeId": 23,
                "attributeName": "Ekran Boyutu",
                "valueId": 1194094,
                "valueName": "14,5 inç"
            },
            {
                "attributeId": 426,
                "attributeName": "İşlemci Modeli",
                "valueId": 10623885,
                "valueName": "225"
            },
            {
                "attributeId": 290,
                "attributeName": "Garanti Tipi",
                "valueId": 10623885,
                "valueName": "225"
            },
            {
                "attributeId": 168,
                "attributeName": "İşlemci Tipi",
                "valueId": 10646403,
                "valueName": "Apple M5 Pro"
            },
            {
                "attributeId": 315,
                "attributeName": "Çözünürlük Standartı",
                "valueId": 1223796,
                "valueName": "2.5K"
            },
            {
                "attributeId": 103,
                "attributeName": "Cihaz Ağırlığı",
                "valueId": 1612,
                "valueName": "2 - 4 kg"
            },
            {
                "attributeId": 433,
                "attributeName": "Garanti Süresi",
                "valueId": 352824,
                "valueName": "4 Ay"
            },
            {
                "attributeId": 354,
                "attributeName": "Klavye",
                "valueId": 1211140,
                "valueName": "Q Türkçe (Aydınlatmasız)"
            },
            {
                "attributeId": 306,
                "attributeName": "Ekran Kartı Bellek Tipi",
                "valueId": 3094,
                "valueName": "DDR5"
            },
            {
                "attributeId": 859,
                "attributeName": "Maksimum İşlemci Hızı (GHz)",
                "valueId": 4182,
                "valueName": "İthalatçı Garantili"
            },
            {
                "attributeId": 47,
                "attributeName": "Renk",
                "valueId": 10620526,
                "valueName": "Bej"
            },
            {
                "attributeId": 110,
                "attributeName": "Çözünürlük",
                "valueId": 10626851,
                "valueName": "2880 x 1864"
            },
            {
                "attributeId": 28,
                "attributeName": "İşletim Sistemi",
                "valueId": 831,
                "valueName": "Mac Os"
            },
            {
                "attributeId": 467,
                "attributeName": "Hard Disk Kapasitesi",
                "valueId": 10620452,
                "valueName": "Belirtilmemiş"
            },
            {
                "attributeId": 318,
                "attributeName": "İşlemci Çekirdek Sayısı",
                "valueId": 3437,
                "valueName": "8"
            },
            {
                "attributeId": 42,
                "attributeName": "Kullanım Amacı",
                "valueId": 10620453,
                "valueName": "Belirtilmemiş"
            },
            {
                "attributeId": 132,
                "attributeName": "Ekran Kartı Tipi",
                "valueId": 10619781,
                "valueName": "Belirtilmemiş"
            },
            {
                "attributeId": 1192,
                "attributeName": "Menşei",
                "valueId": 10633877,
                "valueName": "UM"
            },
            {
                "attributeId": 311,
                "attributeName": "Ram (Sistem Belleği) Tipi",
                "valueId": 1220591,
                "valueName": "SDRAM"
            },
            {
                "attributeId": 301,
                "attributeName": "Ekran Kartı",
                "valueId": 1220633,
                "valueName": "M3"
            },
            {
                "attributeId": 320,
                "attributeName": "İşlemci Nesli",
                "valueId": 1180289,
                "valueName": "12. Nesil"
            },
            {
                "attributeId": 698,
                "attributeName": "Ekran Yenileme Hızı",
                "valueId": 944772,
                "valueName": "165 Hz"
            }
        ],
        "status": "archived",
        "createdAt": "2026-01-15T12:55:09.402Z",
        "categoryId": 1583,
        "categoryName": "Dizüstü Bilgisayar",
        "categoryCommission": 0,
        "categoryVatRate": 0,
        "price": 60.499,
        "quantity": 100,
        "brandName": "Apple",
        "description": "MBA 15 SKY/10C GPU/16GB/256GB-TUR",
        "title": "MacBook Air: Apple M4 chip with 10-core CPU and 10-core GPU 960GB SSD-64GB RAM",
        "images": [
            "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/481706918/481706918-1183806-4016/1768481707550-4hp7m14r21-0.webp",
            "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/481706918/481706918-1183806-4016/1768481707539-i2sash4ccg-1.webp",
            "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/481706918/481706918-1183806-4016/1768481707554-qaj8xsdml2-2.webp"
        ]
    }
}`,
      example: `curl -X PUT \\
  ${BASE_URL}/store/productsV2/product/8682458451243 \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "description": "Updated description",
    "price": 1600,
    "quantity": 100
  }'`
    },
    {
      method: 'DELETE',
      path: '/store/productsV2/product/:barcode',
      description: 'Ürün sil',
      status: 'stable',
      parameters: [
        { name: 'barcode', type: 'string', required: true, description: 'Ürün barkodu' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
    "success": true,
    "data": {}
}`,
      example: `curl -X DELETE \\
  ${BASE_URL}/store/productsV2/product/8682458451243 \\
  -H 'Authorization: Bearer YOUR_TOKEN'`
    },
    {
      method: 'PUT',
      path: '/store/productsV2/listing',
      description: 'Ürün listesini toplu güncelle (fiyat ve stok)',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'listings', type: 'array', required: true, description: 'Güncellenecek ürün listesi' }
      ],
      response: `{
  "success": true,
  "batchRequestId": "09b3ff84-5993-4946-b1ec-2a4a9d8820f5"
}`,
      example: `curl -X PUT \\
  ${BASE_URL}/store/productsV2/listing \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "listings": [
      {
        "barcode": "8682458451243",
        "price": 1500,
        "quantity": 50
      }
    ]
  }'`
    }
  ]

  const integrationOrderEndpoints = [
    {
      method: 'GET',
      path: '/store/ordersV2',
      description: 'Siparişleri listele (Integration V2)',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'page', type: 'integer', required: false, description: 'Sayfa numarası' },
        { name: 'limit', type: 'integer', required: false, description: 'Sayfa başına öğe sayısı' },
        { name: 'status', type: 'string', required: false, description: 'Sipariş durumu filtresi' },
        { name: 'startDate', type: 'string', required: false, description: 'Başlangıç tarihi (ISO format)' },
        { name: 'endDate', type: 'string', required: false, description: 'Bitiş tarihi (ISO format)' },
        { name: 'orderByField', type: 'string', required: false, description: 'Sıralama alanı (örn: orderDate)' },
        { name: 'orderByDirection', type: 'string', required: false, description: 'Sıralama yönü (asc, desc)' }
      ],
      response: `{
  "success": true,
  "data": {
    "data": [
      {
        "customer": {
          "firstname": "Sinan",
          "surname": "Karatas",
          "email": "sinan.karatas@cozmopol.com",
          "identityNo": "11111111111",
          "companyName": null,
          "taxNumber": null,
          "taxOffice": null
        },
        "shipment": {
          "firstname": "firstnametest",
          "surname": "surnametest",
          "email": "sinan.karatas@cozmopol.com",
          "phoneNumber": "+90 532 456 7890",
          "identityNo": "11111111111",
          "companyName": null,
          "taxNumber": null,
          "taxOffice": null,
          "city": "Aydın",
          "fullAddress": "Atatürk Bulvarı No: 29"
        },
        "invoice": {
          "firstname": "firstnametest",
          "surname": "surnametest",
          "email": "sinan.karatas@cozmopol.com",
          "phoneNumber": "+90 532 456 7890",
          "identityNo": "11111111111",
          "companyName": null,
          "taxNumber": null,
          "taxOffice": null,
          "city": "Aydın",
          "fullAddress": "Atatürk Bulvarı No: 29"
        },
        "totalPrice": 117.5,
        "totalDiscount": 0,
        "currencyCode": "TRY",
        "status": "created",
        "statusHistory": [
          {
            "date": "2026-01-15T15:20:15.085Z",
            "status": "awaiting"
          },
          {
            "date": "2026-01-15T15:21:19.323Z",
            "status": "created"
          }
        ],
        "listings": [
          {
            "barcode": "8682458451225",
            "name": "MacBook Air: Apple M4 chip with 10-core CPU and 10-core GPU 960GB SSD-64GB RAM",
            "quantity": 1,
            "price": 65,
            "sku": "test-sku-1235"
          },
          {
            "barcode": "8682458451224",
            "name": "MacBook Air: Apple M4 chip with 10-core CPU and 10-core GPU 512GB SSD-32GB RAM",
            "quantity": 1,
            "price": 52.5,
            "sku": ""
          }
        ],
        "orderNumber": "7224100418",
        "packageNumber": "4567342578",
        "orderDate": "2026-01-15T15:20:15.086Z",
        "cargoProviderName": "Test Kargo Firması",
        "cargoTrackingNumber": "1234567890",
        "cargoTrackingLink": "https://www.cozmopol.com.tr"
      }
    ],
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}`,
      example: `curl -X GET \\
  '${BASE_URL}/store/ordersV2?status=created&startDate=2026-01-14T15:44:30&endDate=2026-01-17T17:44:30&page=1&limit=50&orderByField=orderDate&orderByDirection=asc' \\
  -H 'Authorization: Bearer YOUR_TOKEN'`
    },
    {
      method: 'PUT',
      path: '/store/ordersV2/splitOrder/:orderId',
      description: 'Siparişi böl',
      status: 'stable',
      parameters: [
        { name: 'orderId', type: 'string', required: true, description: 'Sipariş ID\'si' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'items', type: 'array', required: true, description: 'Bölünecek ürünler' }
      ],
      response: `{
  "success": true,
  "data": {}
}`,
      example: `curl -X PUT \\
  ${BASE_URL}/store/ordersV2/splitOrder/5892398542 \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "items": [
      {
        "barcode": "8682458451243",
        "quantity": 1
      }
    ]
  }'`
    },
    {
      method: 'PUT',
      path: '/store/ordersV2/status/:orderId',
      description: 'Sipariş durumunu güncelle',
      status: 'stable',
      parameters: [
        { name: 'orderId', type: 'string', required: true, description: 'Sipariş ID\'si' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'status', type: 'string', required: true, description: 'Yeni sipariş durumu' }
      ],
      response: `{
  "success": true,
  "data": {}
}`,
      example: `curl -X PUT \\
  ${BASE_URL}/store/ordersV2/status/3580169126 \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "status": "picking"
  }'`
    },
    {
      method: 'POST',
      path: '/store/ordersV2/test',
      description: 'CREATE (createTestOrder)',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'limit', type: 'text', required: false, description: 'Limit parameter (disabled)' },
        { name: 'body', type: 'json', required: true, description: 'Test order items' }
      ],
      response: `{
  "success": true,
  "data": {}
}`,
      example: `curl -X POST \\
  ${BASE_URL}/store/ordersV2/test \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '[
    {
        "barcode": "8682458451225",
        "quantity": 1
    },
    {
        "barcode": "8682458451277",
        "quantity": 3
    }
]'`
    }
  ]

  const integrationBatchEndpoints = [
    {
      method: 'GET',
      path: '/store/batch-request/:batchId',
      description: 'Toplu işlem durumunu sorgula',
      status: 'stable',
      parameters: [
        { name: 'batchId', type: 'string', required: true, description: 'Batch request ID\'si' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
  "success": true,
  "data": {
    "id": "09b3ff84-5993-4946-b1ec-2a4a9d8820f5",
    "type": "update_listing",
    "status": "completed",
    "data": {
      "listingsCount": 1,
      "listings": [
        {
          "barcode": "8682458451243",
          "quantity": 55,
          "price": 220
        }
      ]
    },
    "result": {
      "message": "Batch listing update completed",
      "processedAt": "2026-01-12T09:29:24.224Z",
      "results": [
        {
          "success": true,
          "barcode": "8682458451243",
          "message": "Listing updated successfully"
        }
      ]
    }
  }
}`,
      example: `curl -X GET \\
  ${BASE_URL}/store/batch-request/09b3ff84-5993-4946-b1ec-2a4a9d8820f5 \\
  -H 'Authorization: Bearer YOUR_TOKEN'`
    }
  ]

  const integrationQaEndpoints = [
    {
      method: 'GET',
      path: '/store/product-questions',
      description: 'Satıcıya gelen ürün sorularını listele',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `{
    "success": true,
    "data": [
        {
            "_id": "6967b7915d5baccd1a4362b6",
            "listingId": "6966298ab0c47604ab609676",
            "sellerId": "694e57506ea296361282d5f2",
            "userId": null,
            "question": "90537 824 19 kırk beş bu numaradan iletişime geç",
            "category": "cargo",
            "status": "answered",
            "rejectionReason": null,
            "isPublic": true,
            "answer": "Thank you for your question! This product comes with a 2-year warranty.",
            "answeredAt": "2026-01-14T15:53:50.306Z",
            "isAnswered": true,
            "askedAt": "2026-01-14T15:34:41.571Z",
            "createdAt": "2026-01-14T15:34:41.572Z",
            "updatedAt": "2026-01-14T15:53:50.315Z"
        }
    ],
    "totalCount": 1
}`,
      example: `curl -X GET \\
  \${BASE_URL}/store/product-questions \\
  -H 'Authorization: Bearer YOUR_TOKEN'`
    },
    {
      method: 'PATCH',
      path: '/store/product-questions/:id/answer',
      description: 'Bir ürün sorusunu cevapla',
      status: 'stable',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Soru ID (URL parametresi)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'answer', type: 'string', required: true, description: 'Cevap metni' }
      ],
      response: `{
    "success": true,
    "message": "Yanıtınız kaydedildi.",
    "data": {
        "_id": "69689fc2642467edc4269e88",
        "listingId": "6967f2807b3ea4d5b971ffc7",
        "sellerId": "694e574f6ea296361282d5f0",
        "userId": "694e57506ea296361282d5f2",
        "question": "90537 824 19 kırk beş bu numaradan iletişime geç",
        "category": "cargo",
        "status": "answered",
        "rejectionReason": null,
        "isPublic": true,
        "answer": "Thank you for your question! This product comes with a 2-year warranty.",
        "answeredAt": "2026-01-15T08:07:48.977Z",
        "isAnswered": true,
        "askedAt": "2026-01-15T08:05:22.549Z",
        "createdAt": "2026-01-15T08:05:22.557Z",
        "updatedAt": "2026-01-15T08:07:48.987Z"
    }
}`,
      example: `curl -X PATCH \\
  \${BASE_URL}/store/product-questions/69689fc2642467edc4269e88/answer \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "answer": "Thank you for your question! This product comes with a 2-year warranty."
  }'`
    }
  ]

  const invoiceEndpoints = [
    {
      method: 'GET',
      path: '/user/invoices',
      description: 'Fatura listesini getir',
      status: 'stable',
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
      "pdf_url": "\${BASE_URL}/invoices/67f1234567890abcdef12345/pdf",
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
  '${BASE_URL}/user/invoices?status=paid&start_date=2024-01-01&end_date=2024-01-31' \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/user/invoices/:id',
      description: 'Fatura detayını getir',
      status: 'stable',
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
    "pdf_url": "\${BASE_URL}/invoices/67f1234567890abcdef12345/pdf",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-18T14:30:00Z"
  }
}`,
      example: `curl -X GET \\
  ${BASE_URL}/user/invoices/67f1234567890abcdef12345 \\
  -H 'Authorization: Bearer YOUR_API_KEY'`
    },
    {
      method: 'GET',
      path: '/user/invoices/:id/pdf',
      description: 'Fatura PDF\'ini indir',
      status: 'stable',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Fatura ID\'si (MongoDB ObjectId)' },
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' }
      ],
      response: `Content-Type: application/pdf
Content-Disposition: attachment; filename="INV-2024-001.pdf"

[PDF Binary Content]`,
      example: `curl -X GET \\
  ${BASE_URL}/user/invoices/67f1234567890abcdef12345/pdf \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -o invoice.pdf`
    },
    {
      method: 'POST',
      path: '/user/invoices/upload',
      description: 'Fatura PDF\'i yükle',
      status: 'stable',
      parameters: [
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'orderId', type: 'string', required: true, description: 'Sipariş ID' },
        { name: 'invoicePdf', type: 'file', required: true, description: 'Fatura PDF dosyası' }
      ],
      response: `{
  "success": true,
  "message": "Invoice uploaded successfully",
  "data": {
    "id": "67f1234567890abcdef12345",
    "url": "https://storage.cozmopol.com/invoices/INV-2024-001.pdf"
  }
}`,
      example: `curl -X POST \\
  ${BASE_URL}/user/invoices/upload \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -F 'orderId=67d9250b98a026849af11ea5' \\
  -F 'invoicePdf=@/path/to/invoice.pdf'`
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

      {/* Integration Authorization Section */}
      <section id="integration-auth" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-600 pb-2">
          🔐 Integration API - Kimlik Doğrulama
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Bu endpoint'ler production'da kullanıma hazırdır. Integration API için kimlik bilgileri yönetimi.
          </p>
        </div>
        <div className="space-y-4">
          {integrationAuthEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* 1. Kategori ve Marka Listeleme */}
      <section id="category-brand" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-600 pb-2">
          🏷️ Kategori ve Marka Listeleme
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Marka ve kategori listeleme işlemleri.
          </p>
        </div>
        <div className="space-y-4">
          {categoryBrandEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* 2. Ürün Yönetimi */}
      <section id="product-management" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-600 pb-2">
          � Ürün Yönetimi
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Ürün oluşturma, güncelleme, silme ve stok/fiyat yönetimi.
          </p>
        </div>
        <div className="space-y-4">
          {productManagementEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* 3. Sipariş Yönetimi */}
      <section id="integration-orders" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-600 pb-2">
          📋 Sipariş Yönetimi
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Sipariş sorgulama ve durum güncelleme işlemleri.
          </p>
        </div>
        <div className="space-y-4">
          {integrationOrderEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* 4. Fatura Yükleme (coming soon) */}
      <section id="invoices" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-600 pb-2">
          📄 Fatura Yükleme
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Fatura yükleme ve görüntüleme işlemleri.
          </p>
        </div>
        <div className="space-y-4">
          {invoiceEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* 5. Toplu İşlem Takibi */}
      <section id="integration-batch" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-600 pb-2">
          ⚙️ Toplu İşlem Takibi
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Toplu işlem durumlarını sorgulama.
          </p>
        </div>
        <div className="space-y-4">
          {integrationBatchEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* 6. Soru Cevap İşlemleri */}
      <section id="integration-qa" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-600 pb-2">
          � Soru Cevap İşlemleri
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Müşteri sorularını listeleme ve cevaplama.
          </p>
        </div>
        <div className="space-y-4">
          {integrationQaEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* 7. İade Yönetimi (coming soon) */}
      <section id="returns" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-purple-600 pb-2">
          ↩️ İade Yönetimi
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> İade taleplerini yönetme ve durum güncelleme işlemleri.
          </p>
        </div>
        <div className="space-y-4">
          {returnEndpoints.map((endpoint, index) => (
            <EndpointCard key={index} {...endpoint} />
          ))}
        </div>
      </section>

      {/* Base URL Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <code className="text-blue-700 font-mono bg-blue-100 px-3 py-2 rounded">
          {BASE_URL}
        </code>
        <p className="text-blue-700 mt-4 text-sm">
          <code className="bg-blue-100 px-2 py-1 rounded mx-1">{BASE_URL}</code>
          kullanabilirsiniz.
        </p>
      </div>
    </div>
  )
}

export default Endpoints