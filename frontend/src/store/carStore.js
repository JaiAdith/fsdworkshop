import { create } from "zustand";

export const useCarStore = create((set) => ({
  cars: [],
  loading: false,
  error: null,

  // Set cars
  setCars: (cars) => set({ cars }),

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error
  setError: (error) => set({ error }),

  // Create car (Admin only)
  createCar: async (newCar) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newCar),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({ cars: [data.data, ...state.cars], loading: false }));
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Fetch all cars
  fetchCars: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/cars?${queryParams}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set({ cars: data.data, loading: false });
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Fetch single car
  fetchCar: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/cars/${id}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set({ loading: false });
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Update car (Admin only)
  updateCar: async (id, updatedCar) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCar),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({
        cars: state.cars.map((car) => (car._id === id ? data.data : car)),
        loading: false,
      }));
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Delete car (Admin only)
  deleteCar: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({
        cars: state.cars.filter((car) => car._id !== id),
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Search cars
  searchCars: async (query) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/cars/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set({ cars: data.data, loading: false });
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },
}));