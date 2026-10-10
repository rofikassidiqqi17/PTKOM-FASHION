"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { currentUser, login, register, logout, updateProfile, deleteOutfit } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMessage, setEditMessage] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginEmail, loginPassword);
    if (!success) setLoginError("Email atau password salah.");
    else setLoginError("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register(registerName, registerEmail, registerPassword);
    if (!success) setRegisterError("Email sudah terdaftar.");
    else {
      setRegisterError("");
      setIsLogin(true);
      setLoginEmail(registerEmail);
    }
  };

  const handleEditProfile = () => {
    if (!currentUser) return;
    setEditName(currentUser.name);
    setEditEmail(currentUser.email);
    setIsEditing(true);
    setEditMessage("");
  };

  const handleSaveProfile = () => {
    if (!editName || !editEmail) {
      setEditMessage("Nama dan Email tidak boleh kosong.");
      return;
    }
    const success = updateProfile(editName, editEmail, currentUser?.profileImage);
    if (success) {
      setEditMessage("Profil berhasil diupdate.");
      setTimeout(() => {
        setIsEditing(false);
        setEditMessage("");
      }, 1500);
    } else {
      setEditMessage("Email sudah digunakan.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUser) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        updateProfile(currentUser.name, currentUser.email, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main>
      {!currentUser ? (
        <section className="auth-section">
          <div className="auth-wrapper">
            {isLogin ? (
              <div id="loginForm" className="auth-form">
                <div className="auth-title">
                  <p>WELCOME BACK</p>
                  <h1>Sign In</h1>
                  <span>Masuk ke akun FITCAMP kamu.</span>
                </div>
                <form id="login" onSubmit={handleLogin}>
                  <div className="input-group">
                    <label htmlFor="loginEmail">Email</label>
                    <input
                      type="email"
                      id="loginEmail"
                      placeholder="Email kamu"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input
                      type="password"
                      id="loginPassword"
                      placeholder="Password kamu"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p id="loginMessage" className="form-message">{loginError}</p>
                  <button type="submit" className="auth-btn">Sign In</button>
                </form>
                <div className="switch-auth">
                  Belum punya akun?
                  <button type="button" id="showRegister" onClick={() => setIsLogin(false)}>
                    Sign Up
                  </button>
                </div>
              </div>
            ) : (
              <div id="registerForm" className="auth-form">
                <div className="auth-title">
                  <p>JOIN FITCAMP</p>
                  <h1>Create Account</h1>
                  <span>Buat akun untuk menyimpan outfit favoritmu.</span>
                </div>
                <form id="register" onSubmit={handleRegister}>
                  <div className="input-group">
                    <label htmlFor="registerName">Nama</label>
                    <input
                      type="text"
                      id="registerName"
                      placeholder="Nama kamu"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="registerEmail">Email</label>
                    <input
                      type="email"
                      id="registerEmail"
                      placeholder="Email kamu"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="registerPassword">Password</label>
                    <input
                      type="password"
                      id="registerPassword"
                      placeholder="Buat password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p id="registerMessage" className="form-message">{registerError}</p>
                  <button type="submit" className="auth-btn">Create Account</button>
                </form>
                <div className="switch-auth">
                  Sudah punya akun?
                  <button type="button" id="showLogin" onClick={() => setIsLogin(true)}>
                    Sign In
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section id="profileSection" className="profile-section">
          <div className="profile-header">
            <div>
              <p className="small-title">MY ACCOUNT</p>
              <h1>Profile</h1>
              <span>Kelola informasi akun FITCAMP kamu.</span>
            </div>
            <button id="logoutBtn" className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>

          <div className="profile-card">
            <div className="profile-picture-area">
              <div className="profile-picture">
                {currentUser.profileImage ? (
                  <img id="profileImage" src={currentUser.profileImage} alt="Profile" style={{ display: "block" }} />
                ) : (
                  <img id="profileImage" src="" alt="Profile" style={{ display: "none" }} />
                )}
              </div>
              <label htmlFor="profileUpload" className="upload-btn">
                Upload Photo
              </label>
              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </div>

            <div className="profile-information">
              <div className="profile-field">
                <span>Nama</span>
                <strong id="profileName">{currentUser.name}</strong>
              </div>
              <div className="profile-field">
                <span>Email</span>
                <strong id="profileEmail">{currentUser.email}</strong>
              </div>
              {!isEditing && (
                <button id="editProfileBtn" className="edit-btn" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {isEditing && (
            <div id="editProfileCard" className="edit-profile-card">
              <h2>Edit Profile</h2>
              <div className="input-group">
                <label htmlFor="editName">Nama</label>
                <input
                  type="text"
                  id="editName"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="editEmail">Email</label>
                <input
                  type="email"
                  id="editEmail"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <p id="editMessage" className="form-message">{editMessage}</p>
              <div className="edit-buttons">
                <button type="button" id="cancelEdit" className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Batal
                </button>
                <button type="button" id="saveProfile" className="auth-btn" onClick={handleSaveProfile}>
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          <div className="history-section">
            <div className="history-title">
              <p className="small-title">MY OUTFITS</p>
              <h2>Outfit History</h2>
              <span>Outfit yang kamu simpan dari halaman Home.</span>
            </div>
            
            <div id="outfitHistory" className="history-grid">
              {currentUser.outfitHistory && currentUser.outfitHistory.length > 0 ? (
                currentUser.outfitHistory.map((outfit, index) => (
                  <div key={index} className="history-card">
                    <button className="delete-btn" onClick={() => deleteOutfit(index)}>×</button>
                    <div className="history-images">
                      <img src={outfit.shirt.image} alt="Baju" />
                      <img src={outfit.pants.image} alt="Celana" />
                      <img src={outfit.shoes.image} alt="Sepatu" />
                    </div>
                    <div className="history-info">
                      <h4>Style: {outfit.style}</h4>
                      <span>Score: {outfit.score}/100</span>
                    </div>
                    <small className="history-date">
                      {new Date(outfit.savedAt || new Date()).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </small>
                  </div>
                ))
              ) : (
                <div className="empty-history">Belum ada outfit yang disimpan.</div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
