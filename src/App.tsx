/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

const API_URL = 'https://randomuser.me/api/?results=100'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showRowColors, setShowRowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

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
    fetch(API_URL)
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => { console.error(err) })
  }, [])

  const filteredUsers = useMemo(() => {
    return filterCountry
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? filteredUsers.toSorted(
        (a, b) => a.location.country.localeCompare(b.location.country)
      )
      : filteredUsers
  }, [filteredUsers, sortByCountry])

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
        <input type='text' onChange={(e) => { setFilterCountry(e.target.value) }} placeholder='Filter by ...'/>
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
