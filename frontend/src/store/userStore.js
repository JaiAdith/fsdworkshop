import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      // Set user and token
      setUser: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: !!user,
        error: null 
      }),

      // Set loading state
      setLoading: (loading) => set({ loading }),

      // Set error
      setError: (error) => set({ error }),

      // Register user
      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/api/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
          const data = await res.json();

          if (!data.success) {
            throw new Error(data.message);
          }

          // Store token in localStorage
          localStorage.setItem('token', data.data.token);
          
          set({ 
            user: data.data, 
            token: data.data.token,
            isAuthenticated: true,
            loading: false,
            error: null
          });
          
          return { success: true, data: data.data };
        } catch (error) {
          set({ error: error.message, loading: false });
          return { success: false, message: error.message };
        }
      },

      // Login user
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();

          if (!data.success) {
            throw new Error(data.message);
          }

          // Store token in localStorage
          localStorage.setItem('token', data.data.token);
          
          set({ 
            user: data.data, 
            token: data.data.token,
            isAuthenticated: true,
            loading: false,
            error: null
          });
          
          return { success: true, data: data.data };
        } catch (error) {
          set({ error: error.message, loading: false });
          return { success: false, message: error.message };
        }
      },

      // Logout user
      logout: () => {
        localStorage.removeItem('token');
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          error: null 
        });
      },

      // Get user profile
      getProfile: async () => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No token found');
          }

          const res = await fetch("/api/users/profile", {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          const data = await res.json();

          if (!data.success) {
            throw new Error(data.message);
          }

          set({ 
            user: { ...get().user, ...data.data }, 
            loading: false 
          });
          
          return { success: true, data: data.data };
        } catch (error) {
          set({ error: error.message, loading: false });
          // If token is invalid, logout
          if (error.message.includes('token') || error.message.includes('authorization')) {
            get().logout();
          }
          return { success: false, message: error.message };
        }
      },

      // Update user profile
      updateProfile: async (userData) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          const res = await fetch("/api/users/profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          });
          const data = await res.json();

          if (!data.success) {
            throw new Error(data.message);
          }

          set({ 
            user: { ...get().user, ...data.data }, 
            loading: false 
          });
          
          return { success: true, data: data.data };
        } catch (error) {
          set({ error: error.message, loading: false });
          return { success: false, message: error.message };
        }
      },

      // Initialize auth from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
          set({ token, isAuthenticated: true });
          // Optionally fetch user profile
          get().getProfile();
        }
      },

      // Check if user is admin
      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);