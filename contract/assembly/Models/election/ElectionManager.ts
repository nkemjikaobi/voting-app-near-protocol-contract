import { ElectionStatus } from '../../utils/enums';
import { Contestant } from '../contestant/Contestant';
import { Election } from './Election';

@nearBindgen
export class ElectionManager {
	elections: Election[] = [];

	createElection(
		name: string,
		position: string,
		electionKey: string
	): bool {
		const id = this.elections.length;
		const election = new Election(name, position, id, electionKey);
		this.elections.push(election);
		return true;
	}

	getAllElections(): Election[] {
		return this.elections;
	}

	startElection(electionId: i32): bool {
		if (electionId >= this.elections.length) return false;
		this.elections[electionId].status = ElectionStatus.IN_PROGRESS;
		return true;
	}

	endElection(electionId: i32): bool {
		if (electionId >= this.elections.length) return false;
		this.elections[electionId].status = ElectionStatus.ENDED;
		return true;
	}

	addContestant(
		name: string,
		bio: string,
		numberOfVotes: i32,
		electionId: i32
	): bool {
		if (electionId >= this.elections.length) return false;
		const contestantId = this.elections[electionId].contestants.length;

		const newContestant = new Contestant(
			name,
			bio,
			numberOfVotes,
			contestantId
		);

		this.elections[electionId].contestants.push(newContestant);
		return true;
	}

	vote(contestantId: i32, electionKey: string): bool {
		for (let i = 0; i < this.elections.length; i++) {
			if (this.elections[i].electionKey == electionKey) {
				const votes = this.elections[i].contestants[contestantId].numberOfVotes;
				this.elections[i].contestants[contestantId].numberOfVotes = votes + 1;
				return true;
			}
		}
		return false;
	}
}
