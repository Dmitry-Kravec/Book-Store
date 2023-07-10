interface ModalProps {
	isActive: boolean,
	closeHandler: () => void;
	children: React.ReactNode,
}

const Modal = ({ isActive, closeHandler, children }: ModalProps) => (isActive ? (
	<div className="modal" onClick={closeHandler} role="generic">
		<div className="modal__content" onClick={(e) => e.stopPropagation()} role="generic">
			{children}
		</div>
	</div>
) : null);

export default Modal;
