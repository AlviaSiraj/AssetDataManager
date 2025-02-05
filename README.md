# React Electron Data Table Manager

This project is a React-based data table management application with Electron integration. It allows users to upload Excel data files and interact with the data in a dynamic, user-friendly table interface. Users can effortlessly add, view, edit, delete, and export their data, with additional features like pagination, search functionality, and duplicate entry validation for enhanced data management. Made for those who find it difficult to deal with data.

This app is currently being tested by external users, and features are continuously being added and improved.

## Technology Used

<a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="21px" height="21px"></a> <a href="https://www.electronjs.org/" title="Electron"><img src="https://github.com/get-icon/geticon/raw/master/icons/electron.svg" alt="Electron" width="21px" height="21px"></a> <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" title="HTML5"><img src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg" alt="HTML5" width="21px" height="21px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" title="CSS3"><img src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg" alt="CSS3" width="21px" height="21px"></a>
<a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="21px" height="21px"></a> <a href="https://yarnpkg.com/" title="Yarn"><img src="https://github.com/get-icon/geticon/raw/master/icons/yarn.svg" alt="Yarn" width="21px" height="21px"></a>
<a href="https://code.visualstudio.com/" title="Visual Studio Code"><img src="https://github.com/get-icon/geticon/raw/master/icons/visual-studio-code.svg" alt="Visual Studio Code" width="21px" height="21px"></a>
<a href="https://git-scm.com/" title="Git"><img src="https://github.com/get-icon/geticon/raw/master/icons/git-icon.svg" alt="Git" width="21px" height="21px"></a>

### Features

- Data Management: Add, edit, and delete table records dynamically.
- Search: Filter table data using a search query.
- Pagination: Navigate through data in pages.
- Duplicate Validation: Check for duplicate entries during editing or adding new records.
- Export: Export table data to an Excel file.
- Email: User can email their search results to whomever
- Electron Integration: Save and load data through the Electron backend.

## Installation

1. Clone the repository

```bash
git clone https://github.com/AlviaSiraj/DataTableManagement.git
```

2. Install dependencies using yarn

```bash
yarn install
```

3. Build the app for production

```bash
yarn build
```

4. Start the server:

```bash
yarn electron-start
```

### To package app

After building the app, run

```bash
yarn package
```

the app will then be created in your /dist folder

### Version 0.1.0

- App created, with basic features
- in the testing phase, more features will be added per request

### Version 0.1.1

- Users can chose where they want their application Installed
- Users can now filter their search by header

## Conclusion

This React-based data table management application, integrated with Electron, offers a comprehensive solution for handling and visualizing Excel data files. With features like adding, editing, searching, exporting data, and ensuring duplicate validation, it provides a user-friendly and efficient experience for managing data.

Built with modern technologies like React, Electron, and Node.js, the application emphasizes functionality, performance, and simplicity. I hope this project demonstrates the power of combining these technologies to create versatile and effective tools.
