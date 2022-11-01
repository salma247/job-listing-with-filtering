import React from 'react'
import classes from './Layout.module.css'

export default function main(props) {
    return (
        <main className={classes.layout}>
            <div className={classes.background}></div>
            <div className={classes.content}>
                {props.children}
            </div>
        </main>
    )
}
