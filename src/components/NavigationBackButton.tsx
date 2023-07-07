import { useNavigate } from 'react-router-dom';

const NavigationBackButton = ({ className }: React.HTMLAttributes<HTMLElement>) => {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<button className={`navigation-back-button ${className || ''}`} type="button" onClick={goBack}> </button>
	);
};

export default NavigationBackButton;
