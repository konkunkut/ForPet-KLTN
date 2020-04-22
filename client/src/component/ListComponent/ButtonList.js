import React from 'react';
import 'antd/dist/antd.css';
import SuggestButton from './SuggestButton';

function ButtonList(props) {
  return (
    <div>
        {props.districList.map(c => 
            <SuggestButton  
                distric ={c.distric} />
        )}
    </div>
  );
}

export default ButtonList;