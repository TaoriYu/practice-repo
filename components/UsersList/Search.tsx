import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { injectStore } from '../../core/provider/InjectStore';
import { UsersStore } from '../../stores/users';

export interface ISearchProps {
  usersStore: UsersStore;
}

@observer
export class Search extends React.Component<ISearchProps> {
  public render() {
    const { usersStore } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input fluid action>
            <input type="text" value={usersStore.query} onChange={this.handleChange} />
            <Button color="blue">Run</Button>
          </Input>
        </form>
      </div>
    );
  }

  private handleChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.usersStore.setQuery(currentTarget.value);
  }

  private handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await this.props.usersStore.searchUsers();
  }
}

export const SearchContainer = injectStore({ usersStore: UsersStore })(Search);
