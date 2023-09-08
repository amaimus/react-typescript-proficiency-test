/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

const API_URL = 'https://randomuser.me/api/?results=100'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showRowColors, setShowRowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowRowColors(!showRowColors)
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
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    }
    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    }
    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    }
    return filteredUsers
  }, [filteredUsers, sorting])

  const handleChangeSorting = (sort: SortBy) => {
    const newSortingValue = sorting === SortBy.NONE ? sort : SortBy.NONE
    setSorting(newSortingValue)
  }

  return (
    <>
      <h1>React Typescript Proficiency Test</h1>
      <header>
        <button onClick={toggleColors}>
          Show Row Colors
        </button>
        <button onClick={() => { handleChangeSorting(SortBy.COUNTRY) }}>
          Sort by Country
        </button>
        <button onClick={resetInitialState}>
          Reset
        </button>
        <input type='text' onChange={(e) => { setFilterCountry(e.target.value) }} placeholder='Filter by...'/>
      </header>
      <main>
        <UsersList
          changeSorting={handleChangeSorting}
          deleteUser={handleDeleteUser}
          users={sortedUsers}
          showRowColors={showRowColors}
        />
      </main>
    </>
  )
}

export default App
