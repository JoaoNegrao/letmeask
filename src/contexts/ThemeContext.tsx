import { createContext, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
	children: ReactNode;
}

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType );

export function ThemeContextProvider(props: ThemeContextProviderProps) {
	const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
		const storagedTheme = localStorage.getItem('theme');

		return (storagedTheme ?? 'light') as Theme;
	})
	//Adicionando Tema escolhido no local storage.
	//Posso inicializar o useState com um valor. Mas se quiser posso iniciar o estado como uma funcao, pois e a mesma coisa. Como funcao tenho mais flexibilidade. 

	function toggleTheme(){
		setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
	}

	useEffect(() => {
		localStorage.setItem('theme', currentTheme)
	}, [currentTheme])

  return (
    <ThemeContext.Provider value = {{theme:currentTheme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}
