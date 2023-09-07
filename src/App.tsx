import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

const APIURL = 'https://randomuser.me/api/?results=100'

function App () {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch(APIURL)
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => { console.error(err) })
  }, [])

  return (
    <>
      <h1>React Typescript Proficiency Test</h1>
      <UsersList users={users} />
    </>
  )
}

export default App
