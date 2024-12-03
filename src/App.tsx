import { useState } from 'react';
import './App.css'; // Подключим стили отдельно
import { FiCopy } from 'react-icons/fi';  // Импортируем иконку


const examples: string[]  = [
  "Идет зайчик по лесу, увидел белочку и влюбился.\n- Белочка, давай сойдемся?\n- Ну, давай.\nЖивут они счастливо, а вот детей у них никак не получается сделать.\nЗайчик говорит:\n- Это, наверное, потому что я зайчик, а ты белочка.\n- Наверное.\n- Пойдем у филина совета спросим, он мудрый.\nПришли к филину. Зайчик говорит:\n- Филин, вот живем мы вместе, любим друг друга, а вот детей нет. Это, наверное, потому что я зайчик, она белочка.\n- У вас тире короткое.\n- Так и у вас.",
  "Живу вместе с парнем. С его родителями незнакома. На днях было отличное настроение. Придя домой, с порога ору:\n- Красавчик, готовь свой член, тебя ждёт незабываемый минет! У меня сегодня шикарное настроение!\nНо кто же, блин, знал, что его родители в это время сидели на кухне? Парень весь покраснел, у мамы глаза на лоб, а папа спокойно сказал:\n- У Вас тире короткое",
  "Стоят панк с бабкой на остановке и бабка спрашивает:\n- Куда двоечка едет, милок?\n- Тебе в бороду, бабуль.\nОстановку озарила вспышка в бороде у бабки была противопехотная мина.",
  "Наташа на балу тихонько шепчет Ржевскому:\n- Знаете, поручик, папенька уехал в деревню, и я сегодня ночью буду дома совсем одна...\n- Хорошо, наверное, быть дома ночью одной.\n- А спать я буду в такой большой мягкой постели...\n- Хорошо, наверное, спать в большой мягкой постели...\nНаташа, краснея:\n- Знаете, я буду спать совершенно голая...\n- Хорошо, наверное, спать совершенно голой...\nНаташа, не выдерживая, громким шепотом:\n- Ржевский, приходите сегодня ко мне ебаться!\nРжевский (загадочно):\n- Не)"
];


const textTransform = (text: string) => {
  return text.replace(/^-/gm, '—')
}

const App: React.FC = () => {
  const randomExample = examples[Math.floor(Math.random() * examples.length)]; // Выбор случайного анекдота
  const [inputText, setInputText] = useState<string>('');
  const [resultText, setResultText] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    setResultText(textTransform(text)); // Замена тире в начале строки на длинное тире
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultText).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);  // Скрыть всплывашку через 2 секунды
    }).catch((err) => console.error('Ошибка копирования:', err));
  };


  return (
    <div className="container">
      <h1 className="header">У вас тире короткое</h1>
      <textarea
        className="input"
        value={inputText}
        onChange={handleInputChange}
        placeholder={randomExample}
      />
      <div className="output">{resultText || <div className="placeholder-result">{textTransform(randomExample)}</div>}</div>
      <button onClick={copyToClipboard} disabled={!resultText}>
        <FiCopy size={20} />
      </button>
      {showToast && <div className="toast">Текст скопирован!</div>} 

    </div>
  );
}

export default App