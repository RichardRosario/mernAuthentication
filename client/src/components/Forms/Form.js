import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import useStyles from "./styles";
import { createPost, editPost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const classes = useStyles();
	const dispatch = useDispatch();
	const post = useSelector(state =>
		currentId ? state.posts.find(p => p._id === currentId) : null
	);

	const [postData, setPostData] = useState({
		creator: "",
		creatorErr: "",
		title: "",
		titleErr: "",
		message: "",
		messageErr: "",
		tags: "",
		selectedFile: ""
	});

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const clear = () => {
		setCurrentId(0);
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: ""
		});
	};

	const formSubmit = e => {
		e.preventDefault();

		if (currentId === 0) {
			dispatch(createPost(postData));
		} else {
			dispatch(editPost(currentId, postData));
		}

		clear();
	};

	return (
		<Paper className={classes.paper}>
			<form
				id='form'
				name='form'
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit(formSubmit)}
			>
				<Typography variant='h6'>
					{currentId ? "Editing a BeaMemo" : "Create BeaMemo"}
				</Typography>

				<TextField
					name='creator'
					{...register("creator", { required: true })}
					id='creator'
					minLength='3'
					variant='outlined'
					label='Creator'
					required
					fullWidth
					value={postData.creator}
					onChange={e => setPostData({ ...postData, creator: e.target.value })}
				/>
				{errors.postData.creator && "Author name is required"}
				<Typography variant='caption'>{postData.creatorErr}</Typography>
				<TextField
					name='title'
					{...register("title", { required: true })}
					variant='outlined'
					label='Title'
					minLength='2'
					required
					fullWidth
					value={postData.title}
					errortext={postData.titleErr}
					onChange={e => setPostData({ ...postData, title: e.target.value })}
				/>
				{errors.postData.title && "A Title is required"}

				<TextField
					name='message'
					{...register("message", { required: true })}
					variant='outlined'
					label='Message'
					minLength='10'
					required
					fullWidth
					multiline
					value={postData.message}
					errortext={postData.messageErr}
					onChange={e => setPostData({ ...postData, message: e.target.value })}
				/>
				{errors.postData.message && "A message is required"}
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={e =>
						setPostData({ ...postData, tags: e.target.value.split(",") })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>

				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					type='submit'
					size='large'
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant='contained'
					color='secondary'
					onClick={clear}
					fullWidth
					size='large'
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
