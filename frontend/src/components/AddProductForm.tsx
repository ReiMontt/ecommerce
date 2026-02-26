import { useState } from "react";
import { api } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";

export function AddProductForm({ close }: { close: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "Electronics",
    description: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<string[]>([]); // To show errors to user

  const save = async () => {
    setErrors([]);

    try {
      await api.post("/product", form);
      queryClient.invalidateQueries({ queryKey: ["product"] });
      close();
    } catch (err: any) {
      // 1. Log the error so you can see the structure in the console
      console.log("Full Error Object:", err.response?.data);

      if (err.response?.status === 400) {
        // 2. ASP.NET validation errors are inside 'errors'
        const validationData = err.response.data.errors;

        if (validationData) {
          // 3. This converts { Name: ["Error1"], Price: ["Error2"] }
          // into ["Error1", "Error2"]
          const messages = Object.values(validationData).flat() as string[];
          setErrors(messages);
        } else {
          // Fallback for non-validation 400 errors
          setErrors(["Invalid request sent to server."]);
        }
      } else {
        setErrors(["Server error. Check if backend is running."]);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>

        {/* Display Validation Errors */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            {errors.map((msg, i) => (
              <p key={i} className="text-red-600 text-sm">
                • {msg}
              </p>
            ))}
          </div>
        )}

        <input
          placeholder="Name"
          className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />

        <div className="flex gap-2">
          <button
            onClick={save}
            className="flex-1 bg-blue-600 text-white p-2 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Save Product
          </button>
          <button
            onClick={close}
            className="px-4 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
