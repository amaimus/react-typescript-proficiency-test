import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  showRowColors: boolean
  deleteUser: (loginId: string) => void
  changeSorting: (sort: SortBy) => void
}

export function UsersList ({ users, showRowColors, deleteUser, changeSorting }: Props) {
  return (
    <table style={{ margin: 'auto' }} width={'100%'}>
      <thead>
        <tr>
          <th>Photo</th>
          <th
            onClick={() => { changeSorting(SortBy.NAME) }}
            style={{ cursor: 'pointer' }}
          >
            Name
          </th>
          <th
            onClick={() => { changeSorting(SortBy.LAST) }}
            style={{ cursor: 'pointer' }}
          >
            Lastname
          </th>
          <th
            onClick={() => { changeSorting(SortBy.COUNTRY) }}
            style={{ cursor: 'pointer' }}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            const backgroundColors = index % 2 === 0 ? '#333' : '#555'
            const background = showRowColors ? backgroundColors : 'transparent'
            const userId = user.login.uuid

            return (
              <tr key={userId} style={{ backgroundColor: background }}>
                <td>
                  <img src={user.picture.thumbnail} alt='user photo' />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => { deleteUser(userId) }}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
