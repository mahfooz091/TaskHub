// src/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Helper to normalize base URL and endpoint concatenation.
 * Ensures there are no duplicate or missing slashes.
 */
const buildUrl = (endpoint: string) => {
  const base = API_URL.replace(/\/+$/, ''); // remove trailing slash(es)
  const ep = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${ep}`;
};

/* -------------------------
   Token management (SSR-safe)
   ------------------------- */
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const clearToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

/* -------------------------
   Generic API call wrapper
   ------------------------- */
export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = buildUrl(endpoint);
  const token = getToken();

  const providedHeaders = (options.headers as Record<string, string>) || {};

  // If sending FormData, do NOT set Content-Type (browser will set the boundary)
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...providedHeaders
  };

  if (!isFormData) {
    // Ensure Content-Type for JSON requests
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // Debug log (remove or lower verbosity in production)
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[apiCall] Request:', { url, method: options.method || 'GET', headersPreview: Object.keys(headers), bodyPreview: options.body ? String(options.body).slice(0, 200) : undefined });
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      // Handle unauthorized globally
      if (response.status === 401) {
        clearToken();
        if (typeof window !== 'undefined') {
          // redirect to login in client
          window.location.href = '/login';
        }
      }

      // Try to parse detailed error from backend
      let errorMessage = 'API request failed';
      try {
        const errorBody = await response.json();
        console.log('[apiCall] Full error response:', errorBody);
        if (errorBody) {
          if (typeof errorBody === 'object') {
            if (errorBody.detail) {
              errorMessage = typeof errorBody.detail === 'string' ? errorBody.detail : JSON.stringify(errorBody.detail);
            } else if (errorBody.message) {
              errorMessage = errorBody.message;
            } else {
              errorMessage = JSON.stringify(errorBody);
            }
          } else {
            errorMessage = String(errorBody);
          }
        }
      } catch (e) {
        // fallback to status text
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }

      console.error('[apiCall] API Error Message:', errorMessage);
      console.error('[apiCall] Response status:', response.status);
      console.error('[apiCall] Response URL:', url);
      throw new Error(errorMessage);
    }

    // No content (204)
    if (response.status === 204) return null;

    // Parse JSON response (if any)
    const data = await response.json().catch(() => null);
    return data;
  } catch (error: any) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    // Improve guidance for common network errors
    if (/failed to fetch|NetworkError|Network request failed/i.test(errorMsg)) {
      console.error(`Network/API Error: ${errorMsg}. Ensure backend is running at ${API_URL} and CORS allows your frontend origin.`);
      throw new Error(`${errorMsg}. Ensure backend is running at ${API_URL} and CORS allows your frontend origin.`);
    }
    console.error('[apiCall] Unexpected Error:', errorMsg);
    throw error;
  }
};

/* -------------------------
   Authentication API
   ------------------------- */
export const authAPI = {
  signup: async (email: string, username: string, password: string, fullName?: string) => {
    // Use 'name' to match FastAPI UserCreate schema
    const body = {
      email,
      username,
      password,
      name: fullName
    };
    console.debug('[authAPI.signup] Sending signup request:', { email, username });
    const response = await apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    console.debug('[authAPI.signup] Response:', response);
    return response;
  },

  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  getMe: async () => {
    return apiCall('/auth/me');
  },

  refresh: async (refreshToken: string) => {
    return apiCall('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken })
    });
  }
};

/* -------------------------
   Upload API
   ------------------------- */
export const uploadAPI = {
  create: async (file: File, description?: string, tags?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (description) formData.append('description', description);
    if (tags) formData.append('tags', tags);

    const url = buildUrl('/uploads/');
    const token = getToken();

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
    });

    if (!response.ok) {
      // Try to get backend error message if present
      let msg = 'Upload failed';
      try {
        const err = await response.json();
        if (err?.detail) msg = err.detail;
      } catch {}
      throw new Error(msg);
    }

    return response.json();
  },

  list: async (limit: number = 20, offset: number = 0) => {
    return apiCall(`/uploads/?limit=${limit}&offset=${offset}`);
  },

  getStats: async () => {
    return apiCall('/uploads/stats');
  },

  get: async (uploadId: number) => {
    return apiCall(`/uploads/${uploadId}`);
  }
};

/* -------------------------
   Review API
   ------------------------- */
export const reviewAPI = {
  getPending: async (limit: number = 10, offset: number = 0) => {
    return apiCall(`/reviews/pending?limit=${limit}&offset=${offset}`);
  },

  approve: async (
    uploadId: number,
    qualityScore: number,
    comments: string = '',
    rewardAmount: number = 10
  ) => {
    return apiCall(`/reviews/${uploadId}/approve`, {
      method: 'POST',
      body: JSON.stringify({
        quality_score: qualityScore,
        comments,
        reward_amount: rewardAmount
      })
    });
  },

  reject: async (
    uploadId: number,
    rejectionReason: string,
    comments: string = ''
  ) => {
    return apiCall(`/reviews/${uploadId}/reject`, {
      method: 'POST',
      body: JSON.stringify({
        rejection_reason: rejectionReason,
        comments,
        quality_score: 0
      })
    });
  },

  get: async (uploadId: number) => {
    return apiCall(`/reviews/${uploadId}`);
  }
};

/* -------------------------
   Wallet API
   ------------------------- */
export const walletAPI = {
  get: async () => {
    return apiCall('/wallet/');
  },

  getTransactions: async (limit: number = 20, offset: number = 0) => {
    return apiCall(`/wallet/transactions?limit=${limit}&offset=${offset}`);
  },

  withdraw: async (amount: number, upiId?: string, bankAccount?: string) => {
    return apiCall('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        upi_id: upiId,
        bank_account: bankAccount
      })
    });
  }
};

/* -------------------------
   User API
   ------------------------- */
export const userAPI = {
  getProfile: async () => {
    return apiCall('/auth/me');
  },

  updateProfile: async (fullName?: string, bio?: string, profilePicture?: string) => {
    return apiCall('/users/me', {
      method: 'PUT',
      body: JSON.stringify({
        full_name: fullName,
        bio,
        profile_picture: profilePicture
      })
    });
  }
};
