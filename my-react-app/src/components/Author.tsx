import { useState, useEffect } from "react";
import api, { endpoints } from "../config/api";
import Loading from "./Loading";

interface Author {
  name: string;
  avatar: string;
  slug: string;
}

const Author = () => {
  const [authorName, setAuthorName] = useState(""); // Tên của Author
  const [authorAvatar, setAuthorAvatar] = useState<File | null>(null); // File Avatar
  const [authorsList, setAuthorsList] = useState<Author[]>([]); // Danh sách Author
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [editSlug, setEditSlug] = useState<string | null>(null); // Slug của Author đang chỉnh sửa
  const [loading, setLoading] = useState(false); // Hiển thị trạng thái loading

  // Lấy danh sách authors từ API
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoints["authors"]);
        if (response.status === 200) {
          setAuthorsList(response.data);
        } else {
          console.error("Failed to fetch authors");
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  // Thêm mới hoặc cập nhật author
  const submitAuthor = async () => {
    const formData = new FormData();
    formData.append("name", authorName);
    if (authorAvatar) formData.append("avatar", authorAvatar);

    try {
      if (isEditing && editSlug) {
        // Gửi API cập nhật author
        const response = await api.patch(
          `${endpoints["authors"]}/${editSlug}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          // Cập nhật danh sách tác giả
          setAuthorsList((prev) =>
            prev.map((author) =>
              author.slug === editSlug ? response.data.author : author
            )
          );
          resetForm();
        } else {
          alert("Failed to update author.");
        }
      } else {
        // Gửi API tạo mới author
        const response = await api.post(endpoints["authors"], formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201) {
          // Cập nhật danh sách tác giả
          setAuthorsList((prev) => [...prev, response.data.author]);
          resetForm();
        } else {
          alert("Failed to add author.");
        }
      }
    } catch (error) {
      console.error("Error submitting author:", error);
    }
  };

  // Chỉnh sửa một author
  const editAuthor = (author: Author) => {
    setAuthorName(author.name);
    setIsEditing(true);
    setEditSlug(author.slug);
  };

  // Reset form sau khi thêm/chỉnh sửa
  const resetForm = () => {
    setAuthorName("");
    setAuthorAvatar(null);
    setIsEditing(false);
    setEditSlug(null);
  };

  return (
    <>
      <h1 style={{ color: "orange", marginTop: "-30px", position: "relative" }}>
        Authors Management
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
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Enter the name of author..."
          type="text"
          style={{ padding: "10px", width: "60%", marginTop: "10px" }}
        />
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => setAuthorAvatar(e.target.files ? e.target.files[0] : null)}
          style={{ padding: "10px", width: "50%", marginTop: "10px", marginLeft:'30px' }}
        />
      </div>
      <button
        onClick={submitAuthor}
        style={{ marginTop: "10px", backgroundColor: "orange", color: "white" }}
      >
        {isEditing ? "Save Changes" : "Add New Author"}
      </button>
      <h2>List of Authors</h2>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Loading />
        </div>
      ) : authorsList.length > 0 ? (
        <ul style={{ listStyleType: "none" }}>
          {authorsList.map((author) => (
            <li
              style={{
                padding: "5px",
                backgroundColor: "lightyellow",
                marginTop: "5px",
                position: "relative",
                
              }}
              key={author.slug}
            >
              <div style={{display:'flex', justifyContent:'left', alignItems:'center'}}>
                <img
                  src={author.avatar}
                  alt={`${author.name}'s Avatar`}
                  style={{ height: "50px", borderRadius: "50%", marginRight: "10px" }}
                />
                {author.name}
              </div>
              <button
                onClick={() => editAuthor(author)}
                style={{
                  right: "10px",
                  position: "absolute",
                  backgroundColor: "lightgreen",
                  height: "34px",
                  padding: "10px",
                  textAlign: "center",
                  lineHeight: "10px",
                  top: "20%",
                  bottom: "0",
                }}
              >
                ⚙️
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No authors found</p>
      )}
    </>
  );
};

export default Author;
