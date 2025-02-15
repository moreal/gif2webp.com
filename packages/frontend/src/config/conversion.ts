export interface ConversionConfig {
	MAX_SAFE_FILE_SIZE: number;
	DEFAULT_QUALITY: number;
	SUPPORTED_FORMATS: {
		input: string[];
		output: string[];
	};
	MAX_FILE_SIZE: number;
}

export const config: ConversionConfig = {
	MAX_SAFE_FILE_SIZE: 100 * 1024 * 1024, // 100MB
	DEFAULT_QUALITY: 75,
	SUPPORTED_FORMATS: {
		input: [".gif"],
		output: [".webp"],
	},
	MAX_FILE_SIZE: 200 * 1024 * 1024, // 200MB
};
