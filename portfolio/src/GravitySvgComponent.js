import React, { useEffect, useRef, useState } from "react";
import {
	Engine,
	Render,
	Runner,
	Bodies,
	World,
	MouseConstraint,
	Mouse,
	Body
} from "matter-js";
import mySvg from "./logo.svg";

const GravitySvgComponent = () => {
	const sceneRef = useRef(null);
	const [scrollY, setScrollY] = useState(0);
	const engineRef = useRef(null); // <-- Use a ref to store engine

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		const deltaY = currentScrollY - scrollY;
		setScrollY(currentScrollY);

		// Déplacer tous les objets selon le mouvement de défilement
		if (engineRef.current) {
			setTimeout(() => {
				engineRef.current.world.bodies.forEach((body) => {
					if (!body.isStatic) {
						Body.translate(body, { x: 0, y: -deltaY * 0.5 });
					}
				});
			}, 50);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrollY, handleScroll]);

	useEffect(() => {
		const engine = Engine.create({
			gravity: {
				scale: 0,
				x: 0,
				y: 1
			}
		});
		engineRef.current = engine; // <-- Store engine in the ref
		const render = Render.create({
			element: sceneRef.current,
			engine: engine,
			options: {
				width: 800,
				height: 600,
				wireframes: false
			}
		});

		const runner = Runner.create();
		Runner.run(runner, engine);

		const ground = Bodies.rectangle(400, 610, 810, 60, {
			isStatic: true,
			restitution: 1
		});
		const leftWall = Bodies.rectangle(-10, 300, 60, 610, {
			isStatic: true,
			restitution: 1
		});
		const rightWall = Bodies.rectangle(810, 300, 60, 610, {
			isStatic: true,
			restitution: 1
		});
		const ceiling = Bodies.rectangle(400, -10, 810, 60, {
			isStatic: true,
			restitution: 1
		});

		const createSvgCircle = (x, y) => {
			const circle = Bodies.circle(x, y, 40, {
				restitution: 1,
				render: {
					sprite: {
						texture: mySvg,
						xScale: 0.5,
						yScale: 0.5
					}
				}
			});
			return circle;
		};

		const circles = [
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 200),
			createSvgCircle(300, 200),
			createSvgCircle(400, 200),
			createSvgCircle(500, 200),
			createSvgCircle(600, 200),
			createSvgCircle(200, 300)
		];

		World.add(engine.world, [ground, leftWall, rightWall, ceiling, ...circles]);

		const mouse = Mouse.create(render.canvas);
		const mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});

		World.add(engine.world, mouseConstraint);
		render.mouse = mouse;

		Render.run(render);

		return () => {
			Render.stop(render);
			World.clear(engine.world);
			Engine.clear(engine);
			render.canvas.remove();
			render.canvas = null;
			render.context = null;
			render.textures = {};
		};
	}, []);

	return <div ref={sceneRef} />;
};

export default GravitySvgComponent;
