class UserModel {
	constructor({ uid, email, name = null, image = "", isAdmin = false }) {
		this.uid = uid;
		this.email = email;
		this.name = name;
		this.image = image;
		this.isAdmin = isAdmin;
	}

	static fromJson(json) {
		return new UserModel({
			uid: json.uid,
			email: json.email,
			name: json.name || null,
			image: json.image || "",
			isAdmin: json.isAdmin || false,
		});
	}

	toJson() {
		return {
			uid: this.uid,
			email: this.email,
			name: this.name,
			image: this.image,
			isAdmin: this.isAdmin,
		};
	}
}

export default UserModel;
