import { VMContext } from 'near-sdk-as';
import { Contract } from '../index';
import { ElectionManager } from '../Models/election/ElectionManager';
import { ELECTIONS } from '../utils/database';
import { ElectionStatus } from '../utils/enums';

const contract = new Contract();
const signer = 'todolist.derickobi.testnet';
let election: bool;

describe('Elections', () => {
	beforeEach(() => {
		VMContext.setSigner_account_id(signer);
		election = contract.createElection(
			'Presidential Election',
			'President',
			'elect001'
		);
	});

	it('Should create a new election with the correct details', () => {
		const electionManager: ElectionManager = ELECTIONS.getSome(signer);
		const elections = electionManager.elections;
		expect(election).toStrictEqual(true);
		expect(elections[0].name).toStrictEqual(
			'Presidential Election',
			'Expect equal object'
		);
		expect(elections[0].position).toStrictEqual(
			'President',
			'Expect equal object'
		);
		expect(elections[0].electionKey).toStrictEqual(
			'elect001',
			'Expect equal object'
		);
	});

	it('Should start an election', () => {
			expect(contract.startElection(0)).toBeTruthy();

			contract.startElection(0);
			const electionManager: ElectionManager = ELECTIONS.getSome(signer);
			const elections = electionManager.elections;
			expect(elections[0].status).toStrictEqual(
				ElectionStatus.IN_PROGRESS
			);
	});

	it('Should end an election', () => {
			expect(contract.endElection(0)).toBeTruthy();

			contract.endElection(0);
			const electionManager: ElectionManager = ELECTIONS.getSome(signer);
			const elections = electionManager.elections;
			expect(elections[0].status).toStrictEqual(ElectionStatus.ENDED);
	});

	it('Should get all elections', () => {
		const electionManager: ElectionManager = ELECTIONS.getSome(signer);
		const elections = electionManager.elections;
		expect(elections.length).toStrictEqual(1);
	});

	it('Should add contestant', () => {
		contract.addContestant('NkemjikaObi', 'Innovative', 0, 0);
		const electionManager: ElectionManager = ELECTIONS.getSome(signer);
		const elections = electionManager.elections;
		expect(elections[0].contestants.length).toStrictEqual(1);
		expect(elections[0].contestants[0].name).toStrictEqual(
			'NkemjikaObi',
			'Expect equal object'
		);
		expect(elections[0].contestants[0].bio).toStrictEqual(
			'Innovative',
			'Expect equal object'
		);
	});

	it('Should vote', () => {
		contract.addContestant('NkemjikaObi', 'Innovative', 0, 0);
		contract.vote(0, 'elect001');
		const electionManager: ElectionManager = ELECTIONS.getSome(signer);
		const elections = electionManager.elections;
		expect(elections[0].contestants[0].numberOfVotes).toStrictEqual(1);
	});
});
