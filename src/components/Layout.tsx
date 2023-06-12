import { Outlet } from "react-router-dom"
import AppHeader from "./AppHeader"

const Layout = () => {
  return (
    <div className='app'>
      <AppHeader />
      <main className='page-content'>
        <Outlet />
      </main>
      <footer className='footer'>
        <a href='#' className='footer__git-link'>Git</a>
        <div className='footer__copyright'>@C</div>
        <div className='footer__year'>2023</div>
      </footer>
    </div>
  )
}

export {Layout}