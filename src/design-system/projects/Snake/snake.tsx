import { useEffect, useRef, useState } from "react";

export const SnakeProject = () => {

	const divRef = useRef<HTMLDivElement | null>(null);
	const [cellSize, setCellSize] = useState(20);

	useEffect(() => {
	if (divRef.current) {
		const rect = divRef.current.getBoundingClientRect();
		const size = Math.floor(Math.min(rect.width, rect.height) / GRID_SIZE);
		setCellSize(size);
	}
	}, []);

	const GRID_SIZE = 20;
	const snakeStartingX = 19;
	const snakeStartingY = 10;
	const snakeSpeed = 10;
	const snakeInterval = 1000 / snakeSpeed;

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);

	const directionList = {
		ArrowUp: { x: 0, y: -1 },
		ArrowDown: { x: 0, y: 1 },
		ArrowLeft: { x: -1, y: 0 },
		ArrowRight: { x: 1, y: 0 },
	};

	const [snake, setSnake] = useState([{ x: snakeStartingX, y: snakeStartingY }]);
	const snakeRef = useRef(snake);
	snakeRef.current = snake;

	const [direction, setDirection] = useState({ x: 0, y: 0 });
	const directionRef = useRef(direction);
	directionRef.current = direction;

	const [canChangeDirection, setCanChangeDirection] = useState(true);
	const canChangeDirectionRef = useRef(canChangeDirection);
	canChangeDirectionRef.current = canChangeDirection;

	const randomPos = () => ({
		x: Math.floor(Math.random() * GRID_SIZE),
		y: Math.floor(Math.random() * GRID_SIZE),
	});

	const [apple, setApple] = useState({x: -1, y: -1});
	const appleRef = useRef(apple);
	appleRef.current = apple;

	const startGame = () => {
		const startSnake = [{ x: snakeStartingX, y: snakeStartingY}];
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
	};

 	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (!isRunning && e.key === "Enter") startGame();

			if (!isRunning) return;
			if (e.key === "Escape") {
				setIsPaused(prev => !prev);
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
	}, [isRunning, isPaused]);

  	useEffect(() => {
		if (!isRunning || isPaused) return;

		const interval = setInterval(() => {
			const dir = directionRef.current;
			if (dir.x === 0 && dir.y === 0) return;

			const newSnake = [...snakeRef.current];
			const head = newSnake[0];

			const newHead = {
				x: (head.x + dir.x + GRID_SIZE) % GRID_SIZE,
				y: (head.y + dir.y + GRID_SIZE) % GRID_SIZE,
			};

			const bodyWithoutTail = snakeRef.current.slice(0, snakeRef.current.length - 1);
			const hitSelf = bodyWithoutTail.some(s => s.x === newHead.x && s.y === newHead.y);
			if (hitSelf) {
				setIsRunning(false);
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

	useEffect(() => {
			if (!isRunning || isPaused) return;
			const timer = setInterval(() => setTime(prev => prev + 1), 1000);
			return () => clearInterval(timer);
		}, [isRunning, isPaused]);

	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctxRef.current = ctx;

		function draw() {
		const ctx = ctxRef.current;
		if (!ctx) return;

		ctx.clearRect(0, 0, GRID_SIZE * cellSize, GRID_SIZE * cellSize);

		// background
		for (let y = 0; y < GRID_SIZE; y++) {
			for (let x = 0; x < GRID_SIZE; x++) {
			ctx.fillStyle = (x + y) % 2 ? "#ADF6B1" : "#A1E5AB";
			ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
			}
		}

		ctx.fillStyle = "#FF4747";
		ctx.beginPath();
		ctx.arc(
			appleRef.current.x * cellSize + cellSize / 2,
			appleRef.current.y * cellSize + cellSize / 2,
			cellSize * 0.4,
			0,
			Math.PI * 2
		);
		ctx.fill();

		ctx.fillStyle = "#3d53e0";
		snakeRef.current.forEach(seg => {
			ctx.fillRect(seg.x * cellSize, seg.y * cellSize, cellSize, cellSize);
		});

		ctx.fillStyle = "black";
		ctx.font = "20px Arial";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText(`Score: ${score}`, 10, 10);
		ctx.fillText(`Time: ${time}s`, 10, 35);

		if (!isRunning) {
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fillRect(GRID_SIZE * cellSize / 4, GRID_SIZE * cellSize / 2 - 30, GRID_SIZE * cellSize / 2, 60);
			ctx.fillStyle = "white";
			ctx.font = "30px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("START GAME", GRID_SIZE * cellSize / 2, GRID_SIZE * cellSize / 2);
		}
		if (isPaused) {
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fillRect(GRID_SIZE * cellSize / 4, GRID_SIZE * cellSize / 2 - 30, GRID_SIZE * cellSize / 2, 60);
			ctx.fillStyle = "white";
			ctx.font = "30px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("PAUSE", GRID_SIZE * cellSize / 2, GRID_SIZE * cellSize / 2);
		}

		if (!isRunning && snakeRef.current.length > 0) {
			const head = snakeRef.current[0];
			const bodyWithoutTail = snakeRef.current.slice(1);
			const hitSelf = bodyWithoutTail.some(s => s.x === head.x && s.y === head.y);
			if (hitSelf) {
			ctx.fillStyle = "red";
			ctx.font = "40px Arial";
			ctx.fillText("GAME OVER", GRID_SIZE * cellSize / 2, GRID_SIZE * cellSize / 2 - 60);
			}
		}

		requestAnimationFrame(draw);
		}

		const handleClick = (e: MouseEvent) => {
		if (isRunning) return;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		if (
			x >= GRID_SIZE * cellSize / 4 &&
			x <= GRID_SIZE * cellSize * 3 / 4 &&
			y >= GRID_SIZE * cellSize / 2 - 30 &&
			y <= GRID_SIZE * cellSize / 2 + 30
		) {
			startGame();
		}
		};
		canvas.addEventListener("click", handleClick);

		requestAnimationFrame(draw);
		return () => canvas.removeEventListener("click", handleClick);
	}, [score, isRunning, time, isPaused]);

	return (
		<div
			ref={divRef}
			style={{
				textAlign: "center",
				marginTop: 20,
				width: "100%",
				height: "100%",
			}}
		>
			<canvas
				ref={canvasRef}
				width={GRID_SIZE * cellSize}
				height={GRID_SIZE * cellSize}
			/>
		</div>
	);
};
