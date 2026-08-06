import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import { Router } from './router.tsx'

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')!,
)
