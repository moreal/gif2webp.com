import { type Context, useContext } from "react";

/**
 * Creates a custom hook for consuming a React context with automatic null checking
 * @param context - The React context to consume
 * @param hookName - The name of the hook (for error messages)
 * @param providerName - The name of the provider (for error messages)
 * @returns A hook function that returns the context value
 * @throws Error if used outside the provider
 */
export function createContextHook<T>(
	context: Context<T | null>,
	hookName: string,
	providerName: string,
) {
	return function useContextHook(): T {
		const value = useContext(context);
		if (!value) {
			throw new Error(`${hookName} must be used within a ${providerName}`);
		}
		return value;
	};
}
