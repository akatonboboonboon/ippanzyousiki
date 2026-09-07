import { useEffect, useLayoutEffect, useState } from "react";

export type ThemePreference = "system" | "light" | "dark";
export const THEME_STORAGE_KEY = "joshiki-theme";

function preferenceFrom(value: string | null): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

function readPreference(): ThemePreference {
  try {
    return preferenceFrom(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "system";
  }
}

function applyTheme(preference: ThemePreference, systemDark: boolean) {
  const theme =
    preference === "system" ? (systemDark ? "dark" : "light") : preference;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.style.backgroundColor = theme === "dark" ? "#0b100d" : "#f8f9f5";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#0b100d" : "#f8f9f5");
}

export function useTheme() {
  const [preference, updatePreference] =
    useState<ThemePreference>(readPreference);
  const [saveError, setSaveError] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => applyTheme(preference, media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [preference]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) {
        updatePreference(preferenceFrom(event.newValue));
        setSaveError(false);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  function setPreference(value: ThemePreference) {
    updatePreference(value);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }

  return { preference, setPreference, saveError };
}
