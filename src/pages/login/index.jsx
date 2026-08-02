import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';

const Login = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// NOTE: this doesn't check credentials against anything yet — see README.
		navigate('/dashboard');
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Box
					display="flex"
					flexDirection={'column'}
					maxWidth={450}
					alignItems="center"
					justifyContent={'center'}
					margin="auto"
					marginTop={5}
					padding={5}
					borderRadius={2}
					boxShadow={'5px 5px 15px #ccc'}
					color={colors.primary[100]}
				>
					<Typography variant="h3" padding={3} textAlign="center">
						Login
					</Typography>
					<TextField
						sx={{ minWidth: 300 }}
						type={'email'}
						margin="dense"
						variant="outlined"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						sx={{ minWidth: 300 }}
						type={'password'}
						margin="dense"
						variant="outlined"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Box display="flex" flexDirection={'row'}>
						<Button
							type="button"
							variant="contained"
							color="success"
							sx={{ marginTop: 2, borderRadius: 1, margin: 2 }}
							onClick={() => navigate('/register')}
						>
							Sign Up
						</Button>
						<Button
							type="submit"
							variant="contained"
							color="success"
							sx={{ marginTop: 2, borderRadius: 1, margin: 2 }}
						>
							Login
						</Button>
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default Login;
