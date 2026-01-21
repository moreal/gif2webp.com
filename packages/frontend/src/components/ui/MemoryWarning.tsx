import { useLanguage } from "../../hooks/useLanguage";
import { config } from "../../config/conversion";
import { WarningText } from "./WarningText";

export function MemoryWarning({ fileSize }: { fileSize: number }) {
	const { t } = useLanguage();
	if (fileSize <= config.MAX_SAFE_FILE_SIZE) return null;

	const sizeMB = Math.round(fileSize / 1024 / 1024);
	return (
		<WarningText>{t("conversion.memoryWarning", { size: sizeMB })}</WarningText>
	);
}
