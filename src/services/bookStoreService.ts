import { BookItemType } from "../types/BooksTypes";

export default class BookStoreService {
  static titleList: string[] = [
    "Главные по гитарам",
    "Забытые чердаки",
    "Монстр из снов младенцев",
    "Тёмная сторона белой мысли",
    "Братство смерти",
    "Вечное счастье",
    "Тайное сообщество",
    "Величественные ритуалы",
    "Странные сны",
    "Мир без котов",
    "Далёкий путь",
    "Неоновое поколение",
    "Космический парк",
    "Потерянные души",
    "Река скорби",
    "Ледяная башня",
    "Тайна тихой улицы",
    "Песнопения богов смерти",
    "Сладкая вишня",
    "Дом на берегу озера",
  ]

  static autorsList: string[] = [
    "Покровский Л. М.",
    "Мартынова Н. А.",
    "Ермаков М. Г.",
    "Степанов А. Г.",
    "Карпов Д. Я.",
    "Лосев Д. К.",
    "Демин Д. Л.",
    "Павлов Г. А.",
    "Титова Е. Я.",
    "Сорокина К. А.",
    "Осипов А. А.",
    "Зайцева С. В.",
    "Борисова Е. А.",
    "Архипов Н. Д.",
    "Кондратьев М. М.",
    "Орлов А. А.",
    "Горшков А. В.",
    "Зайцева М. Н.",
    "Петрова А. В.",
    "Столяров Ф. Д.",
  ]

  static bookList: BookItemType[] = this.titleList.map((title, index) => {
    const authors = this.autorsList[index];

    return this.createBookItem(index, title, [authors])
  })

  static createBookItem(
    id: number,
    title: string,
    authors = ["Author A.A."]
  ): BookItemType {

    return {
      id,
      title: title,
      authors,
      price: Math.trunc(Math.random() * 1500),
      imageUrl: ''
    }
  }
}