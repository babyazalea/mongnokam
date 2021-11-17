import { Repo } from './repos/repo/repo.model';

export interface RepoList {
  id: string;
  'list-name': string;
  createdDate: string;
  'list-repos': Array<Repo>;
}
