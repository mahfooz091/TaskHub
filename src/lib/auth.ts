// Simple in-memory storage for demo (in production, use a backend API)
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  provider?: "email" | "google";
  createdAt: Date;
}

const users: User[] = [];

export const authService = {
  // Sign up a new user
  signup: async (name: string, email: string, password: string) => {
    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Validate password strength
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password, // In production, hash the password!
      createdAt: new Date(),
    };

    users.push(newUser);

    // Store in localStorage for persistence in this session
    if (typeof window !== "undefined") {
      const storedUsers = JSON.parse(localStorage.getItem("alignerr_users") || "[]");
      storedUsers.push(newUser);
      localStorage.setItem("alignerr_users", JSON.stringify(storedUsers));

      // Set current user
      localStorage.setItem(
        "alignerr_currentUser",
        JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        })
      );
    }

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  },

  // Login user
  login: async (email: string, password: string) => {
    // Load users from localStorage
    let usersList = users;
    if (typeof window !== "undefined") {
      const storedUsers = JSON.parse(localStorage.getItem("alignerr_users") || "[]");
      usersList = storedUsers.length > 0 ? storedUsers : users;
    }

    // Find user
    const user = usersList.find((u: User) => u.email === email);
    if (!user) {
      throw new Error("User not found");
    }

    // Check password
    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    // Set current user
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "alignerr_currentUser",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },

  // Logout user
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("alignerr_currentUser");
    }
  },

  // Get current user
  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("alignerr_currentUser");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  // Check if user is logged in
  isLoggedIn: () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("alignerr_currentUser");
    }
    return false;
  },

  // Google OAuth signup/login (demo implementation)
  signupWithGoogle: async (googleUser: { id: string; name: string; email: string; picture?: string }) => {
    // Load users from localStorage
    let usersList = users;
    if (typeof window !== "undefined") {
      const storedUsers = JSON.parse(localStorage.getItem("alignerr_users") || "[]");
      usersList = storedUsers.length > 0 ? storedUsers : users;
    }

    // Check if user already exists
    let existingUser = usersList.find((u: User) => u.email === googleUser.email);
    
    if (!existingUser) {
      // Create new user from Google
      existingUser = {
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        provider: "google" as const,
        createdAt: new Date(),
      };

      usersList.push(existingUser);

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("alignerr_users", JSON.stringify(usersList));
      }
    }

    // Set current user
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "alignerr_currentUser",
        JSON.stringify({
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          provider: existingUser.provider || "google",
        })
      );
    }

    return {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      provider: existingUser.provider || "google",
    };
  },

  // Simulate Google OAuth login
  loginWithGoogle: async (googleUser: { id: string; name: string; email: string }) => {
    // For demo, just call signupWithGoogle (it handles existing users too)
    return authService.signupWithGoogle(googleUser);
  },

  // Generate mock Google user (for demo)
  generateMockGoogleUser: () => {
    const names = ["Alex Johnson", "Sarah Smith", "Mike Chen", "Emma Davis"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomId = Math.random().toString(36).substr(2, 9);
    const randomEmail = `user${randomId}@gmail.com`;

    return {
      id: randomId,
      name: randomName,
      email: randomEmail,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomId}`,
    };
  },
};
