import { UseSpringProps } from "@react-spring/web";
import React, { ReactComponentElement, SetStateAction, useState } from "react";

// TODO: Library
type Pt = { x: number, y: number };

interface Nothing { };
type MaybePt = Nothing | Pt;

const forcePush = (source: Pt, bbox: DOMRect, opts: { force?: number, massMultiplier?: number }): UseSpringProps => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    const cmass = { x: bbox.left + (bbox.width / 2), y: bbox.top + (bbox.height / 2) }
    const massMultiplier = opts.massMultiplier || 0.00075;
    const force = opts.force || 1000;

    // TODO: Library
    //const distance = Math.sqrt(Math.pow((source.x - cmass.x), 2) + Math.pow((source.y - cmass.y), 2))
    const mass = massMultiplier * bbox.width * bbox.height;
    const signX = (cmass.x > source.x) ? +1 : -1;
    const accelerationX =
        (force / mass) /
        Math.max(
            signX * (bbox.width / 2),
            (cmass.x - source.x)
        );
    const signY = (cmass.y > source.y) ? +1 : -1;
    const accelerationY =
        (force / mass) /
        Math.max(
            signY * (bbox.width / 2),
            (cmass.y - source.y)
        );

    // We handwave a little bit and say that acceleration predicts how far the spring will bounce.
    // It's wrong, but the point of react-spring is to be wrong, but realistic.
    return { to: { x: accelerationX, y: accelerationY } };
}

export function Stax() {
    return (<div style={{
        width: '200px',
        height: '189px',
        position: 'relative',
        top: '33%',
        left: '20%',
        backgroundColor: '#f4e736',
        boxShadow: '10px 10px 5px black'
    }}></div>)
}

export function TopStax(props: { children: React.ReactChild }) {
    const [clicked, setClicked] = useState(mkPtMaybe(null));
    if (Object.keys(clicked).length !== 0) {
        /* Here we want to do the following:

        PER EACH CHILD (so far, only for the underlying "Stax"):

         1. Generate spring specification by calling forcePush against its current bounding box
         2. useSpring this freshly computed spring specification
         3. When the spring is done, unset clicked (and, perhaps, some lock
            which would prevent from responding to more clicks, but moving forward
            it would be cool to respond to mouse movement a la particle.js snow
            demo)

        */
    }
    return (
        <div
            style={{ width: '100vw', height: '100vh', backgroundColor: '#700731' }}
            onMouseDown={(e) => setClicked(mkPtMaybe({ x: e.clientX, y: e.clientY }))}
        >
            {props.children}
        </div>
    );
}

const mkPtMaybe = (pt: null | Pt) => {
    if (!pt) {
        return {};
    } else {
        return pt;
    }
}
