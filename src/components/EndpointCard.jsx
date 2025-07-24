import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Play, Clock } from 'lucide-react'
import CodeBlock from './CodeBlock'

const EndpointCard = ({ method, path, description, status, parameters, response, example }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('parameters')
  const [activeLanguage, setActiveLanguage] = useState('curl')
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testParams, setTestParams] = useState({})

  const handleParamChange = (key, value) => {
    setTestParams(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const getMethodColor = (method) => {
    switch (method?.toUpperCase()) {
      case 'GET':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      case 'POST':
        return 'bg-blue-50 text-blue-700 border border-blue-200'
      case 'PUT':
        return 'bg-amber-50 text-amber-700 border border-amber-200'
      case 'DELETE':
        return 'bg-red-50 text-red-700 border border-red-200'
      case 'PATCH':
        return 'bg-purple-50 text-purple-700 border border-purple-200'
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable':
        return 'bg-green-50 text-green-700 border border-green-200'
      case 'development':
        return 'bg-orange-50 text-orange-700 border border-orange-200'
      case 'deprecated':
        return 'bg-red-50 text-red-700 border border-red-200'
      case 'beta':
        return 'bg-blue-50 text-blue-700 border border-blue-200'
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200'
    }
  }

  const languages = [
    { id: 'curl', name: 'cURL', icon: '🌐' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'nodejs', name: 'Node.js', icon: '🟢' },
    { id: 'php', name: 'PHP', icon: '🐘' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' }
  ]

  const generateCodeExample = (lang) => {
    const baseUrl = 'https://backend-integration-mauve.vercel.app'
    const fullUrl = `${baseUrl}${path}`
    const hasAuth = !path.includes('/test/') || path.includes('/auth/')
    const hasBody = method === 'POST' || method === 'PUT'

    switch (lang) {
      case 'curl':
        return example || `curl -X ${method} \\
  ${fullUrl} \\${hasAuth ? `
  -H 'Authorization: Bearer YOUR_API_KEY' \\` : ''}
  -H 'Content-Type: application/json'${hasBody ? ` \\
  -d '{
    "key": "value"
  }'` : ''}`

      case 'javascript':
        return `// Fetch API
const response = await fetch('${fullUrl}', {
  method: '${method}',
  headers: {${hasAuth ? `
    'Authorization': 'Bearer YOUR_API_KEY',` : ''}
    'Content-Type': 'application/json'
  }${hasBody ? `,
  body: JSON.stringify({
    // Request body
    key: 'value'
  })` : ''}
});

const data = await response.json();
console.log(data);`

      case 'nodejs':
        return `// Node.js with axios
const axios = require('axios');

const config = {
  method: '${method.toLowerCase()}',
  url: '${fullUrl}',
  headers: {${hasAuth ? `
    'Authorization': 'Bearer YOUR_API_KEY',` : ''}
    'Content-Type': 'application/json'
  }${hasBody ? `,
  data: {
    // Request body
    key: 'value'
  }` : ''}
};

axios(config)
  .then(response => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error('Error:', error.response?.data || error.message);
  });`

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
  ),${hasBody ? `
  CURLOPT_POSTFIELDS => json_encode(array(
    // Request body
    'key' => 'value'
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

${hasBody ? `data = {
    # Request body
    'key': 'value'
}

response = requests.${method.toLowerCase()}(url, headers=headers, json=data)` : `response = requests.${method.toLowerCase()}(url, headers=headers)`}

if response.status_code == 200:
    data = response.json()
    print(json.dumps(data, indent=2))
else:
    print(f'Error: {response.status_code} - {response.text}')`

      case 'java':
        return `// Java with OkHttp
import okhttp3.*;
import java.io.IOException;

public class ApiClient {
    private static final OkHttpClient client = new OkHttpClient();
    
    public static void main(String[] args) throws IOException {
        ${hasBody ? `MediaType JSON = MediaType.get("application/json; charset=utf-8");
        RequestBody body = RequestBody.create(
            "{\\"key\\": \\"value\\"}", JSON);
        ` : ''}
        Request request = new Request.Builder()
            .url("${fullUrl}")
            .${method.toLowerCase()}(${hasBody ? 'body' : ''})${hasAuth ? `
            .addHeader("Authorization", "Bearer YOUR_API_KEY")` : ''}
            .addHeader("Content-Type", "application/json")
            .build();
            
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }
            System.out.println(response.body().string());
        }
    }
}`

      default:
        return example || `# ${lang} example not available`
    }
  }

  const handleLiveTest = async () => {
    setIsLoading(true)
    setTestResult(null)
    
    try {
      const baseUrl = 'https://backend-integration-mauve.vercel.app'
      let fullUrl = `${baseUrl}${path}`
      
      // Path parametrelerini değiştir
      if (path.includes('{') && path.includes('}')) {
        const pathParams = path.match(/\{([^}]+)\}/g)
        if (pathParams) {
          pathParams.forEach(param => {
            const paramName = param.slice(1, -1)
            const paramValue = testParams[paramName]
            if (paramValue && paramValue.trim() !== '') {
              fullUrl = fullUrl.replace(param, paramValue.trim())
            } else {
              throw new Error(`Path parametresi gerekli: ${paramName}`)
            }
          })
        }
      }

      // Query parametrelerini ekle (GET istekleri için)
      if (method === 'GET' && parameters && parameters.length > 0) {
        const queryParams = new URLSearchParams()
        parameters.forEach(param => {
          if (param.name !== 'Authorization' && !param.description?.includes('Header')) {
            const value = testParams[param.name]
            if (value && value.trim() !== '') {
              queryParams.append(param.name, value.trim())
            } else if (param.required) {
              throw new Error(`Gerekli parametre eksik: ${param.name}`)
            }
          }
        })
        if (queryParams.toString()) {
          fullUrl += `?${queryParams.toString()}`
        }
      }

      // Headers oluştur
      const headers = {
        'Content-Type': 'application/json',
      }

      // Authorization token ekle
      if (testParams.authorization && testParams.authorization.trim() !== '') {
        const token = testParams.authorization.trim()
        headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`
      } else if (!path.includes('/test/') || path.includes('/auth/')) {
        // Test endpoint'leri dışında token gerekli
        throw new Error('Authorization token gerekli')
      }

      // Diğer header parametrelerini ekle
      if (parameters) {
        parameters.forEach(param => {
          if (param.name !== 'Authorization' && param.description?.includes('Header')) {
            const value = testParams[param.name]
            if (value && value.trim() !== '') {
              headers[param.name] = value.trim()
            } else if (param.required) {
              throw new Error(`Gerekli header eksik: ${param.name}`)
            }
          }
        })
      }

      // Request options oluştur
      const requestOptions = {
        method: method?.toUpperCase() || 'GET',
        headers: headers,
      }

      // Request body ekle (POST/PUT için)
      if ((method === 'POST' || method === 'PUT') && testParams.body) {
        try {
          // JSON validation
          const parsedBody = JSON.parse(testParams.body)
          requestOptions.body = JSON.stringify(parsedBody)
        } catch (jsonError) {
          throw new Error('Geçersiz JSON formatı: ' + jsonError.message)
        }
      } else if ((method === 'POST' || method === 'PUT') && parameters && parameters.some(p => p.required && !p.description?.includes('Header'))) {
        // POST/PUT için body gerekli mi kontrol et
        const requiredBodyParams = parameters.filter(p => p.required && !p.description?.includes('Header') && p.name !== 'Authorization')
        if (requiredBodyParams.length > 0) {
          throw new Error('Request body gerekli')
        }
      }
      
      console.log('Test isteği gönderiliyor:', {
        url: fullUrl,
        method: requestOptions.method,
        headers: requestOptions.headers,
        body: requestOptions.body
      })

      const response = await fetch(fullUrl, requestOptions)
      
      // Response headers'ı al
      const responseHeaders = {}
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      let data
      try {
        data = await response.json()
      } catch (e) {
        // JSON parse edilemezse text olarak al
        data = await response.text()
      }
      
      setTestResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data: data,
        timestamp: new Date().toISOString(),
        url: fullUrl
      })
    } catch (error) {
      console.error('Test hatası:', error)
      setTestResult({
        success: false,
        status: 'error',
        statusText: 'Test Hatası',
        headers: {},
        data: { 
          error: error.message,
          type: 'client_error'
        },
        timestamp: new Date().toISOString(),
        url: fullUrl || 'URL oluşturulamadı'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Tüm endpoint'ler için test özelliği aktif
  const isTestEndpoint = true

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-md text-sm font-medium ${getMethodColor(method)}`}>
              {method?.toUpperCase()}
            </span>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <code className="text-gray-900 font-mono text-sm font-medium">{path}</code>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(status)}`}>
                  {status === 'stable' ? 'Stable' : status === 'development' ? 'Dev' : status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{description}</p>
            </div>
          </div>
          <div className="ml-4">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100">
          <div className="flex border-b border-gray-100 bg-gray-50">
            {['parameters', 'response', 'example', 'test'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'parameters' && 'Parameters'}
                {tab === 'response' && 'Response'}
                {tab === 'example' && 'Example'}
                {tab === 'test' && 'Test'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'parameters' && (
              <div>
                {parameters && parameters.length > 0 ? (
                  <div className="space-y-4">
                    {parameters.map((param, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                              {param.name}
                            </code>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              param.required 
                                ? 'bg-red-100 text-red-700 border border-red-200' 
                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}>
                              {param.required ? 'Required' : 'Optional'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 font-mono">{param.type}</span>
                        </div>
                        <p className="text-sm text-gray-600">{param.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-2">📝</div>
                    <p className="text-gray-500">No parameters required</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'response' && (
              <div>
                {response ? (
                  <CodeBlock code={response} language="json" />
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-2">📄</div>
                    <p className="text-gray-500">No response example available</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'example' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Code Examples</h3>
                  <div className="flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          activeLanguage === lang.id
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveLanguage(lang.id)}
                      >
                        <span className="mr-1">{lang.icon}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                <CodeBlock 
                  code={generateCodeExample(activeLanguage)} 
                  language={activeLanguage === 'curl' ? 'bash' : activeLanguage} 
                />
              </div>
            )}

            {activeTab === 'test' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Live API Test</h3>
                  <div className="text-sm text-slate-500">
                    Test this endpoint with real parameters
                  </div>
                </div>

                {/* Parametre Input'ları */}
                {parameters && parameters.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Parameters</h4>
                    {parameters.map((param, index) => (
                      <div key={index} className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                            {param.name}
                          </code>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            param.required 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {param.required ? 'Required' : 'Optional'}
                          </span>
                          <span className="text-sm text-slate-500">({param.type})</span>
                        </label>
                        <input
                          type="text"
                          placeholder={param.description}
                          value={testParams[param.name] || ''}
                          onChange={(e) => handleParamChange(param.name, e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Authorization Token */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                      Authorization
                    </code>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                      Optional
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bearer token or just the token"
                    value={testParams.authorization || ''}
                    onChange={(e) => handleParamChange('authorization', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Request Body (POST/PUT için) */}
                {(method === 'POST' || method === 'PUT') && (
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                        Request Body
                      </code>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                        JSON
                      </span>
                    </label>
                    <textarea
                      rows={6}
                      placeholder='{"key": "value"}'
                      value={testParams.body || ''}
                      onChange={(e) => handleParamChange('body', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    />
                  </div>
                )}

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

                {/* Test Sonucu */}
                {testResult && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-900">Test Sonucu</h4>
                      <div className="text-xs text-slate-500">
                        {new Date(testResult.timestamp).toLocaleString('tr-TR')}
                      </div>
                    </div>

                    {/* Test URL */}
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Test URL</h5>
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded block break-all">
                        {testResult.url}
                      </code>
                    </div>

                    {/* Response Headers */}
                    {Object.keys(testResult.headers).length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-700 mb-2">Response Headers</h5>
                        <div className="bg-slate-50 rounded-lg p-3 text-xs font-mono max-h-32 overflow-y-auto">
                          {Object.entries(testResult.headers).map(([key, value]) => (
                            <div key={key} className="text-slate-600">
                              <span className="text-blue-600">{key}:</span> {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Response Body */}
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Response Body</h5>
                      <CodeBlock 
                        code={typeof testResult.data === 'string' ? testResult.data : JSON.stringify(testResult.data, null, 2)} 
                        language={typeof testResult.data === 'string' ? 'text' : 'json'} 
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EndpointCard