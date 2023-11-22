import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Home from '@/components/home/Home'

const inter = Inter({ subsets: ['latin'] })

export default function App() {
  return <div className="app">
  <h1>React APP</h1>
  <Home />
</div>
}
