import React from 'react'

interface Props {
    backgroundOpacity? : number,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    active: boolean,
}

const BackgroundOverlay: React.FC<Props> = ({backgroundOpacity = 0.4, onClick, active }) => {
    const style = {
        backgroundColor: 'rgba(0,0,0, ' + backgroundOpacity + ')', 
    }
    return (
        <div className={"background-overlay transition-opacity duration-500 " + (active ? "opacity-100 visible" : "opacity-0 invisible")} style={style} onClick={onClick} />
    )
}

export default BackgroundOverlay
