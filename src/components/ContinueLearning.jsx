import { BookmarkAddOutlined } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress, {
	LinearProgressProps,
} from '@mui/material/LinearProgress';
import React from 'react';

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 25 }}>
				<Typography variant="body2" color="text.green">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

export default function ContinueLearning({ note }) {
	const [progress, setProgress] = React.useState(10);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= 100 ? 10 : prevProgress + 10
			);
		}, 800);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div>
			<Stack direction="row" gap={2}>
				<Card sx={{ minWidth: 715, minHeight: 100 }}>
					<CardHeader
						action={
							<IconButton>
								<BookmarkAddOutlined />
							</IconButton>
						}
						avatar={
							<Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
								K
							</Avatar>
						}
						title="Karthik"
					/>
					<CardContent>
						<CardMedia
							component="img"
							height="50"
							image={require('../assets/database.jpg')}
							alt="database"
						/>
						<Stack direction="column" alignItems="right" gap={2}>
							<Typography variant="h5">Database Management</Typography>
							<Typography></Typography>
							<LinearProgressWithLabel value={23} />
						</Stack>
					</CardContent>
				</Card>
				<Card sx={{ minWidth: 715, minHeight: 100 }}>
					<CardHeader
						action={
							<IconButton>
								<BookmarkAddOutlined />
							</IconButton>
						}
						avatar={
							<Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
								R
							</Avatar>
						}
						title="Ram"
					/>
					<CardContent>
						<CardMedia
							sx={{ alignItems: 'left' }}
							component="img"
							height="50"
							image={require('../assets/AI.jpg')}
							alt="database"
						/>
						<Stack direction="column" alignItems="right" gap={2}>
							<Typography variant="h5">Artificial Intelligence</Typography>
							<Typography></Typography>
							<LinearProgressWithLabel value={67} />
						</Stack>
					</CardContent>
				</Card>
			</Stack>
		</div>
	);
}
