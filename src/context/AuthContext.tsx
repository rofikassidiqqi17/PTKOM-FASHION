"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, SavedOutfit, AnalysisResult } from "@/types";
import { defaultProfileSvg } from "@/data/outfits";

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  isLoaded: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (
    name: string,
    email: string,
    profileImage?: string
  ) => { success: boolean; message: string };
  saveOutfit: (analysis: AnalysisResult) => { success: boolean; message: string };
  deleteOutfit: (index: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("fitcampUsers");
      const storedCurrentUser = localStorage.getItem("fitcampCurrentUser");

      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
      if (storedCurrentUser) {
        setCurrentUser(JSON.parse(storedCurrentUser));
      }
    } catch (e) {
      console.error("Failed to load users from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveUsersToStorage = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("fitcampUsers", JSON.stringify(updatedUsers));
  };

  const saveCurrentToStorage = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("fitcampCurrentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("fitcampCurrentUser");
    }
  };

  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!user) {
      return { success: false, message: "Email atau password salah." };
    }

    saveCurrentToStorage(user);
    return { success: true, message: "Login berhasil." };
  };

  const register = (name: string, email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail || !password) {
      return { success: false, message: "Semua kolom harus diisi." };
    }

    const existingUser = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar." };
    }

    const newUser: User = {
      id: Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: password,
      profileImage: defaultProfileSvg,
      outfitHistory: [],
    };

    const updatedUsers = [...users, newUser];
    saveUsersToStorage(updatedUsers);

    return { success: true, message: "Akun berhasil dibuat. Silakan Sign In." };
  };

  const logout = () => {
    saveCurrentToStorage(null);
  };

  const updateProfile = (name: string, email: string, profileImage?: string) => {
    if (!currentUser) {
      return { success: false, message: "Anda belum login." };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail) {
      return { success: false, message: "Nama dan email harus diisi." };
    }

    const emailUsed = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.id !== currentUser.id
    );
    if (emailUsed) {
      return { success: false, message: "Email tersebut sudah digunakan." };
    }

    const updatedUser: User = {
      ...currentUser,
      name: cleanName,
      email: cleanEmail,
      profileImage: profileImage !== undefined ? profileImage : currentUser.profileImage,
    };

    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));

    saveUsersToStorage(updatedUsers);
    saveCurrentToStorage(updatedUser);

    return { success: true, message: "Profile berhasil diperbarui." };
  };

  const saveOutfit = (analysis: AnalysisResult) => {
    if (!currentUser) {
      return {
        success: false,
        message: "Silakan login terlebih dahulu untuk menyimpan outfit.",
      };
    }

    const newHistoryItem: SavedOutfit = {
      style: analysis.style,
      score: analysis.score,
      shirt: analysis.shirt,
      pants: analysis.pants,
      shoes: analysis.shoes,
      savedAt: new Date().toISOString(),
    };

    const updatedHistory = [...(currentUser.outfitHistory || []), newHistoryItem];
    const updatedUser: User = {
      ...currentUser,
      outfitHistory: updatedHistory,
    };

    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));

    saveUsersToStorage(updatedUsers);
    saveCurrentToStorage(updatedUser);

    return { success: true, message: "♡ Outfit berhasil disimpan ke Account!" };
  };

  const deleteOutfit = (index: number) => {
    if (!currentUser) return;
    const currentList = currentUser.outfitHistory || [];
    const updatedList = currentList.filter((_, i) => i !== index);

    const updatedUser: User = {
      ...currentUser,
      outfitHistory: updatedList,
    };

    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));

    saveUsersToStorage(updatedUsers);
    saveCurrentToStorage(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isLoaded,
        login,
        register,
        logout,
        updateProfile,
        saveOutfit,
        deleteOutfit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
