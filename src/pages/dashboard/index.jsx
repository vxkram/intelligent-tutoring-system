import { Box } from "@mui/material";
import React from "react";
import { default as ContinueLearning } from "../../components/ContinueLearning";
import { default as FeaturedCourses } from "../../components/FeaturedCourses";
import Header from "../../components/Header";

const Dashboard = () => {
	return (
		<Box m="20px">
			<Header title="Featured Courses" />
			<FeaturedCourses />
			<Header title="Continue Learning" />
			<ContinueLearning />
		</Box>
	);
};

export default Dashboard;
