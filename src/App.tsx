import { useState } from 'react'
import KeigoConverter from './components/KeigoConverter'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">敬語変換アプリ</h1>
          <p className="text-gray-600 dark:text-gray-300">普通の文章を丁寧な敬語に変換します</p>
        </header>
        <KeigoConverter />
      </div>
    </div>
  )
}

export default App 