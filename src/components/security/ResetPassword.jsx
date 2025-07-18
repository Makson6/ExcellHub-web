// import React from "react";
// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import api from "../api/Axios";
// import { toast } from "react-hot-toast";
// import { PasswordInput } from "../components/Inputs";
// import { useState } from "react";

// export default function ResetPassword() {
//   const [isLoading, setIsLoading] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();
//   const email = searchParams.get("email");
//   const otp = searchParams.get("otp");
//   console.log(otp);
//   console.log(email);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (formData) => {
//     try {
//       setIsLoading(true);
//       const credentials = {
//         email: location.state?.email || email,
//         newPassword: formData.newPassword,
//       };

//       const res = await api.put("/api/users/reset-password", credentials);

//       if (res.status === 200) {
//         toast.success("Mot de passe changé avec succsé!.");
//         navigate("/login", {
//           state: { email: formData.mail },
//         });
//       }

//       setIsLoading(false);
//     } catch (error) {
//       console.error("Erreur lors de la connexion :", error);
//       toast.error(error.response?.data?.message || "Erreur de connexion");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="dark:bg-[var(--dark-background)] min-h-screen flex items-center justify-center">
//       <div className="relative bg-[var(--light-primary)] dark:bg-[var(--dark-primary)] p-8 rounded-lg w-full max-w-md shadow-2xl shadow-gray-950">
//         <Link to="/">
//           <span
//             className="absolute cursor-pointer hover:font-semibold text-2xl right-4 top-2 text-white"
//             style={{ textShadow: "2px 0px 3px rgba(255, 255, 255, 0.6)" }}
//           >
//             x
//           </span>
//         </Link>

//         <h2 className="text-2xl font-semibold mb-3 text-center">
//           Reset My Password
//         </h2>

//         <form className="grid" onSubmit={handleSubmit(onSubmit)}>
//           <span className="mb-3"> Mot-de-passe:</span>
//           <PasswordInput
//             register={register}
//             name="password"
//             placeholder="entrez le nouveau mot de passe secret"
//             errors={errors}
//             rules={{
//               required: "Le mot de passe est requis",
//               minLength: {
//                 value: 6,
//                 message: "Minimum 6 caractères",
//               },
//             }}
//           />
//           <span className="mb-3"> Confirmer-le-mot-de-Passe:</span>
//           <PasswordInput
//             register={register}
//             name="newPassword"
//             placeholder="confirmer le nouveau mot de passe"
//             errors={errors}
//             rules={{
//               required: "Veuillez confirmer le mot de passe",
//               validate: (value) =>
//                 value === watch("password") ||
//                 "Les mots de passe ne correspondent pas",
//             }}
//           />
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? (
//               <p className="flex items-center justify-center gap-2 bg-[var(--light-zinc)] dark:bg-[var(--dark-green)] rounded-md cursor-none w-full py-2 px-8">
//                 {" "}
//                 En cours d'envoi...
//               </p>
//             ) : (
//               <p className="flex items-center justify-center gap-2 bg-[var(--light-zinc)] hover:bg-[var(--light-hover-button)] hover:dark:bg-[var(--dark-hover-button)] dark:bg-[var(--dark-green)] rounded-md cursor-pointer w-full py-2 px-8">
//                 {" "}
//                 Confirmer
//               </p>
//             )}
//           </button>
//         </form>

//         <div className="mt-6 text-center  text-sm">
//           {/* As-tu deja un compte ?{" "}
//           <Link
//             to="/login"
//             className="text-[var(--light-zinc)] hover:underline dark:text-[var(--dark-accent)]"
//           >
//             Login
//           </Link> */}
//         </div>
//       </div>
//     </div>
//   );
// }
