import React, { useState } from 'react'
import { ChevronDown, ChevronRight, CheckCircle, Clock, Wrench } from 'lucide-react'
import CodeBlock from './CodeBlock'

const EndpointCard = ({ method, path, description, parameters = [], response, example, status = 'development' }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('parameters')
  const [activeLanguage, setActiveLanguage] = useState('curl')
  const [isTestMode, setIsTestMode] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testParams, setTestParams] = useState({})

  const methodColors = {
    GET: 'endpoint-get',
    POST: 'endpoint-post',
    PUT: 'endpoint-put',
    DELETE: 'endpoint-delete'
  }

  const languages = [
    { id: 'curl', name: 'cURL', icon: '🌐' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'php', name: 'PHP', icon: '🐘' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'node', name: 'Node.js', icon: '🟢' }
  ]

  const generateCodeExample = (lang) => {
    const baseUrl = 'https://api.cozmopol.com'
    const fullUrl = `${baseUrl}${path}`
    const hasAuth = !path.includes('/test/') || path.includes('/auth/')
    
    switch (lang) {
      case 'curl':
        return example || `curl -X ${method} \\
  ${fullUrl} \\${hasAuth ? `
  -H 'Authorization: Bearer YOUR_API_KEY' \\` : ''}
  -H 'Content-Type: application/json'`

      case 'javascript':
        return `// Fetch API
const response = await fetch('${fullUrl}', {
  method: '${method}',
  headers: {${hasAuth ? `
    'Authorization': 'Bearer YOUR_API_KEY',` : ''}
    'Content-Type': 'application/json'
  }${method === 'POST' || method === 'PUT' ? `,
  body: JSON.stringify({
    // Request body here
  })` : ''}
});

const data = await response.json();
console.log(data);`

      case 'php':
        return `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '${fullUrl}',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => '${method}',
  CURLOPT_HTTPHEADER => array(${hasAuth ? `
    'Authorization: Bearer YOUR_API_KEY',` : ''}
    'Content-Type: application/json'
  ),${method === 'POST' || method === 'PUT' ? `
  CURLOPT_POSTFIELDS => json_encode(array(
    // Request body here
  ))` : ''}
));

$response = curl_exec($curl);
curl_close($curl);

$data = json_decode($response, true);
print_r($data);
?>`

      case 'python':
        return `import requests
import json

url = '${fullUrl}'
headers = {${hasAuth ? `
    'Authorization': 'Bearer YOUR_API_KEY',` : ''}
    'Content-Type': 'application/json'
}

${method === 'POST' || method === 'PUT' ? `data = {
    # Request body here
}

response = requests.${method.toLowerCase()}(url, headers=headers, json=data)` : `response = requests.${method.toLowerCase()}(url, headers=headers)`}

if response.status_code == 200:
    data = response.json()
    print(json.dumps(data, indent=2))
else:
    print(f'Error: {response.status_code}')`

      case 'node':
        return `const axios = require('axios');

const config = {
  method: '${method.toLowerCase()}',
  url: '${fullUrl}',
  headers: {${hasAuth ? `
    'Authorization': 'Bearer YOUR_API_KEY',` : ''}
    'Content-Type': 'application/json'
  }${method === 'POST' || method === 'PUT' ? `,
  data: {
    // Request body here
  }` : ''}
};

axios(config)
  .then(response => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error('Error:', error.response?.data || error.message);
  });`

      default:
        return example || `# ${lang} example not available`
    }
  }
  const getStatusBadge = (status) => {
    switch (status) {
      case 'stable':
        return (
          <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
            <CheckCircle className="w-3 h-3" />
            <span>Stable</span>
          </div>
        )
      case 'beta':
        return (
          <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200">
            <Clock className="w-3 h-3" />
            <span>Beta</span>
          </div>
        )
      case 'development':
        return (
          <div className="flex items-center space-x-1 bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs font-medium border border-orange-200">
            <Wrench className="w-3 h-3" />
            <span>Geliştiriliyor</span>
          </div>
        )
      default:
        return null
    }
  }

  const handleLiveTest = async () => {
    setIsLoading(true)
    setTestResult(null)
    
    try {
      const baseUrl = 'https://api.cozmopol.com'
      let url = `${baseUrl}${path}`
      
      // Query parametrelerini ekle
      if (method === 'GET' && Object.keys(testParams).length > 0) {
        const queryParams = new URLSearchParams()
        Object.entries(testParams).forEach(([key, value]) => {
          if (value && value.trim() !== '') {
            queryParams.append(key, value.trim())
          }
        })
        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`
        }
      }
      
      const headers = {
        'Content-Type': 'application/json'
      }
      
      // Test endpoint'leri için auth gerektirmez
      const requiresAuth = !path.includes('/test/') || path.includes('/auth/')
      if (requiresAuth && testParams.authorization) {
        headers['Authorization'] = `Bearer ${testParams.authorization}`
      }
      
      const requestOptions = {
        method,
        headers,
        mode: 'cors'
      }
      
      // POST/PUT için body ekle
      if ((method === 'POST' || method === 'PUT') && testParams.body) {
        try {
          requestOptions.body = JSON.stringify(JSON.parse(testParams.body))
        } catch (e) {
          throw new Error('Geçersiz JSON formatı')
        }
      }
      
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      
      setTestResult({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: data,
        success: response.ok
      })
    } catch (error) {
      setTestResult({
        status: 0,
        statusText: 'Network Error',
        headers: {},
        data: { error: error.message },
        success: false
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleParamChange = (key, value) => {
    setTestParams(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Test & Araçlar bölümü için canlı test özelliği
  const isTestEndpoint = path.includes('/test/') || path.includes('/auth/') || path.includes('/health') || path.includes('/products') || path.includes('/categories') || path.includes('/brands')

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all duration-200">
      <div 
        className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`endpoint-badge ${methodColors[method]}`}>
              {method}
            </span>
            <code className="text-slate-900 font-mono text-sm">{path}</code>
            <div className="flex items-center space-x-2">
              <span className="text-slate-600 hidden sm:block">{description}</span>
              {getStatusBadge(status)}
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </div>
        <div className="sm:hidden mt-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-sm">{description}</span>
            {getStatusBadge(status)}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-200">
          <div className="flex border-b border-slate-200">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'parameters'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('parameters')}
            >
              Parametreler
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'response'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('response')}
            >
              Yanıt
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'example'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('example')}
            >
              Örnek
            </button>
            {isTestEndpoint && (
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'test'
                    ? 'text-slate-900 border-b-2 border-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab('test')}
              >
                🧪 Canlı Test
              </button>
            )}
          </div>

          <div className="p-4">
            {activeTab === 'parameters' && (
              <div className="space-y-4">
                {parameters.length > 0 ? (
                  parameters.map((param, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
                        <code className="text-sm font-mono bg-slate-900 text-slate-100 px-2 py-1 rounded">
                          {param.name}
                        </code>
                        <span className={param.required ? 'parameter-required' : 'parameter-optional'}>
                          {param.required ? 'gerekli' : 'opsiyonel'}
                        </span>
                        <span className="parameter-type">{param.type}</span>
                      </div>
                      <p className="text-slate-600 text-sm">{param.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">Bu endpoint için parametre bulunmuyor.</p>
                )}
              </div>
            )}

            {activeTab === 'response' && response && (
              <CodeBlock code={response} language="json" />
            )}

            {activeTab === 'example' && example && (
              <div>
                <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-200 pb-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setActiveLanguage(lang.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeLanguage === lang.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{lang.icon}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
                <CodeBlock 
                  code={generateCodeExample(activeLanguage)} 
                  language={activeLanguage === 'curl' ? 'bash' : activeLanguage === 'node' ? 'javascript' : activeLanguage} 
                />
              </div>
            )}

            {activeTab === 'test' && isTestEndpoint && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🧪 Canlı API Testi</h4>
                  <p className="text-blue-700 text-sm">
                    Bu endpoint'i gerçek API sunucusunda test edin. Test endpoint'leri kimlik doğrulama gerektirmez.
                  </p>
                </div>

                {/* Test Parametreleri */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Test Parametreleri</h4>
                  
                  {/* Authorization (sadece gerekli endpoint'ler için) */}
                  {(!path.includes('/test/') || path.includes('/auth/')) && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Authorization Token (Opsiyonel)
                      </label>
                      <input
                        type="text"
                        placeholder="Bearer token'ınızı girin"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={testParams.authorization || ''}
                        onChange={(e) => handleParamChange('authorization', e.target.value)}
                      />
                    </div>
                  )}

                  {/* Query Parametreleri (GET istekleri için) */}
                  {method === 'GET' && parameters.filter(p => p.name !== 'Authorization').length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Query Parametreleri
                      </label>
                      <div className="space-y-2">
                        {parameters.filter(p => p.name !== 'Authorization').map((param, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <code className="text-xs bg-slate-100 px-2 py-1 rounded min-w-[100px]">
                              {param.name}
                            </code>
                            <input
                              type="text"
                              placeholder={param.description}
                              className="flex-1 px-3 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              value={testParams[param.name] || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Request Body (POST/PUT için) */}
                  {(method === 'POST' || method === 'PUT') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Request Body (JSON)
                      </label>
                      <textarea
                        rows={6}
                        placeholder='{"key": "value"}'
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        value={testParams.body || ''}
                        onChange={(e) => handleParamChange('body', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* Test Butonu */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLiveTest}
                    disabled={isLoading}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      isLoading
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isLoading ? '⏳ Test Ediliyor...' : '🚀 Test Et'}
                  </button>
                  
                  {testResult && (
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      testResult.success 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {testResult.status} {testResult.statusText}
                    </div>
                  )}
                </div>
          </div>
        </div>
      )}
    </div>
  )
}

                {/* Test Sonucu */}
                {testResult && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Test Sonucu</h4>
                    
                    {/* Response Headers */}
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Response Headers</h5>
                      <div className="bg-slate-50 rounded-lg p-3 text-xs font-mono">
                        {Object.entries(testResult.headers).map(([key, value]) => (
                          <div key={key} className="text-slate-600">
                            <span className="text-blue-600">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Response Body */}
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Response Body</h5>
                      <CodeBlock 
                        code={JSON.stringify(testResult.data, null, 2)} 
                        language="json" 
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
export default EndpointCard