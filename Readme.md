# Automation Dukatech

A web application for generating documents such as recommendations and acceptance letters using HTML, CSS, and JavaScript.

## Features

- User-friendly form to input details: name, school, start date, and end date.
- Option to select document type: recommendation, acceptance, or other templates.
- Dynamic template updating: JavaScript replaces placeholders in templates with form details.
- Download generated documents directly from the browser.
- Utilizes FileSaver.js for saving completed documents.

## Project Structure

```
Automation_Dukatech/
├── index.html
├── style.css
├── script.js
├── templates/
│   ├── recommendation_template.txt
│   ├── acceptance_template.txt
├── libs/
│   └── FileSaver.min.js
├── assets/
│   └── (images, logos, etc.)
└── Readme.md
```

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Fill out the form, select a template, and download your document.

## Dependencies

- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) (included in `libs/`)

## License

MIT License