import { Outlet } from 'react-router-dom'
import Nav from './Nav'

function App() {
  return (
    <main className="bg-gray-50 dark:bg-gray-800">
      <Nav />
      <Outlet />
    </main>
  )
}

export default App
