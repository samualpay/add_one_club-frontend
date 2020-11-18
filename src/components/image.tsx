import {Image} from 'antd'
import { ImageProps } from 'rc-image';
import React from 'react';
// const IMAGE_PREFIX = '/image/'
const IMAGE_PREFIX = 'https://img.ruten.com.tw/s4/892/273/ziujrhjk/1/f8/4e/'
function MyImage({src,...props}:ImageProps){
    function getSrc(src:string|undefined){
        if(src){
            return `${IMAGE_PREFIX}src`
        }
        return src
    }
    return (
        <Image src={getSrc(src)} {...props}></Image>
    )
}
export default MyImage