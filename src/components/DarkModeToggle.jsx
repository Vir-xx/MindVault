import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('mv-theme', 'dark');
  }, []);
  return null;
}


