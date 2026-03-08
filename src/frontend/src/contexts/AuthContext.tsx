import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const ADMIN_EMAIL = "krishdarpan8@gmail.com";

export interface User {
  username: string;
  email: string;
  ign: string;
  avatarDataUrl?: string;
  role: "player" | "vip" | "mvip" | "sword" | "immortal";
  purchasedRanks: string[];
  purchaseCounts: Record<string, number>;
  isAdmin?: boolean;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  register: (
    username: string,
    email: string,
    password: string,
    ign?: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  purchaseRank: (rankName: string) => void;
  getPurchaseCount: (itemName: string) => number;
  updateProfile: (data: {
    username?: string;
    ign?: string;
    avatarDataUrl?: string;
  }) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
}

const USERS_KEY = "swordmc_users";
const SESSION_KEY = "swordmc_session";

function hashPassword(password: string): string {
  // Simple deterministic hash for localStorage-only auth
  let hash = 0;
  const str = `${password}swordmc_salt_v1`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredSession());

  useEffect(() => {
    // Sync user changes to session storage
    if (user) {
      saveSession(user);
    }
  }, [user]);

  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      ign = "",
    ): Promise<void> => {
      const users = getStoredUsers();

      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("An account with this email already exists.");
      }
      if (
        users.some((u) => u.username.toLowerCase() === username.toLowerCase())
      ) {
        throw new Error("Username is already taken.");
      }

      const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      const newUser: StoredUser = {
        username,
        email: email.toLowerCase(),
        ign: ign || username,
        role: "player",
        purchasedRanks: [],
        purchaseCounts: {},
        passwordHash: hashPassword(password),
        isAdmin,
      };

      saveUsers([...users, newUser]);

      const sessionUser: User = {
        username: newUser.username,
        email: newUser.email,
        ign: newUser.ign,
        role: newUser.role,
        purchasedRanks: newUser.purchasedRanks,
        purchaseCounts: newUser.purchaseCounts,
        isAdmin,
      };
      saveSession(sessionUser);
      setUser(sessionUser);
    },
    [],
  );

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const users = getStoredUsers();
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );

      if (!found || found.passwordHash !== hashPassword(password)) {
        throw new Error("Invalid email or password.");
      }

      const isAdmin =
        found.isAdmin ||
        found.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      // Persist admin flag if not already set
      if (!found.isAdmin && isAdmin) {
        const idx = users.findIndex(
          (u) => u.email.toLowerCase() === found.email.toLowerCase(),
        );
        if (idx !== -1) {
          users[idx] = { ...users[idx], isAdmin: true };
          saveUsers(users);
        }
      }

      const sessionUser: User = {
        username: found.username,
        email: found.email,
        ign: found.ign,
        role: found.role,
        purchasedRanks: found.purchasedRanks,
        purchaseCounts: found.purchaseCounts ?? {},
        isAdmin,
      };
      saveSession(sessionUser);
      setUser(sessionUser);
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (data: {
      username?: string;
      ign?: string;
      avatarDataUrl?: string;
    }): Promise<void> => {
      setUser((prev) => {
        if (!prev) return prev;
        const merged: User = {
          ...prev,
          ...(data.username !== undefined ? { username: data.username } : {}),
          ...(data.ign !== undefined ? { ign: data.ign } : {}),
          ...(data.avatarDataUrl !== undefined
            ? { avatarDataUrl: data.avatarDataUrl }
            : {}),
        };

        // Update stored user record
        const users = getStoredUsers();
        const idx = users.findIndex(
          (u) => u.email.toLowerCase() === merged.email.toLowerCase(),
        );
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...merged };
          saveUsers(users);
        }

        saveSession(merged);
        return merged;
      });
    },
    [],
  );

  const resetPassword = useCallback(
    async (email: string, newPassword: string): Promise<void> => {
      const users = getStoredUsers();
      const idx = users.findIndex(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (idx === -1) {
        throw new Error("No account found with that email address.");
      }
      users[idx] = { ...users[idx], passwordHash: hashPassword(newPassword) };
      saveUsers(users);
    },
    [],
  );

  const MAX_PURCHASES = 5;

  const purchaseRank = useCallback((rankName: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const currentCount = prev.purchaseCounts?.[rankName] ?? 0;
      if (currentCount >= MAX_PURCHASES) return prev;

      const rankRoleMap: Record<string, User["role"]> = {
        VIP: "vip",
        MVIP: "mvip",
        Sword: "sword",
        Immortal: "immortal",
      };

      const rankOrder: User["role"][] = [
        "player",
        "vip",
        "mvip",
        "sword",
        "immortal",
      ];
      const currentIndex = rankOrder.indexOf(prev.role);
      const newRankRole = rankRoleMap[rankName] ?? prev.role;
      const newRankIndex = rankOrder.indexOf(newRankRole);
      const updatedRole = newRankIndex > currentIndex ? newRankRole : prev.role;

      const newCount = currentCount + 1;
      const updatedCounts = {
        ...prev.purchaseCounts,
        [rankName]: newCount,
      };
      // Keep purchasedRanks for backward compatibility (first purchase adds it)
      const updatedPurchasedRanks = prev.purchasedRanks.includes(rankName)
        ? prev.purchasedRanks
        : [...prev.purchasedRanks, rankName];

      const updated: User = {
        ...prev,
        purchasedRanks: updatedPurchasedRanks,
        purchaseCounts: updatedCounts,
        role: updatedRole,
      };

      // Persist to users list
      const users = getStoredUsers();
      const idx = users.findIndex(
        (u) => u.email.toLowerCase() === updated.email.toLowerCase(),
      );
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updated };
        saveUsers(users);
      }

      saveSession(updated);
      return updated;
    });
  }, []);

  const getPurchaseCount = useCallback(
    (itemName: string): number => {
      return user?.purchaseCounts?.[itemName] ?? 0;
    },
    [user],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        register,
        login,
        logout,
        purchaseRank,
        getPurchaseCount,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
