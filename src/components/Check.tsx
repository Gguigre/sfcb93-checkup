import React, {useState} from 'react'
import styled from 'styled-components'

type Props = {
  label: string;
  onValueChange?: (value: boolean) => void;
}

export const Check: React.FC<Props> = ({ label, onValueChange }) => {
  const [isChecked, setIsChecked] = useState(false)
  return <Container isChecked={isChecked} onClick={() => setIsChecked(!isChecked)}>
    {isChecked ? '✅ ' : '🔘 '}
    <strong>{label}</strong>
  </Container>
}

const Container = styled.div<{isChecked: boolean}>(({isChecked}) => ({ padding: 8, backgroundColor: isChecked ? '#88ff88' : '#FF8888', color: 'black'}))
