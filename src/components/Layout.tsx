import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import githubLogo from '../images/github-logo.svg';

const Layout = () => (
	<div className="app">
		<AppHeader />
		<main className="page-content">
			<Outlet />
		</main>
		<footer className="footer">
			<a href="https://github.com/Dmitry-Kravec/Book-Store" className="footer__git-link">
				<img src={githubLogo} alt="github link" width="30" height="30" />
			</a>
			<span className="footer__copyright">&copy;</span>
			<span className="footer__year">2023</span>
		</footer>
	</div>
);

export default Layout;
