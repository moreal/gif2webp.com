export function PreviewImage({
	src,
	alt,
	onError,
}: {
	src: string;
	alt?: string;
	onError?: () => void;
}) {
	return (
		<img
			src={src}
			alt={alt || "Image preview"}
			onError={onError}
			style={{
				margin: 0,
				width: "100px",
				height: "100px",
				objectFit: "cover",
				borderRadius: "4px",
				maxWidth: "100%",
			}}
			loading="lazy"
		/>
	);
}
