import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import OpenAI from 'openai';

// 環境変数を読み込む
config();

const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// OpenAI APIクライアントの初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 敬語変換エンドポイント
app.post('/api/convert', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'テキストが必要です' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "あなたは日本語の敬語変換の専門家です。入力された文章を尊敬語、謙譲語、丁寧語の3種類に分けて変換してください。それぞれの変換結果を明確に区別して返してください。"
        },
        {
          role: "user",
          content: `以下の文章を尊敬語、謙譲語、丁寧語の3種類に分けて変換してください。
文章: ${text}

回答は以下の形式で返してください：
尊敬語: [尊敬語に変換した文章]
謙譲語: [謙譲語に変換した文章]
丁寧語: [丁寧語に変換した文章]`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = completion.choices[0].message.content;
    
    // 結果をパースして3種類の敬語に分ける
    const sonkeigoMatch = result.match(/尊敬語[:：]\s*([\s\S]*?)(?=謙譲語[:：]|$)/);
    const kenjougoMatch = result.match(/謙譲語[:：]\s*([\s\S]*?)(?=丁寧語[:：]|$)/);
    const teinegoMatch = result.match(/丁寧語[:：]\s*([\s\S]*?)(?=$)/);
    
    const sonkeigo = sonkeigoMatch ? sonkeigoMatch[1].trim() : '';
    const kenjourgo = kenjougoMatch ? kenjougoMatch[1].trim() : '';
    const teinego = teinegoMatch ? teinegoMatch[1].trim() : '';
    
    res.json({ 
      sonkeigo,
      kenjourgo,
      teinego,
      fullResult: result
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '変換中にエラーが発生しました' });
  }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 