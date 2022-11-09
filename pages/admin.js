// import { connectToDatabase } from "../lib/mongodb";
import { useState } from "react";

function Admin() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    console.log(event.currentTarget);
    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "movieflix");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/isadia94/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div>
        <h1>Upload images</h1>
        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>

          <img src={imageSrc} alt="" />

          {imageSrc && !uploadData && (
            <>
              <p>
                <button className="px-2 py-4 bg-red-700 text-white">
                  Upload Files
                </button>
              </p>
            </>
          )}

          {/* {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )} */}
        </form>
      </div>
    </div>
  );
}

export default Admin;
