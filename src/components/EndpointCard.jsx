import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Play, Clock } from 'lucide-react'
import CodeBlock from './CodeBlock'

const EndpointCard = ({ method, path, description, status, parameters, response, example }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('parameters')
  const [activeLanguage, setActiveLanguage] = useState('curl')
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
    try {
      const baseUrl = 'https://backend-integration-mauve.vercel.app'
      const fullUrl = `${baseUrl}${path}`
      
      const response = await fetch(fullUrl, {
        method: method?.toUpperCase() || 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      setTestResult({
        status: response.status,
        statusText: response.statusText,
        data: data,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      setTestResult({
        status: 'error',
        statusText: 'Network Error',
        data: { error: error.message },
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

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
                {example ? (
                  <div>
                    {/* Language Selector */}
                    <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-50 rounded-lg">
                      {languages.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => setActiveLanguage(lang.id)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                            activeLanguage === lang.id
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          <span>{lang.icon}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Code Example */}
                    <CodeBlock 
                      code={generateCodeExample(activeLanguage)} 
                      language={activeLanguage === 'curl' ? 'bash' : activeLanguage === 'nodejs' ? 'javascript' : activeLanguage} 
                    />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-2">💻</div>
                    <p className="text-gray-500">No code example available</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'test' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Live API Test</h4>
                  <p className="text-blue-700 text-sm">
                    Test this endpoint against the live API server.
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${getMethodColor(method)}`}>
                      {method?.toUpperCase()}
                    </span>
                    <code className="text-sm font-mono text-gray-700">
                      https://backend-integration-mauve.vercel.app{path}
                    </code>
                  </div>
                  <button
                    onClick={handleLiveTest}
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Testing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Test</span>
                      </>
                    )}
                  </button>
                </div>

                {testResult && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-gray-900">Test Result</h5>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            testResult.status === 200 || testResult.status === 'error' 
                              ? testResult.status === 200 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {testResult.status} {testResult.statusText}
                          </span>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(testResult.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <CodeBlock 
                        code={JSON.stringify(testResult.data, null, 2)} 
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