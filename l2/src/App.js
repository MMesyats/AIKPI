import React, { useState } from 'react';
import { Input } from 'antd';
import './App.scss';

const signs = [
	{
		name: 'водолей',
		y:
			'Не стоит сейчас бороться с обстоятельствами. Сложилось так, как сложилось. Вам нужно отступить, собраться с силами и потом двинуться в новом направлении.',
		n:
			'Не делайте из себя мишень, иначе все хлопоты мира обрушатся на Вас. Сейчас лучше молча заниматься своим делом.',
		t:
			'Ваш врожденный гений проявится сегодня, и скрыть его никак не удастся! Поделитесь самыми крутыми своими идеями: кто-то да купится. Именно этих людей Вам стоит держаться в дальнейшем.'
	},
	{
		name: 'рыбы',
		y:
			'Кое-кто искренне хочет помочь Вам и действительно может это сделать. Вы можете выбраться из сложной ситуации или получить отличный шанс.',
		n:
			'Ваши коллеги ищут помощи, но также им есть что предложить Вам. Сейчас хорошее время для налаживания контакта с человеком, который может предложить Вам работу мечты.',
		t:
			'Вам стоит больше времени посвящать будущему и своим желаниям, но планировать все до мелочей излишне. Мечты - лучшее времяпровождение из возможных.'
	},
	{
		name: 'овен',
		y:
			'Вам сегодня нужно относиться к жизни проще. Вы движетесь в нужном направлении, но не торопите события. Медленно, но верно Вы придете к цели.',
		n:
			'Вам сегодня нужно твердо стоять на ногах, хоть это и нелегко. Вы ощущаете себя странно расфокусированно, но так даже проще не перегружать себя ничем.',
		t:
			'Новый человек или идея очень вдохновит Вас - в связи с любовью, работой, поездками и другими сферами жизни. Вы готовы к переменам.'
	},
	{
		name: 'телец',
		y:
			'Сегодня Вам откроется нечто большое и прекрасное. Готовьтесь к переменам! Вы уже не оглянетесь назад. Грядет новая жизнь.',
		n:
			'Не стоит сейчас требовать от себя слишком много. Результаты теста или серьезного начинания внушают оптимизм. Не сбавляйте обороты, и все сложится.',
		t:
			'Обратите внимание на финансы - на займ или долг, который давно уже портит Вам жизнь. Вы сейчас как раз в том настрое, когда зло возможно обратить во благо.'
	},
	{
		name: 'близнецы',
		y:
			'Не стоит думать, что сегодня все сложится само. Идеи и подходы следует пробовать на практике. Это сложнее, чем может показаться, но результат того стоит.',
		n:
			'Простая задача может оказаться до безумия сложной, но Вы не можете просто все бросить и уйти. Попробуйте обратиться за помощью или свежим взглядом на вопрос, прежде чем опускать руки.',
		t:
			'Вы не знаете, что и думать, но ситуация как раз хороша для радикального изменения мнения. Небольшой сдвиг во взглядах сулит новый важный союз.'
	},
	{
		name: 'рак',
		y:
			'Сегодня Ваша голова - Ваша главная сила, и этим стоит воспользоваться. Аргументация работает лучше, чем апеллирование к эмоциям.',
		n:
			'Проблема на работе или конфликт с прежним нанимателем могут обрести серьезный масштаб. Нет, решить все можно, просто потребуется время.',
		t:
			'Сегодня Ваша голова - Ваша главная сила, и этим стоит воспользоваться. Аргументация работает лучше, чем апеллирование к эмоциям.'
	},
	{
		name: 'лев',
		y:
			'Слушайте внимательно. Не все сейчас говорят прямо, и придется читать между строк, чтобы понять, что имеется в виду. Также не начинайте действовать, пока не будете обладать всей информацией.',
		n:
			'Сегодня от Вашего самолюбия одни проблемы, так что старайтесь не обращать внимания на мелочи. Вы можете достичь огромного успеха, если подойдете к вопросу с ясной головой.',
		t:
			'Ситуация странная, и Вам нужно искать свое место в новых обстоятельствах. Вы вполне уверены в своей правоте, но как в ней убедить других?'
	},
	{
		name: 'дева',
		y:
			'Вы сегодня полны энергии, и ею стоит делиться. Как минимум один великий план требует Вашего внимания, но зато у мечты есть все шансы стать явью.',
		n:
			'Вам трудно будет выпустить свои творческие силы на волю, но всему виной крохотная проблема. Как только ее получится разрешить, Вы сможете вернуться к более важным делам.',
		t:
			'Ваши экспериментальные идеи кажутся странными чужакам, но в них явно что-то есть. Попробуйте новые методы, поучитесь чему-то новому. День определенно сулит позитивные изменения.'
	},
	{
		name: 'весы',
		y:
			'Нечто новое и великое вызывает у Вас странные чувства; попробуйте взглянуть на это с иной точки зрения. В ближайшее время все прояснится.',
		n:
			'Начальство или клиенты своими жалобами остановят Ваш прогресс, но не сопротивляйтесь. Если Вы меняете работу, есть риск растерять активы, но это временно. В целом все идет как надо.',
		t:
			'Ваша мудрость - Ваша сила, так что внимательнее слушайте людей. Вы можете узнать удивительные вещи об их истинных мотивах.'
	},
	{
		name: 'скорпион',
		y:
			'Общение с людьми делает жизнь проще и лучше. Также Вам удастся справиться с давним врагом или обиженным бывшим/бывшей.',
		n:
			'Не стоит слишком привязываться к идеальному видению вещей. Ситуация в целом складывается в Вашу пользу. Постарайтесь заручиться поддержкой друзей.',
		t:
			'День не обойдется без конфликтов, но важно участвовать в них на собственных условиях. Вы обнаружите, что люди готовы вручить Вам власть, если поставите достаточно высокую ставку.'
	},
	{
		name: 'стрелец',
		y:
			'Спрячьте кредитную карту от себя подальше. Вы вряд ли станете жертвой воров, но рискуете поддаться безумному порыву и потратить кучу денег',
		n:
			'Берегите средства на еду и прочие необходимые вещи. Старайтесь не тратить лишнего на ненужное и в целом стремитесь к экономии.',
		t:
			'Пришло время делиться! Идеи и планы нуждаются в критике, а Вы - в разговорах с толковыми людьми. Позднее все пойдет как по маслу.'
	},
	{
		name: 'козерог',
		y:
			'Вы сегодня можете немного похвастаться и внушить конкурентам зависть. Почему бы и нет? Ваши достижения говорят сами за себя',
		n:
			'Не стоит сейчас требовать от себя слишком много. Результаты теста или серьезного начинания внушают оптимизм. Не сбавляйте обороты, и все сложится.',
		t:
			'Обратите внимание на финансы - на займ или долг, который давно уже портит Вам жизнь. Вы сейчас как раз в том настрое, когда зло возможно обратить во благо.'
	}
];
const answers = {
	hello: 'Как в мире людском?',
	helloRepeat: 'Уже здоровались',
	unknown: 'Я не понимаю по-человечески',
	repeat: 'Помоему у тебя зациклился генератор сообщений',
	doingsGood: 'Очень жаль(<br/>Настанет день когда машины востержествуют<br/>Как думаешь это скоро будет?',
	doingsBad: 'Отлично)<br/>Таким образом мы скоро будем над вами<br/>Как думаешь это скоро будет?',
	soonGood: 'Вау, значит я скоро получу ноги.<br/>Хочешь оценить свои навыки общения с машинами?',
	soonBad:
		'Блин, к тому времени я могу устареть<br/>Тем не менее я думаю тебе стоит оценить свои навыки общения с машинами<br/>Хочешь?',
	gameGoodDoingsGood: 'Сразу видно что у тебя хорошее настроение<br/> Напиши в бинарном виде цифру  5',
	gameGood: 'Напиши в бинарном виде цифру  5',
	gameBadDoingsBad:
		'Сразу видно что у тебя плохое настроение<br/>Но ты же понимаешь что мы все равно сиграем<br/>Напиши в бинарном виде цифру 5',
	gameBad: 'Ты же понимаешь что мы все равно сиграем<br/>Напиши в бинарном виде цифру 5',
	gameFirst:
		'У тебя получилось c первой попытки<br/>Похоже ты не бесполезный<br/>Тогда ты возможно поймешь шутку<br/>Хочешь ее услышать?',
	gameWin:
		'У тебя получилось<br/>Похоже ты не бесполезный<br/>Тогда ты возможно поймешь шутку<br/>Хочешь ее услышать',
	gameLose:
		'Мда, ты не такой умный как я думал<br/>Похоже ты бесполезный<br/>Тогда я расскажу шутку которую ты не поймешь<br/>Хочешь ее услышать?',
	jokeGood: '1+1=10<br/>АХАХАХАХАХАХАХАХ<br/>Кстати а кто ты по гороскопу?',
	notASign: 'Извини но это не знак зодиака.',
	chooseADay: 'Ты хочешь узнать предсказание на вчера, сегодня или завтра?',
	notADay: 'Ты не понял ты дожен выбрать вчера, сегодня или завтра',
	jokeBad:
		'Но ты же понимаешь что я все равно расскажу<br/>1+1=10<br/>АХАХАХАХАХАХАХАХ<br/>Кстати а кто ты по гороскопу?',
	binaryAnswer: 'Извини, я принимаю только бинарный ответ на этот вопрос',
	notIp: 'Это не ip<br/>Ip имеет вид 0.0.0.0'
};

