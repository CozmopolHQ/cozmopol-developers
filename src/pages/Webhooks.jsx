import React from 'react'
import { Webhook, Bell, Shield, Code } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const Webhooks = () => {
  const webhookEvents = [
    {
      event: 'order.created',
      description: 'Yeni sipariş oluşturuldu',
      payload: `{
  "event": "order.created",
  "data": {
    "id": 67890,
    "order_number": "ORD-2024-001",
    "status": "pending",
    "total_amount": 599.98,
    "customer": {
      "name": "Ahmet Yılmaz",
      "email": "ahmet@example.com"
    },
    "created_at": "2024-01-15T09:00:00Z"
  }
}`
    },
    {
      event: 'order.updated',
      description: 'Sipariş güncellendi',
      payload: `{
  "event": "order.updated",
  "data": {
    "id": 67890,
    "order_number": "ORD-2024-001",
    "status": "confirmed",
    "previous_status": "pending",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}`
    },
    {
      event: 'order.cancelled',
      description: 'Sipariş iptal edildi',
      payload: `{
  "event": "order.cancelled",
  "data": {
    "id": 67890,
    "order_number": "ORD-2024-001",
    "status": "cancelled",
    "cancellation_reason": "Customer request",
    "cancelled_at": "2024-01-15T11:00:00Z"
  }
}`
    },
    {
      event: 'product.stock_low',
      description: 'Ürün stoku azaldı',
      payload: `{
  "event": "product.stock_low",
  "data": {
    "product_id": 12345,
    "title": "Premium Kulaklık",
    "current_stock": 5,
    "threshold": 10,
    "timestamp": "2024-01-15T12:00:00Z"
  }
}`
    },
    {
      event: 'product.out_of_stock',
      description: 'Ürün stokta kalmadı',
      payload: `{
  "event": "product.out_of_stock",
  "data": {
    "product_id": 12345,
    "title": "Premium Kulaklık",
    "current_stock": 0,
    "timestamp": "2024-01-15T13:00:00Z"
  }
}`
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Webhooks</h1>
        <p className="text-xl text-gray-600">
          Gerçek zamanlı bildirimler ile sisteminizi güncel tutun
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-cozmopol-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Webhook Nedir?</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Webhook'lar, sisteminizde önemli olaylar gerçekleştiğinde otomatik olarak bildirim almanızı sağlar. 
          Cozmopol API, belirli olaylar gerçekleştiğinde HTTP POST istekleri göndererek sisteminizi bilgilendirir.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Avantajlar</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Gerçek zamanlı bildirimler</li>
            <li>• API polling ihtiyacını ortadan kaldırır</li>
            <li>• Sistem performansını artırır</li>
            <li>• Otomatik iş akışları oluşturabilirsiniz</li>
          </ul>
        </div>
      </div>

      {/* Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Code className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Webhook Kurulumu</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Webhook URL'i Kaydetme</h3>
            <p className="text-gray-600 mb-4">
              Partner Portal'dan webhook URL'inizi kaydedin ve hangi olayları dinlemek istediğinizi seçin.
            </p>
            <CodeBlock 
              code={`curl -X POST \\
  https://api.cozmopol.com/v2/webhooks \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "url": "https://yoursite.com/webhook",
    "events": ["order.created", "order.updated", "product.stock_low"],
    "secret": "your_webhook_secret"
  }'`}
              language="bash"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Webhook Endpoint Oluşturma</h3>
            <p className="text-gray-600 mb-4">
              Webhook'ları almak için bir HTTP endpoint oluşturun:
            </p>
            <CodeBlock 
              code={`// Node.js Express örneği
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-cozmopol-signature'];
  const payload = JSON.stringify(req.body);
  
  // İmza doğrulama
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature !== \`sha256=\${expectedSignature}\`) {
    return res.status(401).send('Unauthorized');
  }
  
  // Webhook işleme
  const { event, data } = req.body;
  
  switch (event) {
    case 'order.created':
      handleNewOrder(data);
      break;
    case 'order.updated':
      handleOrderUpdate(data);
      break;
    case 'product.stock_low':
      handleLowStock(data);
      break;
  }
  
  res.status(200).send('OK');
});`}
              language="javascript"
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Güvenlik</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Webhook'ların güvenliğini sağlamak için HMAC SHA256 imza doğrulaması kullanıyoruz.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">İmza Doğrulama</h3>
            <p className="text-gray-600 mb-4">
              Her webhook isteği <code className="bg-gray-100 px-2 py-1 rounded">X-Cozmopol-Signature</code> 
              header'ı ile birlikte gelir.
            </p>
            <CodeBlock 
              code={`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === \`sha256=\${expectedSignature}\`;
}`}
              language="javascript"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Güvenlik Önerileri</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Her zaman imza doğrulaması yapın</li>
              <li>• HTTPS kullanın</li>
              <li>• Webhook secret'ınızı güvenli saklayın</li>
              <li>• İdempotency kontrolü yapın</li>
              <li>• Rate limiting uygulayın</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Webhook className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Desteklenen Olaylar</h2>
        </div>
        
        <div className="space-y-8">
          {webhookEvents.map((webhook, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-center space-x-3 mb-4">
                <code className="bg-purple-100 text-purple-800 px-3 py-1 rounded font-mono text-sm">
                  {webhook.event}
                </code>
                <span className="text-gray-600">{webhook.description}</span>
              </div>
              <CodeBlock code={webhook.payload} language="json" />
            </div>
          ))}
        </div>
      </div>

      {/* Testing */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Webhook Test Etme</h2>
        
        <p className="text-gray-600 mb-4">
          Webhook'larınızı test etmek için Partner Portal'dan test webhook'ları gönderebilirsiniz.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">Test Araçları</h3>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• <strong>ngrok:</strong> Yerel geliştirme için tunnel oluşturun</li>
            <li>• <strong>webhook.site:</strong> Webhook'ları test etmek için geçici URL</li>
            <li>• <strong>Postman:</strong> Webhook simülasyonu yapın</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Webhooks