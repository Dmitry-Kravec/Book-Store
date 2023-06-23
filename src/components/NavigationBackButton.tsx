import { useNavigate } from 'react-router-dom';

const NavigationBackButton = () => {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<button className="navigation-back-button" type="button" onClick={goBack}> </button>
	);
};

export default NavigationBackButton;
