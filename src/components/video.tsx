import { Image } from "antd";
import { read } from "fs";
import { ImageProps } from "rc-image";
import React, { useEffect, useState } from "react";
function MyVideo({ src, ...props }: ImageProps) {
  const [thumb, setThumb] = useState<string>();
  function waitVideoReady(video: HTMLVideoElement) {
    return new Promise<void>((reslove) => {
      let meta = false;
      let load = false;
      let suspend = false;
      let seeked = false;
      function check() {
        if (meta && load && suspend && seeked) {
          reslove();
        }
      }
      function ready() {
        if (meta && load && suspend) {
          if (!video.currentTime) {
            video.currentTime = 1;
          }
        }
      }
      video.onloadeddata = () => {
        load = true;
        ready();
      };
      video.onloadedmetadata = () => {
        meta = true;
        ready();
      };
      video.onsuspend = () => {
        suspend = true;
        ready();
      };
      video.onseeked = () => {
        seeked = true;
        check();
      };
    });
  }
  async function getThumb(url: string): Promise<string> {
    let canv = document.createElement("canvas");
    let video = document.createElement("video");
    console.log("123");
    video.src = url;
    await waitVideoReady(video);
    canv.height = video.videoHeight;
    canv.width = video.videoWidth;
    canv.getContext("2d")?.drawImage(video, 0, 0);
    let thumbnail = canv.toDataURL("image/png");
    canv.remove();
    video.remove();
    return thumbnail;
  }
  async function updateThumb() {
    let thumb = await getThumb(`/videos/${src}`);

    console.log(thumb);
    setThumb(thumb);
  }
  useEffect(() => {
    updateThumb();
  }, [src]);
  return <Image src={thumb} {...props}></Image>;
}
export default MyVideo;
