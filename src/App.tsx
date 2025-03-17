import { useState } from 'react'
import KeigoConverter from './components/KeigoConverter'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 transition-colors duration-300 flex flex-col">
      <nav className="w-full py-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary-600">敬語変換アプリ</h1>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-full lg:max-w-6xl xl:max-w-7xl">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text animate-gradient bg-size-200 mb-2">
              敬語変換アプリ
            </h2>
            <p className="text-gray-600">普通の文章を丁寧な敬語に変換します</p>
          </header>
          <KeigoConverter />
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-gray-500 bg-white/80 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} 敬語変換アプリ</p>
      </footer>
    </div>
  )
}

export default App 