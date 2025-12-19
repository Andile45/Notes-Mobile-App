import { useEffect, useState } from 'react';

export const useInitialAuth = () => {
  const [isInitialAuthChecked, setIsInitialAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Perform your async auth check here if needed
      // For now, we'll just set it to true to resolve the immediate error.
      setIsInitialAuthChecked(true);
    };

    checkAuthStatus();
  }, []);

  return { isInitialAuthChecked };
};

