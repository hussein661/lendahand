import React from 'react';

const Link = (props) => {
    return (
        <h4 style={styles.textStyle} onClick={props.onClick} >
            {props.children}
        </h4>
    );
};

const styles = {
    textStyle:{
        fontSize:15,
        fontWeight:'450',
        selfAlign:'center',
        cursor:'pointer',
        color:'blue'
    }
}

export { Link };