import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Sidebar from './pages/global/Sidebar';
import Topbar from './pages/global/Topbar';
import Exlm from './pages/ELM';
import ContentRec from './pages/content_rec';
import Details from './pages/courseDetails';
import './pages/global/sidebarStyle.css';
import Login from './pages/login';
import PdfSum from './pages/pdf_sum';
import Quiz from './pages/quiz';
import Quiz2 from './pages/quiz_2';
import Register from './pages/register/index';
import Result from './pages/result';
import { ColorModeContext, useMode } from './theme';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<Sidebar />
					<main className="content">
						<Topbar />
						<Routes>
							<Route path="/register" element={<Register />} />
							<Route path="/" element={<Login />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/details" element={<Details />} />
							<Route path="/quiz" element={<Quiz />} />
							<Route path="/result" element={<Result />} />
							<Route path="/content_rec" element={<ContentRec />} />
							<Route path="/pdf_sum" element={<PdfSum />} />
							<Route path="/quiz_2" element={<Quiz2 />} />
							<Route path="/ELM" element={<Exlm />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
