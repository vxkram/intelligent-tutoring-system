

import {
	Button,
	Card,
	CardActionArea,
	CardMedia,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContentDisplay = () => {
	const [resources, setResources] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchResources = async () => {
			try {
				const { data } = await axios.get(
					'http://localhost:8000/recommend-resources/'
				);
				setResources(data);
			} catch (error) {
				console.error('Error fetching resources:', error);
			}
		};

		fetchResources();
	}, []);

	const imageBaseUrl = 'http://localhost:8000/static';

	const imageNameFormatter = (title) => {
		return title.replace(/\s+/g, '_').toLowerCase() + '.jpg';
	};

	return (
		<Stack
			direction={'column'}
			alignItems={'center'}
			spacing={4}
			style={{ padding: 40 }}
		>
			{resources.map((resource, index) => (
				<Stack direction={'row'} gap={2} key={index}>
					<Card sx={{ maxWidth: 345, margin: 'auto' }}>
						<CardActionArea onClick={() => window.open(resource.url, '_blank')}>
							<CardMedia
								component="img"
								height="140"
								image={`${imageBaseUrl}/${imageNameFormatter(resource.title)}`}
								alt={resource.title}
							/>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								style={{ padding: '16px' }}
							>
								{resource.title}
							</Typography>
						</CardActionArea>
					</Card>
				</Stack>
			))}
		</Stack>
	);
};

export default ContentDisplay;
