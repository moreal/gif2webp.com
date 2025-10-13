import { useEffect, useState } from "react";

export function usePersistedState<T extends string>(
	key: string,
	defaultValue: T,
	validate: (value: string) => value is T,
) {
	const [state, setState] = useState<T>(() => {
		try {
			const stored = localStorage.getItem(key);
			if (stored !== null && validate(stored)) {
				return stored as T;
			}
		} catch (error) {
			console.error(`Error reading from localStorage key "${key}":`, error);
		}
		return defaultValue;
	});

	useEffect(() => {
		try {
			const stored = localStorage.getItem(key);
			if (stored !== null && validate(stored)) {
				setState(stored as T);
			} else {
				setState(defaultValue);
			}
		} catch (error) {
			console.error(`Error reading from localStorage key "${key}":`, error);
			setState(defaultValue);
		}
	}, [key, defaultValue, validate]);

	useEffect(() => {
		const handler = setTimeout(() => {
			try {
				localStorage.setItem(key, state);
			} catch (error) {
				console.error(`Error writing to localStorage key "${key}":`, error);
			}
		}, 200);

		return () => clearTimeout(handler);
	}, [key, state]);

	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === key && e.newValue !== null) {
				if (validate(e.newValue)) {
					setState(e.newValue as T);
				}
			} else if (e.key === key && e.newValue === null) {
				setState(defaultValue);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [key, defaultValue, validate]);

	return [state, setState] as const;
}
