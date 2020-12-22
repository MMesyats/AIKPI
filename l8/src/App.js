import React, { useEffect, useState, useMemo } from 'react';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import file1 from './file1.txt';
import file2 from './file2.txt';

import './App.scss';

const readFile = async (c) => {
	const req = await fetch(c);
	const data = await req.text();
	return data.split(' ').filter((val) => !isNaN(+val) && val !== '' && val !== '\n' && +val !== 0).map((val) => +val);
};

const mean = (s) => s.reduce((acc, val) => acc + val, 0) / s.length;

const CHSS = (s = []) => 60000 / mean(s);

const NN = (s) => 1 / CHSS(s);

const std = (s) => {
	const m = mean(s);
	console.log(m);
	return Math.sqrt(s.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / s.length);
};

const IA = (s) => AMode(s) / (2 * mode(s)[0] * diffMaxMin(s));

const diffMaxMin = (s) => Math.max(...s) - Math.min(...s);

const AMode = (s) => {
	const m = mode(s)[0];
	return s.filter((v) => v === m).length / s.length * 100;
};

const mode = (numbers) => {
	var modes = [],
		count = [],
		i,
		number,
		maxIndex = 0;

	for (i = 0; i < numbers.length; i += 1) {
		number = numbers[i];
		count[number] = (count[number] || 0) + 1;
		if (count[number] > maxIndex) {
			maxIndex = count[number];
		}
	}

	for (i in count)
		if (count.hasOwnProperty(i)) {
			if (count[i] === maxIndex) {
				modes.push(Number(i));
			}
		}

	return modes;
};

