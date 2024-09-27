"use client";

import React, { createContext, useState, useCallback } from "react";

interface DashboardContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (dropdownOpen: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const DashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpenState] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Custom setter for isOpen that also manages dropdownOpen
  const setIsOpen = useCallback((newIsOpen: boolean) => {
    setIsOpenState(newIsOpen);
    if (!newIsOpen) {
      setDropdownOpen(false);
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{ isOpen, setIsOpen, dropdownOpen, setDropdownOpen }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
