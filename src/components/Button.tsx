import { ButtonHTMLAttributes } from "react";
import { useTheme } from "../hooks/useTheme";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined ?: boolean
};

export function Button({isOutlined = false,...props}: ButtonProps) {
  const {theme} = useTheme();
  return (
    <button 
			className={`button ${isOutlined ? `outlined` : '' } ${theme}`}
			{...props} 
		/>
    //Spread operator passando todas as propriedades de Button propspara o botao criado. E como o botão será utilizado em um elemento HTML nativo, é importante falar as propriedades que o botão pode ter.  Para isso utilizamos ButtonHTMLAttributes<HTMLButtonElement>.
  );
}
