import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Editor.css";
import style from "./markdown.module.css";

import { isMobileScreen } from "../../utils/utils";

import Header from "../Header/Header";

interface Props {
  onMenuClick: Function;
  isSideNavOpen: boolean;
  file: File;
  onFileDelete: Function;
  onTextChange: Function;
  onFileNameChange: Function;
  onSave: Function;
}

interface File {
  id: number;
  createdAt: string;
  name: string;
  content: string;
}

const Editor = ({
  isSideNavOpen,
  onMenuClick,
  file,
  onFileDelete,
  onTextChange,
  onFileNameChange,
  onSave,
}: Props) => {
  const [markdownText, setMarkdownText] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const isMobile: boolean = isMobileScreen();

  useEffect(() => {
    setMarkdownText(file.content);
  }, [file.content]);

  const handlePreviewClick = (): void => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  const handleFileDeleteClick = (): void => {
    onFileDelete(file.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (file.id !== 0) {
      setMarkdownText(e.target.value);
      onTextChange(file.id, markdownText);
    }
  };

  return (
    <section className="editor">
      <Header
        onMenuClick={onMenuClick}
        isSideNavOpen={isSideNavOpen}
        file={file}
        onFileDelete={handleFileDeleteClick}
        onFileNameChange={onFileNameChange}
        onSave={onSave}
      />

      <div className="editor__container">
        <form
          className={`editor__form ${isPreviewOpen ? "editor__form_hide" : ""}`}
        >
          <div className="editor__header">
            <p className="editor__title">MARKDOWN</p>
            <button
              className={`editor__preview-button ${
                isMobile ? "editor__preview-button_show" : ""
              }`}
              aria-label="preview"
              type="button"
              onClick={handlePreviewClick}
            ></button>
          </div>
          <textarea
            className="editor__text"
            onChange={handleChange}
            value={markdownText}
            aria-label="text"
          ></textarea>
        </form>

        <div
          className={`editor__preview ${
            isPreviewOpen || !isMobile ? "editor__preview_show" : ""
          }`}
          style={{ width: `${isPreviewOpen ? "100%" : ""}` }}
        >
          <div className={"editor__header"}>
            <p className="editor__title">PREVIEW</p>
            <button
              className={`editor__preview-button ${
                isPreviewOpen || !isMobile ? "editor__preview-button_show" : ""
              }`}
              aria-label="preview"
              onClick={handlePreviewClick}
            ></button>
          </div>
          <div className="editor__preview-text">
            <ReactMarkdown
              children={markdownText}
              className={style.reactMarkDown}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Editor;
