import styled from 'styled-components'
import ceuAzul from '../../assets/ceu-azul.jpg'
import ceuNoite from '../../assets/ceu-noite.jpg'

export const DivisaoPrincipal = styled.div`
    width: 100vw;
    height: 100vh;
    
    background-image: ${(props) => {
        if(props.luz === true) {
            return `url(${ceuAzul})`
        } else {
            return  `url(${ceuNoite})`
        }
    }};

    background-repeat: no-repeat;
    background-size: cover;
    
    display: flex;
    justify-content: center;
    align-items: flex-end;
`   

export const DivisaoPredio = styled.div`
    width: 30%;
    height: 70%;

    border: 1px solid black;
    background-color: gray;
`

export const DivisaoJanelas = styled.div`
    margin: 16px 8px 0 8px;
    height: 90%;

    border: 1px solid black;

    display: flex;
    flex-wrap: wrap;
`