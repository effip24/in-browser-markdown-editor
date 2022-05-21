import React, { useEffect, useState } from "react";
import "./App.css";

import {
  changeMenuBg,
  createDefaultData,
  createNewFile,
} from "../../utils/utils";

import SideNav from "../SideNav/SideNav";
import Editor from "../Editor/Editor";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

interface File {
  id: number;
  createdAt: string;
  name: string;
  content: string;
}

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>({
    id: 0,
    createdAt: "",
    name: "",
    content: "",
  });

  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState<boolean>(false);

  const [deleteCardId, setDeleteCardId] = useState<number>();

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("data") || JSON.stringify(createDefaultData())
    );

    setFiles(data);
    setSelectedFile(data[0]);
  }, []);

  // esc listener for info tool tip closer
  useEffect(() => {
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsInfoToolTipOpen(false);
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const handleMenuClick = (): void => {
    setIsSideNavOpen(!isSideNavOpen);
    changeMenuBg(isSideNavOpen);
  };

  const handleFileClick = (file: File): void => {
    setSelectedFile(file);
    setIsSideNavOpen(false);
    changeMenuBg(isSideNavOpen);
  };

  const handleNewFileClick = (): void => {
    setFiles([createNewFile(files.length + 1), ...files]);
  };

  const handleFileDeleteClick = (id: number): void => {
    setDeleteCardId(id);
    setIsInfoToolTipOpen(true);
  };

  const handleConfirmDelete = (): void => {
    if (deleteCardId !== 0) {
      setFiles(files.filter((f) => f.id !== deleteCardId));
      setSelectedFile(files[files.length - 1]);
      handleSaveToLocal();
    }
    setIsInfoToolTipOpen(false);
  };

  const handleTextChange = (id: number, text: string): void => {
    if (id !== 0) {
      setFiles(
        files.map((file: File) => {
          if (file.id === id) {
            const changedFile: File = {
              id: file.id,
              createdAt: file.createdAt,
              name: file.name,
              content: text,
            };
            return changedFile;
          }
          return file;
        })
      );
    }
  };

  const handleFileNameChange = (id: number, name: string): void => {
    if (id !== 0) {
      setFiles(
        files.map((file: File) => {
          if (file.id === id) {
            const changedFile: File = {
              id: file.id,
              createdAt: file.createdAt,
              name: name,
              content: file.content,
            };
            return changedFile;
          }
          return file;
        })
      );
    }
  };

  const handleSaveToLocal = (): void => {
    localStorage.setItem("data", JSON.stringify(files));
  };

  return (
    <div className="App">
      <SideNav
        isOpen={isSideNavOpen}
        files={files}
        onFileClick={handleFileClick}
        onCreateFile={handleNewFileClick}
      />
      <Editor
        isSideNavOpen={isSideNavOpen}
        onMenuClick={handleMenuClick}
        file={selectedFile}
        onFileDelete={handleFileDeleteClick}
        onTextChange={handleTextChange}
        onFileNameChange={handleFileNameChange}
        onSave={handleSaveToLocal}
      />
      <InfoToolTip isOpen={isInfoToolTipOpen} onConfirm={handleConfirmDelete} />
    </div>
  );
}

export default App;
