import React from 'react';

const Button = (props) => {
    const styles = {
        buttonStyle:{
            fontWeight:420,
            width:props.width || '100%',
            borderRadius:4,
            letterSpacing:0.5,
            padding:4,
            fontSize: props.fontSize || 16,
            borderWidth:1,
            borderColor:'white',
            marginTop:5,
            textTransform:"upperCase",
            background: props.background || '#5c90f2',
            color: props.textColor || "white",
        }
    }
    return (
        <button style={styles.buttonStyle} type={props.type} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
};


export {Button}