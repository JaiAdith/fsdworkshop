import { create } from "zustand";

export const useBookingStore = create((set) => ({
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,

  // Set bookings
  setBookings: (bookings) => set({ bookings }),

  // Set current booking
  setCurrentBooking: (booking) => set({ currentBooking: booking }),

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error
  setError: (error) => set({ error }),

  // Create booking
  createBooking: async (bookingData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({ 
        bookings: [data.data, ...state.bookings], 
        currentBooking: data.data,
        loading: false 
      }));
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Fetch user's bookings
  fetchUserBookings: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/bookings/my-bookings", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set({ bookings: data.data, loading: false });
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Fetch all bookings (Admin only)
  fetchAllBookings: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("/api/bookings", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set({ bookings: data.data, loading: false });
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Fetch single booking
  fetchBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/bookings/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set({ currentBooking: data.data, loading: false });
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Cancel booking
  cancelBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/bookings/${id}/cancel`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking._id === id ? { ...booking, status: 'cancelled' } : booking
        ),
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Update booking status (Admin only)
  updateBookingStatus: async (id, statusData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(statusData),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking._id === id ? data.data : booking
        ),
        currentBooking: state.currentBooking?._id === id ? data.data : state.currentBooking,
        loading: false,
      }));
      return { success: true, data: data.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // Clear current booking
  clearCurrentBooking: () => set({ currentBooking: null }),

  // Clear all bookings
  clearBookings: () => set({ bookings: [], currentBooking: null }),
}));