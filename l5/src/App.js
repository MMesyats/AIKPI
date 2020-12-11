import React, { useCallback, useState } from 'react';
import { InputNumber, Radio } from 'antd';
import { Line } from 'react-chartjs-2';
import './App.scss';

const exponentialSmoothing = (array, alpha = 0.9) => {
	const newArr = [];
	array.forEach(
		(val, i) => (i !== 0 ? newArr.push(newArr[i - 1] + alpha * (val - newArr[i - 1])) : newArr.push(array[i]))
	);
	return newArr;
};

const movingAverage = (array = [], width = 20) => {
	const newArr = [ ...array ];
	for (let i = width; i < array.length - width; i++) {
		newArr[i] = newArr[i - 1] + (array[i + width] - array[i - width]) / (1 + 2 * width);
	}
	return newArr;
};

function App() {
	const [ withCycles, changeWithCyvles ] = useState(true);
	const [ cycles, setCycles ] = useState(5);
	const [ shift, setShift ] = useState(0.2);
	const [ freq, setFreq ] = useState(80);
	const [ ampl, setAmpl ] = useState(0.8);
	const [ nu, setNu ] = useState(300);
	const [ b1, setB1 ] = useState(23);
	const [ b2, setB2 ] = useState(23);
	const [ noise, setNoise ] = useState(2);
	const [ smoothingMode, setSmoothingMode ] = useState(0);
	const [ alpha, setAlpha ] = useState(0.5);
	const [ width, setWidth ] = useState(1);

	const zone = (a, b1, b2, nu) => ({
		a,
		b1,
		b2,
		nu
	});

	const countl3 = useCallback(
		() => {
			let a = ampl;
			const t0 = 60 * 1100 / freq;
			const zones = [];
			const isAmplMinus = a < 0;
			if (isAmplMinus) a = -a;
			zones.push(zone(1.7 * a, 20, 20, t0 / 3.2));
			zones.push(zone(-1.2 * a, 24, 24, t0 / 3));
			zones.push(zone(3.9 * a, 6, 6, t0 / 2.7));
			zones.push(zone(-0.6 * a, 10, 10, t0 / 2.6));
			zones.push(zone(isAmplMinus ? -ampl : ampl, b1, b2, nu));
			const tArray = [];
			for (let t = 0; t <= t0; t++) tArray.push(t);
			const aArray = tArray.map((t) => {
				let a = 0;
				zones.forEach(({ a: ampl, b1, b2, nu }) => {
					const bottom = t < nu ? b1 : b2;
					a += ampl * Math.exp(-Math.pow(t - nu, 2) / Math.pow(bottom, 2));
				});
				return a;
			});
			return {
				datasets: [
					{
						label: 'L3',
						fill: false,
						data: aArray,
						borderColor: 'rgba(0, 99, 255, 1)'
					}
				],
				labels: tArray
			};
		},
		[ freq, ampl, nu, b1, b2 ]
	);
	const countl4 = useCallback(
		() => {
			let a = ampl;
			const t0 = 60 * 1100 / freq;
			const zones = [];
			const isAmplMinus = a < 0;
			if (isAmplMinus) a = -a;
			zones.push(zone(1.7 * a, 20, 20, t0 / 3.2));
			zones.push(zone(-1.2 * a, 24, 24, t0 / 3));
			zones.push(zone(3.9 * a, 6, 6, t0 / 2.7));
			zones.push(zone(-0.6 * a, 10, 10, t0 / 2.6));
			zones.push(zone(ampl, b1, b2, nu));
			const tArray = [];
			let aArray = [];
			for (let m = 0; m < cycles; m++) {
				if (Math.random() >= 0.5) {
					zones[4].a = zones[4].a * (1 + shift / zones[4].a);
				}

				zones[4].nu += zones[4].nu + zones[4].nu / 10;

				for (let t = m * t0; t < (m + 1) * t0; t += 2) {
					let a = 0;

					const k = t % t0;

					zones.forEach((zone) => {
						const bottom = k < zone.nu ? zone.b1 : zone.b2;
						a +=
							zone.a * Math.exp(-Math.pow(k - zone.nu, 2) / (2 * Math.pow(bottom, 2))) +
							(Math.random() - 0.5) * noise * 10e-3;
					});
					aArray.push(a);
					tArray.push(t);
				}
				zones[4].a = ampl;
				zones[4].nu = nu;
			}
			if (smoothingMode === 1) {
				const sArray = exponentialSmoothing(aArray, alpha);
				return {
					datasets: [
						{
							label: 'smoothed',
							data: sArray,
							borderColor: 'rgba(255, 0, 99, 1)'
						},
						{
							label: 'original',
							data: aArray,
							borderColor: 'rgba(0, 99, 255, 1)',
							fill: false
						}
					],
					labels: tArray
				};
			}
			if (smoothingMode === 2) {
				const sArray = movingAverage(aArray, width);
				return {
					datasets: [
						{
							label: 'smoothed',
							data: sArray,
							borderColor: 'rgba(255, 0, 99, 1)'
						},
						{
							label: 'original',
							data: aArray,
							borderColor: 'rgba(0, 99, 255, 1)',
							fill: false
						}
					],
					labels: tArray
				};
			}

			return {
				datasets: [
					{
						label: 'original',
						borderColor: 'rgba(0, 99, 255, 1)',
						data: aArray
					}
				],
				labels: tArray
			};
		},
		[ ampl, freq, b1, b2, nu, smoothingMode, alpha, width, cycles, shift, noise ]
	);

	return (
		<div className="App">
			<div>
				<label>
					<input type="checkbox" value={withCycles} onClick={() => changeWithCyvles((prev) => !prev)} />
					с циклами
					<br />
				</label>
				{withCycles && (
					<React.Fragment>
						<label>Alt</label>
						<InputNumber value={shift} step={0.1} onChange={setShift} />
						<label>Cycles count</label>
						<InputNumber value={cycles} min="1" onChange={setCycles} />
						<label>Noise (n*e-3)</label>
						<InputNumber value={noise} min="0" step={0.1} onChange={setNoise} />
						{smoothingMode === 1 && (
							<React.Fragment>
								<label>Alpha</label>
								<InputNumber value={alpha} min="0" max="1" step={0.01} onChange={setAlpha} />
							</React.Fragment>
						)}
						{smoothingMode === 2 && (
							<React.Fragment>
								<label>Width</label>
								<InputNumber value={width} min={1} max={20} onChange={setWidth} />
							</React.Fragment>
						)}
						<Radio.Group
							className="radio"
							value={smoothingMode}
							onChange={({ target: { value } }) => setSmoothingMode(value)}
						>
							<Radio.Button value={0}>Without Smoothing</Radio.Button>
							<Radio.Button value={1}>Exponential</Radio.Button>
							<Radio.Button value={2}>Moving Average</Radio.Button>
						</Radio.Group>
					</React.Fragment>
				)}

				<label>Fh</label>
				<InputNumber value={freq} onChange={(val) => setFreq(val)} />
				<label>A(t)</label>
				<InputNumber value={ampl} onChange={(val) => setAmpl(val)} />
				<label>nu(t)</label>
				<InputNumber value={nu} onChange={(val) => setNu(val)} />
				<label>b1(t)</label>
				<InputNumber value={b1} onChange={(val) => setB1(val)} />
				<label>b2(t)</label>
				<InputNumber value={b2} onChange={(val) => setB2(val)} />
			</div>
			<Line data={withCycles ? countl4 : countl3} options={{ elements: { point: { radius: 0 } } }} />
		</div>
	);
}

export default App;
