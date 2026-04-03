import { useState, useEffect, useCallback } from 'react'

function parseHash(hash) {
  const path = hash.replace(/^#\/?/, '')
  if (!path) return { route: 'home', params: {} }

  const segments = path.split('/')

  if (segments[0] === 'module' && segments[2] === 'lesson') {
    return {
      route: 'lesson',
      params: { moduleId: segments[1], lessonId: segments[3] },
    }
  }

  if (segments[0] === 'module' && segments[1]) {
    return {
      route: 'module',
      params: { moduleId: segments[1] },
    }
  }

  return { route: 'home', params: {} }
}

export function useRouter() {
  const [state, setState] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => {
      setState(parseHash(window.location.hash))
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = useCallback((path) => {
    window.location.hash = '#' + path
  }, [])

  const goHome = useCallback(() => {
    window.location.hash = ''
  }, [])

  return { ...state, navigate, goHome }
}
