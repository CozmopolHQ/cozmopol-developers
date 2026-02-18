import React from 'react'
import EndpointCard from '../components/EndpointCard'
import { BASE_URL } from '../config'

const Endpoints = () => {

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
        { name: 'Authorization', type: 'string', required: true, description: 'Bearer token (Header)' },
        { name: 'parentId', type: 'integer', required: false, description: 'Üst kategori ID\'si ile filtrele', in: 'query' },
        { name: 'search', type: 'string', required: false, description: 'Kategori adına göre arama', in: 'query' },
        { name: 'type', type: 'string', required: false, description: 'Kategori tipi (root: üst, sub: alt)', in: 'query' }
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
  ${BASE_URL}/common/product-categories?parentId=368&search=örgü&type=sub \\
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
                        "url": "data:image/webp;base64,UklGRqoBAQBXRUJQVlA4IJ4BAQCQ8ASdASqwBAgHPlEokUajorIwIZM5CkAKCWdu/6Q4ripHHitplvA7z0/K8N9rv8VxkkjeaymSd9eu0r4G/MD1LuILc49EH8+/y3QzY522Fa7CtdhWuwrXYVrsK12Fa7CtdhWuwrXYVrsK....",
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
                "barcode": "8682458451225",
                "sku": "test-sku-1235689",
                "modelCode": "test-test123-12349",
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
                    ...
                ],
                "status": "active",
                "createdAt": "2026-01-16T16:40:46.440Z",
                "categoryId": 1583,
                "categoryName": "Dizüstü Bilgisayar",
                "categoryCommission": 0,
                "categoryVatRate": 0,
                "price": 60.49,
                "quantity": 96,
                "brandName": "Apple",
                "description": "MBA 15 SKY/10C GPU/16GB/256GB-TUR",
                "title": "MacBook Air: Apple M4 chip with 10-core CPU and 10-core GPU 960GB SSD-64GB RAM",
                "images": [
                    "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/581644980/581644980-1183806-4016/1768581645318-etopch7tr4i-0.webp",
                    "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/581644980/581644980-1183806-4016/1768581645304-m5ehq6kykr-1.webp",
                    "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/581644980/581644980-1183806-4016/1768581645316-if7aj1kkx7-2.webp"
                ]
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 1,
            "total": 1,
            "totalPages": 1
        }
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
        "barcode": "8682458451225",
        "sku": "test-urun-123",
        "modelCode": "test-test123-12349",
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
            ...
        ],
        "status": "pending",
        "createdAt": "2026-01-15T15:54:16.206Z",
        "categoryId": 1583,
        "categoryName": "Dizüstü Bilgisayar",
        "categoryCommission": 0,
        "categoryVatRate": 0,
        "price": 500,
        "quantity": 150,
        "brandName": "Apple",
        "description": "test description",
        "title": "test title",
        "images": [
            "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/492453604/492453604-1183806-4016/1768827936872-834i781tmdu-0.webp",
            "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/492453604/492453604-1183806-4016/1768827936851-v84rfrbm2ws-1.webp",
            "https://cozmopol-bucket.s3.eu-central-1.amazonaws.com/products/492453604/492453604-1183806-4016/1768827936869-u0doe0bnfpf-2.webp"
        ]
    }
}`,
      example: `curl -X PUT \\
  ${BASE_URL}/store/productsV2/product/8682458451243 \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "status": "pending",
    "sku": "test-urun-123",
    "title": "test title",
    "images": [
        {
            "url": "data:image/webp;base64,UklGRqoBAQBXRUJQVlA4IJ4BAQCQ8ASdASqwBAgHPlEokUajorIwIZM5CkAKCWdu/6Q4ripHHitplvA7z0/K8N9rv8VxkkjeaymSd9eu0r4G/MD1LuILc49EH8+/y3QzY52+AU0/+9ur7H+tyK3mHxqz7+Fv/F2TdueYk+B/2P2793/8q/4vsDfs96pf+3+6XwH/d71Rf2H/a/ul70H/V/dj3of5X/lfuH8DP9w/3H/69vP/ff///6fDL+0H///7vwi/rB////L7u3/T/ej/x/Lv+5n70fEJ/Rv8///v+1///gA/f/s3+wk/+Pnb+b/4f/",
            "alt": "Macbook 1"
        },
        {
            "url": "data:image/webp;base64,UklGRsiDAABXRUJQVlA4ILyDAAAwgwOdASqwBAgHPlEokUajoiQhoREooIAKCWlu/8Pd35DED/r7kyHWA3rvMy4vP4j9Q+Xj6aNO37vym3JEiQm7n/6TwRfKugTxsaNPnOadH+Z09/NE/EOkFbNJJ//JSP/DS37f/aZp/Mb5zenf//0H9JH1g/yml+vX9x/X6B/7vOx9E",
            "alt": "Macbook 2"
        },
        {
            "url": "data:image/webp;base64,UklGRjpxAABXRUJQVlA4IC5xAABwMgOdASqwBAgHPlEokUajoiYjIJLIcMAKCWlu99j99WwPQez+c7z2jqW3Hp3Xc9+4MpO/93rr+Z81Te/8XwYfMtWxtl+lpyEvSA/5+XppqHDOg7qUw2UvmqN/6if27fLTlZOWA9g37Ofox7onpt9AD+2/070cva+9Cz9nvS49pf9mv3I9obVpPrf/z8730X+d/w/5Q+cP559h/k/yg/uH/i/1P3lfv3+p4gPlP8zzJ+qj5H+9f47/Zf4L9qfxH/l99/7z95nqC/kH81/vn9i/av++ftnyCW6/8n/t+oX7W/SP9Z/ev85+vnw9fm/9z8vfdz7ef9r3Av6H/Xf9f/ev3u/zXzf/tfFP/Gf6f9w/gG/pv9q/5H+O/LH5Hv+n/Xf7b9zfej9Of+P/",
            "alt": "Macbook 3"
        }
    ],
    "description": "test description",
    "price": 500,
    "quantity": 150,
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
       .....
    ]
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
      path: '/store/ordersV2/splitOrder/:packageNumber',
      description: 'Siparişi böl',
      status: 'stable',
      parameters: [
        { name: 'packageNumber', type: 'string', required: true, description: 'Paket numarası' },
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
        "id": "77f76bff-2d0c-4bc9-ad95-21e844f62aab",
        "type": "update_listing",
        "status": "completed",
        "data": {
            "listingsCount": 2,
            "listings": [
                {
                    "barcode": "8682458451276",
                    "quantity": 1290,
                    "price": 650
                },
                {
                    "barcode": "8682458451277",
                    "quantity": 500,
                    "price": 780
                }
            ]
        },
        "result": {
            "message": "Batch listing update completed",
            "processedAt": "2026-01-20T11:58:13.039Z",
            "results": [
                {
                    "success": true,
                    "barcode": null,
                    "quantity": 1290,
                    "price": 650
                },
                {
                    "success": true,
                    "barcode": null,
                    "quantity": 500,
                    "price": 780
                }
            ]
        },
        "errors": null,
        "summary": {
            "total": 2,
            "successful": 2,
            "failed": 0
        },
        "createdAt": "2026-01-20T11:58:12.596Z",
        "updatedAt": "2026-01-20T11:58:13.040Z"
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
          🔐 Kimlik Doğrulama
        </h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            <strong>✅ Stable:</strong> Bu endpoint'ler production'da kullanıma hazırdır. Kimlik bilgileri yönetimi.
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
