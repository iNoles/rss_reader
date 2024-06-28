# Vue.js RSS Reader

A simple Vue.js application to fetch and display RSS feeds. This project uses Vue.js with TypeScript.

## Features

- Fetch RSS feeds from a user-provided URL.
- Display feed items with titles and descriptions.
- Styled using TailwindCSS for a modern look.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/iNoles/rss_reader.git
   cd rss_reader
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Usage

1. Enter the URL of the RSS feed you want to fetch in the input box.
2. Click on the "Fetch RSS" button.
3. The feed items will be displayed below, showing the title and description of each item.
