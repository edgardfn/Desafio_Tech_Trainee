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
    
`   