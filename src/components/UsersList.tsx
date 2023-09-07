import { type User } from '../types.d'

interface Props {
  users: User[]
  showRowColors: boolean
  deleteUser: (loginId: string) => void
}

export function UsersList ({ users, showRowColors, deleteUser }: Props) {
  return (
    <table style={{ margin: 'auto' }} width={'100%'}>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Lastname</th>
          <th>Country</th>
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
