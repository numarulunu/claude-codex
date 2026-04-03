import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import { useRouter } from './hooks/useRouter'
import TopBar from './components/TopBar/TopBar'
import ModuleMap from './components/ModuleMap/ModuleMap'
import LessonList from './components/LessonList/LessonList'
import LessonView from './components/LessonView/LessonView'
import styles from './App.module.css'

function AppContent() {
  const { route, params, navigate, goHome } = useRouter()

  return (
    <div className={styles.app}>
      <TopBar onLogoClick={goHome} />
      <main className={styles.content}>
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
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </ThemeProvider>
  )
}
