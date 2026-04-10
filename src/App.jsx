import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import { useRouter } from './hooks/useRouter'
import ErrorBoundary from './ErrorBoundary'
import TopBar from './components/TopBar/TopBar'
import styles from './App.module.css'

const ModuleMap = lazy(() => import('./components/ModuleMap/ModuleMap'))
const LessonList = lazy(() => import('./components/LessonList/LessonList'))
const LessonView = lazy(() => import('./components/LessonView/LessonView'))

function AppContent() {
  const { route, params, navigate, goHome } = useRouter()

  return (
    <div className={styles.app}>
      <TopBar onLogoClick={goHome} />
      <main className={styles.content}>
        <ErrorBoundary>
          <Suspense fallback={null}>
            {route === 'home' && (
              <ModuleMap onModuleClick={(id) => navigate(`/module/${id}`)} />
            )}
            {route === 'module' && (
              <LessonList
                moduleId={params.moduleId}
                onBack={goHome}
                onLessonClick={(lessonId) =>
                  navigate(`/module/${params.moduleId}/lesson/${lessonId}`)
                }
              />
            )}
            {route === 'lesson' && (
              <LessonView
                moduleId={params.moduleId}
                lessonId={params.lessonId}
                onBack={() => navigate(`/module/${params.moduleId}`)}
                onNavigate={navigate}
              />
            )}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
