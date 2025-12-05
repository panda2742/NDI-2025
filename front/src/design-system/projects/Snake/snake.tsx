import { useEffect, useRef, useState } from "react";
import snakeHeadImg from "./assets/snakeHead.png";
import snakeBodyImg from "./assets/snakeBody.png";
import snakeTailImg from "./assets/snakeTail.png";
import snakeAngleImg from "./assets/snakeAngle.png";
import appleImg from "./assets/apple.png";
import gameOverImg from "./assets/gameOver.png";
import playButton from "./assets/playButton.png";
import playButtonHover from "./assets/playButtonHover.png";
import cupImg from "./assets/cup.png";
import cupHoverImg from "./assets/cupHover.png";
import "./style.scss";

export const SnakeProject = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [showMenu, setShowMenu] = useState(true);

	const [isCupHover, setIsCupHover] = useState(false);
	const [isHover, setIsHover] = useState(false);

	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);

	const cellSize = 15;
	const GRID_SIZE = 20;
	const snakeStartingX = 19;
	const snakeStartingY = 10;
	const snakeSpeed = 10;
	const snakeInterval = 1000 / snakeSpeed;

	const directionList = {
		ArrowUp: { x: 0, y: -1 },
		ArrowDown: { x: 0, y: 1 },
		ArrowLeft: { x: -1, y: 0 },
		ArrowRight: { x: 1, y: 0 },
	};

	const [snake, setSnake] = useState([{ x: snakeStartingX, y: snakeStartingY }]);
	const snakeRef = useRef(snake);
	snakeRef.current = snake;

	const [direction, setDirection] = useState({ x: -1, y: 0 });
	const directionRef = useRef(direction);
	directionRef.current = direction;

	const [canChangeDirection, setCanChangeDirection] = useState(true);
	const canChangeDirectionRef = useRef(canChangeDirection);
	canChangeDirectionRef.current = canChangeDirection;

	const randomPos = () => ({
		x: Math.floor(Math.random() * GRID_SIZE),
		y: Math.floor(Math.random() * GRID_SIZE),
	});

	const [apple, setApple] = useState({ x: -1, y: -1 });
	const appleRef = useRef(apple);
	appleRef.current = apple;

	const startGame = () => {
		const startSnake = [{ x: snakeStartingX, y: snakeStartingY }];
		setSnake(startSnake);
		snakeRef.current = startSnake;

		const startDir = { x: -1, y: 0 };
		setDirection(startDir);
		directionRef.current = startDir;

		setCanChangeDirection(true);
		canChangeDirectionRef.current = true;

		const newApple = randomPos();
		setApple(newApple);
		appleRef.current = newApple;

		setScore(0);
		setTime(0);
		setIsRunning(true);
		setIsPaused(false);
		setIsGameOver(false);
		setShowMenu(false);
	};

	// CONTINUE AFTER PAUSE
	const resumeGame = () => {
		setIsPaused(false);
		setShowMenu(false);
		setIsRunning(true);
	};

	// KEY HANDLING
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (isGameOver && (e.key === "Enter" || e.key === "Escape")) {
				setShowMenu(true);
				setIsGameOver(false);
				return;
			}

			if (showMenu && e.key === "Enter") {
				startGame();
				return;
			}

			if (!isRunning) return;

			if (e.key === "Escape") {
				setIsPaused(prev => {
					const newState = !prev;
					if (newState) {
						setShowMenu(true);
					} else {
						setShowMenu(false);
					}
					return newState;
				});
				return;
			}

			if (isPaused) return;
			if (!canChangeDirectionRef.current) return;
			if (!(e.key in directionList)) return;

			const newDir = directionList[e.key as keyof typeof directionList];
			const cur = directionRef.current;
			if (newDir.x === -cur.x && newDir.y === -cur.y) return;

			setDirection(newDir);
			setCanChangeDirection(false);
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isRunning, isPaused, isGameOver, showMenu]);

	// SNAKE MOVEMENT
	useEffect(() => {
		if (!isRunning || isPaused) return;

		const interval = setInterval(() => {
			const dir = directionRef.current;

			const newSnake = [...snakeRef.current];
			const head = newSnake[0];
			const newHead = { x: head.x + dir.x, y: head.y + dir.y };

			const bodyWithoutTail = newSnake.slice(0, newSnake.length - 1);
			const hitSelf = bodyWithoutTail.some(s => s.x === newHead.x && s.y === newHead.y);

			if (hitSelf || newHead.x < 0 || newHead.y < 0 || newHead.x >= GRID_SIZE || newHead.y >= GRID_SIZE) {
				setIsRunning(false);
				setIsGameOver(true);
				return;
			}

			if (appleRef.current.x === newHead.x && appleRef.current.y === newHead.y) {
				newSnake.unshift(newHead);
				let newApple = randomPos();
				while (newSnake.some(s => s.x === newApple.x && s.y === newApple.y)) {
					newApple = randomPos();
				}
				setApple(newApple);
				appleRef.current = newApple;
				setScore(prev => prev + 1);
			} else {
				newSnake.unshift(newHead);
				newSnake.pop();
			}

			setSnake(newSnake);
			snakeRef.current = newSnake;

			setCanChangeDirection(true);
		}, snakeInterval);

		return () => clearInterval(interval);
	}, [isRunning, isPaused]);

	// TIMER
	useEffect(() => {
		if (!isRunning || isPaused) return;
		const timer = setInterval(() => setTime(prev => prev + 1), 1000);
		return () => clearInterval(timer);
	}, [isRunning, isPaused]);

	// RENDER
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctxRef.current = ctx;

		const headImg = new Image();
		headImg.src = snakeHeadImg;
		const bodyImg = new Image();
		bodyImg.src = snakeBodyImg;
		const tailImg = new Image();
		tailImg.src = snakeTailImg;
		const angleImg = new Image();
		angleImg.src = snakeAngleImg;
		const appleImage = new Image();
		appleImage.src = appleImg;

		function draw() {
			const ctx = ctxRef.current;
			if (!ctx) return;

			// Background
			for (let y = 0; y < GRID_SIZE; y++) {
				for (let x = 0; x < GRID_SIZE; x++) {
					ctx.fillStyle = (x + y) % 2 ? "#ADF6B1" : "#A1E5AB";
					ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
				}
			}

			// Apple
			ctx.drawImage(
				appleImage,
				appleRef.current.x * cellSize,
				appleRef.current.y * cellSize,
				cellSize,
				cellSize
			);

			// Snake
			snakeRef.current.forEach((seg, i) => {
				let img = bodyImg;
				let rotation = 0;

				if (i === 0) {
					img = headImg;
					const next = snakeRef.current[1];
					let dx, dy;
					if (next) {
						dx = next.x - seg.x;
						dy = next.y - seg.y;
					} else {
						dx = -directionRef.current.x;
						dy = -directionRef.current.y;
					}
					if (dx === 1) rotation = Math.PI;
					if (dx === -1) rotation = 0;
					if (dy === 1) rotation = -Math.PI / 2;
					if (dy === -1) rotation = Math.PI / 2;
				}
				else if (i === snakeRef.current.length - 1) {
					img = tailImg;
					const prev = snakeRef.current[i - 1];
					const dx = prev.x - seg.x;
					const dy = prev.y - seg.y;
					if (dx === 1) rotation = 0;
					if (dx === -1) rotation = Math.PI;
					if (dy === 1) rotation = Math.PI / 2;
					if (dy === -1) rotation = -Math.PI / 2;
				}
				else {
					const prev = snakeRef.current[i - 1];
					const next = snakeRef.current[i + 1];
					const dxPrev = seg.x - prev.x;
					const dyPrev = seg.y - prev.y;
					const dxNext = next.x - seg.x;
					const dyNext = next.y - seg.y;

					if (dyPrev === 0 && dyNext === 0) {
						img = bodyImg;
						rotation = dxPrev === 1 ? 0 : Math.PI;
					}
					else if (dxPrev === 0 && dxNext === 0) {
						img = bodyImg;
						rotation = dyPrev === 1 ? Math.PI / 2 : -Math.PI / 2;
					}
					else {
						img = angleImg;
						if ((dxPrev === 1 && dyNext === 1) || (dxNext === -1 && dyPrev === -1)) rotation = Math.PI / 2;
						else if ((dxPrev === 1 && dyNext === -1) || (dxNext === -1 && dyPrev === 1)) rotation = Math.PI;
						else if ((dxPrev === -1 && dyNext === 1) || (dxNext === 1 && dyPrev === -1)) rotation = 0;
						else if ((dxPrev === -1 && dyNext === -1) || (dxNext === 1 && dyPrev === 1)) rotation = -Math.PI / 2;
					}
				}

				ctx.save();
				ctx.translate(seg.x * cellSize + cellSize / 2, seg.y * cellSize + cellSize / 2);
				ctx.rotate(rotation);
				ctx.drawImage(img, -cellSize / 2, -cellSize / 2, cellSize, cellSize);
				ctx.restore();
			});

			requestAnimationFrame(draw);
		}

		draw();
	}, [score, isRunning, time, isPaused]);

	return (
	<div
		style={{
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		background: "#A1E5AB",
		position: "relative",
		fontFamily: "'Press Start 2P', monospace",
		}}
	>
		{(showMenu || isGameOver) && (
		<div
			style={{
			position: "absolute",
			inset: 0,
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			pointerEvents: "none",
			}}
		/>
		)}

		<div
		style={{
			display: "flex",
			flexDirection: "row",
			gap: "20px",
			alignItems: "center",
		}}
		>
		{/* --- LEFT PANEL : SCORE + TIME --- */}
		<div
			style={{
			width: "120px",
			textAlign: "left",
			color: "#fff",
			fontSize: "12px",
			textShadow: "2px 2px 0px #000",
			userSelect: "none",
			}}
		>
			<div style={{ marginBottom: "20px" }}>
			<div className="snake-font">SCORE</div>
			<div className="snake-font" style={{ fontSize: "16px", marginTop: "5px" }}>{score}</div>
			</div>

			<div>
			<div className="snake-font">TIME</div>
			<div className="snake-font" style={{ fontSize: "16px", marginTop: "5px" }}>{time}s</div>
			</div>
		</div>

		{/* --- CANVAS AREA --- */}
		<div
			style={{
			textAlign: "center",
			width: GRID_SIZE * cellSize,
			height: GRID_SIZE * cellSize,
			position: "relative",
			}}
		>
			<canvas
			ref={canvasRef}
			width={GRID_SIZE * cellSize}
			height={GRID_SIZE * cellSize}
			/>

			{/* --- MENU START / PAUSE --- */}
			{showMenu && !isGameOver && (
			<div
				style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				cursor: "pointer",
				}}
			>
				{/* Bouton Play */}
				<img
				src={isHover ? playButtonHover : playButton}
				alt="Play"
				style={{ width: "40%" }}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={() => {
					if (isPaused) resumeGame();
					else startGame();
				}}
				/>

				{/* Coupe en dessous */}
				<img
				src={isCupHover ? cupHoverImg : cupImg}
				alt="Cup"
				style={{ width: "20%", marginTop: "20px" }}
				onMouseEnter={() => setIsCupHover(true)}
				onMouseLeave={() => setIsCupHover(false)}
				/>
			</div>
			)}

			{/* --- GAME OVER SCREEN --- */}
			{isGameOver && (
			<div
				style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "rgba(0,0,0,0.5)",
				userSelect: "none",
				}}
			>
				<img
				src={gameOverImg}
				alt="Game Over"
				style={{ width: "80%" }}
				/>
			</div>
			)}
		</div>
		</div>
	</div>
	);
};
