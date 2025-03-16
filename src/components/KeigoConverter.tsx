import { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaSpinner, FaExchangeAlt } from 'react-icons/fa';

const KeigoConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          変換したいテキスト
        </label>
        <textarea
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="ここに普通の文章を入力してください"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={4}
        />
      </div>

      <div className="flex justify-center my-4">
        <button
          onClick={convertToKeigo}
          disabled={isLoading || !inputText.trim()}
          className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg transition-colors duration-200"
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
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {outputText && (
        <div className="mt-4">
          <label htmlFor="outputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            敬語変換結果
          </label>
          <div
            id="outputText"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white min-h-[100px]"
          >
            {outputText}
          </div>
        </div>
      )}
    </div>
  );
};

export default KeigoConverter; 