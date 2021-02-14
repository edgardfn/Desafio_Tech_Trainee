import React, { useEffect, useState } from 'react'
import { DivisaoJanela, ImagemJanela  } from './stylesJanela'
import janelaDiaLuzDesligada from '../../assets/janela-dia-luzDesligada.png'
import janelaLuzLigada from '../../assets/janela-luzLigada.png'
import janelaNoiteLuzDesligada from '../../assets/janela-Noite-luzDesligada.png'




export function Janela(props) {
    const [ imagemJanela, setImagemJanela ] = useState("")
    
    useEffect(() => {

        verificaNoiteOuDia(props)

    }, [props])

    
    const verificaNoiteOuDia = (props) => {
        if(props.luzDoDia) {
            if(props.luzLigada) {
                setImagemJanela(janelaLuzLigada)
            } else {
                setImagemJanela(janelaDiaLuzDesligada) 
            }
        } else {
            if(props.luzLigada){
                setImagemJanela(janelaLuzLigada) 
            } else {
                setImagemJanela(janelaNoiteLuzDesligada)
            }
        }
        
    } 
    
    const onClickJanela = () => {
        props.onClickJanela(props.idJanela)
    }
   
    
    
    return  <DivisaoJanela ligada={props.luzLigada}>
        <ImagemJanela onClick={onClickJanela} src={imagemJanela} alt={"Imagem Janela"} />
    </DivisaoJanela>
}
