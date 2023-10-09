//npm init - инициализация проекта
//npm install(uninstall) react
//node app.js - запуск кода в терминале

const { writeFileSync } = require("fs");

/*node.js   Плюсы:
            - простота в начале
            - скорость работы приложений
            - фронт и бэк пишутся на js
            - богатый разнообразный менеджер пакетов npm
            - быстрое прототипирование

            Концепции:
            - преобразование js в машинный код
            - используется движок V8 (написан на C++, занимается сборкой мусора)
            - Libuv (кроссплатформенность I/P, цикл событий (event loop), работа с сетью и файловой системой)

            Event loop:
            - команды в ЯПах являются блокирующими, то есть не параллельными (при запросе ввода, программа встает)
            - это работа с thread-ами и ассинхроностью
            - (+) максимальная скорость обработки ввода/вывода
            - (-) много ассинхронного кода
            - (-) медленное выполнение сложных математических функций

            Потоки:
            - требует много ресурсов
            - сложность управления потоками (взаимная блокировка)
            - библиотеки могут быть многопоточными

            Планировщик потоков:
            - выделяет памть и процессорное время
            - выделяет пул потоков одновременно 4 потоков
            - только затем начинает выполняться 5 поток
            ___________________________________________

            Структура (шаблон Reactor):
            - Приложение -> ДС (приложение создает новую операцию, это не приводит к блокировке приложения)
            - Демультиплексор событий -> (После I/O демультиплексор добавляет новые события в очередь)
            - Очередь событий -> (обход элементов событий)
            - Event loop -> (вызывается соответствующий обработчик события) 
            -> (1. Возвращается управление к циклу событий это приводит к добавлению операций сразу в демультиплексор, 2. Но в это время могут запрашиваться новые операции) 
            -> (И снова управление передается в демультиплексор)
*/

// const dotenv = require('dotenv')
// dotenv.config()
// console.log(process.env.PORT)
// console.log(process.argv)

//Условное завершение процесса
// if (Math.random() > 0.5){
//     while (true){
//     }
// } else {
//     console.log('Exit')
//     process.exit();
// }

// const path = require('path')
// console.log(path.join('first', 'second', 'thierd')) //В разных ОС по разному указывается слэш. Эта функция кроссплатформенна
// console.log('Путь', path.join(__dirname, '..')) //Как и в cmd '..' - возврат на папку выше, __dirname - текущая директория процесса
// console.log('Абсолютный путь', path.resolve('first', 'second')) //resolve использует абсолютный путь процесса (выполняемой программы) и добавляет к нему указанные директории, лучше не использовать
// const fullPath = path.resolve(__dirname, 'app.js')
// console.log('Парсинг строки', path.parse(fullPath))
// console.log(path.extname(fullPath)) //Расширение
// console.log(path.basename(fullPath)) //Название файла с расширением

//------------------------ URL
// const siteURL = 'http://localhost:8000/users?id=5123'
// const url = new URL(siteURL)
// console.log(url)

//------------------------- FS

// const { isUtf8 } = require("buffer");
// const { error } = require("console");
// const fs = require("fs");
// const path = require("path");

//fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2'), {recursive: true}) //{recursive: true} - позволяет вызвать функцию рекурсивно, передавая аргументы поочередно
// fs.mkdir(path.resolve(__dirname, 'dir', 'dir2'), (error)=>{ //Выполнение в ассинхронном режиме => независит от номера инструкции
//     if (error){
//         console.log(error)
//         return;
//     }
//     console.log('Папка создана')
// })

// fs.rmdir(path.join(__dirname, 'dir'), (error)=>{
//     if (error){
//         throw error;
//     }
// })

//Ассинхронная функция перезаписывания файла (пример с АДом колбэков, так как код становится нечитаемым из-за вложенности)
// fs.writeFile(path.resolve(__dirname, "text.txt"), "string1", (error) => {
//   if (error) {
//     throw error;
//   }
//   console.log("Файл записан");
//   fs.appendFile(path.resolve(__dirname, "text.txt"), "\nstring2", (error) => {
//     if (error) {
//       throw error;
//     }
//     console.log("Файл дозаписан");
//     fs.appendFile(path.resolve(__dirname, "text.txt"), "\nstring3", (error) => {
//       if (error) {
//         throw error;
//       }
//       console.log("Файл дозаписан снова");
//     });
//   });
// });

//Ассинхронная самописная функция записывания файла
// const writeFileAsync = async (path, data) => {
//   return new Promise((resolve, reject) =>
//     fs.writeFile(path, data, (error) => {
//       if (error) {
//         return reject(error.message);
//       }
//       resolve();
//     })
//   );
// };

//Ассинхронная самописная функция перезаписывания файла
// const appendFileAsync = async (path, data) => {
//   return new Promise((resolve, reject) =>
//     fs.appendFile(path, data, (error) => {
//       if (error) {
//         return reject(error.message);
//       }
//       resolve();
//     })
//   );
// };

//Ассинхронная самописная функция записывания файла с вложенными функциями
// writeFileAsync(path.resolve(__dirname, "text.txt"), "myString")
//   .then(() =>
//     appendFileAsync(path.resolve(__dirname, "text.txt"), "\nmyString1")
//   )
//   .then(() =>
//     appendFileAsync(path.resolve(__dirname, "text.txt"), "\nmyString2")
//   )
//   .then(() =>
//     appendFileAsync(path.resolve(__dirname, "text.txt"), "\nmyString3")
//   )
//   .then(() =>
//     appendFileAsync(path.resolve(__dirname, "text.txt"), "\nmyString4")
//   )
//   .catch((error) => console.log(error));

