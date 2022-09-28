import CommentModel from '../models/Comment.js';
import fs from 'fs';

//Создание отзыва
export const createComment = async (req, res) => {
  try {
    const doc = new CommentModel({
      name: req.body.name,
      comment: req.body.comment,
      photo: req.body.photo,
    });

    const comment = await doc.save();

    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать отзыв',
      error: error,
    });
  }
};

//Получение всех отзывов
export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'не удалось получить отзывы',
    });
  }
};

//Загрузка файла (фотография)
export const uploadFile = async (req, res) => {
  try {
    res.json({
      photo: `/uploads/${req.file.originalname}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось загрузить фотографию',
    });
  }
};

//Удаление файла (фотография)
export const deleteFile = async (req, res) => {
  try {
    fs.unlink(req.body.photo, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось удалить фоторафию',
          error: err,
        });
        return;
      }
      res.json({
        status: 'deleted',
        photo: req.body.photo,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось удалить фотографию',
      error: error,
    });
  }
};
