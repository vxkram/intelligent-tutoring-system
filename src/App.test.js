import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders the login page at the root route without crashing', () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test('renders sidebar navigation for every real route', () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	for (const label of ['Dashboard', 'Learning Methods', 'Take Quiz', 'My Results', 'Recommendations', 'PDF Summaries']) {
		expect(screen.getByText(label)).toBeInTheDocument();
	}
});
