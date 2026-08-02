export default function NeumorphicButton({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`neumorphic-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
