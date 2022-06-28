import { PersistentDeque, PersistentMap } from 'near-sdk-as';
import { ElectionManager } from '../Models/election/ElectionManager';

export const ELECTIONS = new PersistentMap<String, ElectionManager>('t'); //signer => electionmanager
export const ELECTIONS_KEY = new PersistentMap<String, String>('t'); //electionkey => address / signer
export const ELECTION_OWNERS = new PersistentDeque<string>('q');