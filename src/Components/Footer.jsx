import "./Footer.css";

import { socialMediaLinks, termsLink } from "../content";

export function Footer() {
	return (
		<div className="footer">
			<div className="logo-text">BlobStars</div>
			<div className="links">
				{[...socialMediaLinks, termsLink].map(link => (
					<a
						key={link.name}
						className="link"
						href={link.href}
						target={link.name !== "terms" ? "_blank" : undefined}
						rel="noreferrer"
					>
						{link.name}
					</a>
				))}
			</div>
		</div>
	);
}
