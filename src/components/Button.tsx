import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined ?: boolean
};

export function Button({isOutlined = false,...props}: ButtonProps) {
  return (
    <button 
			className={`button ${isOutlined ? `outlined` : '' }`}
			{...props} 
		/>
    //Spread operator passando todas as propriedades de Button propspara o botao criado. E como o botão será utilizado em um elemento HTML nativo, é importante falar as propriedades que o botão pode ter.  Para isso utilizamos ButtonHTMLAttributes<HTMLButtonElement>.
  );
}
