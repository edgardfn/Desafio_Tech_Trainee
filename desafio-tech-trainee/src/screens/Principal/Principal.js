import React, { useEffect, useState } from 'react'
import { DivisaoPrincipal } from './stylesPrincipal'

export function Principal() {
    const [ posicao, setPosicao ] = useState({})

    useEffect(() => {

        pegarPosicao()

    }, [])

    const pegarPosicao = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((posicao) => {
                setPosicao(posicao.coords)
            });
          } else {
            alert("GeoLocalização não está ativa ou não é suportada por este navegador.")
          }

    }


    return <DivisaoPrincipal>
        
    </DivisaoPrincipal>


}