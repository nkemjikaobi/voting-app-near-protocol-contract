import { ElectionStatus } from "../../utils/enums";
import { Contestant } from "../contestant/Contestant";

@nearBindgen
export class Election {
	name: string;
	position: string;
	status: ElectionStatus;
	contestants: Contestant[];
	electionKey: string;
	id: i32;

	constructor(name: string, position: string, id: i32, electionKey: string) {
		this.name = name;
		this.position = position;
		this.status = ElectionStatus.NOT_STARTED;
		this.contestants = [];
		this.id = id;
		this.electionKey = electionKey;
	}
}