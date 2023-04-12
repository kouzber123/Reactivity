import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

interface Props {
  setFiles: (files: any) => void;
}
export default function PhotoWidgetDropzone({ setFiles }: Props) {
  //style for inactive and active

  const dzStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadious: "5px",
    paddingTop: "30px",
    textAlign: "center" as "center",
    height: "200"
  };
  const dzActive = {
    borderColor: "green"
  };
  //return memorised callback if dependies change
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
}
