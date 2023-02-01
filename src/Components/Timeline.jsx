import {
	Timeline as MuiTimeline,
	TimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineOppositeContent,
} from "@mui/lab";

import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import CountUp from "react-countup";
import { timelineText } from "../content";
import "./Timeline.css";
import { useOnScreen } from "./LandingPage";
import { scrollToTop } from "./Header";

export function Timeline({ isMobile }) {
	const ref = useRef();
	const isVisible = useOnScreen(ref);
	const [startCountup, setStartCountup] = useState(false);

	useEffect(() => {
		if (isVisible && !startCountup) {
			setStartCountup(true);
		}
	}, [isVisible]);

	return (
		<div className="tl-wrapper">
			<div ref={ref}>
				<MuiTimeline>
					{timelineText.map(({ percent, title, description }, i) => (
						<TimelineItem key={title}>
							<TimelineOppositeContent
								sx={{ m: "auto 0", px: 3 }}
								align="right"
								variant={isMobile ? "h4" : "h3"}
								color={i === 0 ? "pink" : "text.secondary"}
							>
								{startCountup && (
									<span>
										<CountUp end={percent} start={10} duration={1} />%
									</span>
								)}
							</TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineConnector
									sx={{ background: i === 0 && "pink", boxShadow: "none" }}
								/>
								<TimelineDot
									sx={{ background: i === 0 && "pink", boxShadow: "none" }}
									className={i === 0 ? "pulse" : ""}
								/>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent
								sx={{ py: isMobile ? 2 : 3, pl: 3, flex: isMobile ? 3 : 1 }}
							>
								<Typography variant="h6" component="span">
									{title}
								</Typography>
								<Typography>{description}</Typography>
							</TimelineContent>
						</TimelineItem>
					))}
				</MuiTimeline>
			</div>
		</div>
	);
}
