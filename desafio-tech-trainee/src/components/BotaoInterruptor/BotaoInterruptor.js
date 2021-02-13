import React, { useEffect, useState } from 'react'
import { DivisaoInterruptor, ImagemInterruptor} from './stylesBotaoInterruptor'


export function BotaoInterruptor(props) {

    return <DivisaoInterruptor>
        <ImagemInterruptor onClick={props.onClickBotao} src={props.imagemInterrruptor}/>
    </DivisaoInterruptor>
}