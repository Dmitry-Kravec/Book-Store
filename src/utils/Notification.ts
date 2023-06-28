import { notification } from 'antd';

export type NotificationType = 'success' | 'info' | 'warning' | 'error'

export interface INotification {
	message: string;
	type?: NotificationType;
	onClose?: () => void;
	description?: string;
}

export const showNotification = ({ message, type, onClose, description }: INotification) => {
	if (message) {
		notification[type || 'info']({
			message,
			onClose,
			description,
			style: { whiteSpace: 'pre-line' },
		});
	}
};
