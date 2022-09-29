import express from 'express';
import multer from 'multer';

import cors from 'cors';
import mongoose from 'mongoose';

import { CommentController } from './controllers/index.js';

//Подключаемся к нашей БД MongoDBs
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

//Создаем хранилище
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Говорим экспрессу использовать json
app.use(express.json());
//Отключаем cors-ы
app.use(cors());
//Если придёт запрос на /uploads, нужно дальше этот запрос отправлять в папку uploads (чтобы express понимал, что GET запрос на получение статичного файла)
app.use('/uploads', express.static('uploads'));

//РОУТЫ
//Загрузка файла на сервер
app.post('/upload', upload.single('photo'), CommentController.uploadFile);
//Удаление файла с сервера
app.post('/delete', CommentController.deleteFile);
//Создание комментария
app.post('/comments', CommentController.createComment);
//Получение всех комментариев
// app.get('/comments', CommentController.getAllComments);

app.get('/comments', (req, res) => {
  res.json({
    message: 'Удачно',
  });
});

//Запускаем наш сервер на порте 4444 и в случае ошибки запуск выводим информацию в консоль
app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
