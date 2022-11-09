import axios from "axios";
import { useState } from "react";

const Endpoint = "http://localhost:3000/api/addMovie";

function Form() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Movie");
  const [image, setImage] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(event) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

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
    console.log(data.secure_url);
    let url = data.secure_url;

    let res = await fetch(Endpoint, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        type: type,
        image: url,
      }),
    });
    res = await res.json();
    console.log(res);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col">
      <h1>Upload New Movie</h1>
      <form
        acceptCharset="UTF-8"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div className="">
          <label htmlFor="exampleFormControlSelect1">Type</label>
          <select
            required
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Movie</option>
            <option>Tv Show</option>
          </select>
        </div>
        <hr />

        <div className="mt-3">
          <label className="mr-2">Upload poster:</label>
          <input name="file" type="file" onChange={handleOnChange} />
        </div>
        <hr />
        {/* {formStatus ? (
          <div className="text-success mb-2">Your message has been sent.</div>
        ) : (
          ""
        )} */}
        <button type="submit" className="bg-gray-600 text-white py-2 px-4">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Form;
