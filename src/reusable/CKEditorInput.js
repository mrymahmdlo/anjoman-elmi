import { CFormGroup, CFormText, CLabel } from "@coreui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React from "react";
import { UploadFileRequest } from "src/Service/APIEngine";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          UploadFileRequest(file).then((res) => resolve(res));
        })
    );
  }
}

const CKEditorField = (name, text, setForm, form, fieldName) => {
  return (
    <CFormGroup>
      <CLabel htmlFor="nf-password">{name}</CLabel>
      <CKEditor
        editor={ClassicEditor}
        config={{
          language: "fa",
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "indent",
            "outdent",
            "alignment",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
        }}
        data={form[fieldName] ? form[fieldName] : ""}
        onInit={(editor) => {
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return new MyUploadAdapter(loader);
          };
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setForm({ ...form, [fieldName]: data });
        }}
      />
      <CFormText className="help-block">{text}</CFormText>
    </CFormGroup>
  );
};

export { CKEditorField };
