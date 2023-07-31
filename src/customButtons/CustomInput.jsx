import React from "react";

const CustomInputUpload = (props) => {
  return (
    <div className="w-full md:w-1/2">
      <label
        className="block cursor-pointer custom-file-input-label uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
        htmlFor="grid-city"
      >
        Upload Image
      </label>
      <input
        className="custom-file-input appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-city"
        type="file"
        name="user-photo"
        accept="image/*"
        placeholder="Albuquerque"
        onChange={(event) => {
          setRegData({
            ...RegData,
            [event.target.name]: event.target.files[0],
          });
        }}
      />
    </div>
  );
};

export default CustomInputUpload;
