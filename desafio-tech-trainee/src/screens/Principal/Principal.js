import React, { useEffect, useState } from 'react'
import { DivisaoPrincipal, DivisaoPredio, DivisaoJanelas } from './stylesPrincipal'
import axios from 'axios'
import { BASE_URL } from '../../constants/requisicoes'
import ceuAzul from '../../assets/ceu-azul.jpg'
import { Janela } from '../../components/Janela/Janela'

export function Principal() {
    const [ posicao, setPosicao ] = useState({})
    const [ nascerDoSol, setNascerDoSol ] = useState([])
    const [ porDoSol, setPorDoSol ] = useState([])
    const [ horaAtual, setHoraAtual ] = useState([])
    const [ luzDoDia, setLuzDoDia ] = useState(true) 
    // const [ janelas, setJanelas ] = useState([{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12}])
    const [ janelas, setJanelas ] = useState([])
    const [ quantidadeJanelas, setQuantidadeJanelas ] = useState([12])


    useEffect(() => {
        
        pegarGeoLocalizacao()

        
    }, [])

    const pegarGeoLocalizacao = () => {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                return setPosicao(position.coords)
            });
        } else {
            alert("GeoLocalização não está ativa ou não é suportada por este navegador.")
        }

    }
    
    useEffect(() => {
        
        if(posicao.latitude !== undefined){
            pegarDadosNascerEPorDoSol(posicao)
        }
        
        
    }, [posicao])


    const  pegarDadosNascerEPorDoSol = async (posicao) => {
        
        try {
            const resposta = await axios.get(`${BASE_URL}?lat=${posicao.latitude}&lng=${posicao.longitude}`)

            let arrayNascerDoSol = resposta.data.results.sunrise.split(":")
            arrayNascerDoSol[0] = Number(arrayNascerDoSol[0]) - 3;
            arrayNascerDoSol[1] = Number(arrayNascerDoSol[1])
            
            let arrayPorDoSol = resposta.data.results.sunset.split(":")
            arrayPorDoSol[0] = (Number(arrayPorDoSol[0]) + 12) - 3;
            arrayPorDoSol[1] = Number(arrayPorDoSol[1])

            setNascerDoSol(arrayNascerDoSol)
            setPorDoSol(arrayPorDoSol)

            // pegarDataEHora(nascerDoSol, porDoSol)

        }catch(erro) {
            alert(erro.message)
        }

        // if(nascerDoSol.length > 0 || porDoSol.length > 0) {
        //     pegarDataEHora(nascerDoSol, porDoSol)
        // }
        
    }


    useEffect(() => {
        
        if(nascerDoSol.length > 0 || porDoSol.length > 0) {
            pegarDataEHora(nascerDoSol, porDoSol)
        }
        
        
    }, [nascerDoSol, porDoSol])

    const pegarDataEHora  = (nascerSol, porSol) => {
        
        const dataEHora = Date()
        let arrayDataEHora = dataEHora.split(" ")
        let arrayHora = arrayDataEHora[4].split(":")
        arrayHora[0] = Number(arrayHora[0])
        arrayHora[1] = Number(arrayHora[1])

        setHoraAtual(arrayHora)    
    
        if(horaAtual[0] > nascerSol[0] && horaAtual[0] < porSol[0]) {
            setLuzDoDia(true) 
        } else if(horaAtual[0] === nascerSol[0]) {
            if(horaAtual[1] >= nascerSol[1] ) {
                setLuzDoDia(true) 
            } else {
                setLuzDoDia(false) 
            }
        } else if(horaAtual[0] === porSol[0]) {
            if(horaAtual[1] >= porSol[1]) {
            setLuzDoDia(false)
            } else {
                setLuzDoDia(false)  
            }
        } else {
            setLuzDoDia(false) 
        }

        criarJanelas(quantidadeJanelas)
    }

    const criarJanelas = (qtdJanelas) => {
        let novoArray = []
        for(let i = 0; i < qtdJanelas; i++) {
            const novaJanela = {
                idJanela: i,
                luzLigada: escolherValorAleatorio()
            }

            novoArray = [...novoArray, novaJanela]
            
        }

        setJanelas(novoArray)
       
    }

    const escolherValorAleatorio = () => {
        const numeroAleatorio = Math.random()
        const numeroArredondado = Math.round(numeroAleatorio)
        if(numeroArredondado === 0) {
            return false
        } else {
            return true
        }
    }

    const onCLickJanela = (idJanelaSelecionado) => {
        console.log("caiu na função")

        const novaListaJanelas = janelas.map((janela) => {
            if(janela.idJanela === idJanelaSelecionado) {
                const novaJanela = {
                    ...janela,
                    luzLigada: !janela.luzLigada
                }
                return novaJanela
            } else {
                return janela
            }
        })

        setJanelas(novaListaJanelas)
    }
    

    const exibirJanelas = (janelas) => {
        const componenteJanela = janelas.map((janela) => {
            return <Janela
                key={janela.idJanela}
                idJanela={janela.idJanela}
                luzDoDia={luzDoDia}
                luzLigada={janela.luzLigada}
                onClickJanela={onCLickJanela}
            />
        })
        return componenteJanela
    }
    
   
    

    return <DivisaoPrincipal luz={luzDoDia} >
        <DivisaoPredio>

            <DivisaoJanelas>
                {exibirJanelas(janelas)}
            </DivisaoJanelas>

        </DivisaoPredio>
    </DivisaoPrincipal>


}

