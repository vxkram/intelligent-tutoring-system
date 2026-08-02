import {
	Button,
	Card,
	CardContent,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
	const navigate = useNavigate();
	const [quizData, setQuizData] = useState([]);
	const [selectedOptions, setSelectedOptions] = useState([]);

	useEffect(() => {
		const fetchQuizData = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:8000/quiz/');
				setQuizData(response.data);
				setSelectedOptions(
					Array.from({ length: response.data.length }, () => '')
				);
			} catch (error) {
				console.error('Error fetching quiz data:', error);
			}
		};
		fetchQuizData();
	}, []);

	const handleOptionChange = (questionIndex, option) => {
		const newSelectedOptions = [...selectedOptions];
		newSelectedOptions[questionIndex] = option;
		setSelectedOptions(newSelectedOptions);
	};

	const handleSubmit = async () => {
		const submission = {
			answers: quizData.reduce((acc, question, index) => {
				acc[question.question] = selectedOptions[index];
				return acc;
			}, {}),
		};

		try {
			await axios.post('http://127.0.0.1:8000/quiz/', submission);
			navigate('/result');
		} catch (error) {
			console.error('Error submitting quiz answers:', error.response?.data);
		}
	};

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh', padding: '20px' }}
		>
			<Card sx={{ maxWidth: 800, width: '100%' }}>
				<CardContent>
					{quizData.map((question, questionIndex) => (
						<Paper
							key={questionIndex}
							elevation={3}
							sx={{ margin: '20px', padding: '20px' }}
						>
							<Typography variant="h5" gutterBottom>
								Question {questionIndex + 1}: {question.question}
							</Typography>
							<Divider sx={{ marginBottom: '20px' }} />
							<FormControl component="fieldset">
								<RadioGroup
									aria-label="quiz"
									name={`quiz${questionIndex}`}
									value={selectedOptions[questionIndex]}
									onChange={(event) =>
										handleOptionChange(questionIndex, event.target.value)
									}
								>
									{question.options.map((option, optionIndex) => {
										const isSelected =
											selectedOptions[questionIndex] === option;
										return (
											<FormControlLabel
												key={optionIndex}
												value={option}
												control={
													<Radio sx={{ color: isSelected ? 'green' : '' }} />
												}
												label={option}
												sx={{
													'.MuiFormControlLabel-label': {
														color: isSelected ? 'green' : '',
													},
												}}
											/>
										);
									})}
								</RadioGroup>
							</FormControl>
						</Paper>
					))}
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						sx={{ marginTop: '20px' }}
					>
						<Button
							variant="contained"
							color="success"
							onClick={handleSubmit}
							sx={{
								marginTop: '20px',
								transition: 'background-color 0.3s',
								':hover': {
									filter: 'brightness(0.85)',
								},
							}}
						>
							Submit
						</Button>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default Quiz;
