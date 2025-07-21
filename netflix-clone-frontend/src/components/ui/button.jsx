export function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}