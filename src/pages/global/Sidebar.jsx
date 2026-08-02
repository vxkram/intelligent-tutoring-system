import {
	HomeOutlined,
	MenuBookOutlined,
	AssignmentOutlined,
	AssessmentOutlined,
	RecommendOutlined,
	PictureAsPdfOutlined,
	MenuOutlined,
} from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import mc from '../../assets/mc1.jpg';
import { tokens } from '../../theme';
import './sidebarStyle.css';

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.primary[100],
				fontWeight: 'bold',
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

Item.propTypes = {
	title: PropTypes.any,
	to: PropTypes.any,
	icon: PropTypes.any,
	selected: PropTypes.any,
	setSelected: PropTypes.any,
};

const sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapse] = useState(false);
	const [selected, setSelected] = useState('Dashboard');
	return (
		<div className="app-sidebar">
			<Box
				sx={{
					'& .pro-sidebar-inner': {
						background: `${colors.secondary[600]} !important`,
					},
					'& .pro-icon-wrapper': {
						backgroundcolor: 'transparent !important',
					},
					'& .pro-inner-item': {
						padding: '5px 35px 5px 20px !important',
					},
					'& .pro-inner-hover': {
						color: '#868dfb  !important',
					},
					'& .pro-menu-item.active': {
						color: `${colors.green[400]} !important`,
					},
				}}
			>
				<ProSidebar
					collapsed={isCollapsed}
					backgroundcolor={colors.secondary[500]}
				>
					<Menu iconShape="square">
						<MenuItem
							onClick={() => setIsCollapse(!isCollapsed)}
							icon={isCollapsed ? <MenuOutlined /> : undefined}
							style={{
								margin: '10px 0 20px 0',
								color: colors.primary[300],
							}}
						>
							{!isCollapsed && (
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									ml="15px"
								>
									<Typography variant="h3" color={colors.primary[200]}>
										Menu
									</Typography>
									<IconButton onClick={() => setIsCollapse(!isCollapsed)}>
										<MenuOutlined />
									</IconButton>
								</Box>
							)}
						</MenuItem>
						{/* User */}
						{!isCollapsed && (
							<Box mb="25px">
								<Box display="flex" justifyContent="center" alignItems="center">
									<img
										src={mc}
										alt="Profile-User"
										width="100px"
										height="100px"
										style={{ cursor: 'pointer', borderRadius: '50% ' }}
									/>
								</Box>
								<Box textAlign="center">
									<Typography
										variant="h2"
										color={colors.primary[100]}
										fontWeight="bold"
										sx={{ m: '10px 0 0 0' }}
									>
										User
									</Typography>
									<Typography variant="h5" color={colors.green[300]}>
										AI and ML
									</Typography>
								</Box>
							</Box>
						)}
						{/* Menu Icons */}
						<Box paddingLeft={isCollapsed ? undefined : '10%'}>
							<Item
								title="Dashboard"
								to="/dashboard"
								icon={<HomeOutlined />}
								selected={selected}
								setSelected={setSelected}
							/>
						</Box>
						<Box paddingLeft={isCollapsed ? undefined : '10%'}>
							<Item
								title="Learning Methods"
								to="/ELM"
								icon={<MenuBookOutlined />}
								selected={selected}
								setSelected={setSelected}
							/>
						</Box>
						<Box paddingLeft={isCollapsed ? undefined : '10%'}>
							<Item
								title="Take Quiz"
								to="/quiz"
								icon={<AssignmentOutlined />}
								selected={selected}
								setSelected={setSelected}
							/>
						</Box>
						<Box paddingLeft={isCollapsed ? undefined : '10%'}>
							<Item
								title="My Results"
								to="/result"
								icon={<AssessmentOutlined />}
								selected={selected}
								setSelected={setSelected}
							/>
						</Box>
						<Box paddingLeft={isCollapsed ? undefined : '10%'}>
							<Item
								title="Recommendations"
								to="/content_rec"
								icon={<RecommendOutlined />}
								selected={selected}
								setSelected={setSelected}
							/>
						</Box>
						<Box paddingLeft={isCollapsed ? undefined : '10%'}>
							<Item
								title="PDF Summaries"
								to="/pdf_sum"
								icon={<PictureAsPdfOutlined />}
								selected={selected}
								setSelected={setSelected}
							/>
						</Box>
					</Menu>
				</ProSidebar>
			</Box>
		</div>
	);
};

export default sidebar;
