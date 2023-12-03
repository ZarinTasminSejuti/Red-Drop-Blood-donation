import { Link } from "react-router-dom";


const ContentManagement = () => {
    return (
        <div>
            <div className="w-full flex justify-end">
                <Link to="/dashboard/contentManagement/addBlog"><button className="btn btn-primary">+ Add Blog</button></Link>
            </div>
        </div>
    );
};

export default ContentManagement;