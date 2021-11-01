import { Repo } from './repo/repo.model';

export interface RepoList {
  id: string;
  'list-name': string;
  createdDate: string;
  'list-repos': Array<Repo>;
}
