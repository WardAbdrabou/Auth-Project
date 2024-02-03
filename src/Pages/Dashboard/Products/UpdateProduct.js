import {useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function UpdateProduct() {
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const id = window.location.pathname.split("/").slice(-1)[0];

    const [accept, setAccept] = useState(false);

    const context = useContext(User);
    const token = context.auth.token;

    const nav = useNavigate();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            .then((data) => {
                console.log(data)
                setTitle(data.data[0].title);
                setDescription(data.data[0].description);
                
            })
            .catch((err) => console.log(err));
    }, []);

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            const formData = new FormData();
            formData.append('title' , title);
            formData.append("description" , Description);
            formData.append("image" , image);

            let res = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`, 
                formData,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
            );
            nav("/dashboard/products");
        } catch (err) {
            console.log(err);
            setAccept(true);
        }
    }

    return (
        <div>
            <div >
                <div >
                    <form onSubmit={Submit}>
                        <label htmlFor="name">Title:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Title....."
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                        {title.length < 1 && accept && (
                            <p className="error">Title must be more than 2 char</p>
                        )}
                        <label htmlFor="Description">Description:</label>
                        <input
                            id="Description"
                            type="text"
                            placeholder="Description....."
                            required
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                        {/* {accept && emailError && (
                            <p className="error">Email is already been taken</p>
                        )} */}
                        <label htmlFor="image">Image:</label>
                        <input
                            id="image"
                            type="file"
                            placeholder="image....."
                            onChange={(e) => setImage(e.target.files.item(0))}
                        ></input>
                        {/* {password.length < 8 && accept && (
                            <p className="error">password must be more than 8 char</p>
                        )} */}
                        
                        <div style={{ textAlign: "center" }}>
                            <button type="submit" className="btn">Update Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
