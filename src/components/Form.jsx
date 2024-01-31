"use client";
import { useState } from "react";
import Input from "../components/Input";
import spanishWords from "an-array-of-spanish-words";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    salary: "",
    domain: "",
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const isPasswordInDictionary = (password) => {
    return spanishWords.some((word) => password.toLowerCase().includes(word));
  };

  const validateForm = () => {
    let tempErrors = {};

    // Validación para el nombre
    if (!formData.name) {
      tempErrors.name = "El nombre es obligatorio";
    } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(formData.name)) {
      tempErrors.name = "El nombre contiene caracteres inválidos";
    }

    // Validación para la edad
    if (!formData.age) {
      tempErrors.age = "La edad es obligatoria";
    } else if (
      !/^\d+$/.test(formData.age) ||
      formData.age < 1 ||
      formData.age > 96
    ) {
      tempErrors.age = "La edad debe ser un número entre 1 y 96";
    }

    // Validación para el sueldo
    if (!formData.salary) {
      tempErrors.salary = "El sueldo es obligatorio";
    } else if (
      !/^\d+(\.\d{1,2})?$/.test(formData.salary) ||
      parseFloat(formData.salary) < 0
    ) {
      tempErrors.salary =
        "El sueldo debe ser un número positivo con hasta dos decimales";
    }

    // Validación para el correo electrónico 1
    if (!formData.domain) {
      tempErrors.domain = "El correo electrónico es obligatorio";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|live|yahoo)\.com$/.test(
        formData.domain
      )
    ) {
      tempErrors.email1 = "Correo electrónico no válido";
    }

    // Validación para el correo electrónico 2
    if (!formData.email) {
      tempErrors.email = "El correo electrónico es obligatorio";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@utdelacosta\.edu\.mx$/.test(formData.email2)
    ) {
      tempErrors.email = "Correo electrónico no válido";
    }

    // Validación para la contraseña
    if (!formData.password) {
      tempErrors.password = "La contraseña es obligatoria";
    } else {
      const passwordRules = [
        { regex: /[a-z]/, message: "Al menos una letra minúscula" },
        { regex: /[A-Z]/, message: "Al menos una letra mayúscula" },
        { regex: /[0-9]/, message: "Al menos un número" },
        { regex: /[^a-zA-Z0-9]/, message: "Al menos un símbolo especial" },
        {
          regex:
            /(?!.*(012|123|234|345|456|567|678|789|890|098|987|876|765|654|543|432|321|210)).*/,
          message: "No números consecutivos",
        },
        {
          regex: /(?!.*(00|11|22|33|44|55|66|77|88|99)).*/,
          message: "No números iguales juntos",
        },
        { regex: /.{10,}/, message: "Mínimo 10 caracteres" },
        // Falta la validación de palabras del diccionario
      ];

      if (isPasswordInDictionary(formData.password)) {
        passwordRules.push({
          regex: /.*/,
          message: "La contraseña no puede ser una palabra del diccionario",
        });
      }

      let passwordErrors = passwordRules
        .filter((rule) => !rule.regex.test(formData.password))
        .map((rule) => rule.message);
      if (passwordErrors.length > 0) {
        tempErrors.password =
          "La contraseña no cumple con: " + passwordErrors.join(", ");
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      console.log("Form Data:", formData);
    }
  };

  const renderErrorMessages = () => {
    return Object.keys(errors).map((key) => {
      if (errors[key]) {
        return (
          <li className="text-white text-xs" key={key}>
            {errors[key]}
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div className="container w-75 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 shadow-md rounded-sm border"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Input
            name="name"
            type="text"
            label="Nombre"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            isSubmitted={isSubmitted}
          />
          <Input
            name="age"
            type="text"
            label="Edad"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
            isSubmitted={isSubmitted}
          />
          <Input
            name="salary"
            type="text"
            label="Sueldo"
            value={formData.salary}
            onChange={handleChange}
            error={errors.salary}
            isSubmitted={isSubmitted}
          />
          <Input
            name="domain"
            type="text"
            label="Dominio"
            value={formData.domain}
            onChange={handleChange}
            error={errors.domain}
            isSubmitted={isSubmitted}
          />
          <Input
            name="email"
            type="email"
            label="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            isSubmitted={isSubmitted}
          />
          <Input
            name="password"
            type="password"
            label="Ingresa contraseña"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            isSubmitted={isSubmitted}
          />
        </div>
        {/* Nombre */}

        <button
          type="submit"
          className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Guardar datos
        </button>
      </form>
      {Object.keys(errors).length > 0 ? (
        <div className="mt-10 p-10 bg-red-400 border-red-700 border-2 rounded-md">
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            {renderErrorMessages()}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Form;