function App() {
	const [ file1Data, setFile1Data ] = useState([]);
	const [ file2Data, setFile2Data ] = useState([]);

	useEffect(() => {
		(async () => {
			setFile1Data(await readFile(file1));
			setFile2Data(await readFile(file2));
		})();
	}, []);
	const t1 = useMemo(() => file1Data.map((_, i) => (i * 0.01).toFixed(2)), [ file1Data ]);
	const t2 = useMemo(() => file2Data.map((_, i) => (i * 0.01).toFixed(2)), [ file2Data ]);

	const g1 = useMemo(
		() => {
			return {
				datasets: [
					{
						label: 'EKG',
						data: file1Data,
						fill: false,
						borderColor: 'blue'
					}
				],
				labels: t1
			};
		},
		[ t1, file1Data ]
	);
	const g2 = useMemo(
		() => {
			return {
				datasets: [
					{
						label: 'EKG',
						data: file2Data,
						fill: false,
						borderColor: 'blue'
					}
				],
				labels: t2
			};
		},
		[ t2, file2Data ]
	);
	const g3 = useMemo(
		() => {
			const data = [];
			for (let i = 0; i < file1Data.length - 2; i++) data.push({ x: file1Data[i], y: file1Data[i + 1] });
			return {
				datasets: [
					{
						label: 'EKG',
						data: data,
						fill: false,
						borderColor: 'blue'
					}
				]
			};
		},
		[ file1Data ]
	);
	const g4 = useMemo(
		() => {
			const data = [];
			for (let i = 0; i < file2Data.length - 2; i++) data.push({ x: file2Data[i], y: file2Data[i + 1] });
			return {
				datasets: [
					{
						label: 'EKG',
						data: data,
						fill: false,
						borderColor: 'blue'
					}
				]
			};
		},
		[ file2Data ]
	);
	const g5 = useMemo(
		() => {
			const groupVal = 50;
			const min = Math.floor(Math.min(...file1Data) / groupVal) * groupVal;
			const max = Math.ceil(Math.max(...file1Data) / groupVal) * groupVal;
			const labels = [];
			for (let i = min - groupVal; i <= max + groupVal; i += groupVal) labels.push(i);
			const data = labels.map((min, i) => {
				if (i === labels.length - 1) return 0;
				const max = labels[i + 1];
				return file1Data.filter((val) => val >= min && val < max).length;
			});
			return {
				datasets: [
					{
						label: 'EKG',
						data: data,
						fill: false,
						backgroundColor: 'blue'
					}
				],
				labels: labels
			};
		},
		[ file1Data ]
	);
	const g6 = useMemo(
		() => {
			const groupVal = 5;
			const min = Math.floor(Math.min(...file2Data) / groupVal) * groupVal;
			const max = Math.ceil(Math.max(...file2Data) / groupVal) * groupVal;
			const labels = [];
			for (let i = min - groupVal; i <= max + groupVal; i += groupVal) labels.push(i);
			const data = labels.map((min, i) => {
				if (i === labels.length - 1) return 0;
				const max = labels[i + 1];
				return file2Data.filter((val) => val >= min && val < max).length;
			});
			return {
				datasets: [
					{
						label: 'EKG',
						data: data,
						fill: false,
						backgroundColor: 'blue'
					}
				],
				labels: labels
			};
		},
		[ file2Data ]
	);

	return (
		<div className="App">
			<div className="controls" />
			<div className="graphics">
				<Line
					type="line"
					data={g1}
					width={600}
					height={300}
					options={{
						responsive: false,
						maintainAspectRatio: true,
						elements: { point: { radius: 0 } },
						showLines: true,
						scales: {
							xAxes: [
								{
									scaleFontSize: 40
								}
							]
						}
					}}
				/>
				<Line
					type="line"
					data={g2}
					width={600}
					height={300}
					options={{
						responsive: false,
						maintainAspectRatio: true,
						elements: { point: { radius: 0 } },
						showLines: true,
						scales: {
							xAxes: [
								{
									scaleFontSize: 40
								}
							]
						}
					}}
				/>
				<Scatter
					data={g3}
					width={600}
					height={300}
					options={{
						responsive: false,
						maintainAspectRatio: true,
						scales: {
							xAxes: [
								{
									scaleFontSize: 40
								}
							]
						}
					}}
				/>
				<Scatter
					data={g4}
					width={600}
					height={300}
					options={{
						responsive: false,
						maintainAspectRatio: true,
						scales: {
							xAxes: [
								{
									scaleFontSize: 40
								}
							]
						}
					}}
				/>
				<Bar
					width={600}
					height={300}
					data={g5}
					options={{
						responsive: false,
						maintainAspectRatio: true
					}}
				/>
				<Bar
					width={600}
					height={300}
					data={g6}
					options={{
						responsive: false,
						maintainAspectRatio: true
					}}
				/>
				<div className="table">
					<div />
					<div>1</div>
					<div>2</div>
					<div>CHSS</div>
					<div>{file1Data && CHSS(file1Data).toFixed(2)}</div>
					<div>{file2Data && CHSS(file2Data).toFixed(2)}</div>
					<div>NN</div>
					<div>{file1Data && NN(file1Data).toFixed(2)}</div>
					<div>{file2Data && NN(file2Data).toFixed(2)}</div>
					<div>std</div>
					<div>{file1Data && std(file1Data).toFixed(2)}</div>
					<div>{file2Data && std(file2Data).toFixed(2)}</div>
					<div>mode</div>
					<div>{file1Data && mode(file1Data)[0]}</div>
					<div>{file2Data && mode(file2Data)[0]}</div>
					<div>Amod</div>
					<div>{file1Data && AMode(file1Data).toFixed(2)}</div>
					<div>{file2Data && AMode(file2Data).toFixed(2)}</div>
					<div>MxDMn</div>
					<div>{file1Data && diffMaxMin(file1Data).toFixed(2)}</div>
					<div>{file2Data && diffMaxMin(file2Data).toFixed(2)}</div>
					<div>IH</div>
					<div>{file1Data && IA(file1Data).toFixed(10)}</div>
					<div>{file2Data && IA(file2Data).toFixed(10)}</div>
				</div>
			</div>
		</div>
	);
}

export default App;
