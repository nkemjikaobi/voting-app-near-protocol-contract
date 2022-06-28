import { Context } from 'near-sdk-as';
import { Election } from './Models/election/Election';
import { ElectionManager } from './Models/election/ElectionManager';
import { ELECTIONS, ELECTIONS_KEY, ELECTION_OWNERS } from './utils/database';

@nearBindgen
export class Contract {
	createElection(
		name: string,
		position: string,
		electionKey: string
	): bool {
		const signer = Context.sender;
		if (ELECTIONS_KEY.contains(electionKey)) {
			return false;
		}
		if (ELECTIONS.contains(signer)) {
			const electionManager = ELECTIONS.getSome(signer);
			electionManager.createElection(
				name,
				position,
				electionKey
			);
			ELECTIONS.set(signer, electionManager);
			ELECTIONS_KEY.set(electionKey, signer);
			ELECTION_OWNERS.pushBack(signer);
			return true;
		}
		const electionManager = new ElectionManager();
		electionManager.createElection(
			name,
			position,
			electionKey
		);
		ELECTIONS.set(signer, electionManager);
		ELECTIONS_KEY.set(electionKey, signer);
		ELECTION_OWNERS.pushBack(signer);
		return true;
	}

	getUserElections(): Election[] | null {
		const signer = Context.sender;
		if (ELECTIONS.contains(signer)) {
			return ELECTIONS.getSome(signer).elections;
		}
		return null;
	}

	startElection(electionId: i32): bool {
		const signer = Context.sender;
		if (ELECTIONS.contains(signer)) {
			const electionManager = ELECTIONS.getSome(signer);
			const isStarted = electionManager.startElection(electionId);
			ELECTIONS.set(signer, electionManager);
			return isStarted;
		}
		return false;
	}

	endElection(electionId: i32): bool {
		const signer = Context.sender;
		if (ELECTIONS.contains(signer)) {
			const electionManager = ELECTIONS.getSome(signer);
			const isEnded = electionManager.endElection(electionId);
			ELECTIONS.set(signer, electionManager);
			return isEnded;
		}
		return false;
	}

	addContestant(
		name: string,
		bio: string,
		numberOfVotes: i32,
		electionId: i32
	): bool {
		const signer = Context.sender;
		if (ELECTIONS.contains(signer)) {
			const electionManager = ELECTIONS.getSome(signer);
			const newContestant = electionManager.addContestant(
				name,
				bio,
				numberOfVotes,
				electionId
			);
			ELECTIONS.set(signer, electionManager);
			return newContestant;
		}

		return false;
	}

	vote(contestantId: i32, electionKey: string): bool {
		if (ELECTIONS_KEY.contains(electionKey)) {
			const owner = ELECTIONS_KEY.getSome(electionKey);
			const electionManager = ELECTIONS.getSome(owner);
			const voted = electionManager.vote(contestantId, electionKey);
			ELECTIONS.set(owner, electionManager);
			return voted;
		}
		return false;
	}
}
