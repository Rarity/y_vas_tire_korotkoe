import { useState } from 'react';
import './App.css'; // Подключим стили отдельно
import { FiCopy } from 'react-icons/fi';  // Импортируем иконку


const examples: string[]  = [
  "- Тебя когда-нибудь будили минетом?\n- Да.\n- И как ты отреагировал?\n- А говорить я не мог.",
  "- Что такое парадокс?\n- Когда отец сына обыграл на компьютере в \"Танчики\".",
  "- Папа, а что такое алкоголь?\n- Это для взрослых детей, чтобы вести себя как дети.",
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
      <h1>Конвертер анекдотов</h1>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder={randomExample} // Устанавливаем placeholder из случайного анекдота
      />
      <div className="output">{resultText || <div className="placeholder-result">{textTransform(randomExample)}</div>}</div>
      <button onClick={copyToClipboard} disabled={!resultText}>Копировать в буфер</button>
      {showToast && <div className="toast">Текст скопирован!</div>} 

    </div>
  );
}

export default App