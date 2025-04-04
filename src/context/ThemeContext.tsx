// // context/ThemeContext.tsx
// import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// type Theme = 'dark' | 'light';

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // Initialize state from localStorage or default to 'dark'
//   const [theme, setTheme] = useState<Theme>(() => {
//     if (typeof window !== 'undefined') {
//       const savedTheme = localStorage.getItem('theme') as Theme | null;
//       return savedTheme || 'dark';
//     }
//     return 'dark';
//   });

//   // Apply theme class to html element
//   useEffect(() => {
//     const htmlElement = document.documentElement;
    
//     if (theme === 'dark') {
//       htmlElement.classList.add('dark');
//       htmlElement.classList.remove('light');
//       htmlElement.style.colorScheme = 'dark';
//     } else {
//       htmlElement.classList.add('light');
//       htmlElement.classList.remove('dark');
//       htmlElement.style.colorScheme = 'light';
//     }
    
//     // Store the current preference
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };