import { useState, useEffect } from "react";

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  useEffect(() => {
    Object.values(initial).join("");
    setInputs(initial);
  }, [initial]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  return {
    inputs,
    handleInputChange,
  };
}
