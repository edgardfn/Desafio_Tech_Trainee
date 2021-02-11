import React, { useEffect, useState } from 'react'
import { DivisaoPrincipal } from './stylesPrincipal'

export function Principal() {
    const [ posicao, setPosicao ] = useState({})

    useEffect(() => {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosicao(position.coords)
            });
        } else {
            alert("GeoLocalização não está ativa ou não é suportada por este navegador.")
        }

    }, [setPosicao])

    useEffect(() => {
        pegarDadosLuz()
    }, [posicao])

    const pegarDadosLuz = async () => {
        console.log(posicao.latitude, posicao.longitude)
        try {
          const resposta = await axios.get(`${BASE_URL}?lat=${posicao.latitude}&lng=${posicao.longitude}`);
    
          this.setState({ usuarios: resposta.data });
        } catch (erro) {
          alert(erro.message);
        }
    };

    // const pegarPosicao = () => {

    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             setPosicao(position.coords)
    //         });
    //     } else {
    //         alert("GeoLocalização não está ativa ou não é suportada por este navegador.")
    //     }

    // }

    

    
    return <DivisaoPrincipal>
        
    </DivisaoPrincipal>


}