import * as api from "../api/index";

export const createPost = post => async dispatch => {
	try {
		const { data } = await api.createPost(post);
		if (!data) {
			console.log("Field must not be empty!");
		} else {
			dispatch({ type: "CREATE", payload: data });
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const getPosts = () => async dispatch => {
	try {
		const { data } = await api.getPosts();
		console.log(data);

		dispatch({ type: "FETCH_ALL", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const editPost = (id, post) => async dispatch => {
	try {
		const { data } = await api.editPost(id, post);

		dispatch({ type: "EDIT", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const deletePost = id => async dispatch => {
	try {
		await api.deletePost(id);

		dispatch({ type: "DELETE", payload: id });
	} catch (error) {
		console.log(error.message);
	}
};

export const likePost = id => async dispatch => {
	try {
		const { data } = api.likePost(id);
		dispatch({ type: "LIKE", payload: data });
	} catch (error) {
		console.log(error);
	}
};
