// // components/ui/ThemeToggle.tsx
// import React from 'react';
// import { useTheme } from '../../context/ThemeContext';

// const ThemeToggle: React.FC = () => {
//   const { theme, toggleTheme } = useTheme();
//   const isDark = theme === 'dark';
  
//   return (
//     <button
//       onClick={toggleTheme}
//       className={`relative p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
//         isDark 
//           ? 'bg-gray-800 hover:bg-gray-700' 
//           : 'bg-purple-100 hover:bg-purple-200'
//       }`}
//       aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
//     >
//       <div className="w-5 h-5 relative">
//         {/* Sun icon for light mode */}
//         <span 
//           className={`absolute inset-0 transition-opacity duration-300 ${
//             isDark ? 'opacity-0' : 'opacity-100 text-yellow-500'
//           } flex items-center justify-center`}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
//           </svg>
//         </span>
        
//         {/* Moon icon for dark mode */}
//         <span 
//           className={`absolute inset-0 transition-opacity duration-300 ${
//             isDark ? 'opacity-100 text-purple-400' : 'opacity-0'
//           } flex items-center justify-center`}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//             <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
//           </svg>
//         </span>
//       </div>
//     </button>
//   );
// };

// export default ThemeToggle;