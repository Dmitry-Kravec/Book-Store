import { NavLink } from 'react-router-dom';
import defaultBookImage from '../images/default-book.png';
import { ErrorNames } from '../types/BooksTypes';

type ErrorProps = {
	buttonHandler?: () => void,
	error: Error,
}

const Error = ({ buttonHandler, error }: ErrorProps) => {
	let body: React.ReactNode;

	switch (error.name) {
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

// type ErrorProps = {
// 	children: React.ReactNode
// 	buttonOptions?: {
// 		buttonHandler: () => void,
// 		buttonText: string,
// 	}
// 	status: number
// }

// const Error = ({ children, buttonOptions, status }: ErrorProps) => (
// 	<div className="error">
// 		<img src={defaultBookImage} alt="error" className="error__image" />
// 		<div className="error__children-container">
// 			{children}
// 			{buttonOptions
// 				? (
// 					<button
// 						className="error__button"
// 						type="button"
// 						onClick={buttonOptions.buttonHandler}
// 					>
// 						{buttonOptions.buttonText}
// 					</button>
// 				) : null}
// 		</div>
// 	</div>
// );

export default Error;
