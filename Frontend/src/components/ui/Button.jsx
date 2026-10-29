import SpecularButton from "./SpecularButton";
import StarBorder from "./StarBorder";
import { playClickSound } from "../../utils/sound";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  starBorder = false,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const handleClick = (e) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  const buttonElement = (
    <SpecularButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={handleClick}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </SpecularButton>
  );

  if (starBorder && !disabled) {
    return (
      <StarBorder speed="3.5s" color="#10b981" className="inline-block rounded-2xl">
        {buttonElement}
      </StarBorder>
    );
  }

  return buttonElement;
}

export { SpecularButton };