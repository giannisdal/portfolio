# 🖥️ Terminal Portfolio

An interactive portfolio website styled as a **macOS terminal**. Visitors type commands to learn about me — my skills, experience, projects, and more.

## ✨ Features

- **macOS terminal look & feel** — title bar with traffic light buttons, monospace font, dark theme (Catppuccin Mocha)
- **Interactive commands** — type `help` to see all available commands
- **Command history** — navigate with ↑ ↓ arrow keys
- **Tab autocomplete** — start typing and press Tab
- **Responsive** — works on desktop and mobile
- **No dependencies** — pure HTML, CSS, and vanilla JavaScript

## 📋 Available Commands

| Command      | Description            |
|--------------|------------------------|
| `about`      | Who am I               |
| `skills`     | Technical skills       |
| `projects`   | Things I've built      |
| `experience` | Work experience        |
| `education`  | Education background   |
| `contact`    | How to reach me        |
| `clear`      | Clear the terminal     |
| `help`       | Show all commands      |

## 🚀 Setup

No build step required. Just open `index.html` in a browser or deploy to any static hosting:

```bash
# Local preview
open index.html

# Or serve with Python
python3 -m http.server 8000
```

## 🏗️ Project Structure

```
portfolio/
├── index.html      # Main HTML with terminal layout
├── style.css       # macOS terminal styling (Catppuccin Mocha)
├── terminal.js     # Command engine & portfolio data
├── dal.png         # Profile photo (used in link previews)
└── README.md
```

## 🛠️ Customization

All personal data lives in `terminal.js` inside the `COMMANDS` object — edit the command functions to update your info.

## 📄 License

MIT

