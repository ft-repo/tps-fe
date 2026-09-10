import { useEffect } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { SessionBootstrap } from '@/components/shared'
import mockServer from './mock'
import appConfig from '@/configs/app.config'
import { isAndroidWebView, trySystemBrowserOpen } from '@/utils/platformOpen'
import './locales'
import '@ant-design/v5-patch-for-react-19';

const environment = process.env.NODE_ENV

/**
 * Set enableMock(Default false) to true at configs/app.config.js
 * If you wish to enable mock api
 */
if (environment !== 'production' && appConfig.enableMock) {
	mockServer({ environment })
}
function App() {

	// Put this inside your root component (e.g., App.tsx)
	useEffect(() => {
		const handleAndroidExternalLinks = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			// Find the closest anchor tag (in case they clicked an icon or text inside the link)
			const anchor = target.closest('a');

			if (anchor && anchor.getAttribute('target') === '_blank' && isAndroidWebView()) {
				const url = anchor.href;

				e.preventDefault(); // Stop the default webview behavior

				// Try handing off to the external browser (Commonly supported by hybrid wrappers)
				const newWindow = trySystemBrowserOpen(url);

				// Fallback: If window.open is blocked or fails, use a clean top-level push
				if (!newWindow) {
					window.location.href = url;
				}
			}
		};

		document.addEventListener('click', handleAndroidExternalLinks);
		return () => document.removeEventListener('click', handleAndroidExternalLinks);
	}, []);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SessionBootstrap />
				<BrowserRouter>
					<Theme>
						<Layout />
					</Theme>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	)
}

export default App
