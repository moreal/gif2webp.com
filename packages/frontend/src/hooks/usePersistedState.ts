import { useEffect, useState } from "react";

/**
 * Reads a value from localStorage with validation and error handling
 */
function readFromLocalStorage<T extends string>(
	key: string,
	defaultValue: T,
	validate: (value: string) => value is T,
): T {
	try {
		const stored = localStorage.getItem(key);
		if (stored !== null && validate(stored)) {
			return stored as T;
		}
	} catch (error) {
		console.error(`Error reading from localStorage key "${key}":`, error);
	}
	return defaultValue;
}

type StorageCallback = (e: StorageEvent) => void;
const storageListeners = new Map<string, Set<StorageCallback>>();
let globalListenerAttached = false;

function handleGlobalStorageEvent(e: StorageEvent) {
	if (e.key === null) return;
	const callbacks = storageListeners.get(e.key);
	if (callbacks) {
		for (const cb of callbacks) {
			cb(e);
		}
	}
}

function subscribeStorage(key: string, callback: StorageCallback) {
	let keyListeners = storageListeners.get(key);
	if (!keyListeners) {
		keyListeners = new Set();
		storageListeners.set(key, keyListeners);
	}
	keyListeners.add(callback);

	if (!globalListenerAttached) {
		window.addEventListener("storage", handleGlobalStorageEvent);
		globalListenerAttached = true;
	}

	return () => {
		keyListeners.delete(callback);
		if (keyListeners.size === 0) {
			storageListeners.delete(key);
		}
		if (storageListeners.size === 0 && globalListenerAttached) {
			window.removeEventListener("storage", handleGlobalStorageEvent);
			globalListenerAttached = false;
		}
	};
}

export function usePersistedState<T extends string>(
	key: string,
	defaultValue: T,
	validate: (value: string) => value is T,
) {
	const [state, setState] = useState<T>(() =>
		readFromLocalStorage(key, defaultValue, validate),
	);

	useEffect(() => {
		setState(readFromLocalStorage(key, defaultValue, validate));
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
			if (e.newValue !== null) {
				if (validate(e.newValue)) {
					setState(e.newValue as T);
				}
			} else {
				setState(defaultValue);
			}
		};

		return subscribeStorage(key, handleStorageChange);
	}, [key, defaultValue, validate]);

	return [state, setState] as const;
}
