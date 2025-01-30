import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategory } from "services/admin";
import { getCookie } from "utils/cookie";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./AddPost.module.css";

function AddPost() {
    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
        city: "",
        amount: "",
        phoneNumber: "",
        images: null,
    });
    const [isPersian, setIsPersian] = useState(true);

    const { data } = useQuery(["get-categories"], getCategory);

    const changeHandler = (event) => {
        const name = event.target.name;
        if (name !== "images") {
            setForm({ ...form, [name]: event.target.value });
        } else {
            setForm({ ...form, [name]: event.target.files[0] });
        }
    };

    const addHandler = (event) => {
        event.preventDefault();

        // اعتبارسنجی شماره موبایل تنها زمانی که شماره‌ای وارد شده باشد 
        if (form.phoneNumber && !/^09\d{9}$/.test(form.phoneNumber)) {
             toast.error("شماره موبایل باید با 09 شروع شود و 11 رقم باشد"); 
             return; 
        }

        const formData = new FormData();
        for (let i in form) {
            formData.append(i, form[i]);
        }
          // console.log(formData)
          
        const token = getCookie("accessToken");

        axios.post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                toast.success(res.data.message);

                // Reset form to initial state after success
                setForm({
                    title: "",
                    content: "",
                    category: "",
                    city: "",
                    amount: "",
                    phoneNumber: "",
                    images: null,
                });

                // Reset file input manually
                document.getElementById("images").value = null;
            })
            .catch((error) => toast.error("مشکلی پیش آمده است"));
    };

    return (
        <>
            <button className={styles.button} onClick={() => setIsPersian(!isPersian)}>
                {isPersian ? "Switch to English Form" : "Switch to Persian Form"}
            </button>
            <div className={`${styles.container} ${isPersian ? styles.start : styles.end}`}>
                {isPersian ? (
                    <form className={styles.form}>
                        <h3>افزودن اگهی</h3>
                        <label htmlFor="title">عنوان</label>
                        <input type="text" name="title" id="title" value={form.title} onChange={changeHandler} />
                        <label htmlFor="content">توضیحات</label>
                        <textarea name="content" id="content" value={form.content} onChange={changeHandler} />
                        <label htmlFor="amount">قیمت</label>
                        <input type="number" name="amount" id="amount" value={form.amount} onChange={changeHandler} />
                        <label htmlFor="city">آدرس</label>
                        <input type="text" name="city" id="city" value={form.city} onChange={changeHandler} />
                        <label htmlFor="phoneNumber">شماره تلفن</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" value={form.phoneNumber} onChange={changeHandler} />
                        <label htmlFor="category">دسته بندی</label>
                        <select name="category" id="category" value={form.category} onChange={changeHandler}>
                            <option value="" disabled>انتخاب دسته‌بندی</option>
                            {data?.data.map(i => (
                                <option key={i._id} value={i._id}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="images">عکس</label>
                        <input type="file" name="images" id="images" onChange={changeHandler} />
                        <button className={styles.button} onClick={addHandler}>ایجاد</button>
                    </form>
                ) : (
                    <form className={styles.form}>
                        <h3>Add Post</h3>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" value={form.title} onChange={changeHandler} />
                        <label htmlFor="content">Content</label>
                        <textarea name="content" id="content" value={form.content} onChange={changeHandler} />
                        <label htmlFor="amount">Amount</label>
                        <input type="number" name="amount" id="amount" value={form.amount} onChange={changeHandler} />
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" value={form.city} onChange={changeHandler} />
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" value={form.phoneNumber} onChange={changeHandler} />
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" value={form.category} onChange={changeHandler}>
                            <option value="" disabled>Choose Category</option>
                            {data?.data.map(i => (
                                <option key={i._id} value={i._id}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="images">Image</label>
                        <input type="file" name="images" id="images" onChange={changeHandler} />
                        <button className={styles.button} onClick={addHandler}>Add</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default AddPost;