import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGymData } from "../context/GymDataContext";
import { loadGymData } from "../utils/gymDataStore";
import { Lock, Unlock, LogOut, Settings2, Clock, DollarSign, RefreshCw, X, Check, Save, Users, TrendingUp, Plus, Search, UserPlus, Trash2, ShieldCheck, Key, HelpCircle, Activity, Eye, EyeOff } from "lucide-react";

export default function AdminPanel() {
  const { 
    pricingPlans, 
    timings, 
    members = [],
    isAdmin, 
    adminUsername,
    adminPassword,
    securityQuestion,
    securityAnswer,
    adminLogs = [],
    clearLogs,
    updatePricing, 
    updateTimings, 
    addMember,
    deleteMember,
    adminLogin, 
    adminLogout, 
    recoverPassword,
    updateAdminCredentials,
    resetToDefaults 
  } = useGymData();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pricing" | "timings" | "members" | "security" | "logs">("pricing");

  // Admin Audit Log states
  const [logFilter, setLogFilter] = useState("");

  const filteredLogs = adminLogs.filter((log) => {
    const q = logFilter.trim().toLowerCase();
    if (!q) return true;
    return (log.action || "").toLowerCase().includes(q) || 
           (log.details || "").toLowerCase().includes(q) || 
           (log.timestamp || "").toLowerCase().includes(q);
  });

  // Member management states
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberPhone, setNewMemberPhone] = useState("");
  const [newMemberPlan, setNewMemberPlan] = useState("");
  const [newMemberStatus, setNewMemberStatus] = useState<"Active" | "Expired" | "Pending">("Active");
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [memberSaveSuccess, setMemberSaveSuccess] = useState(false);

  // Login inputs
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Edit states for plans
  const [editedPlans, setEditedPlans] = useState(() => [...pricingPlans]);
  
  // Edit states for timings
  const [weekdays, setWeekdays] = useState(timings.weekdays);
  const [sunday, setSunday] = useState(timings.sunday);
  const [womenExclusive, setWomenExclusive] = useState(timings.womenExclusive);

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Security and credentials configuration inputs
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editSecurityQuestion, setEditSecurityQuestion] = useState("");
  const [editSecurityAnswer, setEditSecurityAnswer] = useState("");
  const [credentialsSaveSuccess, setCredentialsSaveSuccess] = useState(false);
  const [showDebugCredentials, setShowDebugCredentials] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  // Password Recovery Wizard states
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryAnswer, setRecoveryAnswer] = useState("");
  const [recoveryResult, setRecoveryResult] = useState<string | null>(null);
  const [recoveryError, setRecoveryError] = useState("");

  // Custom confirmation dialog state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionLabel: string;
    severity: "danger" | "warning";
    onConfirm: () => void;
  } | null>(null);

  // Synchronize dynamic values on modal open
  const handleOpen = () => {
    setIsOpen(true);
    setEditedPlans(JSON.parse(JSON.stringify(pricingPlans)));
    setWeekdays(timings.weekdays);
    setSunday(timings.sunday);
    setWomenExclusive(timings.womenExclusive);
    setLoginError("");
    setSaveSuccess(false);

    // Load active admin credentials into states
    setEditUsername(adminUsername);
    setEditPassword(adminPassword);
    setEditSecurityQuestion(securityQuestion);
    setEditSecurityAnswer(securityAnswer);
    setCredentialsSaveSuccess(false);

    // Reset password recovery wizard
    setIsRecoveryMode(false);
    setRecoveryAnswer("");
    setRecoveryResult(null);
    setRecoveryError("");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(loginId, loginPassword);
    if (success) {
      setLoginId("");
      setLoginPassword("");
      setLoginError("");
      // Reset edit draft states to loaded context database
      setEditedPlans(JSON.parse(JSON.stringify(pricingPlans)));
    } else {
      setLoginError("Invalid credentials. Please enter the correct admin ID and system passcode.");
    }
  };

  const handleRecoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedPassword = recoverPassword(recoveryAnswer);
    if (resolvedPassword !== null) {
      setRecoveryResult(resolvedPassword);
      setRecoveryError("");
    } else {
      setRecoveryError("Incorrect authentication recovery answer. Please try again.");
      setRecoveryResult(null);
    }
  };

  const handleDirectPasswordReset = (newPass: string) => {
    if (!newPass.trim()) return;
    updateAdminCredentials(adminUsername, newPass, securityQuestion, securityAnswer);
    setRecoveryResult(null);
    setIsRecoveryMode(false);
    setLoginId(adminUsername);
    setLoginPassword(newPass);
    setLoginError("Password reset successfully! Log in below.");
  };

  const handlePlanFieldChange = (index: number, field: string, value: string) => {
    const updated = [...editedPlans];
    updated[index] = { ...updated[index], [field]: value };
    setEditedPlans(updated);
  };

  const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const updated = [...editedPlans];
    const features = [...updated[planIndex].features];
    features[featureIndex] = value;
    updated[planIndex] = { ...updated[planIndex], features };
    setEditedPlans(updated);
  };

  const handleAddFeature = (planIndex: number) => {
    const updated = [...editedPlans];
    const features = [...updated[planIndex].features, "New feature inclusion"];
    updated[planIndex] = { ...updated[planIndex], features };
    setEditedPlans(updated);
  };

  const handleRemoveFeature = (planIndex: number, featureIndex: number) => {
    const updated = [...editedPlans];
    const features = updated[planIndex].features.filter((_, idx) => idx !== featureIndex);
    updated[planIndex] = { ...updated[planIndex], features };
    setEditedPlans(updated);
  };

  const saveAllTimings = () => {
    updateTimings({
      weekdays,
      sunday,
      womenExclusive
    });
    triggerSuccessGlow();
  };

  const savePricingPlans = () => {
    updatePricing(editedPlans);
    triggerSuccessGlow();
  };

  const triggerSuccessGlow = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2400);
  };

  const handleReset = () => {
    setConfirmModal({
      isOpen: true,
      title: "RESTORE SYSTEM DEFAULTS",
      description: "This will completely purge all custom member records, personalized pricing tariffs, customized timings, and reset the database to original factory configurations. This action is permanent and irreversible.",
      actionLabel: "Restore Factory Defaults",
      severity: "danger",
      onConfirm: () => {
        resetToDefaults();
        // Reload states
        setTimeout(() => {
          const fresh = loadUpdatedDataDirectly();
          setEditedPlans(fresh.pricingPlans);
          setWeekdays(fresh.timings.weekdays);
          setSunday(fresh.timings.sunday);
          setWomenExclusive(fresh.timings.womenExclusive);
          triggerSuccessGlow();
        }, 100);
        setConfirmModal(null);
      }
    });
  };

  const loadUpdatedDataDirectly = () => {
    // Helper to get fresh reset state from memory
    return loadGymData();
  };

  return (
    <>
      {/* Floating Locked Portal Orb - position symmetrically on the bottom left right area */}
      <div className="fixed bottom-6 right-20 sm:right-24 z-[9990] select-none">
        <motion.button
          id="admin-panel-trigger"
          onClick={handleOpen}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className={`flex items-center gap-2 px-4 py-3.5 rounded-full border-2 bg-stone-950/95 font-sans text-[10px] uppercase tracking-widest font-black cursor-pointer shadow-lg transition-all ${
            isAdmin 
              ? "border-emerald-500/50 text-emerald-400 hover:border-emerald-400 shadow-emerald-500/15" 
              : "border-gold/40 text-gold hover:border-gold shadow-gold/15"
          }`}
          title="Secure Gym Database Control Panel"
          aria-label="Open gym database admin control panel"
        >
          {isAdmin ? (
            <>
              <Unlock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Admin Active</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-gold shrink-0" />
              <span>Admin Log</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Admin Interface Overlay Portal Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Dark background backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-4xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/60">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isAdmin ? "bg-emerald-500/10 text-emerald-400" : "bg-gold/10 text-gold"}`}>
                    <Settings2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bebas text-2xl text-white tracking-widest uppercase">
                      POWER HOUSE <span className={isAdmin ? "text-emerald-400" : "text-gold"}>SYSTEM CONTROL</span>
                    </h2>
                    <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase leading-none mt-1">
                      {isAdmin ? "Status: Authenticated Administrator Session" : "Status: Authorized Credentials Required"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 px-2.5 rounded-lg border border-white/5 bg-[#0D0D0D] hover:bg-[#1A1A1A] hover:text-white text-gray-500 transition-all cursor-pointer text-xs uppercase font-mono"
                >
                  <X className="w-4 h-4 inline" /> Close
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Save status highlight banner */}
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-mono font-bold"
                  >
                    <Check className="w-4 h-4" />
                    <span>SYSTEM ARCHITECTURE SYNCHRONIZED SUCCESSFULLY WITH LOCALSTORAGE</span>
                  </motion.div>
                )}

                {/* AUTH CHECK */}
                {!isAdmin ? (
                  isRecoveryMode ? (
                    /* Password Recovery Wizard */
                    <form onSubmit={handleRecoverSubmit} className="max-w-md mx-auto py-12 px-6 bg-[#0B0B0B] border border-white/5 rounded-2xl space-y-5 shadow-inner">
                      <div className="text-center space-y-2">
                        <HelpCircle className="w-10 h-10 text-gold mx-auto animate-pulse" />
                        <h3 className="font-bebas text-xl text-white tracking-wide uppercase font-bold text-center">Recover Credentials</h3>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto text-center">
                          Answer your configured safety challenge question below to retrieve or reset access keys.
                        </p>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="space-y-1 bg-[#151515] p-3.5 rounded-xl border border-white/5">
                          <span className="text-[8px] font-mono uppercase tracking-widest text-gold block font-black">
                            SECURITY CHALLENGE QUESTION:
                          </span>
                          <p className="text-xs text-stone-200 font-sans mt-1">
                            {securityQuestion}
                          </p>
                        </div>

                        <div className="text-center py-1 border-t border-b border-white/5 bg-black/20 rounded-lg">
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-normal">
                            Expected Answer hint: <strong className="text-gold">{securityAnswer}</strong>
                          </span>
                        </div>

                        {!recoveryResult ? (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono uppercase tracking-widest text-gray-400 block">Security Challenge Answer</label>
                              <input
                                type="text"
                                required
                                value={recoveryAnswer}
                                onChange={(e) => setRecoveryAnswer(e.target.value)}
                                placeholder="Provide answer..."
                                className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold font-sans"
                              />
                            </div>

                            {recoveryError && (
                              <p className="text-[10px] text-rose-500 font-mono font-bold bg-rose-500/10 border border-rose-500/20 rounded p-2.5">
                                ⚠️ {recoveryError}
                              </p>
                            )}

                            <button
                              type="submit"
                              className="w-full bg-gold hover:bg-gold-light text-black py-3.5 rounded-xl text-xs uppercase tracking-widest font-black cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5"
                            >
                              <Check className="w-4 h-4 text-black" />
                              <span>Verify Answer</span>
                            </button>
                          </>
                        ) : (
                          <div className="space-y-4 pt-2">
                            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-center space-y-2">
                              <p className="text-xs font-mono font-bold uppercase tracking-wide">✓ Recovery Verified!</p>
                              <p className="text-[10px] text-gray-400">Your registered Username: <strong className="text-white">{adminUsername}</strong></p>
                              <div className="p-2.5 bg-black/40 rounded-lg text-sm font-mono font-black select-text tracking-widest text-gold text-center">
                                Password: {recoveryResult}
                              </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-white/5">
                              <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest block font-bold text-center">
                                RESET ACCESS PASSPHRASE
                              </span>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  id="recovery-new-password-input"
                                  placeholder="Enter new passcode..."
                                  className="flex-1 bg-zinc-900/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const input = document.getElementById("recovery-new-password-input") as HTMLInputElement;
                                    if (input && input.value.trim()) {
                                      handleDirectPasswordReset(input.value.trim());
                                    } else {
                                      alert("Please type a valid password first.");
                                    }
                                  }}
                                  className="bg-gold text-black hover:bg-white text-[10px] uppercase px-3.5 rounded-xl font-mono font-black cursor-pointer"
                                >
                                  Overwrite
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setIsRecoveryMode(false);
                            setRecoveryAnswer("");
                            setRecoveryResult(null);
                            setRecoveryError("");
                          }}
                          className="w-full bg-[#0D0D0D] border border-white/10 hover:bg-[#151515] text-gray-300 py-2.5 rounded-xl text-xs uppercase tracking-widest font-black cursor-pointer transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>← Back to Security Login</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* 1. Unauthorized state - Show beautiful gold security form */
                    <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto py-12 px-6 bg-[#0B0B0B] border border-white/5 rounded-2xl space-y-5 shadow-inner">
                      <div className="text-center space-y-2">
                        <Lock className="w-10 h-10 text-gold mx-auto animate-pulse" />
                        <h3 className="font-bebas text-xl text-white tracking-wide uppercase">Admin Access Required</h3>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto">
                          Provide Shanti Nagar/Bhusawal branch passcode variables to update pricing indices and schedules.
                        </p>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-gray-400 block">Login ID / Username</label>
                          <input
                            type="text"
                            required
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            placeholder="e.g. admin"
                            className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-[9px] font-mono uppercase tracking-widest text-gray-400 block">System Password</label>
                            <button
                              type="button"
                              onClick={() => {
                                setIsRecoveryMode(true);
                                setRecoveryError("");
                                setRecoveryResult(null);
                              }}
                              className="text-[10px] font-mono text-gold/80 hover:text-gold uppercase tracking-wider underline cursor-pointer"
                            >
                              Forgot?
                            </button>
                          </div>
                          <div className="relative">
                            <input
                              type={showLoginPassword ? "text" : "password"}
                              required
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="Type passcode..."
                              className="w-full bg-zinc-900/60 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                              title={showLoginPassword ? "Hide password" : "Show password"}
                              id="btn-login-password-toggle"
                            >
                              {showLoginPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {loginError && (
                          <p className="text-[10px] text-rose-500 font-mono font-bold bg-rose-500/10 border border-rose-500/20 rounded p-2.5">
                            ⚠️ {loginError}
                          </p>
                        )}

                        <button
                          type="submit"
                          className="w-full bg-gold hover:bg-gold-light text-black py-3.5 rounded-xl text-xs uppercase tracking-widest font-black cursor-pointer transition-all shadow-md mt-2 flex items-center justify-center gap-1.5"
                        >
                          <Unlock className="w-4 h-4 text-black" />
                          <span>Authenticate Portal</span>
                        </button>
                      </div>


                    </form>
                  )
                ) : (
                  /* 2. Authorized state - Load Full-Scale dynamic DB control panel */
                  <div className="space-y-8">
                    
                    {/* Live Database Analytics Suite */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="admin-analytics-grid">
                      {/* Dashboard Card: Member Count (FETCHED DYNAMICALLY FROM DATABASE) */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-[#151515] border border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-xl"
                        id="member-count-card"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase block font-black">
                            DATABASE SECTOR INDICES
                          </span>
                          <h4 className="font-bebas text-xl text-white tracking-widest uppercase">
                            ACTIVE GYM MEMBERS
                          </h4>
                          <div className="flex items-baseline gap-2 pt-1">
                            <span className="font-bebas text-4xl text-gold tracking-tight" id="member-count-indicator">
                              {members.length}
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3 animate-bounce" />
                              Live Sync
                            </span>
                          </div>
                        </div>
                        <div className="p-3.5 bg-gold/10 text-gold rounded-xl">
                          <Users className="w-6 h-6" />
                        </div>
                      </motion.div>

                      {/* Card 2: Projected Value */}
                      <div className="bg-[#151515] border border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-xl" id="estimated-gross-revenue-card">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase block font-black">
                            ESTIMATED GROSS REVENUE
                          </span>
                          <h4 className="font-bebas text-xl text-white tracking-widest uppercase">
                            MONTHLY INDEX YIELD
                          </h4>
                          <div className="flex items-baseline gap-2 pt-1">
                            <span className="font-bebas text-4xl text-white tracking-tight">
                              ₹{members.reduce((acc, m) => {
                                const planName = m.plan.toLowerCase();
                                if (planName.includes("annual")) return acc + 1000; // 12000/12
                                if (planName.includes("quarterly")) return acc + 1266; // 3800/3
                                return acc + 1500; // monthly core is 1500
                              }, 0).toLocaleString("en-IN")}
                            </span>
                            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                              / month
                            </span>
                          </div>
                        </div>
                        <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                          <DollarSign className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Card 3: System Status */}
                      <div className="bg-[#151515] border border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-xl" id="system-operational-status-card">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase block font-black">
                            DATABASE NODE METRICS
                          </span>
                          <h4 className="font-bebas text-xl text-white tracking-widest uppercase">
                            OPERATIONAL INTEGRITY
                          </h4>
                          <div className="flex items-baseline gap-2 pt-1">
                            <span className="font-mono text-base text-emerald-400 font-extrabold uppercase tracking-widest animate-pulse flex items-center gap-1.5">
                              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                              100% SECURE
                            </span>
                          </div>
                        </div>
                        <div className="p-3.5 bg-orange-500/10 text-orange-400 rounded-xl">
                          <Clock className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Admin control panel tab bar */}
                    <div className="flex border-b border-white/5 gap-1.5 sm:gap-4 overflow-x-auto">
                      <button
                        onClick={() => setActiveTab("pricing")}
                        className={`pb-3 px-3 sm:px-4 font-sans text-[10px] sm:text-xs uppercase tracking-widest font-black cursor-pointer transition-all border-b-2 flex items-center gap-2 shrink-0 ${
                          activeTab === "pricing"
                            ? "border-gold text-gold"
                            : "border-transparent text-gray-500 hover:text-gray-350"
                        }`}
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>1. Manage Membership Tiers</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("timings")}
                        className={`pb-3 px-3 sm:px-4 font-sans text-[10px] sm:text-xs uppercase tracking-widest font-black cursor-pointer transition-all border-b-2 flex items-center gap-2 shrink-0 ${
                          activeTab === "timings"
                            ? "border-gold text-gold"
                            : "border-transparent text-gray-500 hover:text-gray-350"
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        <span>2. Operating Hours & Timings</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("members")}
                        className={`pb-3 px-3 sm:px-4 font-sans text-[10px] sm:text-xs uppercase tracking-widest font-black cursor-pointer transition-all border-b-2 flex items-center gap-2 shrink-0 ${
                          activeTab === "members"
                            ? "border-gold text-gold"
                            : "border-transparent text-gray-500 hover:text-gray-350"
                        }`}
                        id="members-tab-trigger"
                      >
                        <Users className="w-4 h-4" />
                        <span>3. Members Database Guild ({members.length})</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("security")}
                        className={`pb-3 px-3 sm:px-4 font-sans text-[10px] sm:text-xs uppercase tracking-widest font-black cursor-pointer transition-all border-b-2 flex items-center gap-2 shrink-0 ${
                          activeTab === "security"
                            ? "border-gold text-gold"
                            : "border-transparent text-gray-500 hover:text-gray-350"
                        }`}
                        id="security-tab-trigger"
                      >
                        <ShieldCheck className="w-4 h-4 text-gray-500 shrink-0" />
                        <span>4. Credentials & Safety Settings</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("logs")}
                        className={`pb-3 px-3 sm:px-4 font-sans text-[10px] sm:text-xs uppercase tracking-widest font-black cursor-pointer transition-all border-b-2 flex items-center gap-2 shrink-0 ${
                          activeTab === "logs"
                            ? "border-gold text-gold"
                            : "border-transparent text-gray-500 hover:text-gray-350"
                        }`}
                        id="logs-tab-trigger"
                      >
                        <Activity className="w-4 h-4 text-gray-500 shrink-0" />
                        <span>5. Action Audit Trail</span>
                      </button>
                    </div>

                    {/* TAB PANEL 1: Pricing Tiers Editor */}
                    {activeTab === "pricing" && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {editedPlans.map((plan, pIdx) => (
                            <div key={plan.id} className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-4">
                              <span className="bg-gold/10 text-gold font-mono text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded leading-none border border-gold/15">
                                Tier {pIdx + 1}
                              </span>

                              <div className="space-y-1.5">
                                <label className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Package Title</label>
                                <input
                                  type="text"
                                  value={plan.name}
                                  onChange={(e) => handlePlanFieldChange(pIdx, "name", e.target.value)}
                                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-gold font-sans"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1.5">
                                  <label className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Price Index</label>
                                  <input
                                    type="text"
                                    value={plan.price}
                                    onChange={(e) => handlePlanFieldChange(pIdx, "price", e.target.value)}
                                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg py-2 px-3 text-xs text-gold focus:outline-none focus:border-gold font-mono"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Billing Loop</label>
                                  <input
                                    type="text"
                                    value={plan.billingPeriod}
                                    onChange={(e) => handlePlanFieldChange(pIdx, "billingPeriod", e.target.value)}
                                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Plan Tagline Subtitle</label>
                                <input
                                  type="text"
                                  value={plan.subtitle}
                                  onChange={(e) => handlePlanFieldChange(pIdx, "subtitle", e.target.value)}
                                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg py-2 px-3 text-[11px] text-gray-300 focus:outline-none focus:border-gold leading-normal font-sans"
                                />
                              </div>

                              <div className="space-y-3 pt-2 border-t border-white/5">
                                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">INCLUSION ITEMS ({plan.features.length})</span>
                                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                                  {plan.features.map((feat, fIdx) => (
                                    <div key={fIdx} className="flex gap-1.5 items-center">
                                      <input
                                        type="text"
                                        value={feat}
                                        onChange={(e) => handleFeatureChange(pIdx, fIdx, e.target.value)}
                                        className="flex-1 bg-[#0D0D0D] border border-white/10 rounded-lg py-1.5 px-2.5 text-[11px] text-gray-400 focus:outline-none focus:border-gold font-sans"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveFeature(pIdx, fIdx)}
                                        className="text-stone-500 hover:text-rose-500 p-1 rounded hover:bg-rose-500/10 cursor-pointer"
                                        title="Delete feature item"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAddFeature(pIdx)}
                                  className="text-[9px] font-mono text-gold hover:text-white uppercase flex items-center gap-1 cursor-pointer"
                                >
                                  + Add Inclusion Line
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action buttons pricing */}
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 text-stone-400 hover:text-white hover:bg-zinc-800 font-sans text-[10px] tracking-wider uppercase transition-all cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Restore Engine Defaults</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={savePricingPlans}
                            className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-black font-extrabold font-sans text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Tariffs</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB PANEL 2: Timings & Operating Schedules */}
                    {activeTab === "timings" && (
                      <div className="space-y-6 max-w-xl mx-auto">
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 space-y-5">
                          <h3 className="font-bebas text-xl text-white tracking-wide uppercase flex items-center gap-1.5">
                            <Clock className="w-5 h-5 text-gold" />
                            <span>Align Dynamic Operating Hours</span>
                          </h3>

                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Weekday Timings (Monday - Saturday)</label>
                              <input
                                type="text"
                                value={weekdays}
                                onChange={(e) => setWeekdays(e.target.value)}
                                className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Sunday Status Text</label>
                              <input
                                type="text"
                                value={sunday}
                                onChange={(e) => setSunday(e.target.value)}
                                className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Women's Exclusive Special Slots</label>
                              <input
                                type="text"
                                value={womenExclusive}
                                onChange={(e) => setWomenExclusive(e.target.value)}
                                className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Action buttons timings */}
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 text-stone-400 hover:text-white hover:bg-zinc-800 font-sans text-[10px] tracking-wider uppercase transition-all cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Restore Clock Defaults</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={saveAllTimings}
                            className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-black font-extrabold font-sans text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Clock Intervals</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB PANEL 3: Members database panel */}
                    {activeTab === "members" && (
                      <div className="space-y-6" id="admin-members-database-panel">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          
                          {/* Column 1: Add member form */}
                          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 space-y-4 h-fit">
                            <h3 className="font-bebas text-lg text-white tracking-widest uppercase flex items-center gap-2">
                              <UserPlus className="w-5 h-5 text-gold" />
                              <span>Enlist New Member</span>
                            </h3>

                            {memberSaveSuccess && (
                              <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] tracking-widest uppercase p-2.5 rounded-lg text-center animate-pulse">
                                ✓ Member Registered Successfully
                              </div>
                            )}

                            <div className="space-y-3.5">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Full Name</label>
                                <input
                                  type="text"
                                  value={newMemberName}
                                  onChange={(e) => setNewMemberName(e.target.value)}
                                  placeholder="e.g. Sanjay Mahajan"
                                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Phone Number</label>
                                <input
                                  type="text"
                                  value={newMemberPhone}
                                  onChange={(e) => setNewMemberPhone(e.target.value)}
                                  placeholder="e.g. +91 95033 12345"
                                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-mono"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Active Tariffs Tier</label>
                                <select
                                  value={newMemberPlan}
                                  onChange={(e) => setNewMemberPlan(e.target.value)}
                                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans"
                                >
                                  <option value="">-- Choose Access Tier --</option>
                                  {pricingPlans.map((p) => (
                                    <option key={p.id} value={p.name}>
                                      {p.name} ({p.price})
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Access State</label>
                                <div className="flex gap-2">
                                  {(["Active", "Expired", "Pending"] as const).map((st) => (
                                    <button
                                      key={st}
                                      type="button"
                                      onClick={() => setNewMemberStatus(st)}
                                      className={`flex-1 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider border font-bold cursor-pointer transition-all ${
                                        newMemberStatus === st
                                          ? st === "Active"
                                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                                            : st === "Expired"
                                              ? "bg-rose-500/10 border-rose-500 text-rose-400"
                                              : "bg-amber-500/10 border-amber-500 text-amber-400"
                                          : "bg-transparent border-white/5 text-gray-500 hover:text-stone-300"
                                      }`}
                                    >
                                      {st}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  if (!newMemberName.trim() || !newMemberPhone.trim() || !newMemberPlan) {
                                    alert("Please populate name, phone, and select a membership tier plan.");
                                    return;
                                  }
                                  addMember({
                                    name: newMemberName,
                                    phone: newMemberPhone,
                                    plan: newMemberPlan,
                                    status: newMemberStatus
                                  });
                                  setNewMemberName("");
                                  setNewMemberPhone("");
                                  setNewMemberPlan("");
                                  setNewMemberStatus("Active");
                                  setMemberSaveSuccess(true);
                                  setTimeout(() => setMemberSaveSuccess(false), 3000);
                                }}
                                className="w-full bg-gold hover:bg-gold-light text-black py-2.5 rounded-xl text-xs uppercase tracking-widest font-black cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5 mt-2"
                              >
                                <Plus className="w-4 h-4 shrink-0" />
                                <span>Commit Enlistment</span>
                              </button>
                            </div>
                          </div>

                          {/* Column 2 & 3: Database View & Querying */}
                          <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-2xl p-5 flex flex-col h-[480px]">
                            <div className="flex items-center justify-between gap-4 mb-4">
                              <h3 className="font-bebas text-lg text-white tracking-widest uppercase flex items-center gap-2">
                                <Users className="w-5 h-5 text-gold" />
                                <span>Registry Chronicle</span>
                              </h3>
                              
                              {/* Search query input box */}
                              <div className="relative max-w-xs flex-1">
                                <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                  type="text"
                                  value={memberSearchQuery}
                                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                                  placeholder="Query by Name/Phone..."
                                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-gold font-sans placeholder-gray-600"
                                />
                              </div>
                            </div>

                            {/* Table Container */}
                            <div className="flex-1 overflow-y-auto border border-white/5 rounded-xl bg-black/20">
                              <table className="w-full text-left font-sans text-xs">
                                <thead className="bg-[#0e0e0e] text-[9.5px] font-mono text-gray-500 uppercase tracking-widest border-b border-white/5 sticky top-0 z-10">
                                  <tr>
                                    <th className="p-3.5 font-bold">Client Name / Contact</th>
                                    <th className="p-3.5 font-bold">Enrolled Tier</th>
                                    <th className="p-3.5 font-bold">Access Status</th>
                                    <th className="p-3.5 font-bold text-right">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                  {members.filter((m) => {
                                    const q = memberSearchQuery.toLowerCase();
                                    return m.name.toLowerCase().includes(q) || m.phone.includes(q);
                                  }).map((m) => (
                                    <tr key={m.id} className="hover:bg-white/[0.02] transition-all group">
                                      {/* Info */}
                                      <td className="p-3.5">
                                        <div className="font-sans font-bold text-white leading-tight">
                                          {m.name}
                                        </div>
                                        <div className="font-mono text-[9px] text-gray-500 mt-0.5 leading-none">
                                          {m.phone} • joined: {m.joinedDate}
                                        </div>
                                      </td>
                                      
                                      {/* Plan */}
                                      <td className="p-3.5 font-mono text-[10px] text-gray-300">
                                        {m.plan}
                                      </td>

                                      {/* Status tag */}
                                      <td className="p-3.5">
                                        <span className={`inline-block font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full font-black ${
                                          m.status === "Active"
                                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                            : m.status === "Expired"
                                              ? "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                                              : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                                        }`}>
                                          {m.status}
                                        </span>
                                      </td>

                                      {/* Action delete */}
                                      <td className="p-3.5 text-right">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setConfirmModal({
                                              isOpen: true,
                                              title: "EXPEL MEMBER RECORD",
                                              description: `You are about to permanently delete client ${m.name} from the active powerhouse database index. This action cannot be undone.`,
                                              actionLabel: "Expel Member",
                                              severity: "danger",
                                              onConfirm: () => {
                                                deleteMember(m.id);
                                                setConfirmModal(null);
                                              }
                                            });
                                          }}
                                          className="text-gray-500 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all cursor-pointer opacity-0 group-hover:opacity-100 animate-fade-in"
                                          title="Delete Member"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}

                                  {members.filter((m) => {
                                    const q = memberSearchQuery.toLowerCase();
                                    return m.name.toLowerCase().includes(q) || m.phone.includes(q);
                                  }).length === 0 && (
                                    <tr>
                                      <td colSpan={4} className="p-8 text-center text-gray-500 font-mono text-[10px] uppercase tracking-wider">
                                        No database records matched this query.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* TAB PANEL 4: Security Credentials settings */}
                    {activeTab === "security" && (
                      <div className="space-y-6" id="admin-security-credentials-panel">
                        <div className="max-w-xl mx-auto bg-[#141414] border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl">
                          <div className="space-y-1.5">
                            <h3 className="font-bebas text-xl text-white tracking-widest uppercase flex items-center gap-2">
                              <ShieldCheck className="w-5 h-5 text-gold" />
                              <span>ADMIN WORKSPACE SECURITY CONTROLS</span>
                            </h3>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-normal">
                              Safeguard your powerhouse dashboard access. Update your admin user credentials and safety challenge question below.
                            </p>
                          </div>

                          {credentialsSaveSuccess && (
                            <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] tracking-widest uppercase p-3 rounded-xl text-center animate-pulse">
                              ✓ Portal security credentials updated successfully
                            </div>
                          )}

                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-black">ADMINISTRATIVE LOGIN USERNAME ID</label>
                              <input
                                type="text"
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                                placeholder="Type brand new username ID..."
                                className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold font-sans font-bold"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-black">ADMIN ACCESS PASSPHRASE SECURE PASSWORD</label>
                              <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                                  <Key className="w-4 h-4" />
                                </span>
                                <input
                                  type={showEditPassword ? "text" : "password"}
                                  value={editPassword}
                                  onChange={(e) => setEditPassword(e.target.value)}
                                  placeholder="Type secure password..."
                                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowEditPassword(!showEditPassword)}
                                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors cursor-pointer"
                                  title={showEditPassword ? "Hide password" : "Show password"}
                                  id="btn-edit-password-toggle"
                                >
                                  {showEditPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="border-t border-white/5 pt-4 space-y-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-black">FORGOT PASSWORD - CHALLENGE QUESTION</label>
                                <input
                                  type="text"
                                  value={editSecurityQuestion}
                                  onChange={(e) => setEditSecurityQuestion(e.target.value)}
                                  placeholder="e.g. What is your primary training philosophy?"
                                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 focus:outline-none focus:border-gold font-sans"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-black">SECURITY ANSWER (CASE-INSENSITIVE KEY)</label>
                                <input
                                  type="text"
                                  value={editSecurityAnswer}
                                  onChange={(e) => setEditSecurityAnswer(e.target.value)}
                                  placeholder="Response used to recover credentials..."
                                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold font-mono"
                                />
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (!editUsername.trim()) {
                                  alert("System requires a non-empty administrative username.");
                                  return;
                                }
                                if (!editPassword.trim()) {
                                  alert("System requires a non-empty administrative passcode password.");
                                  return;
                                }
                                if (!editSecurityQuestion.trim()) {
                                  alert("Please configure a clear recovery security question.");
                                  return;
                                }
                                if (!editSecurityAnswer.trim()) {
                                  alert("Please supply a valid security response answer.");
                                  return;
                                }

                                setConfirmModal({
                                  isOpen: true,
                                  title: "UPDATE ACCESS PRIVILEGES",
                                  description: `You are about to reconfigure your administrative security portal credentials. The username will be updated to "${editUsername}" and the password will be updated to "${editPassword}". Please ensure you memorize these new authentication keys before executing.`,
                                  actionLabel: "Commit Overrides",
                                  severity: "warning",
                                  onConfirm: () => {
                                    updateAdminCredentials(
                                      editUsername,
                                      editPassword,
                                      editSecurityQuestion,
                                      editSecurityAnswer
                                    );
                                    setCredentialsSaveSuccess(true);
                                    setTimeout(() => setCredentialsSaveSuccess(false), 2500);
                                    setConfirmModal(null);
                                  }
                                });
                              }}
                              className="w-full bg-gold hover:bg-gold-light text-black py-3.5 rounded-xl text-xs uppercase tracking-widest font-black cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5"
                            >
                              <Save className="w-4 h-4 shrink-0" />
                              <span>Save System Security Overrides</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB PANEL 5: Activity Logs & Audit Trails */}
                    {activeTab === "logs" && (
                      <div className="space-y-6" id="admin-activity-logs-panel">
                        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 shadow-xl space-y-6">
                          
                          {/* Header section with Stats & Controls */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
                            <div className="space-y-1">
                              <h3 className="font-bebas text-xl text-white tracking-widest uppercase flex items-center gap-2">
                                <Activity className="w-5 h-5 text-gold animate-pulse" />
                                <span>ADMINISTRATIVE ACTION AUDIT TRAIL</span>
                              </h3>
                              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-normal">
                                Real-time diagnostic ledger tracking portal changes, staff overrides, database registers, and session security triggers.
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {adminLogs.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setConfirmModal({
                                      isOpen: true,
                                      title: "PURGE ADMINISTRATIVE AUDIT TRAIL",
                                      description: "Are you sure you want to permanently clear all administrative audit logs? This action is permanent and cannot be reverted.",
                                      actionLabel: "Purge All Logs",
                                      severity: "danger",
                                      onConfirm: () => {
                                        clearLogs();
                                        setConfirmModal(null);
                                      }
                                    });
                                  }}
                                  className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/10 px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider font-extrabold cursor-pointer transition-all animate-fade"
                                  id="clear-logs-btn"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Purge All Logs</span>
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Quick Logs Summary Mini-widgets */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-black/25 border border-white/5 p-4 rounded-xl space-y-1">
                              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Total Logs Collected</span>
                              <span className="text-xl font-mono text-white font-black">{adminLogs.length}</span>
                            </div>
                            <div className="bg-black/25 border border-white/5 p-4 rounded-xl space-y-1">
                              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Security & Gate Actions</span>
                              <span className="text-xl font-mono text-gray-400 font-extrabold">
                                {adminLogs.filter(l => (l.action || "").toLowerCase().includes("security") || (l.action || "").toLowerCase().includes("login") || (l.action || "").toLowerCase().includes("fail")).length}
                              </span>
                            </div>
                            <div className="bg-black/25 border border-white/5 p-4 rounded-xl space-y-1">
                              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Gateway Connection</span>
                              <span className="text-sm font-mono text-emerald-400 font-black animate-pulse flex items-center gap-1.5">
                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span> ACTIVE RUNTIME
                              </span>
                            </div>
                          </div>

                          {/* Search Input Filter for Logs */}
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                              <Search className="h-4 w-4 text-stone-500" />
                            </span>
                            <input
                              type="text"
                              placeholder="FILTER ACTIONS BY LOG DESCRIPTION OR CATEGORIES..."
                              value={logFilter}
                              onChange={(e) => setLogFilter(e.target.value)}
                              className="w-full bg-black/40 border border-white/5 focus:border-gold/40 text-stone-200 pl-10 pr-4 py-3 rounded-xl font-mono text-[10px] tracking-widest uppercase focus:outline-none placeholder-stone-600 transition-all"
                            />
                            {logFilter && (
                              <button
                                type="button"
                                onClick={() => setLogFilter("")}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-500 hover:text-white"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          {/* Scrollable Audit Log List Component */}
                          <div className="border border-white/5 bg-black/15 rounded-xl pr-1 overflow-hidden" id="audit-trail-scroll-wrapper">
                            <div className="max-h-[300px] overflow-y-auto divide-y divide-white/5 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
                              {filteredLogs.length > 0 ? (
                                filteredLogs.map((log) => {
                                  // Determine status badge color and background matches
                                  const isSecurity = (log.action || "").toLowerCase().includes("security") || (log.action || "").toLowerCase().includes("login") || (log.action || "").toLowerCase().includes("fail");
                                  const isResetOrDelete = (log.action || "").toLowerCase().includes("reset") || (log.action || "").toLowerCase().includes("delete") || (log.action || "").toLowerCase().includes("disenroll");
                                  const isRegister = (log.action || "").toLowerCase().includes("register") || (log.action || "").toLowerCase().includes("added");

                                  let labelColor = "text-blue-400 bg-blue-500/10 border-blue-500/15";
                                  let dotColor = "bg-blue-400";
                                  if (isSecurity) {
                                    labelColor = "text-amber-500 bg-amber-500/10 border-amber-500/15";
                                    dotColor = "bg-amber-500 animate-pulse";
                                  } else if (isResetOrDelete) {
                                    labelColor = "text-rose-400 bg-rose-500/10 border-rose-500/15";
                                    dotColor = "bg-rose-400";
                                  } else if (isRegister) {
                                    labelColor = "text-emerald-400 bg-emerald-400/10 border-emerald-400/15";
                                    dotColor = "bg-emerald-400";
                                  }

                                  return (
                                    <motion.div
                                      initial={{ opacity: 0, y: 4 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      key={log.id}
                                      className="p-4 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                    >
                                      {/* Left segment info */}
                                      <div className="flex items-start gap-3">
                                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                                        <div className="space-y-1">
                                          <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-bebas text-sm tracking-widest text-stone-200">
                                              {log.action}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest border ${labelColor}`}>
                                              {isSecurity ? "Gateway Security" : isResetOrDelete ? "Purge / Sync" : isRegister ? "Insert Record" : "Registry Update"}
                                            </span>
                                          </div>
                                          <p className="text-xs font-sans text-stone-400 max-w-xl leading-relaxed">
                                            {log.details}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Right segment: timing */}
                                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                                        <span className="text-[9px] font-mono text-stone-500 select-none block sm:hidden uppercase font-bold">Timestamp:</span>
                                        <span className="font-mono text-[10px] text-stone-400 text-right flex items-center gap-1.5">
                                          <Clock className="w-3.5 h-3.5 text-stone-600 hidden sm:inline" />
                                          {log.timestamp}
                                        </span>
                                      </div>
                                    </motion.div>
                                  );
                                })
                              ) : (
                                <div className="p-12 text-center text-gray-500 font-mono text-[10px] uppercase tracking-wider space-y-2">
                                  <Activity className="w-6 h-6 text-stone-600 mx-auto opacity-35" />
                                  <p>No administrative logs match your current query.</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-center pt-2">
                            <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest block">
                              SYSTEM GATEWAY LIVE LOG DATA • SECURE INTEGRITY LAYER
                            </span>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Secure Footer Status Bar */}
              <div className="p-4 border-t border-white/5 bg-[#0A0A0A] flex items-center justify-between">
                <div>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={adminLogout}
                      className="flex items-center gap-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 px-3.5 py-1.5 rounded-lg font-sans text-[10px] uppercase tracking-wider font-extrabold cursor-pointer transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Lock Admin Portal</span>
                    </button>
                  )}
                </div>
                
                <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">
                  🛡️ SSL SECURED • LOCAL STORAGE CONFIG DB
                </span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Confirmation Dialog Modal Overlay */}
      <AnimatePresence>
        {confirmModal && confirmModal.isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" id="confirm-modal-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full max-w-md bg-[#161618] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5"
              id="confirm-modal-container"
            >
              {/* Header Icon & Severity Coloring */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className={`p-2.5 rounded-xl ${
                  confirmModal.severity === "danger"
                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                    : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                }`}>
                  <ShieldCheck className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bebas text-lg tracking-widest text-white uppercase leading-none">
                    {confirmModal.title}
                  </h4>
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                    Security Authorization Required
                  </span>
                </div>
              </div>

              {/* Description Body */}
              <p className="text-stone-300 font-sans text-xs leading-relaxed uppercase tracking-wide">
                {confirmModal.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-stone-400 hover:text-white font-sans text-[10px] tracking-widest uppercase font-bold cursor-pointer transition-all"
                  id="confirm-modal-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmModal.onConfirm}
                  className={`px-5 py-2.5 rounded-xl text-black font-extrabold font-sans text-[10px] tracking-widest uppercase transition-all shadow-md cursor-pointer flex items-center gap-1.5 ${
                    confirmModal.severity === "danger"
                      ? "bg-rose-500 hover:bg-rose-600 text-white"
                      : "bg-gold hover:bg-gold-light text-black"
                  }`}
                  id="confirm-modal-action"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{confirmModal.actionLabel}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
