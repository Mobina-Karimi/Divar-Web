import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCategory } from "services/admin"
import Loader from "../modules/Loader"
import { deleteCategory } from "services/admin"

import styles from "./CategoryList.module.css"
import { useState } from "react"

function CategoryList() {
    const queryClient = useQueryClient()
    const [deletedCategory, setDeletedCategory] = useState(null) // ذخیره نام دسته‌بندی حذف‌شده
    const {data,isLoading} = useQuery(["get-categories"], getCategory)
    // console.log({data,isLoading})

    const { mutate: deleteCat, isLoading: isDeleting } = useMutation(
        (id) => deleteCategory(id),
        {
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries(["get-categories"]) // بازخوانی لیست دسته‌بندی‌ها
                const category = data.data.find((i) => i._id === variables) // پیدا کردن نام دسته‌بندی حذف‌شده
                setDeletedCategory(category.name) // ذخیره نام دسته‌بندی حذف‌شده
            },
        }
    )

    const handleDelete = (id) => {
        deleteCat(id) // حذف دسته‌بندی با کلیک روی دکمه
    }

  return (
    <div className={styles.list}>
         {deletedCategory && (
                <p className={styles.deleteMessage}>
                    دسته‌بندی "{deletedCategory}" با موفقیت حذف شد.
                </p>
        )}
        {isLoading ? <Loader/> : data.data.map((i) => <div key={i._id}>
        <img src={`${i.icon}.svg`}></img>
        <h5>{i.name}</h5>
        <p>slug: {i.slug}</p>
        <button onClick={() => handleDelete(i._id)} disabled={isDeleting}>حذف</button>
    </div>)}
    </div>
  )
}

export default CategoryList
  