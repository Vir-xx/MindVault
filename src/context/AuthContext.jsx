// Auth removed: provide a passthrough provider for compatibility
export function AuthProvider({ children }) {
  return children;
}

export function useAuth() {
  return { token: true };
}


