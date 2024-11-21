import { useState, useEffect } from "react";
import api, { endpoints } from "../config/api";
import Loading from "./Loading";

interface Category {
  name: string;
  slug: string;
}

const Category = () => {
  const [cateName, setCateName] = useState("");
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);

  useEffect(() => {
    // Gọi API để lấy danh sách categories
    const fetchCategories = async () => {
      try {
        const response = await api.get(endpoints["categories"]);
        if (response.status === 200) {
          setCategoriesList(response.data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const submitCategory = async () => {
    if (isEditing && editSlug) {
      // Cập nhật category
      try {
        const response = await api.patch(`${endpoints["categories"]}/${editSlug}`, {
          name: cateName,
        });

        if (response.status === 200) {
          setCategoriesList((prev) =>
            prev.map((cat) =>
              cat.slug === editSlug ? response.data.category : cat
            )
          );
          resetForm();
        } else {
          alert("Failed to update category.");
        }
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      // Thêm category mới
      if (cateName !== "") {
        try {
          const response = await api.post(endpoints["categories"], {
            name: cateName,
          });

          if (response.status === 201) {
            const newCategory = response.data.category;
            setCategoriesList((prev) => [...prev, newCategory]);
            resetForm();
          } else {
            alert("Failed to add category.");
          }
        } catch (error) {
          console.error("Error adding category:", error);
        }
      } else {
        alert("Please fill out the category name!");
      }
    }
  };

  const editCategory = (category: Category) => {
    setCateName(category.name);
    setIsEditing(true);
    setEditSlug(category.slug);
  };

  const resetForm = () => {
    setCateName("");
    setIsEditing(false);
    setEditSlug(null);
  };

  return (
    <>
      <h1 style={{ color: "orange", marginTop: "-100px", position: "relative" }}>
        Categories Management
      </h1>
      <a href="/books/" style={{ position: "absolute", left: "10px", top: "10px" }}>
        Go to books page
      </a>
      <span>
        <p
          style={{
            marginTop: "-20px",
            textAlign: "center",
            backgroundColor: "lightyellow",
          }}
        >
          <i>*All fields must be filled properly💡</i>
        </p>
      </span>
      <div>
        <input
          value={cateName}
          onChange={(t) => setCateName(t.target.value)}
          placeholder="Enter the name of category..."
          type="text"
          style={{ padding: "10px", width: "40%", marginTop: "10px" }}
        />
      </div>
      <button
        onClick={submitCategory}
        style={{ marginTop: "10px", backgroundColor: "orange", color: "white" }}
      >
        {isEditing ? "Save Changes" : "Add New Category"}
      </button>
      <h2>List of categories</h2>
      {categoriesList.length > 0 ? (
        <ul style={{ listStyleType: "none" }}>
          {categoriesList.map((c) => (
            <li
              style={{
                display:'flex',
                justifyContent:'left',
                alignItems:'center',
                padding: "10px",
                backgroundColor: "lightyellow",
                marginTop: "5px",
                position: "relative",
              }}
              key={c.slug}
            >
              {c.name}
              <button
                onClick={() => editCategory(c)}
                style={{
                  right: "10px",
                  position: "absolute",
                  backgroundColor: "lightgreen",
                  height: "34px",
                  padding: "10px",
                  textAlign: "center",
                  top: "11%",
                  lineHeight:'10px',
                  bottom: "0",
                }}
              >
                ⚙️
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{display:'flex', justifyContent:'center'}}><Loading/></div>
      )}
    </>
  );
};

export default Category;
