import { type User } from '../types.d'

interface Props {
  users: User[]
  showRowColors: boolean
}

export function UsersList ({ users, showRowColors }: Props) {
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
            const userId = /* user.id?.value ??  */index

            return (
              <tr key={userId} style={{ backgroundColor: background }}>
                <td>
                  <img src={user.picture.thumbnail} alt='user photo' />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
