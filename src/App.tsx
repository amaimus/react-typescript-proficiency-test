/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

const APIURL = 'https://randomuser.me/api/?results=100'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showRowColors, setShowRowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowRowColors(!showRowColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const handleDeleteUser = (loginId: string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== loginId)
    setUsers(filteredUsers)
  }

  const resetInitialState = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch(APIURL)
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => { console.error(err) })
  }, [])

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    : users

  return (
    <>
      <h1>React Typescript Proficiency Test</h1>
      <header>
        <button onClick={toggleColors}>
          Show Row Colors
        </button>
        <button onClick={toggleSortByCountry}>
          Sort by Country
        </button>
        <button onClick={resetInitialState}>
          Reset
        </button>
      </header>
      <main>
        <UsersList
          deleteUser={handleDeleteUser}
          users={sortedUsers}
          showRowColors={showRowColors}
        />
      </main>
    </>
  )
}

export default App
