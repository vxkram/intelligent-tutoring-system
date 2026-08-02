import {
	Button,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PdfList = () => {
	const [pdfs, setPdfs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		axios
			.get('http://127.0.0.1:8000/pdfs/')
			.then((response) => {
				setPdfs(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching PDFs:', error);
				setError('Failed to fetch PDFs');
				setLoading(false);
			});
	}, []);

	const handleAction = (pdfId, action) => {
		if (action === 'download') {
			window.open(`http://127.0.0.1:8000/download-pdf/${pdfId}`, '_blank');
		} else if (action === 'summarize') {
			// The backend returns the summary as a one-page PDF (not JSON),
			// so open it the same way as a download rather than reading it
			// as response.data.summary.
			window.open(`http://127.0.0.1:8000/summarize-pdf/${pdfId}`, '_blank');
		}
	};

	return (
		<Paper style={{ padding: 16 }}>
			{loading && <CircularProgress />}
			{error && <Typography color="error">{error}</Typography>}
			<List>
				{pdfs.map((pdf) => (
					<ListItem key={pdf.id}>
						<ListItemText primary={pdf.title} />
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleAction(pdf.id, 'download')}
						>
							Download
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => handleAction(pdf.id, 'summarize')}
							style={{ marginLeft: 8 }}
						>
							Summarize
						</Button>
					</ListItem>
				))}
			</List>
		</Paper>
	);
};

export default PdfList;
