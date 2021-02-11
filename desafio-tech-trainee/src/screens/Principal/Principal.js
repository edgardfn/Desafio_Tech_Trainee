import React, { useEffect, useState } from 'react'
import { DivisaoPrincipal } from './stylesPrincipal'
import axios from 'axios'
import { BASE_URL } from '../../constants/requisicoes'

export function Principal() {
    const [ posicao, setPosicao ] = useState({})
    const [ nascerDoSol, setNascerDoSol ] = useState([])
    const [ porDoSol, setPorDoSol ] = useState([])
    

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

        if(posicao.latitude !== undefined && posicao.longitude !== undefined) {
            axios.get(`${BASE_URL}?lat=${posicao.latitude}&lng=${posicao.longitude}`).then(resposta => {
                let arrayNascerDoSol = resposta.data.results.sunrise.split(":")
                arrayNascerDoSol[0] = Number(arrayNascerDoSol[0]) - 3;
                arrayNascerDoSol[1] = Number(arrayNascerDoSol[1])
                
                let arrayPorDoSol = resposta.data.results.sunset.split(":")
                arrayPorDoSol[0] = Number(arrayPorDoSol[0]) - 3;
                arrayPorDoSol[1] = Number(arrayPorDoSol[1])

                setNascerDoSol(arrayNascerDoSol)
                setPorDoSol(arrayPorDoSol)
                
            }).catch( erro => {
                alert(erro.message);
            })
        }
        
        

    }, [posicao])

   
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