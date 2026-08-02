import {
	BookmarkAddOutlined,
	FitScreen,
	StarRate,
	Timer,
} from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedCourses({ note }) {
	const navigate = useNavigate();
	return (
		<div>
			<Stack direction="row" gap={2}>
				<Card sx={{ minWidth: 350 }}>
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
							height="175"
							image={require('../assets/database.jpg')}
							alt="database"
						/>
						<Stack direction="column" alignItems="left" gap={2}>
							<Typography variant="h3">Database Management</Typography>
							<Typography></Typography>
						</Stack>
						<Stack direction="row" alignItems="center" gap={1}>
							<Timer />
							<Typography>1H : 53M </Typography>
							<StarRate />
							<Typography>4.9/5</Typography>
							<CardActions>
								<Button
									variant="outlined"
									size="small"
									onClick={() => navigate('/details')}
									color="success"
								>
									Learn More
								</Button>
							</CardActions>
						</Stack>
					</CardContent>
				</Card>
				<Card sx={{ minWidth: 350 }}>
					<CardHeader
						action={
							<IconButton>
								<BookmarkAddOutlined />
							</IconButton>
						}
						avatar={
							<Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
								A
							</Avatar>
						}
						title="Agastya"
					/>
					<CardContent>
						<CardMedia
							component="img"
							height="175"
							image={require('../assets/ML.jpg')}
							alt="database"
						/>
						<Stack direction="column" alignItems="left" gap={2}>
							<Typography variant="h3">Machine Learning</Typography>
							<Typography></Typography>
						</Stack>
						<Stack direction="row" alignItems="center" gap={1}>
							<Timer />
							<Typography>59M </Typography>
							<StarRate />
							<Typography>4.3/5</Typography>
							<CardActions>
								<Button variant="outlined" size="small" color="success">
									Learn More
								</Button>
							</CardActions>
						</Stack>
					</CardContent>
				</Card>
				<Card sx={{ minWidth: 350 }}>
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
							component="img"
							height="175"
							image={require('../assets/AI.jpg')}
							alt="database"
						/>
						<Stack direction="column" alignItems="left" gap={2}>
							<Typography variant="h3">Artificial Intelligence</Typography>
							<Typography></Typography>
						</Stack>
						<Stack direction="row" alignItems="center" gap={1}>
							<Timer />
							<Typography>1H : 23M </Typography>
							<StarRate />
							<Typography>4.6/5</Typography>
							<CardActions>
								<Button variant="outlined" size="small" color="success">
									Learn More
								</Button>
							</CardActions>
						</Stack>
					</CardContent>
				</Card>
				<Card sx={{ minWidth: 350 }}>
					<CardHeader
						action={
							<IconButton>
								<BookmarkAddOutlined />
							</IconButton>
						}
						avatar={
							<Avatar sx={{ bgcolor: [500] }} aria-label="recipe">
								N
							</Avatar>
						}
						title="Nazir"
					/>
					<CardContent>
						<CardMedia
							component="img"
							height="175"
							image={require('../assets/Mech.jpeg')}
							alt="database"
						/>
						<Stack direction="column" alignItems="left" gap={2}>
							<Typography variant="h3">Mechanical</Typography>
							<Typography></Typography>
						</Stack>
						<Stack direction="row" alignItems="center" gap={1}>
							<Timer />
							<Typography>1H : 17M </Typography>
							<StarRate />
							<Typography>4.1/5</Typography>
							<CardActions>
								<Button variant="outlined" size="small" color="success">
									Learn More
								</Button>
							</CardActions>
						</Stack>
					</CardContent>
				</Card>
			</Stack>
		</div>
	);
}
