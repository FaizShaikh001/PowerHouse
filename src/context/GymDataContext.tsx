import React, { createContext, useContext, useState } from "react";
import { loadGymData, saveGymData, PricingPlan, GymTimings, ClientTransformation, GymMember, EventPost, EventRegistration } from "../utils/gymDataStore";

export interface AdminLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
}

interface GymDataContextProps {
  pricingPlans: PricingPlan[];
  timings: GymTimings;
  transformations: ClientTransformation[];
  members: GymMember[];
  eventPosts: EventPost[];
  eventRegistrations: EventRegistration[];
  isAdmin: boolean;
  adminUsername: string;
  adminPassword: string;
  securityQuestion: string;
  securityAnswer: string;
  adminLogs: AdminLog[];
  addLog: (action: string, details: string) => void;
  clearLogs: () => void;
  updatePricing: (plans: PricingPlan[]) => void;
  updateTimings: (timings: GymTimings) => void;
  addTransformation: (trans: Omit<ClientTransformation, "id">) => void;
  deleteTransformation: (id: string) => void;
  editTransformation: (trans: ClientTransformation) => void;
  addMember: (member: Omit<GymMember, "id" | "joinedDate">) => void;
  deleteMember: (id: string) => void;
  addEventPost: (event: Omit<EventPost, "id" | "isActive">) => void;
  deleteEventPost: (id: string) => void;
  toggleEventPostActive: (id: string) => void;
  addEventRegistration: (reg: Omit<EventRegistration, "id" | "timestamp">) => Promise<boolean>;
  deleteEventRegistration: (id: string) => void;
  adminLogin: (id: string, pass: string) => boolean;
  adminLogout: () => void;
  recoverPassword: (answer: string) => string | null;
  updateAdminCredentials: (username: string, pass: string, question: string, answer: string) => void;
  resetToDefaults: () => void;
}

const GymDataContext = createContext<GymDataContextProps | undefined>(undefined);

