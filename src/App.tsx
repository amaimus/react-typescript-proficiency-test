import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types'

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
      {JSON.stringify(users)}
    </>
  )
}

export default App
