import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InputForm({ onSubmit }) {
  const [projectInfo, setProjectInfo] = useState({
    projectname: "",
    description: "",
    features: "",
    installation: "",
    usage: "",
    contributing: "",
    license: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["projectname", "description"];
    const emptyFields = requiredFields.filter((field) => !projectInfo[field]);

    if (emptyFields.length > 0) {
      emptyFields.forEach((field) => {
        toast.error(`${field.replace(/([A-Z])/g, " ")} is required`);
      });
      return;
    }

    setIsProcessing(true);
    onSubmit(projectInfo);
    toast.success("README generated successfully!");
    e.target.reset();
    setIsProcessing(false);
  };

  const placeholders = {
    projectname: "What’s the name of your project?",
    description: "Describe your project briefly",
    features: "List the key features of your project",
    installation: "How can users install your project?",
    usage: "How do users use your project?",
    contributing: "How can others contribute to your project?",
    license: "Specify the license for your project",
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.entries(projectInfo).map(([key, value]) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1 capitalize"
            >
              {key.replace(/([A-Z])/g, " ")}{["features", "installation", "usage", "contributing", "license"].includes(key) ? " (Optional)" : "" }
            </label>
            {["description", "features", "installation", "usage", "contributing"].includes(key) ? (
              <textarea
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={placeholders[key]}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                rows="4"
              />
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={placeholders[key]}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
        >
          {isProcessing ? "Processing..." : "Generate README"}
        </button>
      </form>
    </div>
  );
}

export default InputForm;
