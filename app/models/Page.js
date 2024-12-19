// models/Page.js
const Page = {
	id: "", // Unique identifier for the page
	imageUrl: "", // URL for the page's image
	translations: [
		// Array of language-text pairs
		{
			language: "", // e.g., "English", "Turkish"
			text: "", // e.g., "The cat sat on the mat"
		},
	],
};

export default Page;
