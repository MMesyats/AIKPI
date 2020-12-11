import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { InputNumber, Radio } from 'antd';
import { Line, Scatter } from 'react-chartjs-2';
import './App.scss';
import content from './ЕКГ_КП6_1.txt';
import content2 from './ЕКГ_КП6_2.txt';
import gradContent from './grad1.txt';
import gradContent2 from './grad2.txt';

const readFile = async (c) => {
	const req = await fetch(c);
	const data = await req.text();
	return data.split(' ').filter((val) => !isNaN(+val) && val !== '' && val !== '\n' && +val !== 0).map((val) => +val);
};

const readGrad = async (c) => {
	const req = await fetch(c);
	const data = await req.text();
	return data.split(',');
};

function App() {
	const [ a, setA ] = useState(1);
	const [ TAU, setTAU ] = useState(5);
	const [ file1, setFile1 ] = useState([]);
	const [ file2, setFile2 ] = useState([]);
	const [ grad1, setGrad1 ] = useState([]);
	const [ grad2, setGrad2 ] = useState([]);

	useEffect(async () => {
		setFile1(await readFile(content));
		setFile2(await readFile(content2));
		setGrad1(await readGrad(gradContent));
		setGrad2(await readGrad(gradContent2));
	}, []);

	const t1 = useMemo(
		() => {
			return file1.map((_, i) => 0.01 + i * 0.05);
		},
		[ file1 ]
	);
	const t2 = useMemo(() => file2.map((_, i) => 0.01 + i * 0.05), [ file2 ]);
	const g1 = useMemo(
		() => {
			if (a === 1)
				return {
					datasets: [
						{
							label: 'EKG',
							data: file1,
							fill: false,
							borderColor: 'blue'
						}
					],
					labels: t1
				};
			else
				return {
					datasets: [
						{
							label: 'EKG',
							data: file2,
							fill: false,
							borderColor: 'blue'
						}
					],
					labels: t2
				};
		},
		[ t1, t2, file1, file2, a ]
	);
	const g2 = useMemo(
		() => {
			if (a == 1)
				return {
					datasets: [
						{
							label: 'EKG',
							data: file1.map((val, i) => ({ x: val, y: grad1[i] })),
							borderColor: 'blue',
							borderWidth: 3,
							fill: false,
							showLine: true
						}
					]
				};
			else
				return {
					datasets: [
						{
							label: 'EKG',
							data: file2.map((val, i) => ({ x: val, y: grad2[i] })),
							fill: false,
							borderColor: 'blue',
							borderWidth: 3,
							showLine: true
						}
					]
				};
		},
		[ grad1, grad2, file1, file2, a ]
	);

	const g3 = useMemo(
		() => {
			const x = a == 1 ? file1.slice(0, file1.length - TAU) : file2.slice(0, file2.length - TAU);
			const y = a == 1 ? file1.slice(TAU) : file2.slice(TAU);
			return {
				datasets: [
					{
						label: 'EKG',
						data: x.map((val, i) => ({ x: val, y: y[i] })),
						borderColor: 'blue',
						borderWidth: 3,
						fill: false,
						showLine: true
					}
				]
			};
		},
		[ file1, file2, TAU, a ]
	);

	return (
		<div className="App">
			<div className="controls">
				<label>File</label>
				<InputNumber value={a} min={1} max={2} onChange={setA} />
				<label>TAU</label>
				<InputNumber value={TAU} min={1} max={a == 1 ? file1.length - 1 : file2.length - 1} onChange={setTAU} />
			</div>
			<div className="graphics">
				<Line
					type="line"
					data={g1}
					options={{
						elements: { point: { radius: 0 } },

						showLines: true
					}}
				/>
				<Scatter
					data={g2}
					options={{
						legend: false,
						tooltips: false,
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
				<Scatter
					data={g3}
					options={{
						legend: false,
						tooltips: false,
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
			</div>
		</div>
	);
}

export default App;
