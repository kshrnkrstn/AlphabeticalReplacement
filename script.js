const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
let cipherKey = [];

//генерируем ключ шифрования
function generateKey() {
    cipherKey = [...alphabet].sort(() => Math.random() - 0.5);  //перемешивание алфавита
    alert('Сгенерированный ключ: ' + cipherKey.join(''));
}

//шифровка
function encrypt() {
    const inputText = document.getElementById('inputText').value.toUpperCase();
    if (!cipherKey.length) {
        alert("Сначала сгенерируйте ключ!");
        return;
    }
    const encryptedText = inputText.split('').map(char => {
        const index = alphabet.indexOf(char);
        return index !== -1 ? cipherKey[index] : char;  //исключаем изменение чего-либо кроме алфавитных букв
    }).join('');
    document.getElementById('resultText').innerText = 'Зашифрованный текст: ' + encryptedText;
}

//дешифровка
function decrypt() {
    const inputText = document.getElementById('inputText').value.toUpperCase();
    if (!cipherKey.length) {
        alert("Сначала сгенерируйте ключ!");
        return;
    }
    const decryptedText = inputText.split('').map(char => {
        const index = cipherKey.indexOf(char);
        return index !== -1 ? alphabet[index] : char;
    }).join('');
    document.getElementById('resultText').innerText = 'Дешифрованный текст: ' + decryptedText;
}




//режим хацкера --------------------------------------------------------------------------------------
function crack() {
    const inputText = document.getElementById('inputText').value.toUpperCase();
    const frequencyMap = analyzeFrequency(inputText);
    const guessedKey = guessKey(frequencyMap);

    const crackedText = inputText.split('').map(char => {
        const index = guessedKey.indexOf(char);
        return index !== -1 ? alphabet[index] : char;
    }).join('');
    document.getElementById('resultText').innerText = 'Взломанный текст: ' + crackedText;
}

//количество используемых в тексте букв
function analyzeFrequency(text) {
    const frequency = {};
    text.split('').forEach(char => {
        if (alphabet.includes(char)) {
            frequency[char] = (frequency[char] || 0) + 1;
        }
    });
    return Object.entries(frequency).sort((a, b) => b[1] - a[1]);  //сортируем по частоте встречаемости
}

//создание ключа дешифровки 
function guessKey(frequencyMap) {
    const commonLetters = ['О', 'Е', 'А', 'И', 'Н', 'Т', 'С', 'Р', 'В', 'Л']; //самые распространенные буквы в русском яхыке
    const guessedKey = [...cipherKey];
    
    frequencyMap.forEach(([letter, _], index) => {
        if (index < commonLetters.length) {
            const originalIndex = alphabet.indexOf(commonLetters[index]);
            guessedKey[originalIndex] = letter;
        }
    });

    return guessedKey;
}