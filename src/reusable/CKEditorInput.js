import { CFormGroup, CFormText, CLabel } from "@coreui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React from "react";
import { APICoreFileLink, APICoreUpload } from "src/Service/APIBase";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) =>
    APICoreUpload(file)
        .then((res) => ({ default: APICoreFileLink(res.data) }))
        .catch()
    );
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

const CKEditorField = ({ name, text, setForm, form, fieldName }) => {
  return (
    <CFormGroup key={fieldName}>
      <CLabel
        style={{ color: !form[fieldName] && "red" }}
        htmlFor="nf-password"
      >
        {name}
      </CLabel>
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [MyCustomUploadAdapterPlugin],
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
