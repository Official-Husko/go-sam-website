import { createContext, type ComponentChildren, type JSX } from 'preact'
import { useContext, useEffect, useState, useCallback } from 'preact/hooks'

export type Route = '/' | '/download' | '/docs'

interface RouterState {
  path: Route
  navigate: (to: Route) => void
}

const routes: Route[] = ['/', '/download', '/docs']

function resolve(pathname: string): Route {
  return (routes as string[]).includes(pathname) ? (pathname as Route) : '/'
}

const RouterContext = createContext<RouterState | null>(null)

export function Router({ children }: { children: ComponentChildren }) {
  const [path, setPath] = useState<Route>(() => resolve(location.pathname))

  useEffect(() => {
    const onPopState = () => setPath(resolve(location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to: Route) => {
    if (to === location.pathname) return
    history.pushState(null, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used inside <Router>')
  return ctx
}

interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  to: Route
}

export function Link({ to, class: className, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter()

  const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
    if (typeof onClick === 'function') onClick(event)
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }

  return <a href={to} class={className} onClick={handleClick} {...rest} />
}
