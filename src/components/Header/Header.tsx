import "./Header.css";

import { getElementWidth } from "../../utils/utils";

import logo from "../../images/assets/logo.svg";
import { useEffect, useState } from "react";

interface Props {
  onMenuClick: Function;
  isSideNavOpen: boolean;
  file: File;
  onFileDelete: Function;
  onFileNameChange: Function;
  onSave: Function;
}

interface File {
  id: number;
  createdAt: string;
  name: string;
  content: string;
}

const Header = ({
  isSideNavOpen,
  onMenuClick,
  file,
  onFileDelete,
  onFileNameChange,
  onSave,
}: Props) => {
  const [fileName, setFileName] = useState<string>("No file");

  useEffect(() => {
    setFileName(file.name);
  }, [file.name]);

  const handleFileNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (file.id !== 0) {
      setFileName(e.target.value);
      onFileNameChange(file.id, e.target.value);
    }
  };

  return (
    <header
      className="header"
      style={{
        minWidth: `${isSideNavOpen ? getElementWidth(".header") : "100%"}`,
      }}
    >
      <div className="header__left-side">
        <button
          className="header__menu"
          aria-label="menu"
          onClick={() => onMenuClick()}
        ></button>
        <img className="header__logo" src={logo} alt="logo"></img>
        <div className="header__doc-wrap">
          <i className="header__doc-icon"></i>
          <div className="header__doc-info">
            <p className="header__doc-title">Document Name</p>
            <input
              className="header__doc-name"
              value={fileName}
              onChange={handleFileNameChange}
            ></input>
          </div>
        </div>
      </div>

      <div className="header__right-side">
        <button
          className="header__delete"
          aria-label="delete"
          onClick={() => onFileDelete()}
        ></button>
        <button
          className="header__save"
          aria-label="save"
          onClick={() => onSave()}
        >
          {" "}
          <i className="header__save-icon"></i> Save changes
        </button>
      </div>
    </header>
  );
};
export default Header;
