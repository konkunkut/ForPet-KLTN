import React from 'react';
import 'antd/dist/antd.css';
import SuggestBlog from './SuggestBlog';

class BlogList extends React.Component {

  render() {
    return (
      <div>
        {this.props.listData.map(c =>
          <SuggestBlog
            key={c._id}
            idBlog={c._id}
            title={c.title}
            content={c.decription}
            avatar={c.pictures[0]}
          />
        )}
      </div>
    );
  }
}

export default BlogList;