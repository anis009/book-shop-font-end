const Loading = () => {
	return (
		<div className="bg-white border border-gray-300 shadow-md flex items-center justify-center h-screen">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-800"></div>
			<p className="ml-3 text-gray-800">Loading...</p>
		</div>
	);
};

export default Loading;
