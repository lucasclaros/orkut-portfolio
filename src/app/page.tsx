"use client";

import { useI18n } from "@/i18n";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrkutButton } from "@/components/ui/OrkutButton";

export default function LoginPage() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [loading] = useState(true);

  const handleLogin = () => {
    router.push("/perfil");
  };

  useEffect(() => {
    const navTimeout = setTimeout(() => {
      handleLogin();
    }, 2000);

    return () => clearTimeout(navTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orkut-navbar-from to-orkut-navbar-to h-[4px]" />

      <div className="max-w-[800px] mx-auto px-4 pt-8">
        {/* Logo */}
        <div className="mb-6 text-center md:text-left">
          <img src="/images/orkut-logo.png" alt="orkut" className="h-[36px] w-auto inline-block" />
        </div>

        {/* Main content - two columns like real Orkut */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Left side - tagline & illustration */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-[22px] text-orkut-text leading-snug mb-4">
              {t("login.welcome")}
            </p>
            <div className="mx-auto md:mx-0 w-full max-w-[300px] h-[200px] bg-gradient-to-br from-[#E8F0FE] to-[#D1E1F5] rounded-[8px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-[64px] leading-none mb-2">🌐</div>
                <p className="text-[11px] text-orkut-text-light italic">
                  {t("login.connectFriends")}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - login form */}
          <div className="w-full md:w-[300px] shrink-0">
            <div className="bg-orkut-card-bg border border-orkut-card-border rounded-orkut overflow-hidden shadow-sm">
              <div className="bg-orkut-card-header px-3 py-2 border-b border-orkut-card-border">
                <h2 className="text-[11px] font-bold text-orkut-text">
                  {t("login.accessAccount")}
                </h2>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="p-3 space-y-2.5">
                {/* Email */}
                <div>
                  <label className="block text-[11px] text-orkut-text mb-0.5">
                    {t("login.email")}:
                  </label>
                  <input
                    type="text"
                    defaultValue="lucas.claros11@gmail.com"
                    className="w-full border border-[#BDC7D8] rounded-[3px] px-2 py-[3px] text-[11px] bg-white focus:outline-none focus:border-orkut-link"
                    readOnly
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] text-orkut-text mb-0.5">
                    {t("login.password")}:
                  </label>
                  <input
                    type="password"
                    defaultValue="********"
                    className="w-full border border-[#BDC7D8] rounded-[3px] px-2 py-[3px] text-[11px] bg-white focus:outline-none focus:border-orkut-link"
                    readOnly
                  />
                </div>

                {/* Login button or loading bar */}
                {!loading ? (
                  <OrkutButton
                    type="submit"
                    className="w-full py-1 font-bold"
                  >
                    {t("login.login")}
                  </OrkutButton>
                ) : (
                  <div className="w-full border border-[#BDC7D8] rounded-[3px] bg-[#e8e8e8] h-[24px] overflow-hidden relative">
                    <div
                      className="h-full rounded-[2px]"
                      style={{
                        background: "linear-gradient(90deg, #6D84B4 25%, #8CA0CC 50%, #6D84B4 75%)",
                        backgroundSize: "200% 100%",
                        animation: "orkut-progress 2s linear forwards",
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] text-[#333] font-bold">
                      {locale === "pt-BR" ? "entrando..." : "signing in..."}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px]">
                  <label className="flex items-center gap-1 text-orkut-text-light cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-3 h-3"
                    />
                    {t("login.rememberMe")}
                  </label>
                  <span className="text-orkut-link cursor-pointer hover:underline">
                    {t("login.forgotPassword")}
                  </span>
                </div>
              </form>
            </div>

            <p className="text-[11px] text-orkut-text-light mt-3 text-center">
              {t("login.newHere")}{" "}
              <button
                onClick={handleLogin}
                className="text-orkut-link font-bold cursor-pointer bg-transparent border-none text-[11px] hover:underline"
              >
                {t("login.joinNow")}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-4 border-t border-[#E0E0E0] text-[10px] text-orkut-text-light text-center pb-4">
          <p>&copy; 2007 orkut.com - Portfolio de Lucas Claros</p>
        </div>
      </div>

      {/* Progress bar animation */}
      <style jsx>{`
        @keyframes orkut-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
