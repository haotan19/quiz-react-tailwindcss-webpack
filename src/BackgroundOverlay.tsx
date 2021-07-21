import React from 'react'

interface Props {
    backgroundOpacity? : number,
    onClick?: () => void
}

const BackgroundOverlay: React.FC<Props> = ({backgroundOpacity = 0.4, onClick }) => {
    const style = {
        backgroundColor: 'rgba(0,0,0, ' + backgroundOpacity + ')', 
    }
    return (
        <div className={"background-overlay"} style={style} onClick={onClick} />
    )
}

export default BackgroundOverlay
