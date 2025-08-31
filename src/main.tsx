import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/global.css'
import ErrorBoundary from './Components/widgets/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</StrictMode>
)
