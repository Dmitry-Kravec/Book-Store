import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationBackButtonProps {
	className?: string,
}

const NavigationBackButton = ({ className }: NavigationBackButtonProps) => {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<button className={`navigation-back-button ${className || ''}`} type="button" onClick={goBack}> </button>
	);
};

export default memo(NavigationBackButton);
