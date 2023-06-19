type ModalProps = {
	isActive: boolean,
	closeHandler: () => void;
	children: React.ReactNode,
}

const Modal = ({ isActive, closeHandler, children }: ModalProps) => {
	const t = 4;
	return (
		<div className={`modal${isActive ? ' modal_active' : ''}`} onClick={closeHandler} role="generic">
			<div className="modal__content" onClick={(e) => e.stopPropagation()} role="generic">
				{children}
			</div>
		</div>
	);
};

export default Modal;
