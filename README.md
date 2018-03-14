# helper
## Класс Lang – работа с языковыми строками
### Замена частей в строках

Все места для замены обрамляются двойными фигурными скобками **{{name}}**. Например, вы можете задать сообщение приветствия с использованием замены для имени, для этого вам надо вызвать метод **trans(key[, replace])**, где:

**key** - ключ языковой строки.

**replace** – объект с значениями для  подстановки в языковую строку.

### Пример:

Языковая строка: 
> WELCOME=Welcome, {{name}}

Вызов метода: 
```js
Lang.trans("WELCOME", {name: "Игорь"});
```

Результат:
> Welcome, Игорь

Если языковая строка не найдена по ключу, то вместо языковой строки вернется сам ключ:
> [KEY]

### Множественное число

Формы множественного числа — проблема для многих языков, так как все они имеют разные сложные правила формирования множественного числа. Однако вы можете легко справиться с ней в ваших языковых файлах используя символ | для разделения форм единственного и множественного числа:

> APPLES=яблоко|яблока|яблок

Заполнять от меньшего к большему, с лева на право, так как в русском языке 3 формы слова, берем первые 3.

1 - ***яблоко***
2 - ***яблока***
3 - яблока 
4 - яблока
5 - ***яблок***
6 - яблок

В итоге у вас должно получится: 
> APPLES=яблоко|яблока|яблок

Для того чтобы языковая строка такого формата обрабатывалась вам надо вызвать метод transChoice **(key, number[, replace])**, где:

**key** - ключ языковой строки.

**number** – число относительно которого будет выбирается строка в языковой строке.

**replace** – объект с значениями для  подстановки в языковую строку.

### Пример 1:

Языковая строка: 
> APPLES=яблоко|яблока|яблок

Вызов метода: 
```js
Lang.transChoice("APPLES", 22);
```
Результат:
> яблока

### Пример 2:

Языковая строка: 
> APPLES=У Пети {{number}} яблоко| У Пети {{number}} яблока| У Пети {{number}} яблок

Вызов метода: 
```js
Lang.transChoice("APPLES", 21, {number: 21});
```
Результат:
> У Пети 21 яблоко


> ![Важно!](http://abali.ru/wp-content/uploads/2010/12/alert-32x32.png)
> Для того чтобы работала автоматическая плюрализация надо передать на вход в форму сессионный параметр LOCALE, если LOCALE не передан то в место языковой строки будет возвращается ключ этой языковой строки.
> Правила плюрализации для языков описаны в файле “Правила плюрализации.html”

Можно легко создать более точные правила, которые будут указывать языковые строки для нескольких числовых промежутков, в этом случае сессионный параметр LOCALE не требуется:
> APPLES={0,1,2} Это нисколько|{3-19} Это несколько|{20-} Это много

Если переданное число не соответствует не одному интервалу, то вернется ключ языковой строки:
> [KEY]

