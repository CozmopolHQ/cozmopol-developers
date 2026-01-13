import React, { useState } from 'react'
import { BASE_URL } from '../config'
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
    const baseUrl = BASE_URL
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
      const baseUrl = BASE_URL
      let url = `${baseUrl}${path}`

      // Path parametrelerini değiştir (örn: /api/products/{id} -> /api/products/123)
      if (path.includes('{') && path.includes('}')) {
        const pathParams = path.match(/\{([^}]+)\}/g)
        if (pathParams) {
          pathParams.forEach(param => {
            const paramName = param.slice(1, -1) // Remove { }
            const paramValue = testParams[paramName]
            if (paramValue) {
              url = url.replace(param, paramValue)
            }
          })
        }
      }

      // Query parametrelerini ekle
      if (method === 'GET' && Object.keys(testParams).length > 0) {
        const queryParams = new URLSearchParams()
        Object.entries(testParams).forEach(([key, value]) => {
          if (value && value.trim() !== '' && key !== 'authorization' && key !== 'body' && !path.includes(`{${key}}`)) {
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

      // Authorization token ekle
      if (testParams.authorization && testParams.authorization.trim()) {
        headers['Authorization'] = `Bearer ${testParams.authorization}`
      }

      let requestOptions = {
        method: method?.toUpperCase() || 'GET',
        headers: headers
      }

      // Request body ekle (POST/PUT için)
      if ((method === 'POST' || method === 'PUT') && testParams.body) {
        try {
          JSON.parse(testParams.body) // JSON geçerliliğini kontrol et
          requestOptions.body = testParams.body
        } catch (e) {
          throw new Error('Geçersiz JSON formatı')
        }
      }

      const response = await fetch(url, requestOptions)
      const responseHeaders = {}
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      let data
      try {
        data = await response.json()
      } catch (e) {
        data = await response.text()
      }

      setTestResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data: data,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      setTestResult({
        success: false,
        status: 'error',
        statusText: 'Network Error',
        headers: {},
        data: { error: error.message },
        timestamp: new Date().toISOString()
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
                className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab
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
                            <span className={`px-2 py-1 rounded text-xs font-medium ${param.required
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
                <div className="flex flex-wrap gap-2 mb-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeLanguage === lang.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      onClick={() => setActiveLanguage(lang.id)}
                    >
                      <span className="mr-2">{lang.icon}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
                <CodeBlock
                  code={generateCodeExample(activeLanguage)}
                  language={activeLanguage === 'nodejs' ? 'javascript' : activeLanguage}
                />
              </div>
            )}

            {activeTab === 'test' && (
              <div>
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Live API Test</h3>

                  {/* Authorization Token */}
                  {(!path.includes('/test/') || path.includes('/auth/')) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Authorization Token
                      </label>
                      <input
                        type="text"
                        placeholder="Bearer token (optional for test endpoints)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={testParams.authorization || ''}
                        onChange={(e) => handleParamChange('authorization', e.target.value)}
                      />
                    </div>
                  )}

                  {/* Path Parameters */}
                  {path.includes('{') && path.includes('}') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Path Parameters
                      </label>
                      {path.match(/\{([^}]+)\}/g)?.map((param) => {
                        const paramName = param.slice(1, -1)
                        return (
                          <div key={paramName} className="mb-2">
                            <input
                              type="text"
                              placeholder={`${paramName} (required)`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={testParams[paramName] || ''}
                              onChange={(e) => handleParamChange(paramName, e.target.value)}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Query Parameters for GET requests */}
                  {method === 'GET' && parameters && parameters.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Query Parameters
                      </label>
                      {parameters.filter(p => p.in === 'query').map((param) => (
                        <div key={param.name} className="mb-2">
                          <input
                            type="text"
                            placeholder={`${param.name} ${param.required ? '(required)' : '(optional)'}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={testParams[param.name] || ''}
                            onChange={(e) => handleParamChange(param.name, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Request Body for POST/PUT */}
                  {(method === 'POST' || method === 'PUT') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Request Body (JSON)
                      </label>
                      <textarea
                        rows={6}
                        placeholder='{"key": "value"}'
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        value={testParams.body || ''}
                        onChange={(e) => handleParamChange('body', e.target.value)}
                      />
                    </div>
                  )}

                  <button
                    onClick={handleLiveTest}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Clock className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span>{isLoading ? 'Testing...' : 'Send Request'}</span>
                  </button>
                </div>

                {/* Test Results */}
                {testResult && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">Response</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${testResult.success
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                          }`}>
                          {testResult.status} {testResult.statusText}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(testResult.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {/* Response Headers */}
                    {Object.keys(testResult.headers).length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Headers</h5>
                        <div className="bg-white border rounded p-2 text-xs font-mono">
                          {Object.entries(testResult.headers).map(([key, value]) => (
                            <div key={key} className="text-gray-600">
                              <span className="text-blue-600">{key}:</span> {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Response Body */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Body</h5>
                      <CodeBlock
                        code={typeof testResult.data === 'string' ? testResult.data : JSON.stringify(testResult.data, null, 2)}
                        language="json"
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