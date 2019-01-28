import { observer } from 'mobx-react';
import * as React from 'react';
import { List } from 'semantic-ui-react';
import { injectStore } from '../../core/provider';
import { UsersStore } from '../../stores/users';
import { SearchContainer } from './Search';
import { UserItem } from './UserItem';
import * as styles from './usersList.css';

export interface IUsersListProps {
  usersStore: UsersStore;
}

export function UsersList({ usersStore }: IUsersListProps) {
  return (
    <div className={styles.style}>
      <SearchContainer />
      { usersStore.totalCount !== usersStore.users.length &&
        <div className={styles.subText}>{usersStore.users.length} of {usersStore.totalCount}</div>
      }
      <List>
        {usersStore.users.map((user) => <UserItem user={user} key={user.login} />)}
      </List>
    </div>
  );
}

export const UsersListContainer = injectStore({ usersStore: UsersStore })(observer(UsersList));
