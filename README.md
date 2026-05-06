# Spotify (UI / Player)

Веб-приложение в стиле Spotify: интерфейс с сайдбарами, список треков, поиск, управление воспроизведением, избранное и плейлисты.

## Скриншоты

Добавь изображения в папку `docs/screenshots/` и подключи их сюда.

```text
docs/screenshots/
  home.png
  player.png
  playlists.png
  mobile.png
```

- **Home**
  - `docs/screenshots/home.png`
- **Player**
  - `docs/screenshots/player.png`
- **Playlists**
  - `docs/screenshots/playlists.png`

## Технологии

- **React 19**
- **TypeScript**
- **Vite**
- **TailwindCSS** (через `@tailwindcss/vite`)
- **MobX** + `mobx-react-lite` (стейт приложения)
- **nuqs** (хранение query-параметров, например `q` для поиска)
- **lucide-react** (иконки)
- **framer-motion** (анимации)
- **sonner** (toast-уведомления)

## Быстрый старт

Требования:

- Node.js (рекомендуется LTS)
- npm

Установка зависимостей:

```bash
npm install
```

Запуск в dev-режиме:

```bash
npm run dev
```

Сборка:

```bash
npm run build
```

Предпросмотр production-сборки:

```bash
npm run preview
```

Линтинг:

```bash
npm run lint
```

## Архитектура

### Точка входа

- `src/main.tsx` монтирует приложение и оборачивает его в:
  - `NuqsAdapter` (для работы с query string)
  - `Layout` (общий каркас)
  - `App` (основной контент)

### Layout

- `src/components/layout/Layout.tsx`
  - `LeftSidebar` (меню + управление плейлистами)
  - `<main>` (контент)
  - `RightSidebar` (доп. панель)
  - `AudioPlayer` (фиксированный плеер снизу)

### Состояние (MobX)

- `src/store/store.ts`
  - `playStore`: текущий трек, воспроизведение, громкость, перемотка, переключение треков
- `src/store/favorite.store.ts`
  - `favoriteStore`: избранные треки (persist в `localStorage`)
- `src/store/playlist.store.ts`
  - `playlistStore`: плейлисты и треки внутри (persist в `localStorage`)

Persist реализован через утилиты:

- `src/functions/index.ts` (`loadFromLocalStorage`, `saveToLocalStorage`)

### Данные

- `src/data/*` содержит моковые данные:
  - `tracks.data.ts`
  - `menu.data.ts`
  - `artist.data.ts`

### Алиасы импортов

- В `vite.config.ts` настроен alias `@` → `/src`.

## Структура проекта

```text
src/
  components/
    elements/
    layout/
    ui/
  config/
  data/
  functions/
  store/
  types/
public/
  audio/
```

## CI

В репозитории настроен GitHub Actions workflow (lint + build) для PR и push в основную ветку.

## Contribution

См. `CONTRIBUTING.md`.
