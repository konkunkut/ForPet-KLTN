import React from 'react';
import 'antd/dist/antd.css';
import LastestNews from './LastestNews';

class ListLastestNews extends React.Component {

    render() {
        return (
            <div>
                {this.props.contents.map(c =>
                    <LastestNews key={c._id}
                        idBlog={c._id}
                        title={c.title}
                        content={c.decription}
                        pictures={c.pictures}
                    />
                )}
            </div>
        );
    }
}
export default ListLastestNews;