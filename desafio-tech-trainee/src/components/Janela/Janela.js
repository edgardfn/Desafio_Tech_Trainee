import React, { useEffect, useState } from 'react'
import { DivisaoJanela, ImagemJanela  } from './stylesJanela'
import janelaDiaLuzDesligada from '../../assets/janela-dia-luzDesligada.png'
import janelaLuzLigada from '../../assets/janela-luzLigada.png'
import janelaNoiteLuzDesligada from '../../assets/janela-Noite-luzDesligada.png'



export function Janela(props) {
    
    // let imagemJanela
    // useEffect(() => {
        
    //     if(props.luzDoDia) {
    //         if(props.luzLigada) {
    //             imagemJanela = janelaLuzLigada
    //         } else {
    //             imagemJanela = janelaDiaLuzDesligada
    //         }
    //     } else {
    //         if(props.luzLigada){
    //             imagemJanela = janelaLuzLigada
    //         } else {
    //             imagemJanela = janelaNoiteLuzDesligada
    //         }

    //     }
    // }, [] )

    useEffect(() => {
        console.log(props)
    })

   

    
    return  <DivisaoJanela ligada={props.luzLigada}>
        {/* <ImagemJanela src={imagemJanela} alt={"Imagem Janela"} /> */}
    </DivisaoJanela>
}
