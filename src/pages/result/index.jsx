import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Results = () => {
	const [plotImageUrl, setPlotImageUrl] = useState('');
	const [latestQuizResult, setLatestQuizResult] = useState('');

	useEffect(() => {
		const fetchPlotImage = async () => {
			try {
				const response = await axios.get('http://localhost:8000/plot-scores/', {
					responseType: 'blob',
				});
				const imageBlob = response.data;
				const imageObjectURL = URL.createObjectURL(imageBlob);
				setPlotImageUrl(imageObjectURL);
			} catch (error) {
				console.error('Error fetching plot image:', error);
			}
		};

		const fetchLatestQuizResult = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8000/latest-quiz-result/'
				);
				setLatestQuizResult(response.data.message);
			} catch (error) {
				console.error('Error fetching latest quiz result:', error);
			}
		};

		fetchPlotImage();
		fetchLatestQuizResult();
	}, []);

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justify="center"
			style={{ minHeight: '100vh' }}
		>
			<Card>
				<CardContent
					sx={{
						minWidth: 1100,
						minHeight: 650,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						align="center"
						variant="h2"
						sx={{ fontWeight: 'bold', marginBottom: '30px' }}
					>
						Quiz Results
					</Typography>
					{plotImageUrl && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								marginBottom: '20px',
							}}
						>
							<img
								src={plotImageUrl}
								alt="Quiz Scores Plot"
								style={{ maxWidth: '90%', height: 'auto' }}
							/>
						</div>
					)}
					{latestQuizResult && (
						<Typography align="center" sx={{ fontSize: '20px' }}>
							{latestQuizResult}
						</Typography>
					)}
					<Box mt={2} display="flex" justifyContent="center">
						<Link to="/ELM" style={{ textDecoration: 'none' }}>
							<Button
								variant="contained"
								sx={{ bgcolor: 'success.dark', color: 'white' }}
							>
								Explore Learning Methods
							</Button>
						</Link>
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default Results;
