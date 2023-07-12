import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { ErrorNames } from '../types/BooksTypes';
import defaultBookImage from '../images/default-book.png';

interface ErrorProps {
	onButtonClick?: () => void,
	error: Error,
}

const Error = ({ onButtonClick, error }: ErrorProps) => {
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
					{onButtonClick
						? (
							<button
								className="error__button"
								type="button"
								onClick={onButtonClick}
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

export default memo(Error);
