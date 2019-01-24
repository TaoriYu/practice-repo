import * as React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { Logger } from '../../core/logger';
import { injectStore } from '../../core/provider';
import { ReposStore } from '../../stores/repos';

const logger = new Logger('Search');

export interface ISearchProps {
  reposStore: ReposStore;
}

export interface ISearchState {
  query: string;
}

export class Search extends React.Component<ISearchProps, ISearchState> {
  public readonly state: Readonly<ISearchState> = {
    query: '',
  };

  public render() {
    const { query } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input fluid action>
            <input type="text" value={query} onChange={this.handleChange} />
            <Button color="green">Run</Button>
          </Input>
        </form>
      </div>
    );
  }

  private handleChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ query: currentTarget.value });
  }

  private handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.reposStore.searchRepos(this.state.query).catch((exception) => {
      logger.error(exception);
    });
  }
}

export const SearchContainer = injectStore({ reposStore: ReposStore })(Search);
