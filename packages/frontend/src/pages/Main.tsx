import { useState, useCallback } from "react";
import { Dropzone, type LoadedFile } from "../components/Dropzone";
import { FileList } from "../components/FileList";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { config } from "../config/conversion";

function Main() {
	const [files, setFiles] = useState<LoadedFile[]>([]);

	const handleUpload = async (uploadedFiles: LoadedFile[]) => {
		const validFiles = uploadedFiles.filter(
			(f) => f.size <= config.MAX_FILE_SIZE,
		);
		setFiles((prevFiles) => [...prevFiles, ...validFiles]);
	};

	const handleDelete = useCallback((index: number) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	}, []);

	return (
		<ErrorBoundary>
			<div
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						boxSizing: "border-box",
					}}
				>
					<Header />
					<main
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							minHeight: 0,
							padding: "1rem",
							width: "100%",
							boxSizing: "border-box",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "2rem",
								width: "100%",
								maxWidth: "1200px",
								boxSizing: "border-box",
							}}
						>
							<Dropzone onUpload={handleUpload} />
							<div style={{ width: "100%" }}>
								<FileList files={files} onDelete={handleDelete} />
							</div>
						</div>
					</main>
				</div>
				<Footer />
			</div>
		</ErrorBoundary>
	);
}

export default Main;