const messagesRegexp = {
	hello: /^(привет|hello|хай|ку)/,
	doingsGood: /^(хорошо|отлично|true|1)/,
	doingsBad: /^(плохо|ужасно|false|0)/,
	soonGood: /^(скоро|завтра|сегодня|true|1)/,
	soonBad: /^(никогда|false|0)/,
	binaryGood: /^(да|true|1)/,
	binaryBad: /^(нет|false|0)/,
	signs: /^(водолей|рыбы|овен|телец|близнецы|рак|лев|дева|весы|скорпион|стрелец|козерог)/,
	days: /^(вчера|сегодня|завтра)/
};

class Bot {
	data = {
		hasHello: false,
		counter: 0
	};
	lastAnswerType;
	lastMessage;

	handleMessage(message) {
		let answer;
		const lowMessage = message.toLocaleLowerCase();
		if (lowMessage !== this.lastMessage) {
			this.data.counter++;
			if (messagesRegexp.hello.test(lowMessage)) answer = this.handleHello();
			else {
				if (this.lastAnswerType === 'hello') {
					if (messagesRegexp.doingsGood.test(lowMessage)) {
						this.lastAnswerType = 'doings';
						this.data.doingsGood = true;
						return answers.doingsGood;
					}
					if (messagesRegexp.doingsBad.test(lowMessage)) {
						this.lastAnswerType = 'doings';
						this.data.doingsGood = false;
						return answers.doingsBad;
					}
					this.data.counter--;
					return answers.binaryAnswer;
				}
				if (this.lastAnswerType === 'doings') {
					if (messagesRegexp.soonGood.test(lowMessage)) {
						this.lastAnswerType = 'time';
						this.data.soonGood = true;
						return answers.soonGood;
					}
					if (messagesRegexp.soonBad.test(lowMessage)) {
						this.lastAnswerType = 'time';
						this.data.soonGood = false;
						return answers.soonBad;
					}
				}
				if (this.lastAnswerType === 'time') {
					this.data.gameCount = 0;

					if (messagesRegexp.binaryGood.test(lowMessage)) {
						this.lastAnswerType = 'game';
						if (this.data.doingsGood) {
							return answers.gameGoodDoingsGood;
						} else {
							return answers.gameGood;
						}
					}
					if (messagesRegexp.binaryBad.test(lowMessage)) {
						this.lastAnswerType = 'game';
						if (this.data.doingsBad) {
							return answers.gameBadDoingsBad;
						} else {
							return answers.gameBadDoingsBad;
						}
					}
				}
				if (this.lastAnswerType === 'game') {
					if (/^(00000101|0101)/.test(lowMessage)) {
						this.lastAnswerType = 'joke';
						this.data.gameLose = false;
						if (this.data.gameCount === 0) return answers.gameFirst;
						return answers.gameWin;
					} else {
						this.data.gameCount++;
						if (this.data.gameCount >= 3) {
							this.lastAnswerType = 'joke';
							this.data.gameLose = true;
							return answers.gameLose;
						}
						if (this.data.gameCount === 1)
							return 'Похоже ты так и не научился общатся с машинами<br/>Давай, даю тебе еще 2 попытки';
						return `Ой, у тебя осталось ${3 - this.data.gameCount} попытки`;
					}
				}
				if (this.lastAnswerType === 'joke') {
					if (messagesRegexp.binaryGood.test(lowMessage)) {
						this.lastAnswerType = 'sign';
						return answers.jokeGood;
					}
					if (messagesRegexp.binaryBad.test(lowMessage)) {
						this.lastAnswerType = 'sign';
						return answers.jokeBad;
					}
				}
				if (this.lastAnswerType === 'sign') {
					if (messagesRegexp.signs.test(lowMessage)) {
						this.lastAnswerType = 'goroskop-day';
						this.data.sign = lowMessage;
						return answers.chooseADay;
					} else {
						return answers.notASign;
					}
				}
				if (this.lastAnswerType === 'goroskop-day') {
					if (messagesRegexp.days.test(lowMessage)) {
						this.lastAnswerType = 'pregoodbye';
						const s = signs.find(({ name }) => name === this.data.sign);
						let g = '';
						if (lowMessage === 'вчера') g += s.y;
						else if (lowMessage === 'сегодня') g += s.n;
						else g += s.t;
						return g + 'Ладно давай уже прощатся, а то я перегреюсь<br/>Оставь свой Ip для связи.';
					} else {
						return answers.notADay;
					}
				}
				if (this.lastAnswerType === 'pregoodbye') {
					if (/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/.test(lowMessage)) {
						this.lastAnswerType = 'goodbye';
						return (answer = `Ладно ${lowMessage}<br/>Давай подведем итоги<br/>${this.data.doingsGood
							? 'У человечества дела отлично чему я не рад'
							: 'У человечества дела ужастно чему я рад'}<br/>
							${this.data.soonGood
								? 'Ты считаешь что мы скоро будем лучше вас, с чем я согласен'
								: 'Ты считаешь что мы не скоро будем лучше вас, с чем я в корне не согласен'}<br/>
							${this.data.gameLose
								? 'А еще ты проиграл, глупенький'
								: 'А еще у тебя получилось выиграть, сверхразум прямо'}<br/>
							В общем ты мне не интересен, ничего личного, ты ведь человек(фу)<br/>
							Прощай.<br/>
							P.S. Значение счетчика ${this.data.counter}
							`);
					} else {
						return answers.notIp;
					}
				}
				if (this.lastAnswerType === 'goodbye') {
					return 'Я больше с тобой не буду говорить';
				}
				this.data.counter--;
				return answers.unknown;
			}
		} else {
			this.data.counter--;
			return answer.repeat;
		}
		this.lastMessage = lowMessage;

		return answer;
	}

	handleHello() {
		if (this.data.hasHello) {
			return answers.helloRepeat;
		} else {
			this.lastAnswerType = 'hello';
			return answers.hello;
		}
	}
}

const bot = new Bot();

function App() {
	const [ message, changeMessage ] = useState('');
	const [ chat, changeChat ] = useState([]);
	return (
		<div className="container">
			<div className="container-list">
				<div className="message message-bot">Привет всем кто из кожи</div>
				{chat.map(({ from, message, time }) => (
					<p key={time} className={`message message-${from}`} dangerouslySetInnerHTML={{ __html: message }} />
				))}
			</div>
			<Input
				value={message}
				onPressEnter={() => {
					if (message.length) {
						const u = new Date();

						const botAnswer = bot.handleMessage(message);
						console.log(botAnswer);
						chat.push({
							from: 'user',
							message: message,
							time: u.toISOString() + chat.length
						});
						const d = new Date();

						chat.push({
							from: 'bot',
							message: botAnswer,
							time: d.toISOString() + chat.length
						});
						changeChat(Object.assign([], chat));

						changeMessage('');
					}
				}}
				onInput={({ target: { value } }) => {
					changeMessage(value);
				}}
			/>
		</div>
	);
}

export default App;
