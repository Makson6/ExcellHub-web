import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/Axios";

const EditCourseForm = ({ course }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: course?.title || "",
      description: course?.description || "",
      isFree: course?.isFree || false,
      price: course?.price || "",
      categoryName: course?.category || "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    const body = {
      title: data.title,
      description: data.description,
      isFree: data.isFree,
      price: data.price,
      categoryName: data.categoryName,
      lessons: course.lessons.map((lesson, idx) => ({
        id: lesson.id,
        title: data[`lessonTitle${idx}`],
        content: data[`lessonContent${idx}`],
        videoId: lesson.videoId,
        duration: lesson.duration,
        resourcesIndexes: [], // à compléter si besoin
      })),
    };

    formData.append("data", JSON.stringify(body));

    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    try {
      await axios.put(`/api/courses/${course.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Cours modifié !");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("title")}
        placeholder="Titre du cours"
        className="input"
      />
      <textarea
        {...register("description")}
        placeholder="Description"
        className="textarea"
      />
      <input type="checkbox" {...register("isFree")} /> Gratuit ?
      <input
        type="number"
        step="0.01"
        {...register("price")}
        placeholder="Prix"
        className="input"
      />
      <input
        {...register("categoryName")}
        placeholder="Catégorie"
        className="input"
      />
      <input type="file" {...register("thumbnail")} />
      <h3 className="font-bold mt-4">Leçons</h3>
      {course.lessons.map((lesson, idx) => (
        <div key={lesson.id} className="border p-2 rounded">
          <input
            {...register(`lessonTitle${idx}`)}
            defaultValue={lesson.title}
            placeholder="Titre de la leçon"
            className="input"
          />
          <textarea
            {...register(`lessonContent${idx}`)}
            defaultValue={lesson.content}
            placeholder="Contenu"
            className="textarea"
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Mettre à jour
      </button>
    </form>
  );
};

export default EditCourseForm;
