import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearningMethods = () => {
	const navigate = useNavigate();

	const methods = [
		{
			title: 'Text Based Learning',
			imageName: 'Text Based Learning.png',
			navigateTo: '/pdf_sum',
		},
		{
			title: 'Video Based Learning',
			imageName: 'Video Based Learning.png',
			navigateTo: '/content_rec',
		},
	];

	return (
		<Box sx={{ flexGrow: 1, p: 2 }}>
			<Grid container spacing={2} justifyContent="center" alignItems="stretch">
				{methods.map((method, index) => (
					<Grid item xs={12} sm={4} key={index} sx={{ display: 'flex' }}>
						<Card
							sx={{
								width: '100%',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<CardActionArea
								sx={{ flexGrow: 1 }}
								onClick={() => navigate(method.navigateTo)}
							>
								<CardMedia
									component="img"
									image={`http://127.0.0.1:8000/static/${method.imageName}`}
									alt={method.title}
									sx={{
										objectFit: 'contain',
										maxHeight: '50%', // You can adjust the percentage as needed
									}}
								/>
								<CardContent
									sx={{
										flexGrow: 1,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Typography variant="h5" textAlign="center">
										{method.title}
									</Typography>
								</CardContent>
							</CardActionArea>
							<Button
								fullWidth
								variant="contained"
								onClick={() => navigate(method.navigateTo)}
							>
								Start
							</Button>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default LearningMethods;
