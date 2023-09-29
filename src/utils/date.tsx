export function formatDateToInputDate(inputDate: Date) {
	if (!inputDate) {
		return null;
	}
	// Parse the input date string into a JavaScript Date object
	const date = new Date(inputDate);

	// Check if the date is valid
	if (isNaN(date.getTime())) {
		return ""; // Return an empty string if the date is invalid
	}
	const year = date?.getFullYear();
	const month = String(date?.getMonth() + 1).padStart(2, "0"); // Month is 0-based
	const day = String(date?.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}
