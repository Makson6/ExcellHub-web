// @ts-nocheck
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { FaEye, FaEyeSlash, FaCalendarAlt } from "react-icons/fa";

// Input texte classique
export const TextInput = ({
  register,
  name,
  placeholder,
  watch = "",
  errors,
  rules = {},
  autoComplete = "",
  type = "text",
  className = "bg-red-500",
}) => (
  <div className="mb-4">
    <input
      {...register(name, rules)}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className="w-full border-1  border-[var(--light-zinc2)] dark:border-[var(--dark-green2)] dark:bg-[var(--dark-primary)] outline-0 dark:focus:border-[var(--dark-hover-button)] focus:border-[var(--light-zinc)] text-start py-2 px-4 rounded"
    />
    {errors?.[name] && (
      <p className="text-red-500 text-sm">{errors[name]?.message}</p>
    )}
  </div>
);

// Input mot de passe avec bouton afficher/masquer
export const PasswordInput = ({
  register,
  name,
  placeholder,
  autoComplete = "",
  errors,
  rules = {},
  watch,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        {...register(name, rules)}
        type={show ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full border-1 !flex dark:focus:border-[var(--dark-hover-button)] focus:border-[var(--light-zinc)]  border-[var(--light-zinc2)] dark:border-[var(--dark-green2)]  dark:bg-[var(--dark-primary)] outline-0 text-start py-2 px-4 rounded"
      />
      <span
        className="absolute right-5 top-3 text-gray-400 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </span>
      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};

import "react-phone-number-input/style.css";
export const PhoneNumberInput = ({ field, error }) => (
  <div className="flex flex-col mb-4 border rounded-sm">
    <div className="flex items-center dark:focus:border-[var(--dark-hover-button)] focus:border-[var(--light-zinc)]   border  border-[var(--light-zinc2)]  dark:border-[var(--dark-green2)] dark:bg-[var(--dark-primary)] rounded py-2 px-4 w-full">
      <PhoneInput
        {...field}
        autoComplete=""
        defaultCountry="CD" // 🇨🇩 par défaut
        international // Force l'affichage avec +code pays dès le départ
        smartCaret // Gère automatiquement la position du curseur
        countryCallingCodeEditable={false} // +243 non modifiable
        limitMaxLength={true} // Bloque la taille du numéro
        className="flex w-full items-center bg-transparent focus:outline-none
          [&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center [&_.PhoneInputCountry]:gap-2
          [&_.PhoneInputCountryIcon]:w-6 [&_.PhoneInputCountryIcon]:h-4
          [&_.PhoneInputCountrySelect]:bg-transparent [&_.PhoneInputCountrySelect]:border-0 [&_.PhoneInputCountrySelect]:p-0 [&_.PhoneInputCountrySelect]:m-0
          [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:min-w-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:outline-none text-black [&_.PhoneInputInput]:dark:text-white
          [&_.PhoneInput]:dark:focus:border-[var(--dark-hover-button)] focus:border-[var(--light-zinc)]"
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// Input date de naissance
export const DateInput = ({
  register,
  name,
  placeholder,
  errors,
  rules = {},
}) => (
  // <div className="flex flex-row mb-4">
  <div className="flex flex-col mb-4">
    <div className="flex">
      <input
        {...register(name, rules)}
        type="date"
        placeholder={placeholder}
        className="border-1 border-[var(--light-zinc2)] cursor-pointer w-full dark:focus:border-[var(--dark-hover-button)] focus:border-[var(--light-zinc)]  rounded-tr-none rounded-br-none dark:border-[var(--dark-green2)]  dark:bg-[var(--dark-primary)] outline-0 text-start py-2 px-4 rounded text-black dark:text-white
        [appearance:textfield]
        [&::-webkit-calendar-picker-indicator]:top-20
        [&::-webkit-calendar-picker-indicator]:opacity-100
        [&::-webkit-calendar-picker-indicator]:cursor-pointer
        [&::-webkit-calendar-picker-indicator]:invert
        [&::-webkit-calendar-picker-indicator]:filter-none



        "
      />
    </div>
    {errors?.[name] && (
      <p className=" text-red-500 text-sm mt-1">{errors[name]?.message}</p>
    )}
  </div>
);
