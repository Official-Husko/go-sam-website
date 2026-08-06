import { useEffect } from 'preact/hooks'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Docs } from './pages/Docs'
import { Download } from './pages/Download'
import { Landing } from './pages/Landing'
import { useRouter } from './router'
import './app.css'

const TITLES: Record<string, string> = {
  '/': 'GO-SAM | Steam Achievement Manager, reimplemented in Go',
  '/download': 'Download | GO-SAM',
  '/docs': 'Docs | GO-SAM',
}

export function App() {
  const { path } = useRouter()

  useEffect(() => {
    document.title = TITLES[path] ?? TITLES['/']
  }, [path])

  return (
    <>
      <Header />
      <main>
        {path === '/' && <Landing />}
        {path === '/download' && <Download />}
        {path === '/docs' && <Docs />}
      </main>
      <Footer />
    </>
  )
}
