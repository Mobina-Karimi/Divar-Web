import CategoryForm from "components/templates/categoryForm"
import CategoryList from "components/templates/CategoryList"

function AdminPage() {
  return (
    <div>
      <CategoryList/>
      <CategoryForm/>
    </div>
  )
}

export default AdminPage