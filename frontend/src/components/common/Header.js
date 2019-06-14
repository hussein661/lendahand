import React from 'react';

const Header = (props) => {
    return (
        <h1 style={styles.headerStyle} className={props.className}>
            {props.children}
        </h1>
    );
};

const styles = {
    headerStyle:{
        fontSize:32,
        color:'black',
        selfAlign:'center',
        textTransform:'upperCase',
        textAlign:'center'

    }
}

export default Header;