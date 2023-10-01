import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "../style/ParallaxComponent.css";
import AboutMe from "./AboutMe";

export default function ParallaxComponent() {
	return (
		<Parallax pages={2} style={{ top: "0", left: "0" }}>
			<ParallaxLayer offset={0} speed={0.5}>
				<AboutMe />
			</ParallaxLayer>
			<ParallaxLayer offset={1} speed={0.5}>
				<AboutMe />
			</ParallaxLayer>
		</Parallax>
	);
}
