import menuOpen from "../images/assets/icon-menu.svg";
import menuClose from "../images/assets/icon-close.svg";

import lightTheme from "../images/assets/icon-light-mode.svg";
import lightThemeActive from "../images/assets/light-active.png";

import darkThemeIcon from "../images/assets/icon-dark-mode.svg";
import darkThemeIconActive from "../images/assets/dark-active.png";

interface File {
  id: number;
  createdAt: string;
  name: string;
  content: string;
}

const changeMenuBg = (isOpen: boolean): void => {
  if (isOpen) {
    document.documentElement.style.setProperty("--menu-bg", `url(${menuOpen})`);
  } else {
    document.documentElement.style.setProperty(
      "--menu-bg",
      `url(${menuClose})`
    );
  }
};

const changeThemeIcons = (isLight: boolean): void => {
  if (isLight) {
    document.documentElement.style.setProperty(
      "--light-theme",
      `url(${lightThemeActive})`
    );
    document.documentElement.style.setProperty(
      "--dark-theme",
      `url(${darkThemeIcon})`
    );
  } else {
    document.documentElement.style.setProperty(
      "--dark-theme",
      `url(${darkThemeIconActive})`
    );
    document.documentElement.style.setProperty(
      "--light-theme",
      `url(${lightTheme})`
    );
  }
};

const changeTheme = (light: boolean): void => {
  if (light) {
    document.documentElement.style.setProperty("--main-bg", "#ffff");
    document.documentElement.style.setProperty("--header-bg", "#f5f5f5");
    document.documentElement.style.setProperty("--editor-title", "#7c8187");
    document.documentElement.style.setProperty("--text-color", "#7c8187");
    document.documentElement.style.setProperty(
      "--editor-border",
      "1px solid #e4e4e4"
    );

    document.documentElement.style.setProperty("--mark-quote", "#f5f5f5");
    document.documentElement.style.setProperty("--mark-quote-p", "#35393f");
    document.documentElement.style.setProperty("--mark-p", "#7c8187");
    document.documentElement.style.setProperty("--mark-h", "#35393f");
  } else {
    document.documentElement.style.setProperty("--main-bg", "#151619");
    document.documentElement.style.setProperty("--header-bg", "#1D1F22");
    document.documentElement.style.setProperty("--editor-title", "#C1C4CB");
    document.documentElement.style.setProperty("--text-color", "#C1C4CB");
    document.documentElement.style.setProperty(
      "--editor-border",
      "1px solid #5A6069"
    );

    document.documentElement.style.setProperty("--mark-quote", "#2B2D31");
    document.documentElement.style.setProperty("--mark-quote-p", "#FFFFFF");
    document.documentElement.style.setProperty("--mark-p", "#C1C4CB");
    document.documentElement.style.setProperty("--mark-h", "#FFFFFF");
  }
};

const getElementWidth = (el: string): string => {
  let box = document.querySelector(el) as HTMLElement;
  let width = box.offsetWidth;

  return `${width}px`;
};

const isMobileScreen = (): boolean => {
  const mobile = window.matchMedia("(max-width: 525px)");
  if (mobile.matches) {
    return true;
  }
  return false;
};

const getTodayDate = (): string => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return dd + "-" + mm + "-" + yyyy;
};

const createDefaultData = (): File[] => {
  const data = [
    {
      id: 0,
      createdAt: getTodayDate(),
      name: "welcome.md",
      content:
        "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
    },
  ];

  return data;
};

const createNewFile = (id: number): File => {
  return {
    id: id,
    createdAt: getTodayDate(),
    name: "untitled-document.md",
    content: "",
  };
};

export {
  changeMenuBg,
  changeThemeIcons,
  getElementWidth,
  isMobileScreen,
  createDefaultData,
  createNewFile,
  changeTheme,
};
