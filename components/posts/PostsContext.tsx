"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface Notification {
  type: "success" | "error";
  message: string;
}

interface PostsContextType {
  notification: Notification | null;
  setNotification: (n: Notification | null) => void;
  refreshKey: number;
  triggerRefresh: () => void;
}

const PostsContext = createContext<PostsContextType | null>(null);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <PostsContext.Provider
      value={{ notification, setNotification, refreshKey, triggerRefresh }}
    >
      {notification && (
        <div
          className={`fixed right-4 top-16 z-50 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
              : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
          }`}
        >
          {notification.message}
          <button
            onClick={() => setNotification(null)}
            className="ml-3 font-bold"
          >
            ×
          </button>
        </div>
      )}
      {children}
    </PostsContext.Provider>
  );
}

export function usePostsContext() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePostsContext must be used within a PostsProvider");
  }
  return context;
}
