import { NavLink } from 'react-router-dom';
import { ErrorNames } from '../types/BooksTypes';
import defaultBookImage from '../images/default-book.png';

type ErrorProps = {
	buttonHandler?: () => void,
	error: Error,
}

const Error = ({ buttonHandler, error }: ErrorProps) => {
	let body: React.ReactNode;

	switch (error.name) {
		case ErrorNames.fetchError:
			body = <span>Невозможно выполнить запрос</span>;
			break;
		case ErrorNames.error:
		case ErrorNames.network:
		case ErrorNames.validationError:
			body = (
				<>
					{error.message}
					{buttonHandler
						? (
							<button
								className="error__button"
								type="button"
								onClick={buttonHandler}
							>
								Повторить
							</button>
						) : null}
				</>
			);
			break;
		default:
			body = (
				<>
					{error.message}
					<NavLink to="/" className="error__nav-link">Вернуться на главную</NavLink>
				</>
			);
	}

	return (
		<div className="error">
			<img src={defaultBookImage} alt="error" className="error__image" />
			<div className="error__content">
				{body}
			</div>
		</div>
	);
};

export default Error;
