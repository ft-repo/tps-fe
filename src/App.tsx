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

			if (anchor && anchor.getAttribute('target') === '_blank') {
				const url = anchor.href;

				// 1. Check if the user is on an Android device
				const isAndroid = /Android/i.test(navigator.userAgent);

				if (isAndroid) {
					e.preventDefault(); // Stop the default webview behavior

					// 2. Try window.open with '_system' (Commonly supported by hybrid wrappers)
					const newWindow = window.open(url, '_system');

					// 3. Fallback: If window.open is blocked or fails, use a clean top-level push
					if (!newWindow) {
						window.location.href = url;
					}
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
