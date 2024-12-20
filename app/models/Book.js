const Book = {
	title: "", // Title of the book
	pages: [
		{
			id: "", // Unique identifier for the page
			imageUrl: "", // URL for the page's image
			isCover: false, // Boolean to indicate if the page is the cover page
			translations: [
				// Array of language-text pairs
				{
					language: "", // e.g., "English", "Turkish"
					text: "", // e.g., "The cat sat on the mat"
				},
			],
		},
	],
};

export default Book;
