import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Dropzone from "react-dropzone";

export default function MyDropzone(props) {
  const [Images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    // 사용자가 올린 정보를 확인해야 하므로 일단 서버로 전송합니다.
    // 제목 같은 건 폼을 제출한 이후에 달아주도록 합시다.

    // 폼데이터 구성
    const formData = new FormData();

    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", acceptedFiles[0]);
    console.log(acceptedFiles[0]);

    await axios
      .post("http://localhost:8080/imgRegister", formData, config)
      .then((response) => {
        if (response.data.success) {
          setImages([...Images, response.data.filePath]);
          console.log(Images);
        } else {
          alert("파일 저장 실패");
        }
      });

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ));

  const RootProps = {
    ...getRootProps(),
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop files here</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "3em", marginBottom: "5px" }}>
            <i className="fas fa-file-upload"></i>
          </div>
          <div>이미지 넣기</div>
        </div>
      )}
      <div>{images}</div>
    </div>
  );
}
