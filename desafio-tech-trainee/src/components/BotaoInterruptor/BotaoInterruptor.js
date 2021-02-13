import React, { useEffect, useState } from 'react'
import { DivisaoInterruptor, BotaoOnOff} from './stylesBotaoInterruptor'


export function BotaoInterruptor(props) {

    return <DivisaoInterruptor>
        <BotaoOnOff onClick={props.onClickBotao}>{props.textoBotao}</BotaoOnOff>
    </DivisaoInterruptor>
}