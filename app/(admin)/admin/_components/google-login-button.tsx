"use client";

interface GoogleLoginButtonProps {
  onClick: () => void;
}

function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={onClick}
      >
        구글로그인
      </button>
    </div>
  );
}

export default GoogleLoginButton;
