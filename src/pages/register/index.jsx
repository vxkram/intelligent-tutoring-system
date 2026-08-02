import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';

const Register = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await axios.post('http://localhost:3001/register', { name, email, password });
			navigate('/');
		} catch (err) {
			setError('Registration failed. Is the auth server running?');
		}
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
						Register
					</Typography>
					<TextField
						sx={{ minWidth: 300 }}
						type={'text'}
						margin="dense"
						variant="outlined"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
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
					{error && (
						<Typography color="error" variant="body2" sx={{ mt: 1 }}>
							{error}
						</Typography>
					)}
					<Box display="flex" flexDirection={'column'}>
						<Button
							type="submit"
							variant="contained"
							color="success"
							sx={{ marginTop: 2, borderRadius: 1, margin: 2 }}
						>
							Sign Up
						</Button>
						<Button
							type="button"
							variant="outlined"
							color="success"
							sx={{ marginTop: 2, borderRadius: 1, margin: 2 }}
							onClick={() => navigate('/')}
						>
							Login
						</Button>
					</Box>
				</Box>
			</form>
		</div>
	);
};

export default Register;
