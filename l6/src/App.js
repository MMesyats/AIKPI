import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { InputNumber, Radio } from 'antd';
import { Line } from 'react-chartjs-2';
import * as tf from '@tensorflow/tfjs';
import differential from 'differential';
import './App.scss';
import content from './ЕКГ_КП6_1.txt';
import content2 from './ЕКГ_КП6_2.txt';

/* def show_graphics(a,ecg1,ecg2,t1,t2,TAU):
    new_ecg1 = ecg1[0:len(ecg1)-TAU]
    new_ecg2 = ecg1[TAU:len(ecg1)]
    new_ecg3 = ecg2[0:len(ecg2)-TAU]
    new_ecg4 = ecg2[TAU:len(ecg2)]
    new_ecg5 = np.gradient(ecg1,t1)
    new_ecg6 = np.gradient(ecg2,t2)
    if(a == 1):
        plt.figure(1,figsize=(16,2))
        plt.plot(t1,ecg1,'r'), plt.grid
        plt.xlabel('t')
        plt.ylabel('z(t)')
        plt.title('ECG №1')
        plt.figure(2,figsize=(16,2))
        plt.plot(new_ecg1,new_ecg2,'r'), plt.grid
        plt.xlabel('z(t-TAU)')
        plt.ylabel('z(t)')
        plt.title('FP №1')
        plt.figure(3,figsize=(16,2))
        plt.xlabel('dz/dt')
        plt.ylabel('z(t)')
        plt.plot(new_ecg5,ecg1,'r'), plt.grid
        plt.title('FP №2')
    else:
        plt.figure(1,figsize=(16,2))
        plt.plot(t2,ecg2,'b'), plt.grid
        plt.xlabel('t')
        plt.ylabel('z(t)')
        plt.title('ECG №2')
        plt.figure(2,figsize=(16,2))
        plt.plot(new_ecg3,new_ecg4,'b'), plt.grid
        plt.xlabel('z(t-tau)')
        plt.ylabel('z(t)')
        plt.title('FP №1')
        plt.figure(3,figsize=(16,2))
        plt.plot(new_ecg6,ecg2,'b'), plt.grid
        plt.xlabel('dz/dt')
        plt.ylabel('z(t)')
        plt.title('FP №2')

    plt.show() */

const readFile = async (c) => {
	const req = await fetch(c);
	const data = await req.text();
	return data.split(' ').filter((val) => !isNaN(+val) && val !== '' && val !== '\n' && +val !== 0).map((val) => +val);
};

function App() {
	const [ a, setA ] = useState(1);
	const [ TAU, setTAU ] = useState(1);
	const [ file1, setFile1 ] = useState([]);
	const [ file2, setFile2 ] = useState([]);

	useEffect(async () => {
		setFile1(await readFile(content));
		setFile2(await readFile(content2));
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
			const a = differential(file1, t1);
			window.a = a;
		},
		[ t1, t2, file1, file2, a ]
	);

	return (
		<div className="App">
			<div className="controls">
				<label>File</label>
				<InputNumber value={a} min={1} max={2} onChange={setA} />
				<label>TAU</label>
				<InputNumber value={TAU} min={1} onChange={setTAU} />
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
				<Line
					type="line"
					data={g1}
					options={{
						elements: { point: { radius: 0 } },

						showLines: true
					}}
				/>
				<Line
					type="line"
					data={g1}
					options={{
						elements: { point: { radius: 0 } },

						showLines: true
					}}
				/>
			</div>
		</div>
	);
}

export default App;
