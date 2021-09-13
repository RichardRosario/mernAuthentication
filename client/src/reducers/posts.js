const postReducers = (posts = [], action) => {
	switch (action.type) {
		case "CREATE":
			return [...posts, action.payload];

		case "EDIT":
		case "LIKE":
			return posts.map(post =>
				post._id === action.payload._id ? action.payload : post
			);

		case "DELETE":
			return posts.filter(post => post._id !== action.payload);

		case "FETCH_ALL":
			return action.payload;

		default:
			return posts;
	}
};

export default postReducers;
