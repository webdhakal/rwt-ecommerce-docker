import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

interface ThemeProperties {
  [key: string]: string
}

type Themes = Record<string, ThemeProperties>

interface ThemeContextValue {
  currTheme?: string
  setCurrTheme?: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const ThemeProvider: FC<{ themes: Themes; children: React.ReactNode }> = ({
  children,
  themes,
}) => {
  const [currTheme, setCurrTheme] = useState(
    localStorage.getItem('theme')?.toLowerCase() || 'default',
  )

  useEffect(() => {
    Object.entries(themes).forEach(([themeKey, themeValues]) => {
      if (currTheme === themeKey) {
        Object.entries(themeValues).forEach(([key, value]) => {
          const cssVarName = key.includes('Color')
            ? key.replace('Color', '')
            : key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
          document.documentElement.style.setProperty(`--${cssVarName}`, value)
        })
      }
    })
  }, [themes, currTheme])

  return (
    <ThemeContext.Provider value={{ currTheme, setCurrTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    return {}
  }
  return context
}
