import { useState } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = ({ label, error, className, ...props }: TextAreaProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-sm font-medium mb-1">{label}</label>}
      <textarea
        className={`border rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      ></textarea>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default function Project16() {
  const [formData, setFormData] = useState({
    comment: "",
  });
  const [errors, setErrors] = useState({
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors = {
      comment: formData.comment ? "" : "Comment is required",
    };

    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextArea
            label="Add comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            error={errors.comment}
            placeholder="Write a comment..."
            rows={4}
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Commment
          </button>
        </div>
      </form>
    </div>
  );
}
