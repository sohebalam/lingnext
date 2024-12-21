class Language {
	constructor(languageName, languageCode) {
		this.languageName = languageName; // The name of the language
		this.languageCode = languageCode; // The language code (e.g., "en" for English, "es" for Spanish)
	}

	// Convert the instance properties to a map (object in JavaScript)
	toMap() {
		return {
			languageName: this.languageName,
			languageCode: this.languageCode,
		};
	}
}

export default Language;
