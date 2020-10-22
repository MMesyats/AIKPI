import React, { useCallback, useState } from 'react';
import { InputNumber } from 'antd';
import { Line } from 'react-chartjs-2';
import './App.scss';

function App() {

	const [ withCycles, changeWithCyvles ] = useState(false);
	const [ cycles, setCycles ] = useState(5);
	const [ shift, setShift ] = useState(0.2);
	const [ freq, setFreq ] = useState(80);
	const [ ampl, setAmpl ] = useState(0.8);
	const [ nu, setNu ] = useState(500);
	const [ b1, setB1 ] = useState(23);
	const [ b2, setB2 ] = useState(23);

	const zone = (a, b1, b2, nu) => ({
		a,
		b1,
		b2,
		nu
	});

	const countl3 = useCallback(() => {
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
	},[freq,ampl,nu,b1,b2]);
	const countl4 = useCallback(() => {
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
		const aArray = [];
		let isAlterrated = Math.random() >= 0.5;
		for (let m = 0; m < cycles; m++) {
			zones[4].a += zones[4].a + shift / zones[4].a;
			zones[4].nu += zones[4].nu + zones[4].nu / 10;

			for (let t = m * t0; t < (m + 1) * t0; t += 2) {
				let a = 0;

				const k = t % t0;

				zones.forEach((zone) => {
					const bottom = k < zone.nu ? zone.b1 : zone.b2;
					a += zone.a * Math.exp(-Math.pow(k - zone.nu, 2) / (2 * Math.pow(bottom, 2)));
				});
				aArray.push(a);
				tArray.push(t);
			}
			zones[4].a = ampl;
			zones[4].nu = nu;
		}

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
	},[freq,ampl,nu,b1,b2,cycles,shift]);

	return (
		<div className="App">
			<div>
				<label>
					<input type="checkbox" value={withCycles} onClick={() => changeWithCyvles((prev) => !prev)} />
					с циклами
				</label>
				{
					withCycles && 
					<>
									<label>Alt</label>
				<InputNumber value={shift} onChange={(val) => setShift(val)} />
				<label>Cycles count</label>
				<InputNumber value={cycles} min="1" onChange={(val) => setCycles(val)} />
					</>
				}

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
			<Line type="line" data={withCycles?countl4:countl3} />
		</div>
	);
}

export default App;
