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
			</div>
		</div>
	);
}

export default App;
