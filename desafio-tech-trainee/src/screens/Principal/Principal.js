import React, { useEffect, useState } from 'react'
import { DivisaoPrincipal } from './stylesPrincipal'
import axios from 'axios'
import { BASE_URL } from '../../constants/requisicoes'

export function Principal() {
    const [ posicao, setPosicao ] = useState({})
    const [ nascerDoSol, setNascerDoSol ] = useState([])
    const [ porDoSol, setPorDoSol ] = useState([])
    const [ horaAtual, setHoraAtual ] = useState([])
    

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
                arrayPorDoSol[0] = (Number(arrayPorDoSol[0]) + 12) - 3;
                arrayPorDoSol[1] = Number(arrayPorDoSol[1])

                setNascerDoSol(arrayNascerDoSol)
                setPorDoSol(arrayPorDoSol)

                pegarDataEHora()

                

            }).catch( erro => {
                alert(erro.message);
            })
        }

    }, [posicao])

    const pegarDataEHora  = () => {
        const dataEHora = Date()
        let arrayDataEHora = dataEHora.split(" ")
        let arrayHora = arrayDataEHora[4].split(":")
        arrayHora[0] = Number(arrayHora[0])
        arrayHora[1] = Number(arrayHora[1])

        setHoraAtual(arrayHora)        
    }

    useEffect(() => {
        if(nascerDoSol.length > 0 && porDoSol.length > 0 && horaAtual.length > 0) {
           if(horaAtual[0] > nascerDoSol[0] && horaAtual[0] < porDoSol[0]) {
               console.log("Sol(dia)")
           } else if(horaAtual[0] === nascerDoSol[0]) {
               if(horaAtual[1] >= nascerDoSol[1] ) {
                console.log("Sol(dia)")
               } else {
                console.log("Noite")
               }
           } else if(horaAtual[0] === porDoSol[0]) {
               if(horaAtual[1] >= porDoSol[1]) {
                console.log("Noite")
               } else {
                console.log("Sol(dia)")
               }
           } else {
            console.log("Noite")
           }
        }
        
    }, [horaAtual,nascerDoSol, porDoSol ])
    

    

    
    return <DivisaoPrincipal>
        
    </DivisaoPrincipal>


}