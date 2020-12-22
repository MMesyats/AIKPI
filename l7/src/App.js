import React, { useEffect, useState, useMemo } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import file1 from './1.txt';
import file2 from './2.txt';
import file3 from './3.txt';
import file4 from './4.txt';

import './App.scss';

const readFile = async (c) => {
	const req = await fetch(c);
	const data = await req.text();
	return data.split(' ').filter((val) => !isNaN(+val) && val !== '' && val !== '\n' && +val !== 0).map((val) => +val);
};

const calcDerivative = (arr) => {
	const newArr = [ ...arr.slice(0, 2) ];
	for (let i = 3; i <= arr.length - 4; i++)
		newArr.push(
			1 / 60 * (arr[i + 3] - 9 * arr[i + 2] + 45 * arr[i + 1] - 45 * arr[i - 1] + 9 * arr[i - 2] - arr[i - 3])
		);
	newArr.push(...arr.slice(arr.length - 4));
	return newArr;
};

const norm = (arr) => {
	return arr.map((val, i, arr) => {
		return (val - Math.min(...arr)) / (Math.max(...arr) - Math.min(...arr));
	});
};

const calcDistance = (x1, x2, y1, y2) => Math.sqrt(Math.pow(x1 * x1 - x2 * x2, 2) + Math.pow(y1 * y1 - y2 * y2, 2));

const calcHausdorf = (v1, v2) => {
	return Math.max(
		...v1.map((c1) => {
			return Math.min(
				...v2.map((c2) => {
					return calcDistance(c1.x, c2.x, c1.y, c2.y);
				})
			);
		})
	);
};

function App() {
	const [ file1Data, setFile1Data ] = useState([]);
	const [ file2Data, setFile2Data ] = useState([]);
	const [ file3Data, setFile3Data ] = useState([]);
	const [ file4Data, setFile4Data ] = useState([]);

	useEffect(() => {
		(async () => {
			setFile1Data(await readFile(file1));
			setFile2Data(await readFile(file2));
			setFile3Data(await readFile(file3));
			setFile4Data(await readFile(file4));
		})();
	}, []);

	const t1 = useMemo(() => file1Data.map((_, i) => (i * 0.01).toFixed(2)), [ file1Data ]);
	const t2 = useMemo(() => file2Data.map((_, i) => (i * 0.01).toFixed(2)), [ file2Data ]);
	const t3 = useMemo(() => file3Data.map((_, i) => (i * 0.01).toFixed(2)), [ file3Data ]);
	const t4 = useMemo(() => file4Data.map((_, i) => (i * 0.01).toFixed(2)), [ file4Data ]);

	const g1 = useMemo(
		() => ({
			datasets: [
				{
					label: 'EKG',
					data: file1Data,
					fill: false,
					borderColor: 'blue'
				}
			],
			labels: t1
		}),
		[ t1, file1Data ]
	);
	const g2 = useMemo(
		() => ({
			datasets: [
				{
					label: 'EKG',
					data: file2Data,
					fill: false,
					borderColor: 'red'
				}
			],
			labels: t2
		}),
		[ file2Data, t2 ]
	);
	const g3 = useMemo(
		() => ({
			datasets: [
				{
					label: 'EKG',
					data: file3Data,
					fill: false,
					borderColor: 'green'
				}
			],
			labels: t3
		}),
		[ file3Data, t3 ]
	);
	const g4 = useMemo(
		() => ({
			datasets: [
				{
					label: 'EKG',
					data: file4Data,
					fill: false,
					borderColor: 'black'
				}
			],
			labels: t4
		}),
		[ file4Data, t4 ]
	);

	const derivative1 = useMemo(() => calcDerivative(file1Data), [ file1Data ]);
	const derivative2 = useMemo(() => calcDerivative(file2Data), [ file2Data ]);
	const derivative3 = useMemo(() => calcDerivative(file3Data), [ file3Data ]);
	const derivative4 = useMemo(() => calcDerivative(file4Data), [ file4Data ]);

	const normCoords1 = useMemo(
		() => {
			const norm1 = norm(file1Data);
			const normDer1 = norm(derivative1);
			return norm1.map((val, i) => ({ y: val, x: normDer1[i] }));
		},
		[ file1Data, derivative1 ]
	);
	const normCoords2 = useMemo(
		() => {
			const norm2 = norm(file2Data);
			const normDer2 = norm(derivative2);
			return norm2.map((val, i) => ({ y: val, x: normDer2[i] }));
		},
		[ file2Data, derivative2 ]
	);
	const normCoords3 = useMemo(
		() => {
			const norm3 = norm(file3Data);
			const normDer3 = norm(derivative3);
			return norm3.map((val, i) => ({ y: val, x: normDer3[i] }));
		},
		[ file3Data, derivative3 ]
	);
	const normCoords4 = useMemo(
		() => {
			const norm4 = norm(file4Data);
			const normDer4 = norm(derivative4);
			return norm4.map((val, i) => ({ y: val, x: normDer4[i] }));
		},
		[ file4Data, derivative4 ]
	);
	const hausdorMatrix = useMemo(
		() => {
			const coors = [ normCoords1, normCoords2, normCoords3, normCoords4 ];
			return coors.map((v1) => coors.map((v2) => calcHausdorf(v1, v2)));
		},
		[ normCoords1, normCoords2, normCoords3, normCoords4 ]
	);

	const faz = useMemo(
		() => {
			return {
				datasets: [
					{
						label: '1',
						data: normCoords1,
						borderColor: 'blue',
						borderWidth: 1,
						fill: false,
						showLine: true
					},
					{
						label: '2',
						data: normCoords2,
						borderColor: 'green',
						borderWidth: 1,
						fill: false,
						showLine: true
					},
					{
						label: '3',
						data: normCoords3,
						borderColor: 'red',
						borderWidth: 1,
						fill: false,
						showLine: true
					},
					{
						label: '4',
						data: normCoords4,
						borderColor: 'black',
						borderWidth: 1,
						fill: false,
						showLine: true
					}
				]
			};
		},
		[ normCoords1, normCoords2, normCoords3, normCoords4 ]
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
					width={600}
					height={300}
					data={g2}
					options={{
						responsive: false,

						maintainAspectRatio: true,
						elements: { point: { radius: 0 } },

						showLines: true
					}}
				/>
				<Line
					type="line"
					width={600}
					height={300}
					data={g3}
					options={{
						responsive: false,

						maintainAspectRatio: true,
						elements: { point: { radius: 0 } },

						showLines: true
					}}
				/>
				<Line
					type="line"
					width={600}
					height={300}
					data={g4}
					options={{
						responsive: false,

						maintainAspectRatio: true,
						elements: { point: { radius: 0 } },

						showLines: true
					}}
				/>
				<Scatter
					data={faz}
					width={600}
					height={600}
					options={{
						responsive: false,
						maintainAspectRatio: true,
						legend: false,
						tooltips: true,
						elements: { point: { radius: 0 } },
						scales: {
							xAxes: [
								{
									gridLines: {
										color: '#888',
										drawOnChartArea: true
									}
								}
							],
							yAxes: [
								{
									gridLines: {
										color: '#888',
										drawOnChartArea: true
									}
								}
							]
						}
					}}
				/>
				<div className="matrix">
					{hausdorMatrix && hausdorMatrix.map((arr) => arr.map((el) => <p>{el.toFixed(4)}</p>))}
				</div>
			</div>
		</div>
	);
}

export default App;
