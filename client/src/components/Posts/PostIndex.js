import React, { useEffect, useState } from "react";
import { Container, AppBar, Grow, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import Form from "../Forms/Form";
import Posts from "./Posts";

import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import logo from "../../images/beame.png";

const PostIndex = () => {
	const dispatch = useDispatch();

	const [currentId, setCurrentId] = useState(0);

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	const classes = useStyles();

	return (
		<Container maxWidth='lg'>
			<AppBar className={classes.appBar} position='static' color='inherit'>
				<Typography className={classes.heading} variant='h2' align='center'>
					Memories
				</Typography>
				<img className={classes.image} src={logo} alt='icon' height='60' />
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justifyContent='space-between'
						alignItems='stretch'
						spacing={3}
					>
						<Grid item xs={12} sm={7}>
							<Posts setCurrentId={setCurrentId} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form currentId={currentId} setCurrentId={setCurrentId} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};

export default PostIndex;
