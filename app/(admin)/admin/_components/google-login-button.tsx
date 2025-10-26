"use client";

interface GoogleLoginButtonProps {
	onClick: () => void;
}

function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
	return (
		<div className="flex items-center">
			<button
				type="button"
				className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
				onClick={onClick}
			>
				구글로그인
			</button>
		</div>
	);
}

export default GoogleLoginButton;
