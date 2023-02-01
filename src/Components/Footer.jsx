import "./Footer.css";
import { socialMediaLinks, termsLink } from "../content";
import { ReactComponent as FooterText } from "../images/footer-rockstar-text.svg";
export function Footer() {
	return (
		<div className="footer">
			<FooterText />
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