export const GymDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(() => loadGymData());
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      return localStorage.getItem("powerhouse_admin_session") === "true";
    }
    return false;
  });

  // Automatically sync admin session changes to localStorage
  React.useEffect(() => {
    if (typeof localStorage !== "undefined") {
      if (isAdmin) {
        localStorage.setItem("powerhouse_admin_session", "true");
      } else {
        localStorage.removeItem("powerhouse_admin_session");
      }
    }
  }, [isAdmin]);

  // Synchronize admin session changes across other open browser tabs or windows
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "powerhouse_admin_session") {
        setIsAdmin(e.newValue === "true");
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  const [adminCreds, setAdminCreds] = useState(() => {
    const defaultCreds = {
      username: "admin",
      password: "admin",
      securityQuestion: "What is your primary training philosophy?",
      securityAnswer: "biomechanics"
    };
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("powerhouse_admin_creds");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return { ...defaultCreds, ...parsed };
        } catch (e) {
          // ignore parsing errors
        }
      }
    }
    return defaultCreds;
  });

  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(() => {
    const defaultLogs = [
      {
        id: "log_init_1",
        timestamp: new Date().toLocaleString("en-US", { hour12: false }),
        action: "System Primed",
        details: "PowerHouse Gym system core loaded successfully."
      },
      {
        id: "log_init_2",
        timestamp: new Date().toLocaleString("en-US", { hour12: false }),
        action: "Database Primed",
        details: "Loaded active members records and training transformation galleries."
      }
    ];
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("powerhouse_admin_logs");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          // ignore
        }
      }
    }
    return defaultLogs;
  });

  const addLog = (action: string, details: string) => {
    const newLog: AdminLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleString("en-US", { hour12: false }),
      action,
      details
    };
    setAdminLogs((prev) => {
      const next = [newLog, ...prev].slice(0, 50);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("powerhouse_admin_logs", JSON.stringify(next));
      }
      return next;
    });
  };

  const clearLogs = () => {
    setAdminLogs([]);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("powerhouse_admin_logs", JSON.stringify([]));
    }
  };

  const updatePricing = (plans: PricingPlan[]) => {
    setData((prev) => {
      const next = { ...prev, pricingPlans: plans };
      saveGymData(next);
      return next;
    });
    addLog("Updated Pricing Plans", `Recalibrated marketing rates for ${plans.length} plans/tiers.`);
  };

  const updateTimings = (timings: GymTimings) => {
    setData((prev) => {
      const next = { ...prev, timings };
      saveGymData(next);
      return next;
    });
    addLog("Updated Timings", `Set Weekday to "${timings.weekdays}" and Sunday to "${timings.sunday}".`);
  };

  const addTransformation = (trans: Omit<ClientTransformation, "id">) => {
    setData((prev) => {
      const newItems = [
        {
          ...trans,
          id: `trans_${Date.now()}`
        },
        ...prev.transformations
      ];
      const next = { ...prev, transformations: newItems };
      saveGymData(next);
      return next;
    });
    addLog("Added Transformation", `Registered new portfolio profile for "${trans.name}" under trainer "${trans.trainer}".`);
  };

  const deleteTransformation = (id: string) => {
    let name = id;
    setData((prev) => {
      const found = prev.transformations.find(t => t.id === id);
      if (found) name = found.name;
      const newItems = prev.transformations.filter((item) => item.id !== id);
      const next = { ...prev, transformations: newItems };
      saveGymData(next);
      return next;
    });
    addLog("Deleted Transformation", `Removed client transformation index for "${name}".`);
  };

  const editTransformation = (trans: ClientTransformation) => {
    setData((prev) => {
      const newItems = prev.transformations.map((item) => 
        item.id === trans.id ? trans : item
      );
      const next = { ...prev, transformations: newItems };
      saveGymData(next);
      return next;
    });
    addLog("Edited Transformation", `Updated performance profile for "${trans.name}".`);
  };

  const addMember = (member: Omit<GymMember, "id" | "joinedDate">) => {
    setData((prev) => {
      const today = new Date().toISOString().split("T")[0];
      const newItems = [
        ...prev.members,
        {
          ...member,
          id: `mem_${Date.now()}`,
          joinedDate: today
        }
      ];
      const next = { ...prev, members: newItems };
      saveGymData(next);
      return next;
    });
    addLog("Registered New Member", `Enrolled "${member.name}" under ${member.plan}.`);
  };

  const deleteMember = (id: string) => {
    let name = id;
    setData((prev) => {
      const found = prev.members.find(m => m.id === id);
      if (found) name = found.name;
      const newItems = prev.members.filter((item) => item.id !== id);
      const next = { ...prev, members: newItems };
      saveGymData(next);
      return next;
    });
    addLog("Member Disenrolled", `Terminated membership index for "${name}".`);
  };

  const adminLogin = (id: string, pass: string) => {
    if (
      id.trim().toLowerCase() === adminCreds.username.trim().toLowerCase() && 
      pass === adminCreds.password
    ) {
      setIsAdmin(true);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("powerhouse_admin_session", "true");
      }
      addLog("Security Login Successful", `Admin user "${id.trim()}" authenticated from system gateway.`);
      return true;
    }
    addLog("Security Login Failed", `Failed authentication attempt for username ID: "${id.trim()}".`);
    return false;
  };

  const recoverPassword = (answer: string) => {
    const savedAnswer = (adminCreds.securityAnswer || "biomechanics").trim().toLowerCase();
    const providedAnswer = (answer || "").trim().toLowerCase();
    if (providedAnswer === savedAnswer) {
      return adminCreds.password;
    }
    return null;
  };

  const updateAdminCredentials = (username: string, pass: string, question: string, answer: string) => {
    const nextCreds = {
      username: username.trim(),
      password: pass,
      securityQuestion: question.trim(),
      securityAnswer: answer.trim()
    };
    setAdminCreds(nextCreds);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("powerhouse_admin_creds", JSON.stringify(nextCreds));
    }
    addLog("Security Overrides Updated", "Administrative credentials, challenge question, and secret answers recalibrated.");
  };

  const adminLogout = () => {
    setIsAdmin(false);
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("powerhouse_admin_session");
    }
    addLog("Security Session Terminated", "Administrative user logged out of web dashboard.");
  };

  const addEventPost = (event: Omit<EventPost, "id" | "isActive">) => {
    setData((prev) => {
      const newItems: EventPost[] = [
        {
          ...event,
          id: `event_${Date.now()}`,
          isActive: true
        },
        ...(prev.eventPosts || [])
      ];
      const next = { ...prev, eventPosts: newItems };
      saveGymData(next);
      return next;
    });
    addLog("Added Event Poster", `Broadcasted a new event: "${event.title}".`);
  };

  const deleteEventPost = (id: string) => {
    let title = id;
    setData((prev) => {
      const found = (prev.eventPosts || []).find(e => e.id === id);
      if (found) title = found.title;
      const newItems = (prev.eventPosts || []).filter((item) => item.id !== id);
      const next = { ...prev, eventPosts: newItems };
      saveGymData(next);
      return next;
    });
    addLog("Deleted Event Poster", `Removed event poster index for "${title}".`);
  };

  const toggleEventPostActive = (id: string) => {
    let title = id;
    let nextState = false;
    setData((prev) => {
      const newItems = (prev.eventPosts || []).map((item) => {
        if (item.id === id) {
          nextState = !item.isActive;
          title = item.title;
          return { ...item, isActive: nextState };
        }
        return item;
      });
      const next = { ...prev, eventPosts: newItems };
      saveGymData(next);
      return next;
    });
    addLog("Toggled Event Status", `Set event "${title}" active status to: ${nextState}.`);
  };

  const addEventRegistration = async (reg: Omit<EventRegistration, "id" | "timestamp">): Promise<boolean> => {
    const today = new Date().toISOString().split("T")[0];
    const timestampStr = new Date().toLocaleTimeString("en-IN", { hour12: true });
    
    const newRegId = `reg_${Date.now()}`;
    const newReg: EventRegistration = {
      ...reg,
      id: newRegId,
      timestamp: `${today} ${timestampStr}`
    };

    let apiSuccess = false;

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: reg.eventId,
          eventTitle: reg.eventTitle,
          name: reg.name,
          phone: reg.phone,
          email: reg.email,
          googleFormUrl: (data.eventPosts || []).find(e => e.id === reg.eventId)?.registrationFormUrl || "",
          googleFormSubmitted: false
        }),
      });

      const resData = await response.json();
      console.log("[API Server Registration response]", resData);
      apiSuccess = response.ok;
    } catch (e) {
      console.error("[API Registration network fail, continuing with local persistence]", e);
    }

    setData((prev) => {
      const newRegs = [newReg, ...(prev.eventRegistrations || [])];
      const next = { ...prev, eventRegistrations: newRegs };
      saveGymData(next);
      return next;
    });

    addLog("Event Registration Raised", `Registered attendee "${reg.name}" for "${reg.eventTitle}". Dispatching alert to Gmail.`);
    return true;
  };

  const deleteEventRegistration = (id: string) => {
    let name = id;
    setData((prev) => {
      const found = (prev.eventRegistrations || []).find(r => r.id === id);
      if (found) name = found.name;
      const newRegs = (prev.eventRegistrations || []).filter((item) => item.id !== id);
      const next = { ...prev, eventRegistrations: newRegs };
      saveGymData(next);
      return next;
    });
    addLog("Deleted Event Registration", `Removed attendee registration for "${name}".`);
  };

  const resetToDefaults = () => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.removeItem("powerhouse_pricing_plans");
      localStorage.removeItem("powerhouse_timings");
      localStorage.removeItem("powerhouse_transformations");
      localStorage.removeItem("powerhouse_members");
      localStorage.removeItem("powerhouse_event_posts");
      localStorage.removeItem("powerhouse_event_registrations");
      localStorage.removeItem("powerhouse_admin_creds");
      localStorage.removeItem("powerhouse_admin_logs");
      localStorage.removeItem("powerhouse_admin_session");
    }
    setAdminCreds({
      username: "admin",
      password: "admin",
      securityQuestion: "What is your primary training philosophy?",
      securityAnswer: "biomechanics"
    });
    const fresh = loadGymData();
    setData(fresh);
    const defaultLogs = [
      {
        id: "log_reset_" + Date.now(),
        timestamp: new Date().toLocaleString("en-US", { hour12: false }),
        action: "Database Factory Reset",
        details: "Purged all active sessions and configs. Restored premium default assets."
      }
    ];
    setAdminLogs(defaultLogs);
  };

  return (
    <GymDataContext.Provider
      value={{
        pricingPlans: data.pricingPlans,
        timings: data.timings,
        transformations: data.transformations,
        members: data.members,
        eventPosts: data.eventPosts || [],
        eventRegistrations: data.eventRegistrations || [],
        isAdmin,
        adminUsername: adminCreds.username,
        adminPassword: adminCreds.password,
        securityQuestion: adminCreds.securityQuestion,
        securityAnswer: adminCreds.securityAnswer,
        adminLogs,
        addLog,
        clearLogs,
        updatePricing,
        updateTimings,
        addTransformation,
        deleteTransformation,
        editTransformation,
        addMember,
        deleteMember,
        addEventPost,
        deleteEventPost,
        toggleEventPostActive,
        addEventRegistration,
        deleteEventRegistration,
        adminLogin,
        adminLogout,
        recoverPassword,
        updateAdminCredentials,
        resetToDefaults
      }}
    >
      {children}
    </GymDataContext.Provider>
  );
};

export const useGymData = () => {
  const context = useContext(GymDataContext);
  if (context === undefined) {
    throw new Error("useGymData must be used within a GymDataProvider");
  }
  return context;
};
