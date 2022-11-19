import React from "react"
import { Property } from "csstype"

type Props = {
  color: string,
  progress: number
}

const ProgressBar: React.FC<Props> = ({ color, progress }) => {

  const containerStyles = {
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${progress*100}%`,
    backgroundColor: color,
    borderRadius: 'inherit',
    textAlign: 'right' as Property.TextAlign
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${Math.ceil(progress*100)}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
