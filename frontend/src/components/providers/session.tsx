"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Session = {
  name: string;
  email: string;
} | null;

type SessionContextType = {
  session: Session;
  setSession: (session: Session) => void;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("userSession");
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
