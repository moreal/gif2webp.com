export function DownloadLink({
	href,
	download,
	children,
}: {
	href: string;
	download: string;
	children: React.ReactNode;
}) {
	return (
		<a
			href={href}
			download={download}
			style={{
				textDecoration: "none",
				color: "inherit",
				display: "inline-block",
				padding: "5px",
			}}
		>
			{children}
		</a>
	);
}
