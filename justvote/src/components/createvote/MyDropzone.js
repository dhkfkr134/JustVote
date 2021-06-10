import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Dropzone from "react-dropzone";

export default function MyDropzone(props) {
  const [Images, setImages] = useState([]);

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
          //this.props.refreshFunction([...Images, response.data.filePath]);
        } else {
          alert("파일 저장 실패");
        }
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "image/gif, image/jpg, image/jpeg",
  };

  const RootProps = {
    ...getRootProps(),
  };

  return (
    <div {...getRootProps()}>
      <input {...InputProps} />
      {isDragActive ? (
        <p>이제 이미지를 놓아주세요</p>
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
          <div>이미지 드랍 or 클릭</div>
        </div>
      )}
    </div>
  );
}
