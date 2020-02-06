# Mesto

Версия проекта: v1.0.1.

С рабочей версией можно ознакомиться на [демо-странице](https://aleksandr-e-lebedev.github.io/mesto).

## Описание проекта

Данный проект реализован в рамках учебной программы [Яндекс.Практикум](https://praktikum.yandex.ru) по профессии веб-разработчик для приобретения навыков работы с JavaScript, ООП, API, валидацией форм, Git и webpack для создания современных интерактивных веб-сайтов.

## Технологии, используемые в проекте

1. HTML,
2. CSS,
3. JavaScript,
4. Git,
5. webpack.

## Организация кода

1. CSS - по методологии [БЭМ](https://ru.bem.info/methodology);
2. JavaScript - ООП (классы); ES6-модули.

## Фунциональные возможности

1. загрузка профиля пользователе с сервера: имя, о себе, фото;
2. редактирование профиля: имя, о себе, фото;
3. загрузка карточек с сервера;
4. открытие попапа с увеличенным изображением карточки;
5. добавление новой карточки;
6. отображение количества лайков карточки;
7. удаление карточки;
8. постановка и снятие лайка.

## UX

Формы редактирования профиля и добавления новой карточки:

1. валидация посредством HTML и JS; кастомные сообщения об ошибках;
2. прелоадеры при отправке данных на сервер.

## Как развернуть проект

Клонируйте репозиторий:

`git clone https://github.com/aleksandr-e-lebedev/mesto.git`

Для установки необходимых пакетов выполните:

`npm install`

Запуск:

* `npm run dev`,
* `npm run build`,
* `npm run deploy`.