// const readFileAsync = async (path) => {
//   return new Promise((resolve, reject) =>
//     fs.readFile(path, { encoding: "utf-8" }, (error, data) => {
//       if (error) {
//         return reject(error.message);
//       }
//       resolve(data);
//     })
//   );
// };

//Ассинхронная самописная функция записывания файла с вложенными функциями
// writeFileAsync(path.resolve(__dirname, "text.txt"), "myString")
//   .then(() =>
//     appendFileAsync(path.resolve(__dirname, "text.txt"), "\nmyString1")
//   )
//   .then(() =>
//     appendFileAsync(path.resolve(__dirname, "text.txt"), "\nmyString2")
//   )
//   .then(() => readFileAsync(path.resolve(__dirname, "text.txt")))
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

//Ассинхронная самописная функция удаления файла
// const removewFileAsync = async (path) => {
//   return new Promise((resolve, reject) =>
//     fs.rm(path, (error) => {
//       if (error) {
//       }
//       console.log("Файл удален");
//       resolve()
//     })
//   );
// };

//removewFileAsync(path.resolve(__dirname, 'text.txt'))

//-----------------------------------------Practice OS Process
// const text = process.env.TEXT || '';
// writeFileAsync(path.resolve(__dirname, 'text.txt'), text)
// .then(() => readFileAsync(path.resolve(__dirname, 'text.txt')))
// .then(data => data.split(' ').length)
// .then(count => writeFileAsync(path.resolve(__dirname, 'count.txt'), "Колво слов: " + count))
// .then(()=> removewFileAsync(path.resolve(__dirname, 'text.txt')))

// const os = require("os");
// const cluster = require("cluster");
// const { setInterval } = require("timers/promises");

// console.log(os.platform())
// console.log(os.arch())
// console.log(os.cpus().length)

// if (cluster.isMaster) {
//   for (let i = 0; i < os.cpus().length - 2; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code, flag) =>{
//     console.log(`Воркер ${worker.pid} умер`)
//     if (code === 0){
//       cluster.fork();
//     }else{
//       console.log('Ну умер и умер');
//     }
//   })
// } else {
//   console.log(`Воркер ${process.pid} запущен, как твоя пещера`);

//   setInterval(() => {
//     console.log(`Воркер ${process.pid} еще запущен`);
//   }, 5000);
// }

//-----------------------------------------Practice Event Подписка на события
// const Emitter = require("events");
// const emitter = new Emitter();

//Многоразовое событие
// emitter.on("message", (data, second, error) => {
//   console.log("Сообщение " + data);
//   console.log("Автор " + second);
// });

// const callback = (data, second, error) => {
//   console.log("Сообщение " + data);
//   console.log("Автор " + second);
// }

//Одноразовое событие (вызовется только единожды, далее при попытке вызвать его, ничего не получится)
// emitter.once("messageOnce", callback);

// const message = process.env.MESSAGE || '';

// emitter.emit("messageOnce", message, 123);
// emitter.emit("messageOnce", message, 123);
// emitter.emit("messageOnce", message, 123);
// emitter.emit("message", 'gangnam style', 'loop');
// emitter.emit("message", 'gangnam style', 'loop');
// emitter.emit("message", 'gangnam style', 'loop');

// emitter.removeAllListeners(); //Удаление всех событий
// emitter.emit("message", 'gangnam style', 'lo1op'); //Уже не вызовется
// emitter.removeListener("messageOnce", callback) //Удаление конкретного события

//-----------------------------------------Practice Стримы !== Потоки
//Readable - чтение
//Wrilable - запись
//Duplex - для чтения и записи Readable + Writable
//Transform - Такой же как Doplex, только изменяет данные по мере чтения

const fs = require('fs')
const path = require('path')

// fs.readFile(path.resolve(__dirname, 'text.txt'), (error, data)=>{
// if (error){
//   throw error;
// }
// console.log(data)
// })

const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), {encoding: 'utf-8'})

// stream.on('data', (chunk)=>{ //Чанк в таком стриме 64 Кбайта
// console.log(chunk)
// })

// stream.on('end', ()=>{
//   console.log('Закончил считывать')
// })

// stream.on('open', ()=>{
//   console.log('Открыл файл')
// })
// stream.on('error', ()=>{
//   console.log('Ошибка чтения файла')
// })

// const writebleStream = fs.createWriteStream(path.resolve(__dirname, 'text1.txt'))
// for (let i = 0; i < 20; i++){
//   writebleStream.write(i+'\n');
// }

// writebleStream.end();
// writebleStream.close();
// writebleStream.destroy();

// const http = require('http')

// http.createServer((req, res), ()=>{
//   //res - readable stream
//   //req - writable stream
//   const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'))
  
//   //Сетевое подключение гораздо медленне чтения файла, поэтому
//   stream.pipe(res)
//   stream.on('data', ()=>{
//     res.write(chunk)
//   })
//   stream.on('end', ()=>{
//     res.end()
//   })
// })

const http = require('http')
const PORT = process.env.PORT || 5000;
const server = http.createServer((req, res) =>{
  // res.writeHead(200, {
  //   'Content-type': 'text/html;'
  // })
  // res.end('<h1>Hello World!</h1><button>\nbutton</button>')
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  if (req.url === '/users'){
    res.end(JSON.stringify(
      {id: 1, name: 'User'}
    ))
  }
  if (req.url === '/post'){
    res.end(JSON.stringify(
      {id: 2, name: 'Post'}
    ))
  }
})

server.listen(PORT, ()=>{
  console.log(`Сервер стартовал на порту ${PORT}`)
})
