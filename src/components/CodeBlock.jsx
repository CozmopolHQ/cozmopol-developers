import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const CodeBlock = ({ code, language = "bash", title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
      {title && (
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-sm font-medium border-b border-slate-700">
          {title}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-md"
          title={copied ? "Kopyalandı!" : "Kopyala"}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        <pre className="code-block pr-12">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
