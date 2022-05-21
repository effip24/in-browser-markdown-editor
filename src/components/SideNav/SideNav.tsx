import { useEffect, useState } from "react";
import "./SideNav.css";

import { changeThemeIcons, changeTheme } from "../../utils/utils";

interface Props {
  isOpen: boolean;
  files: File[];
  onFileClick: Function;
  onCreateFile: Function;
}

interface Theme {
  light: boolean;
  dark: boolean;
}

interface File {
  createdAt: string;
  name: string;
  content: string;
}

const SideNav = ({ isOpen, files, onFileClick, onCreateFile }: Props) => {
  const [theme, setTheme] = useState<Theme>({ light: true, dark: false });

  useEffect(() => {
    changeThemeIcons(theme.light);
    changeTheme(theme.light);
  }, [theme]);

  const handleThemeClick = (): void => {
    setTheme({ light: !theme.light, dark: !theme.dark });
  };

  return (
    <aside className={`side-nav ${isOpen ? "side-nav_open" : ""}`}>
      <div className="side-nav__documents-container">
        <p className="side-nav__title">MY DOCUMENTS</p>

        <button
          className="side-nav__add"
          aria-label="add"
          onClick={() => onCreateFile()}
        >
          + New Document
        </button>
        <ul className="side-nave__documents">
          {files.map((file: File, id) => (
            <li
              className="side-nav__document"
              key={id}
              onClick={() => onFileClick(file)}
            >
              <i className="side-nav__document-icon"></i>
              <div className="side-nav__document-info">
                <p className="side-nav__document-date">{file.createdAt}</p>
                <p className="side-nav__document-name">{file.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="side-nav__theme-wrap" onClick={handleThemeClick}>
        <i className="side-nav__theme-icon side-nav__theme-icon_type_dark"></i>
        <div
          className={`side-nav__theme-button-wrap ${
            theme.light ? "side-nav__theme-button-wrap_light" : ""
          }`}
        >
          <div className="side-nav__theme-button-dot"></div>
        </div>
        <i className="side-nav__theme-icon side-nav__theme-icon_type_light"></i>
      </div>
    </aside>
  );
};
export default SideNav;
