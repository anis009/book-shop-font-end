const Footer = () => {
	return (
		<footer className="bg-gray-800 py-4 text-white">
			<div className="container mx-auto text-center">
				<p>&copy; {new Date().getFullYear()} Your Website Name</p>
				<p>123 Main Street, City, Country</p>
			</div>
		</footer>
	);
};

export default Footer;
