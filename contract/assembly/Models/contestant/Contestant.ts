@nearBindgen
export class Contestant {
	name: string;
	bio: string;
	id: i32;
	numberOfVotes: i32;

	constructor(name: string, bio: string, numberOfVotes: i32, id: i32) {
		this.name = name;
		this.bio = bio;
		this.numberOfVotes = numberOfVotes;
		this.id = id;
	}
}
