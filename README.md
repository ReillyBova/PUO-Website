<p align="center">
  <a href="https://orchestra.princeton.edu">
    <img alt="PUO" src="src/assets/branding/material_dark_PUOLOGO.svg" width="250" />
  </a>
</p>
<h1 align="center">
  The Princeton University Orchestra
</h1>

This is the repository for the Princeton University Orchestra's website. It is composed from an array of modern web technologies in order to ensure maximum customizability, minimal development headaches, and — most importantly — a lightning-fast user experience.

_Need help? Found a bug? Submit an issue and/or reach out to the original developer: @ReillyBova._

## 🚀 Quick start

1.  **Clone this repository**

    You will need to download this repository locally before you can begin development. Make sure you already have [git installed](https://git-scm.com/downloads).
    
    ```sh
    # Download the repository to the current directory on the local machine
    git clone https://github.com/ReillyBova/PUO-Website.git
    cd ./PUO-Website
    ```
    
2.  **Install Node package manager (npm).**

    Node allows you to manage and update the development libraries this website depends on. Instructions for installing node may be found on [their website](https://nodejs.org/en/download/).

3.  **Install local packages.**

    Now that you have Node installed, use the node package manager (npm) to install the website's dependencies from within the repository's local directory. The packages you are installing can be found in [package.json](package.json).

    ```sh
    # Install website dependencies (this may take a while)
    npm install
    ```

4.  **Start developing.**

    Run the following command to start up a local server for website development

    ```sh
    npm run develop
    ```

5.  **Open the source code and start editing!**

    The site is now running locally at `http://localhost:8000` (i.e. on port 8000 of your computer, aka "local machine")!

    *Note: You can also access a second link: `http://localhost:8000___graphql`. This is a tool for querying GraphQL data. Learn more about using this tool in the [Gatsby tutorial](https://next.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).*

    Open the `PUO-Website` directory in your code editor of choice and try editing a file, such as `src/pages/index.js`. Save your changes and the browser will update in real time! NB: make sure not to commit these test-changes back to the public repository, or they might end up on the official version of the website!

## 🧐 What's inside?

Here is a quick look at the top-level files and directories in a Gatsby project:

    .
    ├── .cache
    ├── .git
    ├── node_modules
    ├── plugins
    ├── public
    ├── src
    ├── static
    ├── .eslintrc.js
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── README.md

  1.  **`.cache`**: You may or may not see this folder. It is a temporary directory for caching build files for the project. 
  
  2.  **`.git`**: This file connects your copy of the project to GitHub's copy. Do not modify it!
 
  3.  **`/node_modules`**: The directory where all of the modules of code that your project depends on (npm packages) are automatically installed. You populated this directory when you ran `npm install`.
 
  4.  **`/plugins`**: The directory where custom Gatsby plugins for this repository live. This plugins add functionality to the building process, or to the website as a whole, that is not itself provided through exisiting Gatsby or node plugins.
 
  5.  **`/public`**: You may or may not see this folder. It is the directory where the production build of the site is placed when `npm run build` is executed.

  6.  **`/src`**: This is the most important directory in the project: it contains all of the _code_ related to what you see on the front-end of your site (i.e. what you see in the browser), such as the Navbar, and the video. “src” is a shorthand convention for “source code”. Note that this folder does not generally contain the core text bodies of the website.

  7.  **`/static`**: This directory contains simple files that are copied straight into the root directory of your website. These files are generally hidden from users, but rather accessed by web browsers and social media platforms to draw information about the website.

  8.  **`.eslintrc.js`**: ESLint is a program that enforces certain JavaScript conventions and syntax. This file provides the linter in your code editor (if one is installed) with the set of linting rules to follow.

  9.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

  10.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/), which is a tool to help keep the formatting of your code clean and consistent!

  11.  **`gatsby-browser.js`**: This file is where Gatsby expects to find usage of the [Gatsby browser APIs](https://next.gatsbyjs.org/docs/browser-apis/) (if any). These allow for customization/extension of default Gatsby settings that affect the browser during runtime.

  12.  **`gatsby-config.js`**: This is another very important file: it is the main configuration file for the site. This config file holds site metadata (e.g. the site title, the site description, and the navbar settings), as well as settings and inclusion statements for critical Gatsby plugins. (Check out the [Gatsby config docs](https://next.gatsbyjs.org/docs/gatsby-config/) for further details).

  13.  **`gatsby-node.js`**: This file is where Gatsby expects to find usage of the [Gatsby node APIs](https://next.gatsbyjs.org/docs/node-apis/) (if any). These allow for customization/extension of default Gatsby settings affecting pieces of the site during the build process.

  14.  **`gatsby-ssr.js`**: (This may not exist in the project right now, but you can add it if a feature requires it) This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://next.gatsbyjs.org/docs/ssr-apis/) (if any). These allow for customization of default Gatsby settings affecting server-side rendering.

  15.  **`LICENSE`**: The website source code is licensed under the MIT license.

  16.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. (You won’t change this file directly).

  17.  **`package.json`**: This is the manifest/configuration file for Node projects, which includes settings like metadata (e.g. the project’s name, author, etc.), scripts, and project dependencies. This manifest provides npm with the names and versions of its dependencies so that npm can install the currect packages for the project.

  18.  **`README.md`**: This file — i.e. a markdown (formatted text) file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://next.gatsbyjs.org/). Here are some places to start:

-   **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://next.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

-   **To dive straight into code samples head [to our documentation](https://next.gatsbyjs.org/docs/).** In particular, check out the “Guides”, API reference, and “Advanced Tutorials” sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)
