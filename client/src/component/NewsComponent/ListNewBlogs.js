import React from 'react';
import 'antd/dist/antd.css';
import NewBlogs from "./NewBlogs";

class LstNewBlog extends React.Component {
    render() {
        return (
            <div>
                {this.props.contentsBlogs.map(c =>
                    <NewBlogs key={c._id}
                        idBlog={c._id}
                        title={c.title}
                        decription={c.decription}
                        pictures={c.pictures}
                        content={c.content}
                        date={c.date}
                        view={c.view}
                        blogger={c.id_user.fistname + " "+ c.id_user.lastname}
                    />
                )}
            </div>
        );
    }
}
export default LstNewBlog;