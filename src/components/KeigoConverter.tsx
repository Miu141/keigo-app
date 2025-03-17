import { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaSpinner, FaExchangeAlt, FaCopy, FaCheck } from 'react-icons/fa';

const KeigoConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToKeigo = async () => {
    if (!inputText.trim()) {
      setError('テキストを入力してください');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // OpenAI APIを使用して敬語に変換
      const response = await axios.post('/api/convert', { text: inputText });
      setOutputText(response.data.result);
    } catch (err) {
      console.error('Error converting text:', err);
      setError('変換中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 transition-all duration-300 hover:shadow-lg w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
            変換したいテキスト
          </label>
          <div className="relative h-full">
            <textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="ここに普通の文章を入力してください"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 transition-colors duration-200 h-full min-h-[200px]"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {inputText.length} 文字
            </div>
          </div>
        </div>

        {outputText ? (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="outputText" className="block text-sm font-medium text-gray-700">
                敬語変換結果
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                {copied ? (
                  <>
                    <FaCheck className="mr-1" />
                    コピーしました
                  </>
                ) : (
                  <>
                    <FaCopy className="mr-1" />
                    コピー
                  </>
                )}
              </button>
            </div>
            <div
              id="outputText"
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 min-h-[200px] transition-colors duration-200"
            >
              {outputText}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="text-center text-gray-500 p-8">
              <p>左側のテキストを入力して「敬語に変換する」ボタンをクリックすると、ここに変換結果が表示されます。</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={convertToKeigo}
          disabled={isLoading || !inputText.trim()}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              変換中...
            </>
          ) : (
            <>
              <FaExchangeAlt className="mr-2" />
              敬語に変換する
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg border-l-4 border-red-500 animate-pulse">
          {error}
        </div>
      )}
    </div>
  );
};

export default KeigoConverter; 